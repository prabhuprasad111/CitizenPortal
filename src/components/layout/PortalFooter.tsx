import { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { publicAssetUrl } from '@/lib/publicAssetUrl';
import { goToHomeSection } from '@/lib/portalNav';

export function PortalFooter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onSectionLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    goToHomeSection(navigate, pathname, hash);
  };

  return (
    <footer
      id="footer"
      className="footer dark-background"
      style={{ backgroundImage: `url(${publicAssetUrl('/assets/img/footerbg.png')})` }}
    >
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about" data-aos="fade-up" data-aos-delay="100">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">
                <span className="lang-en">Citizen Portal</span>
                <span className="lang-or" lang="or">
                  ନାଗରିକ ପୋର୍ଟାଲ୍
                </span>
              </span>
            </Link>
            <div className="footer-contact pt-3">
              <p>
                <span className="lang-en">State Crime Records Bureau</span>
                <span className="lang-or" lang="or">
                  ରାଜ୍ୟ ଅପରାଧ ରେକର୍ଡ ବ୍ୟୁରୋ
                </span>
              </p>
              <p>
                <span className="lang-en">Rasulgarh, Bhubaneswar</span>
                <span className="lang-or" lang="or">
                  ରାସୁଲଗଡ଼, ଭୁବନେଶ୍ୱର
                </span>
              </p>
              <p>
                <span className="lang-en">Odisha-751010, India</span>
                <span className="lang-or" lang="or">
                  ଓଡ଼ିଶା-୭୫୧୦୧୦, ଭାରତ
                </span>
              </p>
              <p className="mt-3">
                <strong>
                  <span className="lang-en">Help desk:</span>
                  <span className="lang-or" lang="or">
                    ସହାୟତା ଡେସ୍କ:
                  </span>
                </strong>{' '}
                <span>0674 2973888</span>
              </p>
              <p className="mt-3">
                <strong>
                  <span className="lang-en">Fax:</span>
                  <span className="lang-or" lang="or">
                    ଫ୍ୟାକ୍ସ:
                  </span>
                </strong>{' '}
                <span>(91-674) 258723</span>
              </p>
              <p>
                <strong>
                  <span className="lang-en">Email:</span>
                  <span className="lang-or" lang="or">
                    ଇମେଲ୍:
                  </span>
                </strong>{' '}
                <span>dcrb.odpol@nic.in</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <i className="bi bi-twitter-x" aria-hidden="true" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook" aria-hidden="true" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" aria-hidden="true" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links" data-aos="fade-up" data-aos-delay="200">
            <h4>
              <span className="lang-en">Useful Links</span>
              <span className="lang-or" lang="or">
                ଉପଯୋଗୀ ଲିଙ୍କ୍
              </span>
            </h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <Link to="/">
                  <span className="lang-en">Home</span>
                  <span className="lang-or" lang="or">
                    ମୁଖ୍ୟ ପୃଷ୍ଠା
                  </span>
                </Link>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#about" onClick={(e) => onSectionLink(e, '#about')}>
                  <span className="lang-en">About us</span>
                  <span className="lang-or" lang="or">
                    ଆମ ବିଷୟରେ
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#services-2" onClick={(e) => onSectionLink(e, '#services-2')}>
                  <span className="lang-en">Services</span>
                  <span className="lang-or" lang="or">
                    ସେବା
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#contact" onClick={(e) => onSectionLink(e, '#contact')}>
                  <span className="lang-en">Terms of service</span>
                  <span className="lang-or" lang="or">
                    ସେବା ସର୍ତ୍ତାବଳୀ
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#contact" onClick={(e) => onSectionLink(e, '#contact')}>
                  <span className="lang-en">Privacy policy</span>
                  <span className="lang-or" lang="or">
                    ଗୋପନୀୟତା ନୀତି
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links" data-aos="fade-up" data-aos-delay="300">
            <h4>
              <span className="lang-en">Our Services</span>
              <span className="lang-or" lang="or">
                ଆମ ସେବା
              </span>
            </h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#services" onClick={(e) => onSectionLink(e, '#services')}>
                  <span className="lang-en">Virtual Police Station</span>
                  <span className="lang-or" lang="or">
                    ଭର୍ଚୁଆଲ୍ ଥାନା
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#services" onClick={(e) => onSectionLink(e, '#services')}>
                  <span className="lang-en">Lost property</span>
                  <span className="lang-or" lang="or">
                    ହଜିଲା ସମ୍ପତ୍ତି
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#services" onClick={(e) => onSectionLink(e, '#services')}>
                  <span className="lang-en">Character certificate</span>
                  <span className="lang-or" lang="or">
                    ଚରିତ୍ର ପ୍ରମାଣପତ୍ର
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#services" onClick={(e) => onSectionLink(e, '#services')}>
                  <span className="lang-en">e-FIR</span>
                  <span className="lang-or" lang="or">
                    ଇ-ଏଫ୍‌ଆଇଆର୍
                  </span>
                </a>
              </li>
              <li>
                <i className="bi bi-chevron-right" aria-hidden="true" />
                <a href="#services" onClick={(e) => onSectionLink(e, '#services')}>
                  <span className="lang-en">Citizen tips</span>
                  <span className="lang-or" lang="or">
                    ନାଗରିକ ଟିପ୍ସ
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter" data-aos="fade-up" data-aos-delay="400">
            <h4>
              <span className="lang-en">Our newsletter</span>
              <span className="lang-or" lang="or">
                ଆମ ନ୍ୟୁଜ୍‌ଲେଟର୍
              </span>
            </h4>
            <p>
              <span className="lang-en">
                Subscribe to our newsletter and receive the latest news about our products and services!
              </span>
              <span className="lang-or" lang="or">
                ନ୍ୟୁଜ୍‌ଲେଟର୍ ସବସ୍କ୍ରାଇବ କରି ନବୀନତମ ସୂଚନା ପାଆନ୍ତୁ ।
              </span>
            </p>
            <form action="#" method="post" className="php-email-form" onSubmit={onNewsletterSubmit}>
              <div className="newsletter-form">
                <input
                  type="email"
                  name="email"
                  className="portal-i18n-input"
                  data-ph-en="Your email"
                  data-ph-or="ଆପଣଙ୍କ ଇମେଲ୍"
                  placeholder="Your email"
                  required
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="portal-newsletter-submit"
                  data-label-en="Subscribe"
                  data-label-or="ସବସ୍କ୍ରାଇବ"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          ©{' '}
          <span>
            <span className="lang-en">Copyright</span>
            <span className="lang-or" lang="or">
              କପିରାଇଟ୍
            </span>
          </span>{' '}
          <strong className="px-1 sitename">
            <a href="http://cctns.op.gov.in/CCTNSWeb/Login.aspx" target="_blank" rel="noopener noreferrer">
              SCRB
            </a>
          </strong>{' '}
          <span>
            <span className="lang-en">All rights reserved</span>
            <span className="lang-or" lang="or">
              ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ
            </span>
          </span>
        </p>
        <div className="credits">
          <span className="lang-en">Design &amp; developed by</span>
          <span className="lang-or" lang="or">
            ଡିଜାଇନ୍ ଓ ବିକାଶ
          </span>{' '}
          <a href="https://kpmg.com/in/en.html" target="_blank" rel="noopener noreferrer">
            KPMG
          </a>
        </div>
      </div>

      <div className="rotating-image-wrapper" aria-hidden="true">
        <div className="footer-konark-rotator">
          <img
            src={publicAssetUrl('/assets/img/event-round.png')}
            alt=""
            className="rotating-image"
            width={800}
            height={800}
            decoding="async"
          />
        </div>
      </div>
    </footer>
  );
}
