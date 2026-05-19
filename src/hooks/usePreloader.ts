import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Remove full-screen preloader after each route paint. */
export function usePreloader() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document.getElementById('preloader')?.remove();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
}
