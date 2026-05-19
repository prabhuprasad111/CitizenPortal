import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HOME_GALLERY_SLIDES, galleryImageSrc } from '@/data/galleryItems';

export function PhotoGalleryHomeSection() {
  return (
    <section id="gallary" className="photo-gallery section" aria-label="Photo Gallery">
      <div className="container photo-gallery-title-wrap" data-aos="fade-up">
        <div className="section-title photo-gallery-title d-flex align-items-end justify-content-between">
          <div>
            <h2>Media</h2>
            <p>Photo Gallery</p>
          </div>
          <Link className="photo-gallery-viewall" to="/photo-gallery" aria-label="View all photos">
            View all <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="photo-gallery-swiper-wrap position-relative">
          <Swiper
            className="photo-gallery-swiper"
            modules={[Autoplay, Navigation]}
            loop
            speed={600}
            spaceBetween={16}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            slidesPerView={1.25}
            breakpoints={{
              576: { slidesPerView: 2.1 },
              768: { slidesPerView: 3.1 },
              992: { slidesPerView: 4.2 },
            }}
            navigation={{
              nextEl: '.photo-gallery-next',
              prevEl: '.photo-gallery-prev',
            }}
            aria-label="Photo Gallery slider"
          >
            {HOME_GALLERY_SLIDES.map((slide) => (
              <SwiperSlide key={slide.img}>
                <div className="photo-gallery-card">
                  <a href={galleryImageSrc(slide.img)} className="glightbox" data-gallery="photo-gallery">
                    <img src={galleryImageSrc(slide.img)} alt={slide.title} />
                  </a>
                  <div className="photo-gallery-caption">{slide.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="photo-gallery-controls" aria-hidden="true">
            <div className="swiper-button-prev photo-gallery-prev" />
            <div className="swiper-button-next photo-gallery-next" />
          </div>
        </div>
      </div>
    </section>
  );
}
