import { Outlet, useLocation } from 'react-router-dom';
import { PortalChatbot } from './PortalChatbot';
import { PortalFooter } from './PortalFooter';
import { PortalHeader } from './PortalHeader';
import { CitizenFeedback } from './CitizenFeedback';

export function PortalLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <div className={isLogin ? 'portal-layout portal-layout--login' : 'portal-layout'}>
      <PortalHeader />
      <Outlet />
      {!isLogin && <PortalFooter />}
      <PortalChatbot />
      {!isLogin && <CitizenFeedback />}
      <a
        href="#"
        id="scroll-top"
        className={`scroll-top d-flex align-items-center justify-content-center${isLogin ? ' d-none' : ''}`}
      >
        <i className="bi bi-arrow-up-short" />
      </a>
      <div id="preloader" aria-hidden="true" />
    </div>
  );
}
