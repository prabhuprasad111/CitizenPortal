import { Outlet, useLocation } from 'react-router-dom';
import { PortalChatbot } from './PortalChatbot';
import { PortalFooter } from './PortalFooter';
import { PortalHeader } from './PortalHeader';

export function PortalLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <>
      <PortalHeader />
      <Outlet />
      {!isLogin && <PortalFooter />}
      <PortalChatbot />
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
      <div id="preloader" aria-hidden="true" />
    </>
  );
}
