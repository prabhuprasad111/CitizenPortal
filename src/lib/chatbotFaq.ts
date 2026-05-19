/** Local FAQ answers — used when AI endpoint is unavailable or for common portal questions. */

export interface ChatbotFaqEntry {
  id: string;
  match: (text: string) => boolean;
  answer: { en: string; or: string };
}

const FAQ_ENTRIES: readonly ChatbotFaqEntry[] = [
  {
    id: 'what-is-portal',
    match: (text) => {
      const t = text.toLowerCase();
      return (
        /what\s+is\s+(the\s+)?citizen\s+portal/.test(t) ||
        /about\s+(the\s+)?citizen\s+portal/.test(t) ||
        /citizen\s+portal\s+mean/.test(t) ||
        /explain\s+citizen\s+portal/.test(t) ||
        /ନାଗରିକ\s+ପୋର୍ଟାଲ୍\s+କଣ/.test(text) ||
        /ପୋର୍ଟାଲ୍\s+କଣ/.test(text)
      );
    },
    answer: {
      en:
        'The <strong>Citizen Portal</strong> is the online front door for <strong>Odisha Police</strong> citizen services (CCTNS). ' +
        'You can apply for certificates and requests, track service status, register complaints, and use other police services online — often without visiting a police station. ' +
        'Sign in to update your profile, then open <strong>Citizen Services</strong> on the home page or use <strong>Check Service Request Status</strong> here in SAKHI.',
      or:
        '<strong>ନାଗରିକ ପୋର୍ଟାଲ୍</strong> ହେଉଛି <strong>ଓଡ଼ିଶା ପୋଲିସ୍</strong> ନାଗରିକ ସେବା (CCTNS) ପାଇଁ ଅନଲାଇନ୍ ମଞ୍ଚ । ' +
        'ଆପଣ ଅନଲାଇନ୍ ମାଧ୍ୟମରେ ପ୍ରମାଣପତ୍ର/ଅନୁରୋଧ ଦାଖଲ, ସେବା ସ୍ଥିତି ଯାଞ୍ଚ, ଅଭିଯୋଗ ଓ ଅନ୍ୟ ପୋଲିସ୍ ସେବା ନେଇପାରିବେ । ' +
        'ଲଗଇନ୍ କରି ପ୍ରୋଫାଇଲ୍ ଅପଡେଟ୍ କରନ୍ତୁ; ହୋମ୍ ପେଜ୍‌ରେ <strong>ନାଗରିକ ସେବା</strong> ବାଛନ୍ତୁ କିମ୍ବା SAKHI ରେ <strong>ସେବା ଅନୁରୋଧ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ</strong> ବ୍ୟବହାର କରନ୍ତୁ ।',
    },
  },
  {
    id: 'what-can-you-do',
    match: (text) => {
      const t = text.toLowerCase();
      return (
        /what\s+can\s+you\s+(do|help)/.test(t) ||
        /how\s+can\s+you\s+help/.test(t) ||
        /what\s+do\s+you\s+do/.test(t) ||
        /କଣ\s+କରିପାରିବ/.test(text) ||
        /କିପରି\s+ସହାୟତା/.test(text)
      );
    },
    answer: {
      en:
        'I am <strong>SAKHI</strong>, your Citizen Portal assistant. I can explain common services, show step-by-step help for complaints and certificates, and <strong>check your service request status</strong> when you provide your request number and service type. Choose a topic below or ask about the portal.',
      or:
        'ମୁଁ <strong>SAKHI</strong> — ଆପଣଙ୍କ ନାଗରିକ ପୋର୍ଟାଲ୍ ସହାୟିକା । ମୁଁ ସେବା ବିଷୟରେ ବୁଝାଇପାରେ, ଅଭିଯୋଗ/ପ୍ରମାଣପତ୍ର ପାଇଁ ଧାଡ଼ି ଦେଖାଇପାରେ, ଏବଂ ଅନୁରୋଧ ନମ୍ବର ଓ ସେବା ପ୍ରକାର ଦେଲେ <strong>ସେବା ସ୍ଥିତି ଯାଞ୍ଚ</strong> କରିପାରେ । ତଳେ ଥିବା ବିଷୟ ବାଛନ୍ତୁ ।',
    },
  },
  {
    id: 'who-is-dg',
    match: (text) => {
      const t = text.toLowerCase();
      return (
        /\b(who\s+is|what\s+is|tell\s+me\s+about)\s+(the\s+)?(dg|dgp)\b/.test(t) ||
        /\bdg\b.*\b(police|odisha)\b/.test(t) ||
        /\bdgp\b/.test(t) ||
        /ଡିଜି|ଡିଜିପି|ଡାଇରେକ୍ଟର\s*ଜେନେରାଲ/.test(text)
      );
    },
    answer: {
      en:
        'The <strong>Director General of Police (DGP)</strong> is the head of <strong>Odisha Police</strong>. ' +
        'For the current incumbent, check the Odisha Police website or Citizen Portal announcements.',
      or:
        '<strong>ପୋଲିସ୍ ମହାନିର୍ଦେଶକ (DGP)</strong> ହେଉଛି <strong>ଓଡ଼ିଶା ପୋଲିସ୍</strong> ପ୍ରମୁଖ । ' +
        'ବର୍ତ୍ତମାନର ଦାୟିତ୍ୱରତ ବ୍ୟକ୍ତି ଜାଣିବା ପାଇଁ ଓଡ଼ିଶା ପୋଲିସ୍ ୱେବସାଇଟ୍ କିମ୍ବା ନାଗରିକ ପୋର୍ଟାଲ୍ ଘୋଷଣା ଦେଖନ୍ତୁ ।',
    },
  },
  {
    id: 'helpdesk',
    match: (text) => {
      const t = text.toLowerCase();
      return (
        /help\s*desk|helpline|contact\s*(number|us)|phone\s*number|0674/.test(t) ||
        /ସହାୟତା\s*ଡେସ୍କ|ହେଲ୍ପଲାଇନ|ଯୋଗାଯୋଗ/.test(text)
      );
    },
    answer: {
      en:
        'Citizen Portal help desk: <strong>0674-2973888</strong>. For online services, sign in at the portal; for request tracking use <strong>Check Service Request Status</strong> in this chat.',
      or:
        'ନାଗରିକ ପୋର୍ଟାଲ୍ ସହାୟତା ଡେସ୍କ: <strong>୦୬୭୪-୨୯୭୩୮୮୮</strong> । ଅନଲାଇନ୍ ସେବା ପାଇଁ ପୋର୍ଟାଲ୍‌ରେ ଲଗଇନ୍ କରନ୍ତୁ; ଅନୁରୋଧ ସ୍ଥିତି ପାଇଁ ଏଠାରେ <strong>ସେବା ଅନୁରୋଧ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ</strong> ବ୍ୟବହାର କରନ୍ତୁ ।',
    },
  },
];

export function matchLocalFaq(text: string): ChatbotFaqEntry | undefined {
  const trimmed = text.trim();
  if (!trimmed) {
    return undefined;
  }
  return FAQ_ENTRIES.find((entry) => entry.match(trimmed));
}
