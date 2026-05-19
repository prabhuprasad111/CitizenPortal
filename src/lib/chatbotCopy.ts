/** Bilingual copy for SAKHI chatbot flows (EN + Odia). */

export const SERVICE_STATUS_QUICK = {
  en: 'Check Service Request Status',
  or: 'ସେବା ଅନୁରୋଧ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ',
} as const;

/** Short label on the quick-action chip (reference pill layout). */
export const SERVICE_STATUS_CHIP = {
  en: 'Service status',
  or: 'ସେବା ସ୍ଥିତି',
} as const;

export const ASK_REQUEST_NUMBER = {
  en: 'Please enter your Service Request Number.',
  or: 'ଦୟାକରି ଆପଣଙ୍କ ସେବା ଅନୁରୋଧ ନମ୍ବର ଲେଖନ୍ତୁ ।',
} as const;

export const ASK_SERVICE_TYPE = {
  en: 'Please select your service type:',
  or: 'ଦୟାକରି ଆପଣଙ୍କ ସେବା ପ୍ରକାର ବାଛନ୍ତୁ:',
} as const;

export const PICK_SERVICE_TYPE = {
  en: 'Please select a service type using the buttons below.',
  or: 'ଦୟାକରି ତଳେ ଥିବା ବଟନ୍ ଦ୍ୱାରା ସେବା ପ୍ରକାର ବାଛନ୍ତୁ ।',
} as const;

export const CHECKING_STATUS = {
  en: 'Checking status…',
  or: 'ସ୍ଥିତି ଯାଞ୍ଚ କରାଯାଉଛି…',
} as const;

export const STATUS_NOT_FOUND = {
  en: 'No record found.',
  or: 'କୌଣସି ରେକର୍ଡ ମିଳିଲା ନାହିଁ ।',
} as const;

export const STATUS_ERROR = {
  en: 'Unable to fetch status. Please try again later.',
  or: 'ସ୍ଥିତି ଆଣିହେବ ନାହିଁ । ଦୟାକରି ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ ।',
} as const;

export const AI_ERROR = {
  en: 'Sorry, I could not reach the assistant right now. Please try again later.',
  or: 'ଦୁଃଖିତ, ଏବେ ସହାୟିକାଙ୍କୁ ଯୋଗାଯୋଗ କରିହେବ ନାହିଁ । ଦୟାକରି ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ ।',
} as const;

export const AI_THINKING = {
  en: 'Thinking...',
  or: 'ଚିନ୍ତା କରୁଛି…',
} as const;

/** Detect free-text intent to start the service-status guided flow. */
export function matchesServiceStatusIntent(text: string): boolean {
  const t = text.toLowerCase().trim();
  const en =
    /\b(check|view|track|know)\b.*\b(status|request)\b/.test(t) ||
    /\b(service|request)\s+status\b/.test(t) ||
    /\bstatus\b.*\b(request|service)\b/.test(t);
  const or = /ସ୍ଥିତି|ଅନୁରୋଧ\s*ସ୍ଥିତି|ସେବା\s*ସ୍ଥିତି/.test(text);
  return en || or;
}
