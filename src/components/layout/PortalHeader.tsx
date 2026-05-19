import { Link, useLocation, useNavigate } from 'react-router-dom';
import { publicAssetUrl } from '@/lib/publicAssetUrl';
import { goToHomeSection } from '@/lib/portalNav';

type NavItem = { hash: string; labelEn: string; labelOr: string };

const NAV: NavItem[] = [
  { hash: '#home', labelEn: 'Home', labelOr: 'ମୁଖ୍ୟ ପୃଷ୍ଠା' },
  { hash: '#about', labelEn: 'About', labelOr: 'ପରିଚୟ' },
  { hash: '#services', labelEn: 'Citizen Services', labelOr: 'ନାଗରିକ ସେବା' },
  { hash: '#gallary', labelEn: 'Gallery', labelOr: 'ଗ୍ୟାଲେରୀ' },
  { hash: '#team', labelEn: "FAQ's", labelOr: 'ପ୍ରଚଳିତ ପ୍ରଶ୍ନ' },
  { hash: '#contact', labelEn: 'Contact', labelOr: 'ଯୋଗାଯୋଗ' },
];

export function PortalHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onNavSection = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    goToHomeSection(navigate, pathname, hash);
  };

  return (
    <header id="header" className="portal-site-header d-flex flex-column align-items-stretch fixed-top scroll-up-sticky">
      <div className="gov-utility-bar">
        <div className="container-fluid container-xl gov-utility-inner d-flex flex-wrap align-items-center justify-content-between">
          <div className="gov-utility-left">
            <span className="gov-utility-title">
              Government of Odisha <span className="gov-header-odia" lang="or"> | ଓଡ଼ିଶା ସରକାର</span>
            </span>
          </div>
          <div className="gov-utility-right d-flex flex-wrap align-items-center justify-content-end gap-2">
            <div className="gov-accessibility-group d-flex align-items-center gap-1" aria-label="Text size controls">
              <button type="button" className="btn-font-size" data-font-step="-1" title="Smaller text">A-</button>
              <button type="button" className="btn-font-size active" data-font-step="0" title="Default text size">A</button>
              <button type="button" className="btn-font-size" data-font-step="1" title="Larger text">A+</button>
            </div>
            <button type="button" className="gov-util-icon" id="portalResetPrefs" title="Reset display settings" aria-label="Reset display settings">
              <i className="bi bi-arrow-counterclockwise" />
            </button>
            <button type="button" className="gov-util-icon" id="portalContrastToggle" title="Toggle contrast" aria-label="Toggle high contrast">
              <i className="bi bi-circle-half" />
            </button>
            <button type="button" className="gov-util-icon portal-sathi-util-trigger" id="portalSathiHeaderOpen" title="SATHI help" aria-label="Open SATHI help assistant">
              <img src={publicAssetUrl('/assets/img/policebot.png')} alt="" className="portal-sathi-util-img" width={22} height={22} decoding="async" />
            </button>
            <a href="#" className="gov-util-icon" title="Sitemap" aria-label="Sitemap">
              <i className="bi bi-diagram-3" />
            </a>
            <Link
              to="/login"
              className={`gov-util-link-login${pathname === '/login' ? ' active' : ''}`}
              aria-current={pathname === '/login' ? 'page' : undefined}
            >
              <i className="bi bi-lock-fill me-1" />
              <span>
                <span className="lang-en">Login</span>
                <span className="lang-or" lang="or">ଲଗଇନ୍</span>
              </span>
            </Link>
            <div className="gov-lang-inline" role="group" aria-label="Display language">
              <button type="button" className="gov-lang-btn gov-lang-active" id="portalLangEn" aria-pressed="true" title="English">English</button>
              <span className="gov-lang-sep" aria-hidden="true">|</span>
              <button type="button" className="gov-lang-btn" id="portalLangOr" lang="or" aria-pressed="false" title="ଓଡ଼ିଆ">ଓଡ଼ିଆ</button>
            </div>
          </div>
        </div>
      </div>

      <div className="gov-brand-strip">
        <div className="container-fluid container-xl gov-brand-inner d-flex align-items-center justify-content-between flex-wrap gap-3 py-3">
          <Link to="/" className="gov-brand-main d-flex align-items-center gap-3 text-decoration-none">
            <img src={publicAssetUrl('/assets/img/Odisha_Police_Logo.png')} alt="" className="gov-brand-logo" data-aos="fade-in" />
            <div className="gov-brand-text text-start">
              <h1 className="gov-brand-title mb-0">Citizen Portal </h1>
              <p className="gov-brand-sub mb-0">Government of Odisha </p>
            </div>
            <img src={publicAssetUrl('/assets/img/odisha-govt-new-seeklogo.png')} className="gov-brand-emblem img-fluid" alt="" />
          </Link>
          <div className="gov-official-slot d-none d-md-flex align-items-center gap-3">
            <div className="gov-official-copy text-md-end">
              <div className="gov-official-name">
                <span className="lang-en">Sri. Mohan Charan Majhi</span>
                <span className="lang-or" lang="or">ଶ୍ରୀ ମୋହନ ଚରଣ ମାଝି</span>
              </div>
              <div className="gov-official-role">
                <span className="lang-en">Chief Minister of Odisha</span>
                <span className="lang-or" lang="or">ମୁଖ୍ୟମନ୍ତ୍ରୀ, ଓଡ଼ିଶା</span>
              </div>
            </div>
            <img src={publicAssetUrl('/assets/img/mohanmajhi.jpg')} className="gov-official-photo rounded-circle object-fit-cover" alt="" />
          </div>
        </div>
      </div>

      <div className="gov-nav-strip">
        <div className="container-fluid container-xl position-relative d-flex align-items-center gov-nav-inner">
          <nav id="navmenu" className="navmenu navmenu-portal flex-grow-1">
            <ul>
              {NAV.map((item) => (
                <li key={item.hash}>
                  <a href={item.hash} onClick={(e) => onNavSection(e, item.hash)}>
                    <span className="align-middle">
                      <span className="lang-en">{item.labelEn}</span>
                      <span className="lang-or" lang="or">{item.labelOr}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="dropdown">
                <a href="#">
                  <span>
                    <span className="lang-en">Useful Links</span>
                    <span className="lang-or" lang="or">ଉପଯୋଗୀ ଲିଙ୍କ୍</span>
                  </span>{' '}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </a>
                <ul>
                  <li>
                    <a href="#">
                      <span className="lang-en">Government of Odisha</span>
                      <span className="lang-or" lang="or">ଓଡ଼ିଶା ସରକାର</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">INTERPOL</a>
                  </li>
                </ul>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
        </div>
      </div>
    </header>
  );
}
