import { publicAssetUrl } from '@/lib/publicAssetUrl';

export type GalleryFilter = 'filter-awarded' | 'filter-meetings' | 'filter-launch' | 'filter-achievements';

export type GalleryItem = {
  img: string;
  title: string;
  filter: GalleryFilter;
};

/** Slides on the home page (no filters). */
export const HOME_GALLERY_SLIDES: GalleryItem[] = [
  { img: 'pic2.jpg', title: 'Awarded program', filter: 'filter-awarded' },
  { img: 'pic1.jpg', title: 'Awarded ceremony', filter: 'filter-awarded' },
  { img: 'pic%206.jpg', title: 'Event launch', filter: 'filter-launch' },
  { img: 'pic4.jpg', title: 'Security review meeting', filter: 'filter-meetings' },
  { img: 'pic5.jpg', title: 'Patrolling activity', filter: 'filter-meetings' },
  { img: 'pic3.jpg', title: 'Delegation meeting', filter: 'filter-meetings' },
  { img: 'pic11.jpg', title: 'Mobile returning mela', filter: 'filter-achievements' },
  { img: 'pic16.jpg', title: 'Emergency number awareness', filter: 'filter-launch' },
];

/** Full gallery page (with filters). */
export const ALL_GALLERY_ITEMS: GalleryItem[] = [
  ...HOME_GALLERY_SLIDES,
  { img: 'pic8.jpg', title: 'Sahayata app launch', filter: 'filter-launch' },
  { img: 'pic9.jpg', title: "Women's Day service", filter: 'filter-meetings' },
  { img: 'pic13.jpg', title: 'Sports excellence award', filter: 'filter-awarded' },
  { img: 'pic14.jpg', title: 'Devasnana Purnima service', filter: 'filter-achievements' },
  { img: 'pic15.jpg', title: 'Badadanda Sathi volunteers', filter: 'filter-achievements' },
];

export const GALLERY_FILTERS: { key: string; label: string }[] = [
  { key: '*', label: 'All' },
  { key: '.filter-awarded', label: 'Awarded' },
  { key: '.filter-meetings', label: 'Meetings' },
  { key: '.filter-launch', label: 'Launch' },
  { key: '.filter-achievements', label: 'Achievements' },
];

export function galleryImageSrc(img: string) {
  return publicAssetUrl(`/assets/img/portfolio/${img}`);
}
