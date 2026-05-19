import { Link } from 'react-router-dom';
import { PhotoGalleryGrid } from '@/components/sections/PhotoGalleryGrid';
import { publicAssetUrl } from '@/lib/publicAssetUrl';

export function PhotoGalleryPage() {
  return (
    <main className="main">
      <div
        className="page-title dark-background"
        data-aos="fade"
        style={{ backgroundImage: `url(${publicAssetUrl('/assets/img/page-title-bg.webp')})` }}
      >
        <div className="container position-relative">
          <h1>Photo Gallery</h1>
          <p>Browse all photos. Use filters to narrow down.</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="current">Photo Gallery</li>
            </ol>
          </nav>
        </div>
      </div>

      <PhotoGalleryGrid />
    </main>
  );
}
