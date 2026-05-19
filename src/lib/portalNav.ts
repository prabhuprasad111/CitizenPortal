import type { NavigateFunction } from 'react-router-dom';

export function scrollToElementId(id: string, behavior: ScrollBehavior = 'smooth'): void {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (!el) return;
  const scrollMarginTop = parseInt(getComputedStyle(el).scrollMarginTop, 10) || 0;
  window.scrollTo({ top: el.offsetTop - scrollMarginTop, behavior });
}

export function goToHomeSection(
  navigate: NavigateFunction,
  pathname: string,
  sectionHash: string,
): void {
  const id = sectionHash.replace(/^#/, '');
  if (pathname === '/') {
    scrollToElementId(id);
    return;
  }
  navigate('/', { state: { scrollTo: id } });
}

export function isInPageSectionHref(href: string | null): href is string {
  if (!href || !href.startsWith('#')) return false;
  return href !== '#/' && !href.startsWith('#/');
}
