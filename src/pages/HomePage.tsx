import { useMemo } from 'react';
import homeMainHtml from '@/content/home-main.html?raw';
import { PhotoGalleryHomeSection } from '@/components/sections/PhotoGalleryHomeSection';
import { rewriteLegacyHtml } from '@/lib/rewriteLegacyHtml';
import { splitHomeAroundGallery } from '@/lib/splitHomeHtml';

export function HomePage() {
  const { before, after } = useMemo(() => {
    const html = rewriteLegacyHtml(homeMainHtml);
    return splitHomeAroundGallery(html);
  }, []);

  return (
    <main id="home" className="main">
      {before ? <div dangerouslySetInnerHTML={{ __html: before }} /> : null}
      <PhotoGalleryHomeSection />
      {after ? <div dangerouslySetInnerHTML={{ __html: after }} /> : null}
    </main>
  );
}
