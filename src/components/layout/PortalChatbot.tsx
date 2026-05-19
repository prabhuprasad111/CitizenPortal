import { useEffect } from 'react';
import { initPortalChatbot, portalChatbotSubmit } from '@/lib/portalChatbot';
import { publicAssetUrl } from '@/lib/publicAssetUrl';

const SAKHI_AVATAR = publicAssetUrl('/assets/img/sakhi-avatar.png');
const SAKHI_AVATAR_FALLBACK = publicAssetUrl('/assets/img/policebot.png');

export function PortalChatbot() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const id = requestAnimationFrame(() => {
      cleanup = initPortalChatbot();
    });
    return () => {
      cancelAnimationFrame(id);
      cleanup?.();
    };
  }, []);

  return (
    <div id="portalSathiBot" className="portal-chatbot" data-open="false" lang="en">
      <button
        type="button"
        className="portal-chatbot-launcher"
        id="portalChatbotToggle"
        aria-expanded="false"
        aria-controls="portalChatbotPanel"
        title="Open SAKHI help"
      >
        <img
          src={SAKHI_AVATAR}
          alt=""
          width={56}
          height={56}
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.includes('policebot')) return;
            img.src = SAKHI_AVATAR_FALLBACK;
          }}
        />
        <span className="visually-hidden">
          <span className="lang-en">Open SAKHI help assistant</span>
          <span className="lang-or" lang="or">
            SAKHI ସହାୟତା ଖୋଲନ୍ତୁ
          </span>
        </span>
      </button>
      <div
        className="portal-chatbot-panel"
        id="portalChatbotPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portalChatbotTitle"
        hidden
      >
        <div className="portal-chatbot-header">
          <div className="portal-chatbot-header-top">
            <button type="button" className="portal-chatbot-icon-btn" id="portalChatbotMenu" title="Contact / help">
              <i className="bi bi-three-dots-vertical" aria-hidden="true" />
            </button>
            <button type="button" className="portal-chatbot-icon-btn" id="portalChatbotClose" title="Close" aria-label="Close chat">
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>
          <div className="portal-chatbot-avatar-wrap">
            <img
              src={SAKHI_AVATAR}
              className="portal-chatbot-avatar"
              width={72}
              height={72}
              alt=""
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.includes('policebot')) return;
                img.src = SAKHI_AVATAR_FALLBACK;
              }}
            />
          </div>
          <h2 className="portal-chatbot-title" id="portalChatbotTitle">
            SAKHI
          </h2>
          <p className="portal-chatbot-sub">
            <span className="lang-en">Citizen Portal assistant</span>
            <span className="lang-or" lang="or">
              ନାଗରିକ ପୋର୍ଟାଲ୍ ସହାୟିକା
            </span>
          </p>
        </div>
        <div className="portal-chatbot-body">
          <div className="portal-chatbot-thread" id="portalChatbotThread" aria-live="polite" />
          <div className="portal-chatbot-quick" id="portalChatbotQuick" />
        </div>
        <div className="portal-chatbot-input-row">
          <label className="visually-hidden" htmlFor="portalChatbotInput">
            <span className="lang-en">Message SAKHI</span>
            <span className="lang-or" lang="or">
              SAKHI କୁ ଲେଖନ୍ତୁ
            </span>
          </label>
          <input
            type="text"
            id="portalChatbotInput"
            className="portal-chatbot-input"
            maxLength={500}
            data-placeholder-en="Search or start asking anything to SAKHI…"
            data-placeholder-or="SAKHI କୁ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ…"
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                portalChatbotSubmit();
              }
            }}
          />
          <button
            type="button"
            className="portal-chatbot-send"
            id="portalChatbotSend"
            aria-label="Send message"
            onClick={(e) => {
              e.preventDefault();
              portalChatbotSubmit();
            }}
          >
            <i className="bi bi-send-fill" aria-hidden="true" />
          </button>
        </div>
        <div className="portal-chatbot-footer-meta">
          <p>
            © <span className="lang-en">2026 Citizen Portal · Odisha Police</span>
            <span className="lang-or" lang="or">
              © 2026 ନାଗରିକ ପୋର୍ଟାଲ୍ · ଓଡ଼ିଶା ପୋଲିସ୍
            </span>
          </p>
          <button type="button" className="portal-chatbot-reset" id="portalChatbotReset">
            <span className="lang-en">Reset chat</span>
            <span className="lang-or" lang="or">
              ଚାଟ୍ ପୁନଃସେଟ୍
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
