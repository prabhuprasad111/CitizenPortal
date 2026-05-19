import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isInPageSectionHref, scrollToElementId } from '@/lib/portalNav';
import AOS from 'aos';
import GLightbox from 'glightbox';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import { initHeroCharts } from '@/lib/portalHeroCharts';
import { initOdishaMap } from '@/lib/portalAboutMap';
type PortalLocationState = { scrollTo?: string };

export function usePortalEffects() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('login-page-body', location.pathname === '/login');
    document.body.classList.toggle('index-page', location.pathname !== '/login');
  }, [location.pathname]);

  useEffect(() => {
    const isHome = location.pathname === '/';
    const isGallery = location.pathname === '/photo-gallery';

    const toggleScrolled = () => {
      const header = document.querySelector('#header');
      if (!header) return;
      if (
        !header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')
      ) {
        return;
      }
      document.body.classList.toggle('scrolled', window.scrollY > 100);
    };

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const mobileNavToggle = () => {
      if (!mobileNavToggleBtn) return;
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    };

    const onNavClick = (e: Event) => {
      if (!document.body.classList.contains('mobile-nav-active')) return;
      const navLink = e.currentTarget as HTMLAnchorElement;
      const parentLi = navLink.closest('li');
      const href = navLink.getAttribute('href') || '';
      if (parentLi?.classList.contains('dropdown') && href === '#') {
        e.preventDefault();
        const submenu = navLink.nextElementSibling;
        if (submenu?.tagName === 'UL') {
          navLink.classList.toggle('active');
          submenu.classList.toggle('dropdown-active');
        }
        return;
      }
      mobileNavToggle();
    };

    const onDropdownToggle = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const toggle = e.currentTarget as HTMLElement;
      const anchor = toggle.parentNode as HTMLElement | null;
      if (!anchor || anchor.tagName !== 'A') return;
      const submenu = anchor.nextElementSibling;
      if (!submenu || submenu.tagName !== 'UL') return;
      anchor.classList.toggle('active');
      submenu.classList.toggle('dropdown-active');
    };

    const scrollTop = document.querySelector('.scroll-top') as HTMLAnchorElement | null;
    const toggleScrollTop = () => {
      if (scrollTop) scrollTop.classList.toggle('active', window.scrollY > 100);
    };
    const onScrollTop = (e: Event) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navmenuScrollspy = () => {
      document.querySelectorAll('.navmenu a').forEach((navmenulink) => {
        const link = navmenulink as HTMLAnchorElement;
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (!section) return;
        const position = window.scrollY + 230;
        const el = section as HTMLElement;
        if (position >= el.offsetTop && position <= el.offsetTop + el.offsetHeight) {
          document.querySelectorAll('.navmenu a.active').forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled);
    mobileNavToggleBtn?.addEventListener('click', mobileNavToggle);
    document.querySelectorAll('#navmenu a').forEach((link) => link.addEventListener('click', onNavClick));
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach((t) =>
      t.addEventListener('click', onDropdownToggle)
    );
    scrollTop?.addEventListener('click', onScrollTop);
    window.addEventListener('scroll', toggleScrollTop);
    window.addEventListener('scroll', navmenuScrollspy);

    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });

    const lightbox = GLightbox({ selector: '.glightbox' });

    const swiperCleanups: (() => void)[] = [];
    document.querySelectorAll('.init-swiper').forEach((swiperElement) => {
      const configEl = swiperElement.querySelector('.swiper-config');
      if (!configEl?.textContent) return;
      const config = JSON.parse(configEl.textContent.trim()) as Record<string, unknown>;
      const swiper = new Swiper(swiperElement as HTMLElement, {
        ...config,
        modules: [Autoplay, Navigation, Pagination],
      });
      swiperCleanups.push(() => swiper.destroy(true, true));
    });

    const clientEl = isHome ? document.querySelector('.client-swiper') : null;
    let clientSwiper: Swiper | null = null;
    if (clientEl) {
      clientSwiper = new Swiper('.client-swiper', {
        modules: [Autoplay],
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        speed: 4000,
        autoplay: { delay: 1, disableOnInteraction: false },
        freeMode: true,
        breakpoints: {
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
      });
      const stop = () => clientSwiper?.autoplay.stop();
      const start = () => clientSwiper?.autoplay.start();
      clientEl.addEventListener('mouseenter', stop);
      clientEl.addEventListener('mouseleave', start);
    }

    const isotopeCleanups: (() => void)[] = [];
    if (isGallery) document.querySelectorAll('.isotope-layout').forEach((isotopeItem) => {
      const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;

      let iso: Isotope | undefined;
      imagesLoaded(container as HTMLElement, () => {
        iso = new Isotope(container as HTMLElement, {
          itemSelector: '.isotope-item',
          layoutMode: layout as Isotope.LayoutModes,
          filter,
          sortBy: sort,
        });
      });

      const filterHandlers: Array<{ el: Element; fn: () => void }> = [];
      isotopeItem.querySelectorAll('.isotope-filters li').forEach((filters) => {
        const fn = () => {
          isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
          filters.classList.add('filter-active');
          iso?.arrange({ filter: filters.getAttribute('data-filter') || '*' });
          AOS.refresh();
        };
        filters.addEventListener('click', fn);
        filterHandlers.push({ el: filters, fn });
      });

      isotopeCleanups.push(() => {
        filterHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
        iso?.destroy();
      });
    });

    const heroCleanup = isHome ? initHeroCharts() : undefined;
    const mapCleanup = isHome ? initOdishaMap() : undefined;

    const scrollTarget = (location.state as PortalLocationState | null)?.scrollTo;
    if (scrollTarget && location.pathname === '/') {
      setTimeout(() => scrollToElementId(scrollTarget), 100);
      navigate({ pathname: location.pathname, search: location.search }, { replace: true, state: null });
    }

    const onDocumentClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!isInPageSectionHref(href)) return;
      if (!document.getElementById(href.slice(1))) return;
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: href.slice(1) } });
        return;
      }
      scrollToElementId(href.slice(1));
    };
    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('scroll', toggleScrolled);
      mobileNavToggleBtn?.removeEventListener('click', mobileNavToggle);
      document.querySelectorAll('#navmenu a').forEach((link) => link.removeEventListener('click', onNavClick));
      document.querySelectorAll('.navmenu .toggle-dropdown').forEach((t) =>
        t.removeEventListener('click', onDropdownToggle)
      );
      scrollTop?.removeEventListener('click', onScrollTop);
      window.removeEventListener('scroll', toggleScrollTop);
      window.removeEventListener('scroll', navmenuScrollspy);
      lightbox.destroy();
      swiperCleanups.forEach((fn) => fn());
      clientSwiper?.destroy(true, true);
      isotopeCleanups.forEach((fn) => fn());
      heroCleanup?.();
      mapCleanup?.();
    };
  }, [location.pathname, location.search, location.state, navigate]);

}
