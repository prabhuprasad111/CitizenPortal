/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    if (!mobileNavToggleBtn) return;
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Mobile: close menu when following a real link; keep it open for dropdown parents (href="#")
   * so Useful Links / nested items can expand. Desktop: no-op here (dropdowns use hover).
   */
  document.querySelectorAll('#navmenu a').forEach(function (navLink) {
    navLink.addEventListener('click', function (e) {
      if (!document.querySelector('.mobile-nav-active')) return;
      var parentLi = navLink.closest('li');
      var href = navLink.getAttribute('href') || '';
      if (parentLi && parentLi.classList.contains('dropdown') && href === '#') {
        e.preventDefault();
        var submenu = navLink.nextElementSibling;
        if (submenu && submenu.tagName === 'UL') {
          navLink.classList.toggle('active');
          submenu.classList.toggle('dropdown-active');
        }
        return;
      }
      mobileNavToogle();
    });
  });

  /**
   * Chevron toggles submenu; stopPropagation so the #navmenu a handler does not close the drawer / double-toggle.
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var anchor = this.parentNode;
      if (!anchor || anchor.tagName !== 'A') return;
      var submenu = anchor.nextElementSibling;
      if (!submenu || submenu.tagName !== 'UL') return;
      anchor.classList.toggle('active');
      submenu.classList.toggle('dropdown-active');
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /** Show homepage preloader when navigating to login (parity with loader on login “back”) */
  function isLoginDestination(href) {
    try {
      const resolved = new URL(href, window.location.href);
      if (resolved.origin !== window.location.origin) return false;
      var path = resolved.pathname.toLowerCase();
      return path.endsWith('/login.html');
    } catch (_) {
      return false;
    }
  }
  document.querySelectorAll('a[href]').forEach((loginLink) => {
    loginLink.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = loginLink.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      if (!isLoginDestination(href)) return;
      if (document.getElementById('preloader')) return;
      const el = document.createElement('div');
      el.id = 'preloader';
      el.setAttribute('aria-busy', 'true');
      document.body.insertBefore(el, document.body.firstChild);
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined' && document.querySelector('.purecounter')) {
    new PureCounter();
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 230;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Client Swiper
   */
  var clientSwiperEl = document.querySelector('.client-swiper');
  if (clientSwiperEl && typeof Swiper !== 'undefined') {
    var clientSwiper = new Swiper('.client-swiper', {
      slidesPerView: 5,
      spaceBetween: 10,
      loop: true,
      speed: 4000, // Smooth continuous speed
      autoplay: {
        delay: 1, // Very low delay for continuous movement
        disableOnInteraction: false,
      },
      freeMode: true, // Enable free mode for seamless movement
      freeModeMomentum: false, // Disable momentum for constant speed
      breakpoints: {
        320: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    });

    clientSwiperEl.addEventListener('mouseenter', function () {
      clientSwiper.autoplay.stop();
    });
    clientSwiperEl.addEventListener('mouseleave', function () {
      clientSwiper.autoplay.start();
    });
  }

  /**
   * Citizen portal toolbar: optional font scaling, contrast toggle, persisted in localStorage
   */
  (function portalAccessibilityPrefs() {
    const STORAGE_FONT = 'portalFontStep';
    const STORAGE_HC = 'portalHighContrast';
    const STORAGE_LANG = 'portalUiLang';

    function syncPortalFormPlaceholders(orMode) {
      document.querySelectorAll('.portal-i18n-input').forEach(function (el) {
        var ph = orMode ? (el.getAttribute('data-ph-or') || '') : (el.getAttribute('data-ph-en') || '');
        el.placeholder = ph;
      });
      document.querySelectorAll('.portal-newsletter-submit').forEach(function (btn) {
        var v = orMode
          ? (btn.getAttribute('data-label-or') || 'Subscribe')
          : (btn.getAttribute('data-label-en') || 'Subscribe');
        btn.value = v;
      });
    }

    function applyPortalUiLang(orMode) {
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
      } catch (_e) { /* ignore */ }

      if (document.documentElement.classList.contains('portal-index')) {
        if (document.body.classList.contains('login-page-body')) {
          document.title = orMode
            ? 'ଲଗଇନ୍ · ଓଡ଼ିଶା ନାଗରିକ ପୋର୍ଟାଲ୍'
            : 'Login · Citizen Portal | Odisha Police';
        } else {
          document.title = orMode
            ? 'ନାଗରିକ ପୋର୍ଟାଲ୍ | ଓଡ଼ିଶା ପୋଲିସ୍'
            : 'Citizen Portal || Odisha Police';
        }
        syncPortalFormPlaceholders(orMode);
      }
      try {
        document.dispatchEvent(new CustomEvent('portalUiLangChanged', { detail: { orMode: orMode } }));
      } catch (_e) { /* ignore */ }
    }

    function applyPortalFont(step) {
      let s = parseInt(step, 10);
      if (Number.isNaN(s)) s = 0;
      s = Math.max(-1, Math.min(1, s));
      if (s === 0) document.documentElement.removeAttribute('data-font-step');
      else document.documentElement.setAttribute('data-font-step', String(s));
      document.querySelectorAll('.btn-font-size').forEach(function (btn) {
        btn.classList.toggle('active',
          parseInt(btn.getAttribute('data-font-step'), 10) === s);
      });
      try {
        localStorage.setItem(STORAGE_FONT, String(s));
      } catch (_e) { /* ignore */ }
    }

    function applyPortalContrast(on) {
      document.documentElement.classList.toggle('portal-high-contrast', on);
      try {
        localStorage.setItem(STORAGE_HC, on ? '1' : '0');
      } catch (_e) { /* ignore */ }
    }

    document.querySelectorAll('.btn-font-size').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyPortalFont(btn.getAttribute('data-font-step'));
      });
    });

    const ct = document.getElementById('portalContrastToggle');
    if (ct) {
      ct.addEventListener('click', function () {
        applyPortalContrast(!document.documentElement.classList.contains('portal-high-contrast'));
      });
    }

    const resetBtn = document.getElementById('portalResetPrefs');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        applyPortalFont(0);
        applyPortalContrast(false);
        applyPortalUiLang(false);
        try {
          localStorage.removeItem(STORAGE_FONT);
          localStorage.removeItem(STORAGE_HC);
          localStorage.removeItem(STORAGE_LANG);
        } catch (_e) { /* ignore */ }
      });
    }

    const langEn = document.getElementById('portalLangEn');
    const langOr = document.getElementById('portalLangOr');
    if (langEn && langOr) {
      langEn.addEventListener('click', function (e) {
        e.preventDefault();
        applyPortalUiLang(false);
      });
      langOr.addEventListener('click', function (e) {
        e.preventDefault();
        applyPortalUiLang(true);
      });
      try {
        applyPortalUiLang(localStorage.getItem(STORAGE_LANG) === 'or');
      } catch (_e) {
        applyPortalUiLang(false);
      }
    }

    try {
      var fs = localStorage.getItem(STORAGE_FONT);
      if (fs !== null && fs !== '') applyPortalFont(fs);
      if (localStorage.getItem(STORAGE_HC) === '1') applyPortalContrast(true);
    } catch (_e) { /* ignore */ }
  })();

})();


