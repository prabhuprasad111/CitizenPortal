/* SAKHI help widget — extends static FAQ topics with AI + service-status flow */
import { CHATBOT_TOPICS, type ChatbotTopic } from './chatbotTopics';
import { postServiceStatus } from '@/api/serviceStatus';
import { ServiceStatusApiError } from '@/api/types/serviceStatus';
import { sendToAI } from '@/api/aiChat';
import type { AiChatResult } from '@/api/aiChat';
import {
  AI_ERROR,
  AI_THINKING,
  ASK_REQUEST_NUMBER,
  ASK_SERVICE_TYPE,
  CHECKING_STATUS,
  PICK_SERVICE_TYPE,
  SERVICE_STATUS_CHIP,
  SERVICE_STATUS_QUICK,
  STATUS_ERROR,
  STATUS_NOT_FOUND,
  matchesServiceStatusIntent,
} from './chatbotCopy';
import { formatServiceStatusReply } from './formatServiceStatusReply';
import { matchLocalFaq } from './chatbotFaq';
import {
  getChatbotSession,
  patchChatbotSession,
  resetChatbotSession,
  type ChatbotState,
  type UserFlowData,
} from './chatbotSession';
import { SERVICE_TYPES, type ServiceTypeOption } from './serviceTypes';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

/** Called from React Send button / Enter — ensures send runs even if DOM listeners fail. */
let submitFreeformHandler: (() => void) | null = null;

export function portalChatbotSubmit(): void {
  if (!submitFreeformHandler) {
    console.error(
      '[SAKHI] Send ignored — chatbot not initialized. Run via `npm run dev` at http://localhost:5173 (not static HTML).',
    );
    return;
  }
  submitFreeformHandler();
}

