import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollToTop } from '@/components/ScrollToTop';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { PhotoGalleryPage } from '@/pages/PhotoGalleryPage';
import { usePortalAccessibility } from '@/hooks/usePortalAccessibility';
import { usePortalEffects } from '@/hooks/usePortalEffects';
import { usePreloader } from '@/hooks/usePreloader';

function AppRoutes() {
  const location = useLocation();
  usePortalAccessibility(location.pathname);
  usePortalEffects();
  usePreloader();

  return (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<PortalLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="photo-gallery" element={<PhotoGalleryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('portal-index');
    document.body.classList.add('index-page');
    return () => {
      document.documentElement.classList.remove('portal-index');
      document.body.classList.remove('index-page');
    };
  }, []);

  return <AppRoutes />;
}
