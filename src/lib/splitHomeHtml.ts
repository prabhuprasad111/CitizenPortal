const GALLERY_SECTION_START = '<section id="gallary"';
const GALLERY_SECTION_END = '</section><!-- /Portfolio Section -->';

export function splitHomeAroundGallery(html: string): { before: string; after: string } {
  const start = html.indexOf(GALLERY_SECTION_START);
  const end = html.indexOf(GALLERY_SECTION_END);
  if (start === -1 || end === -1) {
    return { before: html, after: '' };
  }
  const afterStart = end + GALLERY_SECTION_END.length;
  return {
    before: html.slice(0, start),
    after: html.slice(afterStart),
  };
}