export function initPortalChatbot(): (() => void) | undefined {
  const root = document.getElementById('portalSathiBot');
  if (!root) return undefined;

  const panel = document.getElementById('portalChatbotPanel');
  const launcher = document.getElementById('portalChatbotToggle');
  const closeBtn = document.getElementById('portalChatbotClose');
  const thread = document.getElementById('portalChatbotThread');
  const quickWrap = document.getElementById('portalChatbotQuick');
  const input = document.getElementById('portalChatbotInput') as HTMLInputElement | null;
  const sendBtn = document.getElementById('portalChatbotSend');
  const resetBtn = document.getElementById('portalChatbotReset');
  const menuBtn = document.getElementById('portalChatbotMenu');
  const headerOpen = document.getElementById('portalSathiHeaderOpen');

  if (!thread || !quickWrap) {
    console.error('[SAKHI] init failed: thread or quick area missing');
    return undefined;
  }

  /* --- State machine (service request status flow); persisted across effect re-runs --- */
  const boot = getChatbotSession();
  let chatbotState: ChatbotState = boot.state;
  let userData: UserFlowData = { ...boot.userData };
  let busy = false;
  let typingEl: HTMLElement | null = null;

  const syncSession = () => {
    patchChatbotSession({ state: chatbotState, userData: { ...userData } });
  };

  /** Get current session ID for AI calls. */
  const getSessionId = () => getChatbotSession().sessionId;

  const isOrMode = () => document.documentElement.classList.contains('portal-lang-or');
  const esc = (s: string) => {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  };

  const bilingualHtml = (en: string, or: string) =>
    `<p class="lang-en mb-0">${en}</p><p class="lang-or mb-0" lang="or">${or}</p>`;

  const renderBullets = (bullets: { en: readonly string[]; or: readonly string[] }) => {
    const lisEn = bullets.en.map((t) => `<li>${esc(t)}</li>`).join('');
    const lisOr = (bullets.or || bullets.en).map((t) => `<li>${esc(t)}</li>`).join('');
    return `<div class="portal-chatbot-answer"><div class="lang-en"><ul>${lisEn}</ul></div><div class="lang-or" lang="or"><ul>${lisOr}</ul></div></div>`;
  };

  const appendUser = (text: string) => {

    const wrap = document.createElement('div');

    wrap.className = 'portal-chatbot-msg portal-chatbot-msg--user';

    wrap.innerHTML =
      `<div class="portal-chatbot-bubble">${esc(text)}</div>`;

    thread.appendChild(wrap);

    thread.scrollTop = thread.scrollHeight;
  };
  const appendBot = (markdown: string) => {

    const wrap = document.createElement('div');

    wrap.className = 'portal-chatbot-msg portal-chatbot-msg--bot';

    const formattedHtml = DOMPurify.sanitize(
      marked.parse(markdown) as string
    );

    wrap.innerHTML =
      `<div class="portal-chatbot-bubble markdown-body">${formattedHtml}</div>`;

    thread.appendChild(wrap);

    thread.scrollTop = thread.scrollHeight;
  };

  /** Render a confirmation prompt with clickable Yes/No buttons. */
  const appendBotConfirmation = (message: string, options: string[]) => {
    const wrap = document.createElement('div');
    wrap.className = 'portal-chatbot-msg portal-chatbot-msg--bot';

    const sanitizedMessage = DOMPurify.sanitize(
      marked.parse(message) as string
    );

    const buttonsHtml = options
      .map(
        (opt) =>
          `<button type="button" class="portal-chatbot-confirm-btn" data-confirm-value="${esc(opt)}">${esc(opt)}</button>`,
      )
      .join('');

    wrap.innerHTML =
      `<div class="portal-chatbot-bubble markdown-body">` +
      `${sanitizedMessage}` +
      `<div class="portal-chatbot-confirm-buttons">${buttonsHtml}</div>` +
      `</div>`;

    // Attach click handlers to confirmation buttons
    wrap.querySelectorAll('.portal-chatbot-confirm-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = (btn as HTMLElement).dataset.confirmValue || '';
        // Disable all confirmation buttons after selection
        wrap.querySelectorAll('.portal-chatbot-confirm-btn').forEach((b) => {
          (b as HTMLButtonElement).disabled = true;
          b.classList.add('portal-chatbot-confirm-btn--disabled');
        });
        // Highlight the selected button
        btn.classList.add('portal-chatbot-confirm-btn--selected');
        // Send the confirmation value as a user message
        handleConfirmationClick(value);
      });
    });

    thread.appendChild(wrap);
    thread.scrollTop = thread.scrollHeight;
  };

  /** Handle user clicking a confirmation button (Yes/No). */
  const handleConfirmationClick = async (value: string) => {
    if (busy) return;
    appendUser(value);
    await invokeSendToAI(value);
  };

  const appendBotBilingual = (en: string, or: string) => {
    appendBot(bilingualHtml(esc(en), esc(or)));
  };

  const setBusy = (on: boolean) => {
    busy = on;
    if (input) input.disabled = on;
    if (sendBtn) (sendBtn as HTMLButtonElement).disabled = on;
  };

  const showTyping = (_en: string, _or: string) => {
    removeTyping();
    const wrap = document.createElement('div');
    wrap.className = 'portal-chatbot-msg portal-chatbot-msg--bot portal-chatbot-msg--typing';
    wrap.innerHTML =
      `<div class="portal-chatbot-bubble portal-chatbot-bubble--typing">` +
      `<div class="portal-chatbot-typing-dots">` +
      `<span></span><span></span><span></span>` +
      `</div>` +
      `</div>`;
    thread.appendChild(wrap);
    typingEl = wrap;
    thread.scrollTop = thread.scrollHeight;
  };

  const removeTyping = () => {
    typingEl?.remove();
    typingEl = null;
  };

  const renderQuickChip = (icon: string, en: string, or: string) =>
    `<i class="bi ${esc(icon)} portal-chatbot-quick-btn__icon" aria-hidden="true"></i>` +
    `<span class="portal-chatbot-quick-btn__label">` +
    `<span class="lang-en">${esc(en)}</span>` +
    `<span class="lang-or" lang="or">${esc(or)}</span>` +
    `</span>`;

  const buildQuickButtons = () => {
    quickWrap.innerHTML = '';

    const statusBtn = document.createElement('button');
    statusBtn.type = 'button';
    statusBtn.className = 'portal-chatbot-quick-btn portal-chatbot-quick-btn--status';
    statusBtn.innerHTML = renderQuickChip('bi-clipboard-check', SERVICE_STATUS_CHIP.en, SERVICE_STATUS_CHIP.or);
    statusBtn.addEventListener('click', () => onServiceStatusQuick());
    quickWrap.appendChild(statusBtn);

    CHATBOT_TOPICS.forEach((topic) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'portal-chatbot-quick-btn';
      btn.innerHTML = renderQuickChip(topic.icon, topic.chip.en, topic.chip.or);
      btn.addEventListener('click', () => onTopic(topic));
      quickWrap.appendChild(btn);
    });
  };

  const hideQuickTopics = () => {
    quickWrap.innerHTML = '';
    quickWrap.hidden = true;
  };

  const showTopicListInQuickArea = () => {
    quickWrap.hidden = false;
    buildQuickButtons();
  };

  const appendFollowUpInvite = () => {
    thread.querySelectorAll('.portal-chatbot-msg--invite').forEach((n) => n.remove());
    hideQuickTopics();
    const wrap = document.createElement('div');
    wrap.className = 'portal-chatbot-msg portal-chatbot-msg--bot portal-chatbot-msg--invite';
    wrap.innerHTML =
      '<div class="portal-chatbot-bubble portal-chatbot-bubble--invite">' +
      '<p class="lang-en portal-chatbot-invite-lead mb-0">Is there anything else you would like help with?</p>' +
      '<p class="lang-or portal-chatbot-invite-lead mb-0" lang="or">ଆଉ କିଛି ସହାୟତା ଦରକାର କି?</p>' +
      '<button type="button" class="portal-chatbot-reveal-topics-btn" data-action="reveal-topics">' +
      '<span class="lang-en">View topics</span><span class="lang-or" lang="or">ବିଷୟ ଦେଖନ୍ତୁ</span></button></div>';
    thread.appendChild(wrap);
    thread.scrollTop = thread.scrollHeight;
  };

  const resetFlowState = () => {
    chatbotState = 'idle';
    userData = { requestNumber: '', serviceType: null };
    removeTyping();
    setBusy(false);
    syncSession();
  };

  const restoreQuickAreaForState = () => {
    if (chatbotState === 'waiting_service_type') {
      renderServiceButtons();
    } else if (chatbotState === 'idle' && !quickWrap.hidden) {
      buildQuickButtons();
    }
  };

  const onTopic = (topic: ChatbotTopic) => {
    resetFlowState();
    appendUser(isOrMode() ? topic.q.or : topic.q.en);
    appendBot(renderBullets(topic.bullets));
    appendFollowUpInvite();
  };

  /* --- Service request status guided flow --- */
  const startServiceFlow = () => {
    hideQuickTopics();
    chatbotState = 'waiting_request_number';
    userData = { requestNumber: '', serviceType: null };
    syncSession();
    appendBotBilingual(ASK_REQUEST_NUMBER.en, ASK_REQUEST_NUMBER.or);
  };

  const onServiceStatusQuick = () => {
    resetFlowState();
    appendUser(isOrMode() ? SERVICE_STATUS_QUICK.or : SERVICE_STATUS_QUICK.en);
    startServiceFlow();
  };

  /** Renders service-type choices in the existing quick-button area. */
  const renderServiceButtons = () => {
    quickWrap.innerHTML = '';
    quickWrap.hidden = false;
    SERVICE_TYPES.forEach((service) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'portal-chatbot-quick-btn portal-chatbot-quick-btn--service';
      btn.innerHTML = renderQuickChip('bi-file-earmark-text', service.nameEn, service.nameOr);
      btn.addEventListener('click', () => {
        void onServiceTypeSelected(service);
      });
      quickWrap.appendChild(btn);
    });
  };

  const onServiceTypeSelected = async (service: ServiceTypeOption) => {
    if (busy || chatbotState !== 'waiting_service_type') return;
    userData.serviceType = service.id;
    appendUser(isOrMode() ? service.nameOr : service.nameEn);
    hideQuickTopics();
    await completeServiceStatusLookup();
  };

  const completeServiceStatusLookup = async () => {
    if (userData.serviceType == null || !userData.requestNumber) return;

    chatbotState = 'idle';
    syncSession();
    showTyping(CHECKING_STATUS.en, CHECKING_STATUS.or);
    setBusy(true);
    try {
      const requestNumber = Number(userData.requestNumber.trim());
      if (!Number.isFinite(requestNumber)) {
        throw new ServiceStatusApiError('Invalid request number.', 'client');
      }

      const result = await postServiceStatus({
        requestNumber,
        serviceType: userData.serviceType,
      });
      removeTyping();
      appendBot(formatServiceStatusReply(result));
    } catch (err) {
      removeTyping();
      if (err instanceof ServiceStatusApiError) {
        const text =
          err.kind === 'not_found'
            ? STATUS_NOT_FOUND.en
            : err.message || STATUS_ERROR.en;
        const textOr =
          err.kind === 'not_found' ? STATUS_NOT_FOUND.or : STATUS_ERROR.or;
        if (import.meta.env.DEV && err.kind === 'network') {
          appendBot(
            `<p class="lang-en mb-0">${esc(text)}</p><p class="lang-or mb-0" lang="or">${esc(textOr)}</p>` +
            `<p class="small text-muted mb-0 mt-1">${esc(err.message)}</p>`,
          );
        } else {
          appendBot(
            `<p class="lang-en mb-0">${esc(text)}</p><p class="lang-or mb-0" lang="or">${esc(textOr)}</p>`,
          );
        }
      } else {
        appendBotBilingual(STATUS_ERROR.en, STATUS_ERROR.or);
      }
    } finally {
      setBusy(false);
      userData = { requestNumber: '', serviceType: null };
      syncSession();
      appendFollowUpInvite();
    }
  };

  const handleFlowInput = async (text: string) => {
    if (chatbotState === 'waiting_request_number') {
      userData.requestNumber = text;
      chatbotState = 'waiting_service_type';
      syncSession();
      appendBotBilingual(ASK_SERVICE_TYPE.en, ASK_SERVICE_TYPE.or);
      renderServiceButtons();
    }
  };

  const appendFaqAnswer = (en: string, or: string) => {
    appendBot(
      `<p class="lang-en mb-0">${en}</p><p class="lang-or mb-0" lang="or">${or}</p>`,
    );
  };

  const tryLocalFaq = (text: string) => {
    const faq = matchLocalFaq(text);
    if (!faq) {
      return false;
    }
    appendFaqAnswer(faq.answer.en, faq.answer.or);
    return true;
  };

  /** POST /api/ai/chat (fetch — visible in Network tab). FAQ only if AI fails. */
  const invokeSendToAI = async (text: string) => {
    console.log('Calling AI API:', text);
    showTyping(AI_THINKING.en, AI_THINKING.or);
    setBusy(true);
    try {
      const result: AiChatResult = await sendToAI(text, getSessionId());
      removeTyping();

      if (result.type === 'confirmation' && result.options?.length) {
        // Render confirmation with clickable buttons
        appendBotConfirmation(result.text, result.options);
      } else {
        // Render as markdown
        appendBot(result.text);
      }
    } catch (error) {
      console.error('AI API error:', error);
      removeTyping();
      if (!tryLocalFaq(text)) {
        appendBotBilingual(AI_ERROR.en, AI_ERROR.or);
      }
    } finally {
      setBusy(false);
      // Don't show follow-up invite for confirmations — wait for user response
      const lastMsg = thread.querySelector('.portal-chatbot-msg:last-child');
      const hasConfirmButtons = lastMsg?.querySelector('.portal-chatbot-confirm-buttons');
      if (!hasConfirmButtons) {
        appendFollowUpInvite();
      }
    }
  };

  const resetChat = () => {
    resetChatbotSession();
    chatbotState = 'idle';
    userData = { requestNumber: '', serviceType: null };
    removeTyping();
    setBusy(false);
    thread.innerHTML = '';
    const greet = document.createElement('div');
    greet.className = 'portal-chatbot-greet';
    greet.innerHTML =
      '<p class="mb-1"><strong class="lang-en">Namaskar</strong><strong class="lang-or" lang="or"> ନମସ୍କାର</strong></p>' +
      '<p class="lang-en mb-0">I\'m <strong>SAKHI</strong>, your Citizen Portal assistant.</p>' +
      '<p class="lang-or mb-0" lang="or">ମୁଁ <strong>SAKHI</strong> — ଆପଣଙ୍କ ନାଗରିକ ପୋର୍ଟାଲ୍ ସହାୟିକା ।</p>';
    thread.appendChild(greet);
    quickWrap.hidden = false;
    buildQuickButtons();
    if (input) input.value = '';
    patchChatbotSession({ threadBootstrapped: true, state: chatbotState, userData: { ...userData } });
  };

  const setOpen = (open: boolean) => {
    const wasOpen = root.getAttribute('data-open') === 'true';
    root.setAttribute('data-open', open ? 'true' : 'false');
    if (panel) panel.hidden = !open;
    launcher?.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      setTimeout(() => input?.focus(), 80);
    } else if (wasOpen) {
      resetChat();
    }
  };

  const sendFreeform = async () => {
    if (!input || busy) {
      console.warn('[SAKHI] send blocked', { hasInput: Boolean(input), busy });
      return;
    }

    const message = input.value.trim();
    if (!message) return;

    console.log('User message:', message);

    appendUser(message);
    input.value = '';

    if (chatbotState === 'waiting_request_number') {
      await handleFlowInput(message);
      return;
    }

    if (chatbotState === 'waiting_service_type') {
      appendBotBilingual(PICK_SERVICE_TYPE.en, PICK_SERVICE_TYPE.or);
      return;
    }

    if (chatbotState === 'idle') {
      if (matchesServiceStatusIntent(message)) {
        startServiceFlow();
        return;
      }
      await invokeSendToAI(message);
      return;
    }

    console.warn('[SAKHI] unexpected chatbotState:', chatbotState);
    chatbotState = 'idle';
    syncSession();
    await invokeSendToAI(message);
  };

  submitFreeformHandler = () => {
    void sendFreeform();
  };

  const onThreadClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest('[data-action="reveal-topics"]');
    if (!btn || !thread.contains(btn)) return;
    e.preventDefault();
    thread.querySelectorAll('.portal-chatbot-msg--invite').forEach((n) => n.remove());
    showTopicListInQuickArea();
  };

  const syncInputPlaceholder = () => {
    if (!input) return;
    input.placeholder = isOrMode()
      ? input.getAttribute('data-placeholder-or') || ''
      : input.getAttribute('data-placeholder-en') || '';
  };

  const onEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && root.getAttribute('data-open') === 'true') {
      setOpen(false);
      launcher?.focus();
    }
  };

  const onLang = () => {
    syncInputPlaceholder();
    if (chatbotState === 'waiting_service_type') {
      renderServiceButtons();
    } else if (!quickWrap.hidden) {
      buildQuickButtons();
    }
  };

  const onMenu = () => {
    window.location.href = '/#contact';
  };

  const onLauncherClick = (e: Event) => {
    e.preventDefault();
    setOpen(true);
  };

  const onHeaderOpenClick = (e: Event) => {
    e.preventDefault();
    setOpen(true);
  };

  const onCloseClick = () => setOpen(false);

  const onSendClick = () => {
    void sendFreeform();
  };

  const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void sendFreeform();
    }
  };

  const onInputKeypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void sendFreeform();
    }
  };

  thread.addEventListener('click', onThreadClick);
  launcher?.addEventListener('click', onLauncherClick);
  headerOpen?.addEventListener('click', onHeaderOpenClick);
  closeBtn?.addEventListener('click', onCloseClick);
  sendBtn?.addEventListener('click', onSendClick);
  input?.addEventListener('keydown', onInputKeydown);
  input?.addEventListener('keypress', onInputKeypress);
  resetBtn?.addEventListener('click', resetChat);
  menuBtn?.addEventListener('click', onMenu);
  document.addEventListener('keydown', onEscape);
  document.addEventListener('portalUiLangChanged', onLang);
  syncInputPlaceholder();
  if (!getChatbotSession().threadBootstrapped) {
    resetChat();
  } else {
    restoreQuickAreaForState();
  }

  console.info('[SAKHI] chatbot ready, state=', chatbotState);

  return () => {
    submitFreeformHandler = null;
    thread.removeEventListener('click', onThreadClick);
    launcher?.removeEventListener('click', onLauncherClick);
    headerOpen?.removeEventListener('click', onHeaderOpenClick);
    closeBtn?.removeEventListener('click', onCloseClick);
    sendBtn?.removeEventListener('click', onSendClick);
    input?.removeEventListener('keydown', onInputKeydown);
    input?.removeEventListener('keypress', onInputKeypress);
    resetBtn?.removeEventListener('click', resetChat);
    menuBtn?.removeEventListener('click', onMenu);
    document.removeEventListener('keydown', onEscape);
    document.removeEventListener('portalUiLangChanged', onLang);
  };
}
