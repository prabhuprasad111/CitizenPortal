import type { ServiceStatusResult } from '@/api/types/serviceStatus';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function imageDataUrl(fileBytes: string): string {
  const trimmed = fileBytes.trim();
  if (trimmed.startsWith('data:')) {
    return trimmed;
  }
  if (trimmed.startsWith('/9j/')) {
    return `data:image/jpeg;base64,${trimmed}`;
  }
  if (trimmed.startsWith('iVBORw0KGgo')) {
    return `data:image/png;base64,${trimmed}`;
  }
  return `data:image/jpeg;base64,${trimmed}`;
}

function row(labelEn: string, labelOr: string, value: string | undefined): string {
  if (!value?.trim()) {
    return '';
  }
  return (
    `<div class="portal-service-status-row">` +
    `<span class="portal-service-status-label"><span class="lang-en">${labelEn}</span><span class="lang-or" lang="or">${labelOr}</span></span>` +
    `<span class="portal-service-status-value">${esc(value.trim())}</span>` +
    `</div>`
  );
}

/** HTML for SAKHI chat bubble from a successful service-status API result. */
export function formatServiceStatusReply(result: ServiceStatusResult): string {
  if (!result.success) {
    const msg = result.message?.trim() || 'No record found.';
    return (
      `<p class="lang-en mb-0">${esc(msg)}</p>` +
      `<p class="lang-or mb-0" lang="or">${esc(msg)}</p>`
    );
  }

  const rows = [
    row('Applicant', 'ଆବେଦକ', result.APPLICANT_NAME),
    row('Date', 'ତାରିଖ', result.SERVICE_DATE),
    row('Status', 'ସ୍ଥିତି', result.STATUS),
    row('Relative', 'ଆତ୍ମୀୟ', result.RELATIVE_NAME),
    row('Present address', 'ବର୍ତ୍ତମାନ ଠିକଣା', result.PresentAddress),
    row('Permanent address', 'ସ୍ଥାୟୀ ଠିକଣା', result.PermanandeAddress),
  ].join('');

  const photo = result.FileBytes?.trim()
    ? `<div class="portal-service-status-photo-wrap mt-2">` +
      `<img class="portal-service-status-photo img-fluid rounded" alt="" ` +
      `src="${imageDataUrl(result.FileBytes)}" loading="lazy" decoding="async" />` +
      `</div>`
    : '';

  const lead = result.message?.trim()
    ? `<p class="portal-service-status-lead mb-2"><span class="lang-en">${esc(result.message)}</span><span class="lang-or" lang="or">${esc(result.message)}</span></p>`
    : '';

  return `<div class="portal-service-status-result">${lead}${rows}${photo}</div>`;
}
