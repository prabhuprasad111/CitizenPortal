import { ALL_GALLERY_ITEMS, GALLERY_FILTERS, galleryImageSrc } from '@/data/galleryItems';

export function PhotoGalleryGrid() {
  return (
    <section id="photo-gallery-all" className="portfolio section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Media</h2>
        <p>All Photos</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {GALLERY_FILTERS.map((f, i) => (
              <li key={f.key} data-filter={f.key} className={i === 0 ? 'filter-active' : undefined}>
                {f.label}
              </li>
            ))}
          </ul>

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            {ALL_GALLERY_ITEMS.map((item) => (
              <div
                key={`${item.img}-${item.title}`}
                className={`col-lg-4 col-md-6 portfolio-item isotope-item ${item.filter}`}
              >
                <div className="portfolio-content h-100">
                  <img src={galleryImageSrc(item.img)} className="img-fluid" alt={item.title} />
                  <div className="portfolio-info">
                    <h4>{item.title}</h4>
                    <a
                      href={galleryImageSrc(item.img)}
                      title={item.title}
                      data-gallery="photo-gallery-all"
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
