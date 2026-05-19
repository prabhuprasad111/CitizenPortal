/**
 * Portal SATHI help widget — vanilla JS, FAQ from curated police-portal steps.
 */
(function () {
  'use strict';

  var TOPICS = [
    {
      id: 'trace',
      q: {
        en: 'How will you trace a complaint?',
        or: 'ଅଭିଯୋଗ ସ୍ଥିତି କିପରି ଦେଖିବେ?'
      },
      bullets: {
        en: [
          'Click on the Complaint tab.',
          'Select “View complaint / search status”.',
          'Select the complaint radio button.',
          'Enter the complaint number.',
          'Click on “View status”.',
          'The status of the complaint will be displayed.'
        ],
        or: [
          '“Complaint” ଟ୍ୟାବ୍ କ୍ଲିକ୍ କରନ୍ତୁ ।', ~
          '“View complaint / search status” ବାଛନ୍ତୁ ।',
          'Complaint ରେଡିଓ ବଟନ୍ ଚୟନ କରନ୍ତୁ ।',
          'ଅଭିଯୋଗ ନମ୍ବର ଲେଖନ୍ତୁ ।',
          '“View status” କ୍ଲିକ୍ କରନ୍ତୁ ।',
          'ଅଭିଯୋଗର ସ୍ଥିତି ପ୍ରଦର୍ଶିତ ହେବ ।'
        ]
      }
    },
    {
      id: 'char-cert',
      q: {
        en: 'How to register Character Certificate request?',
        or: 'ଚରିତ୍ର ପ୍ରମାଣପତ୍ର ଅନୁରୋଧ କିପରି ପଞ୍ଜିକରଣ କରିବେ?'
      },
      bullets: {
        en: [
          'Go to Citizen Services → Character Certificate Request → “Add Character Certificate Request”.',
          'The Character Certificate Request page opens.',
          'Select or enter complete and correct details for the certificate.',
          'Use radio buttons where the form asks for a choice.',
          'Review and submit when all mandatory fields are filled.'
        ],
        or: [
          'Citizen Services → Character Certificate Request → “Add Character Certificate Request” କୁ ଯାଆନ୍ତୁ ।',
          'ପୃଷ୍ଠା ଖୋଲିବ ।',
          'ପ୍ରମାଣପତ୍ର ପାଇଁ ସଠିକ୍ ଓ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
          'ଆବଶ୍ୟକ ସ୍ଥାନରେ ରେଡିଓ ବଟନ୍ ବ୍ୟବହାର କରନ୍ତୁ ।',
          'ସମସ୍ତ ବାଧ୍ୟତାମୂଳକ କ୍ଷେତ୍ର ପରେ ଦାଖଲ କରନ୍ତୁ ।'
        ]
      }
    },
    {
      id: 'register-complaint',
      q: {
        en: 'How to register a complaint?',
        or: 'ଅଭିଯୋଗ ପଞ୍ଜିକରଣ କିପରି କରିବେ?'
      },
      bullets: {
        en: [
          'Log in to the Citizen Portal with your user ID and password.',
          'Click “Register New Complaint”.',
          'The register new complaint page opens.',
          'Move through the tabs to enter or select information.',
          'Fill all required fields accurately.',
          'Click “Submit” to save the complaint.'
        ],
        or: [
          'ଲଗଇନ୍ ଆଇଡି ଓ ପାସ୍ୱାର୍ଡ ସହ ପୋର୍ଟାଲ୍‌କୁ ଲଗଇନ୍ କରନ୍ତୁ ।',
          '“Register New Complaint” କ୍ଲିକ୍ କରନ୍ତୁ ।',
          'ପୃଷ୍ଠା ଖୋଲିବ ।',
          'ଟ୍ୟାବ୍ ମାଧ୍ୟମରେ ତଥ୍ୟ ପୂରଣ/ବାଛନ୍ତୁ ।',
          'ସମସ୍ତ ଆବଶ୍ୟକ କ୍ଷେତ୍ର ସଠିକ୍ ଭାବେ ପୂରଣ କରନ୍ତୁ ।',
          'ସଞ୍ଚୟ ପାଇଁ “Submit” କ୍ଲିକ୍ କରନ୍ତୁ ।'
        ]
      }
    },
    {
      id: 'service-request',
      q: {
        en: 'How to initiate a service request?',
        or: 'ସେବା ଅନୁରୋଧ କିପରି ଆରମ୍ଭ କରିବେ?'
      },
      bullets: {
        en: [
          'Log in to the Citizen Portal with your user ID and password.',
          'Open the Citizen Services menu.',
          'Choose the service you need and follow the on-screen steps to complete the request form.',
          'Submit the form after verifying all details.'
        ],
        or: [
          'ବ୍ୟବହାରକାରୀ ଆଇଡି ଓ ପାସ୍ୱାର୍ଡ ସହ ଲଗଇନ୍ କରନ୍ତୁ ।',
          '“Citizen Services” ମେନୁ ଖୋଲନ୍ତୁ ।',
          'ଆବଶ୍ୟକ ସେବା ବାଛି ଫର୍ମ ଅନୁସାରେ ପଦକ୍ଷେପ ଚାଲନ୍ତୁ ।',
          'ତଥ୍ୟ ଯାଞ୍ଚ କରି ଫର୍ମ ଦାଖଲ କରନ୍ତୁ ।'
        ]
      }
    },
    {
      id: 'tenant-pg',
      q: {
        en: 'How to register Tenant/PG verification request?',
        or: 'ଭଡ଼ାଟିଆ/ପିଜି ଯାଞ୍ଚ ଅନୁରୋଧ କିପରି କରିବେ?'
      },
      bullets: {
        en: [
          'Go to Citizen Services → Tenant/PG Verification Request.',
          'The house owner must fill the information in the prescribed form.',
          'Select or enter all required details correctly.',
          'Click “Submit” to save the request.'
        ],
        or: [
          'Citizen Services → Tenant/PG Verification Request କୁ ଯାଆନ୍ତୁ ।',
          'ଘର ମାଲିକ ନିର୍ଦ୍ଧାରିତ ଫର୍ମରେ ତଥ୍ୟ ପୂରଣ କରିବେ ।',
          'ସମସ୍ତ ଆବଶ୍ୟକ ତଥ୍ୟ ସଠିକ୍ ଭାବେ ଦିଅନ୍ତୁ ।',
          'ସଞ୍ଚୟ ପାଇଁ “Submit” କ୍ଲିକ୍ କରନ୍ତୁ ।'
        ]
      }
    },
    {
      id: 'protest',
      q: {
        en: 'How to register Protest / Strike request?',
        or: 'ବିକ୍ଷୋଭ/ଧର୍ମଘଟ ଅନୁରୋଧ କିପରି କରିବେ?'
      },
      bullets: {
        en: [
          'Go to Citizen Services → Protest Strike Request → “Protest/Strike Registration Request”.',
          'The Protest / Strike Registration page opens.',
          'Enter personal information under Applicant details.',
          'Enter complete details about the proposed protest or strike.',
          'Click “Submit” to save the request.'
        ],
        or: [
          'Citizen Services → Protest Strike Request → “Protest/Strike Registration Request” କୁ ଯାଆନ୍ତୁ ।',
          'ପଞ୍ଜିକରଣ ପୃଷ୍ଠା ଖୋଲିବ ।',
          'ଆବେଦକ ବିବରଣୀରେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
          'ପ୍ରସ୍ତାବିତ ବିକ୍ଷୋଭ/ଧର୍ମଘଟ ବିଷୟରେ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ଦିଅନ୍ତୁ ।',
          '“Submit” କ୍ଲିକ୍ କରି ସଞ୍ଚୟ କରନ୍ତୁ ।'
        ]
      }
    },
    {
      id: 'event',
      q: {
        en: 'How to register Event / Performance request?',
        or: 'କାର୍ଯ୍ୟକ୍ରମ/ପରିବେଷଣ ଅନୁରୋଧ କିପରି କରିବେ?'
      },
      bullets: {
        en: [
          'Go to Citizen Services → Event / Performance Request → “Event / Performance Request Registration”.',
          'Enter personal information under Applicant details.',
          'Enter complete details about the event or performance.',
          'Click “Submit” to save the request.'
        ],
        or: [
          'Citizen Services → Event / Performance Request → “Event / Performance Request Registration” କୁ ଯାଆନ୍ତୁ ।',
          'ଆବେଦକ ବିବରଣୀରେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
          'କାର୍ଯ୍ୟକ୍ରମ/ପରିବେଷଣ ବିଷୟରେ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ଦିଅନ୍ତୁ ।',
          '“Submit” କ୍ଲିକ୍ କରି ସଞ୍ଚୟ କରନ୍ତୁ ।'
        ]
      }
    },
    {
      id: 'procession',
      q: {
        en: 'How to register Procession request?',
        or: 'ଶୋଭାଯାତ୍ରା ଅନୁରୋଧ କିପରି କରିବେ?'
      },
      bullets: {
        en: [
          'Go to Citizen Services → Procession Request → “Procession Request Registration”.',
          'The Procession Request Registration page opens.',
          'Enter personal information under Applicant details.',
          'Enter complete details about the procession.',
          'Click “Submit” to save the request.'
        ],
        or: [
          'Citizen Services → Procession Request → “Procession Request Registration” କୁ ଯାଆନ୍ତୁ ।',
          'ପଞ୍ଜିକରଣ ପୃଷ୍ଠା ଖୋଲିବ ।',
          'ଆବେଦକ ବିବରଣୀରେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
          'ଶୋଭାଯାତ୍ରା ବିଷୟରେ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ଦିଅନ୍ତୁ ।',
          '“Submit” କ୍ଲିକ୍ କରି ସଞ୍ଚୟ କରନ୍ତୁ ।'
        ]
      }
    }
  ];

  function initPortalSathi() {
    var root = document.getElementById('portalSathiBot');
    if (!root) return;

    var panel = document.getElementById('portalChatbotPanel');
    var launcher = document.getElementById('portalChatbotToggle');
    var closeBtn = document.getElementById('portalChatbotClose');
    var thread = document.getElementById('portalChatbotThread');
    var quickWrap = document.getElementById('portalChatbotQuick');
    var input = document.getElementById('portalChatbotInput');
    var sendBtn = document.getElementById('portalChatbotSend');
    var resetBtn = document.getElementById('portalChatbotReset');
    var menuBtn = document.getElementById('portalChatbotMenu');
    var headerOpen = document.getElementById('portalSathiHeaderOpen');

    if (!thread || !quickWrap) return;

    thread.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action="reveal-topics"]');
      if (!btn || !thread.contains(btn)) return;
      e.preventDefault();
      thread.querySelectorAll('.portal-chatbot-msg--invite').forEach(function (n) {
        n.remove();
      });
      showTopicListInQuickArea();
      try {
        quickWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (_err) {
        quickWrap.scrollIntoView(false);
      }
    });

    function isOrMode() {
      return document.documentElement.classList.contains('portal-lang-or');
    }

    function esc(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }

    function renderBullets(bullets) {
      var en = bullets.en || [];
      var or = bullets.or || en;
      var lisEn = en.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      var lisOr = or.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      return (
        '<div class="portal-chatbot-answer">' +
        '<div class="lang-en"><ul>' + lisEn + '</ul></div>' +
        '<div class="lang-or" lang="or"><ul>' + lisOr + '</ul></div>' +
        '</div>'
      );
    }

    function appendUser(text) {
      if (!thread) return;
      var wrap = document.createElement('div');
      wrap.className = 'portal-chatbot-msg portal-chatbot-msg--user';
      wrap.innerHTML = '<div class="portal-chatbot-bubble">' + esc(text) + '</div>';
      thread.appendChild(wrap);
      thread.scrollTop = thread.scrollHeight;
    }

    function appendBot(html) {
      if (!thread) return;
      var wrap = document.createElement('div');
      wrap.className = 'portal-chatbot-msg portal-chatbot-msg--bot';
      wrap.innerHTML = '<div class="portal-chatbot-bubble">' + html + '</div>';
      thread.appendChild(wrap);
      thread.scrollTop = thread.scrollHeight;
    }

    function buildQuickButtons() {
      if (!quickWrap) return;
      quickWrap.innerHTML = '';
      TOPICS.forEach(function (topic) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'portal-chatbot-quick-btn portal-chatbot-quick-btn--compact';
        btn.setAttribute('data-topic', topic.id);
        btn.innerHTML =
          '<span class="lang-en">' + esc(topic.q.en) + '</span>' +
          '<span class="lang-or" lang="or">' + esc(topic.q.or) + '</span>';
        btn.addEventListener('click', function () {
          onTopic(topic);
        });
        quickWrap.appendChild(btn);
      });
    }

    function hideQuickTopics() {
      if (!quickWrap) return;
      quickWrap.innerHTML = '';
      quickWrap.hidden = true;
    }

    function showTopicListInQuickArea() {
      if (!quickWrap) return;
      quickWrap.hidden = false;
      buildQuickButtons();
    }

    /** After an answer: ask first; user taps “View topics” to expand the full list (saves vertical space). */
    function appendFollowUpInvite() {
      if (!thread) return;
      thread.querySelectorAll('.portal-chatbot-msg--invite').forEach(function (n) {
        n.remove();
      });
      hideQuickTopics();
      var wrap = document.createElement('div');
      wrap.className = 'portal-chatbot-msg portal-chatbot-msg--bot portal-chatbot-msg--invite';
      wrap.innerHTML =
        '<div class="portal-chatbot-bubble portal-chatbot-bubble--invite">' +
        '<p class="lang-en portal-chatbot-invite-lead mb-0">Is there anything else you would like help with? Choose another topic from the list, or type your own question.</p>' +
        '<p class="lang-or portal-chatbot-invite-lead mb-0" lang="or">ଆଉ କିଛି ସହାୟତା ଦରକାର କି? ତଳେ ଥିବା ବଟନ୍ ଦବାଇ ବିଷୟ ତାଲିକା ଖୋଲନ୍ତୁ, କିମ୍ବା ନିଜ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ ।</p>' +
        '<button type="button" class="portal-chatbot-reveal-topics-btn" data-action="reveal-topics">' +
        '<span class="lang-en">View topics</span><span class="lang-or" lang="or">ବିଷୟ ଦେଖନ୍ତୁ</span></button>' +
        '</div>';
      thread.appendChild(wrap);
      thread.scrollTop = thread.scrollHeight;
    }

    function onTopic(topic) {
      var qText = isOrMode() ? topic.q.or : topic.q.en;
      appendUser(qText);
      appendBot(renderBullets(topic.bullets));
      appendFollowUpInvite();
      thread.scrollTop = thread.scrollHeight;
    }

    function resetChat() {
      if (!thread || !quickWrap) return;
      thread.innerHTML = '';
      var greet = document.createElement('div');
      greet.className = 'portal-chatbot-greet';
      greet.innerHTML =
        '<p class="mb-1"><strong class="lang-en">Namaskar</strong><strong class="lang-or" lang="or"> ନମସ୍କାର</strong></p>' +
        '<p class="lang-en mb-0">I\'m <strong>SATHI</strong>, your Citizen Portal assistant. Choose a topic below, or type a short question and press send.</p>' +
        '<p class="lang-or mb-0" lang="or">ମୁଁ <strong>SATHI</strong> — ଆପଣଙ୍କ ନାଗରିକ ପୋର୍ଟାଲ୍ ସହାୟିକା । ତଳେ ଥିବା ବିଷୟ ବାଛନ୍ତୁ, କିମ୍ବା ସଂକ୍ଷିପ୍ତ ପ୍ରଶ୍ନ ଲେଖି ପଠାନ୍ତୁ ।</p>';
      thread.appendChild(greet);
      quickWrap.hidden = false;
      buildQuickButtons();
      thread.scrollTop = 0;
      if (input) input.value = '';
    }

    function setOpen(open) {
      root.setAttribute('data-open', open ? 'true' : 'false');
      if (panel) {
        panel.hidden = !open;
      }
      if (launcher) {
        launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      if (open) {
        setTimeout(function () {
          if (input) input.focus();
        }, 80);
      }
    }

    function sendFreeform() {
      if (!input) return;
      var v = input.value.trim();
      if (!v) return;
      appendUser(v);
      appendBot(
        '<p class="lang-en mb-0">For step-by-step guidance on portal services, visit <strong>Citizen Services</strong> on the home page after signing in. For account issues, use <strong>Contact</strong> / help desk on the portal. To browse the topic list again, use <strong>View topics</strong> when it appears.</p>' +
        '<p class="lang-or mb-0" lang="or">ସେବା ନିର୍ଦ୍ଦେଶ ପାଇଁ ଲଗଇନ୍ ପରେ ମୁଖ୍ୟ ପୃଷ୍ଠାର <strong>ନାଗରିକ ସେବା</strong> ଦେଖନ୍ତୁ । ଆକାଉଣ୍ଟ ପାଇଁ <strong>ଯୋଗାଯୋଗ</strong> / ହେଲ୍ପ ଡେସ୍କ ବ୍ୟବହାର କରନ୍ତୁ । ତାଲିକା ପୁନଃ ଦେଖିବା ପାଇଁ ପରେ <strong>ବିଷୟ ଦେଖନ୍ତୁ</strong> ବଟନ୍ ବ୍ୟବହାର କରନ୍ତୁ ।</p>'
      );
      input.value = '';
      appendFollowUpInvite();
      thread.scrollTop = thread.scrollHeight;
    }

    if (launcher) {
      launcher.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      });
    }
    if (headerOpen) {
      headerOpen.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setOpen(false);
      });
    }
    if (sendBtn && input) {
      sendBtn.addEventListener('click', sendFreeform);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendFreeform();
        }
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', resetChat);
    }

    function syncInputPlaceholder() {
      if (!input) return;
      var or = isOrMode();
      input.placeholder = or
        ? (input.getAttribute('data-placeholder-or') || '')
        : (input.getAttribute('data-placeholder-en') || '');
    }
    syncInputPlaceholder();
    document.addEventListener('portalUiLangChanged', syncInputPlaceholder);
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var home = document.querySelector('a[href*="index.html#contact"]');
        if (home) {
          window.location.href = home.getAttribute('href');
          return;
        }
        window.location.href = 'index.html#contact';
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.getAttribute('data-open') === 'true') {
        setOpen(false);
        if (launcher) launcher.focus();
      }
    });

    document.addEventListener('portalUiLangChanged', function () {
      if (quickWrap && !quickWrap.hidden) buildQuickButtons();
    });

    resetChat();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortalSathi);
  } else {
    initPortalSathi();
  }
})();
