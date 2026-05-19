import { useCallback, useEffect } from 'react';

const STORAGE_FONT = 'portalFontStep';
const STORAGE_HC = 'portalHighContrast';
const STORAGE_LANG = 'portalUiLang';

function syncPortalFormPlaceholders(orMode: boolean) {
  document.querySelectorAll('.portal-i18n-input').forEach((el) => {
    const input = el as HTMLInputElement;
    const ph = orMode ? input.getAttribute('data-ph-or') || '' : input.getAttribute('data-ph-en') || '';
    input.placeholder = ph;
  });
  document.querySelectorAll('.portal-newsletter-submit').forEach((el) => {
    const btn = el as HTMLInputElement;
    const v = orMode
      ? btn.getAttribute('data-label-or') || 'Subscribe'
      : btn.getAttribute('data-label-en') || 'Subscribe';
    btn.value = v;
  });
}

export function usePortalAccessibility(pathname: string) {
  const applyPortalUiLang = useCallback((orMode: boolean) => {
    document.documentElement.lang = orMode ? 'or' : 'en';
    document.documentElement.classList.toggle('portal-lang-or', orMode);

    const elEn = document.getElementById('portalLangEn');
    const elOr = document.getElementById('portalLangOr');
    if (elEn) {
      elEn.classList.toggle('gov-lang-active', !orMode);
      elEn.setAttribute('aria-pressed', orMode ? 'false' : 'true');
    }
    if (elOr) {
      elOr.classList.toggle('gov-lang-active', orMode);
      elOr.setAttribute('aria-pressed', orMode ? 'true' : 'false');
    }

    try {
      localStorage.setItem(STORAGE_LANG, orMode ? 'or' : 'en');
    } catch {
      /* ignore */
    }

    if (pathname === '/login') {
      document.title = orMode ? 'ଲଗଇନ୍ · ଓଡ଼ିଶା ନାଗରିକ ପୋର୍ଟାଲ୍' : 'Login · Citizen Portal | Odisha Police';
    } else {
      document.title = orMode ? 'ନାଗରିକ ପୋର୍ଟାଲ୍ | ଓଡ଼ିଶା ପୋଲିସ୍' : 'Citizen Portal || Odisha Police';
    }
    syncPortalFormPlaceholders(orMode);

    document.dispatchEvent(new CustomEvent('portalUiLangChanged', { detail: { orMode } }));
  }, [pathname]);

  const applyPortalFont = useCallback((step: string | number) => {
    let s = typeof step === 'number' ? step : parseInt(step, 10);
    if (Number.isNaN(s)) s = 0;
    s = Math.max(-1, Math.min(1, s));
    if (s === 0) document.documentElement.removeAttribute('data-font-step');
    else document.documentElement.setAttribute('data-font-step', String(s));
    document.querySelectorAll('.btn-font-size').forEach((btn) => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-font-step') || '0', 10) === s);
    });
    try {
      localStorage.setItem(STORAGE_FONT, String(s));
    } catch {
      /* ignore */
    }
  }, []);

  const applyPortalContrast = useCallback((on: boolean) => {
    document.documentElement.classList.toggle('portal-high-contrast', on);
    try {
      localStorage.setItem(STORAGE_HC, on ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onFontClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.btn-font-size');
      if (!btn) return;
      applyPortalFont(btn.getAttribute('data-font-step') || '0');
    };

    const onContrast = () => {
      applyPortalContrast(!document.documentElement.classList.contains('portal-high-contrast'));
    };

    const onReset = () => {
      applyPortalFont(0);
      applyPortalContrast(false);
      applyPortalUiLang(false);
      try {
        localStorage.removeItem(STORAGE_FONT);
        localStorage.removeItem(STORAGE_HC);
        localStorage.removeItem(STORAGE_LANG);
      } catch {
        /* ignore */
      }
    };

    const onLangEn = (e: Event) => {
      e.preventDefault();
      applyPortalUiLang(false);
    };
    const onLangOr = (e: Event) => {
      e.preventDefault();
      applyPortalUiLang(true);
    };

    document.querySelectorAll('.btn-font-size').forEach((btn) => btn.addEventListener('click', onFontClick));
    document.getElementById('portalContrastToggle')?.addEventListener('click', onContrast);
    document.getElementById('portalResetPrefs')?.addEventListener('click', onReset);
    document.getElementById('portalLangEn')?.addEventListener('click', onLangEn);
    document.getElementById('portalLangOr')?.addEventListener('click', onLangOr);

    try {
      applyPortalUiLang(localStorage.getItem(STORAGE_LANG) === 'or');
      const fs = localStorage.getItem(STORAGE_FONT);
      if (fs !== null && fs !== '') applyPortalFont(fs);
      if (localStorage.getItem(STORAGE_HC) === '1') applyPortalContrast(true);
    } catch {
      applyPortalUiLang(false);
    }

    return () => {
      document.querySelectorAll('.btn-font-size').forEach((btn) => btn.removeEventListener('click', onFontClick));
      document.getElementById('portalContrastToggle')?.removeEventListener('click', onContrast);
      document.getElementById('portalResetPrefs')?.removeEventListener('click', onReset);
      document.getElementById('portalLangEn')?.removeEventListener('click', onLangEn);
      document.getElementById('portalLangOr')?.removeEventListener('click', onLangOr);
    };
  }, [applyPortalContrast, applyPortalFont, applyPortalUiLang]);
}
