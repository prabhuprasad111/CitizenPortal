import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import loginMainHtml from '@/content/login-main.html?raw';
import { rewriteLegacyHtml } from '@/lib/rewriteLegacyHtml';
import { publicAssetUrl } from '@/lib/publicAssetUrl';

export function LoginPage() {
  const navigate = useNavigate();
  const html = useMemo(() => rewriteLegacyHtml(loginMainHtml), []);

  useEffect(() => {
    document.body.classList.add('login-page-body', 'index-page');
    window.scrollTo(0, 0);
    return () => document.body.classList.remove('login-page-body', 'index-page');
  }, []);

  useEffect(() => {
    const signinTab = document.getElementById('loginTabSignin');
    const registerTab = document.getElementById('loginTabRegister');
    const signinPanel = document.getElementById('loginPanelSignin');
    const registerPanel = document.getElementById('loginPanelRegister');

    const shell = document.getElementById('loginCardShell');

    const showPanel = (panel: 'signin' | 'register') => {
      const isSignin = panel === 'signin';
      shell?.classList.toggle('login-card-shell--register', !isSignin);
      signinTab?.classList.toggle('login-auth-tab--active', isSignin);
      registerTab?.classList.toggle('login-auth-tab--active', !isSignin);
      signinTab?.setAttribute('aria-selected', isSignin ? 'true' : 'false');
      registerTab?.setAttribute('aria-selected', !isSignin ? 'true' : 'false');
      if (signinPanel) signinPanel.hidden = !isSignin;
      if (registerPanel) registerPanel.hidden = isSignin;
    };

    const onSignin = () => showPanel('signin');
    const onRegister = () => showPanel('register');
    signinTab?.addEventListener('click', onSignin);
    registerTab?.addEventListener('click', onRegister);
    document.getElementById('loginRegClose')?.addEventListener('click', onSignin);

    const togglePw = (btnId: string, inputId: string) => {
      const btn = document.getElementById(btnId);
      const input = document.getElementById(inputId) as HTMLInputElement | null;
      if (!btn || !input) return;
      btn.addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.setAttribute('aria-pressed', show ? 'true' : 'false');
        const icon = btn.querySelector('i');
        icon?.classList.toggle('bi-eye-fill', !show);
        icon?.classList.toggle('bi-eye-slash-fill', show);
      });
    };
    togglePw('togglePassword', 'password');
    togglePw('toggleRegPassword', 'regPassword');

    const backHome = document.getElementById('loginBackHome');
    const onBackHome = (e: Event) => {
      e.preventDefault();
      navigate('/');
    };
    backHome?.addEventListener('click', onBackHome);

    return () => {
      signinTab?.removeEventListener('click', onSignin);
      registerTab?.removeEventListener('click', onRegister);
      backHome?.removeEventListener('click', onBackHome);
    };
  }, [html, navigate]);

  return (
    <>
      <main className="login-main-centre" dangerouslySetInnerHTML={{ __html: html }} />
      <footer className="login-saura-footer">
        <img
          className="login-bottom-art"
          src={publicAssetUrl('/assets/img/bottom1.png')}
          alt="Odisha Saura folk art border"
          width={2400}
          height={400}
          decoding="async"
          loading="lazy"
        />
      </footer>
    </>
  );
}
