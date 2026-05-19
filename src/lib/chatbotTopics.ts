export const CHATBOT_TOPICS = [
  {
    id: 'trace',
    icon: 'bi-search',
    chip: { en: 'Complaint status', or: 'ଅଭିଯୋଗ ସ୍ଥିତି' },
    q: { en: 'How will you trace a complaint?', or: 'ଅଭିଯୋଗ ସ୍ଥିତି କିପରି ଦେଖିବେ?' },
    bullets: {
      en: [
        'Click on the Complaint tab.',
        'Select “View complaint / search status”.',
        'Select the complaint radio button.',
        'Enter the complaint number.',
        'Click on “View status”.',
        'The status of the complaint will be displayed.',
      ],
      or: [
        '“Complaint” ଟ୍ୟାବ୍ କ୍ଲିକ୍ କରନ୍ତୁ ।',
        '“View complaint / search status” ବାଛନ୍ତୁ ।',
        'Complaint ରେଡିଓ ବଟନ୍ ଚୟନ କରନ୍ତୁ ।',
        'ଅଭିଯୋଗ ନମ୍ବର ଲେଖନ୍ତୁ ।',
        '“View status” କ୍ଲିକ୍ କରନ୍ତୁ ।',
        'ଅଭିଯୋଗର ସ୍ଥିତି ପ୍ରଦର୍ଶିତ ହେବ ।',
      ],
    },
  },
  {
    id: 'char-cert',
    icon: 'bi-patch-check',
    chip: { en: 'Character certificate', or: 'ଚରିତ୍ର ପ୍ରମାଣପତ୍ର' },
    q: { en: 'How to register Character Certificate request?', or: 'ଚରିତ୍ର ପ୍ରମାଣପତ୍ର ଅନୁରୋଧ କିପରି ପଞ୍ଜିକରଣ କରିବେ?' },
    bullets: {
      en: [
        'Go to Citizen Services → Character Certificate Request → “Add Character Certificate Request”.',
        'The Character Certificate Request page opens.',
        'Select or enter complete and correct details for the certificate.',
        'Use radio buttons where the form asks for a choice.',
        'Review and submit when all mandatory fields are filled.',
      ],
      or: [
        'Citizen Services → Character Certificate Request → “Add Character Certificate Request” କୁ ଯାଆନ୍ତୁ ।',
        'ପୃଷ୍ଠା ଖୋଲିବ ।',
        'ପ୍ରମାଣପତ୍ର ପାଇଁ ସଠିକ୍ ଓ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
        'ଆବଶ୍ୟକ ସ୍ଥାନରେ ରେଡିଓ ବଟନ୍ ବ୍ୟବହାର କରନ୍ତୁ ।',
        'ସମସ୍ତ ବାଧ୍ୟତାମୂଳକ କ୍ଷେତ୍ର ପରେ ଦାଖଲ କରନ୍ତୁ ।',
      ],
    },
  },
  {
    id: 'register-complaint',
    icon: 'bi-pencil-square',
    chip: { en: 'Register complaint', or: 'ଅଭିଯୋଗ ପଞ୍ଜିକରଣ' },
    q: { en: 'How to register a complaint?', or: 'ଅଭିଯୋଗ ପଞ୍ଜିକରଣ କିପରି କରିବେ?' },
    bullets: {
      en: [
        'Log in to the Citizen Portal with your user ID and password.',
        'Click “Register New Complaint”.',
        'The register new complaint page opens.',
        'Move through the tabs to enter or select information.',
        'Fill all required fields accurately.',
        'Click “Submit” to save the complaint.',
      ],
      or: [
        'ଲଗଇନ୍ ଆଇଡି ଓ ପାସ୍ୱାର୍ଡ ସହ ପୋର୍ଟାଲ୍‌କୁ ଲଗଇନ୍ କରନ୍ତୁ ।',
        '“Register New Complaint” କ୍ଲିକ୍ କରନ୍ତୁ ।',
        'ପୃଷ୍ଠା ଖୋଲିବ ।',
        'ଟ୍ୟାବ୍ ମାଧ୍ୟମରେ ତଥ୍ୟ ପୂରଣ/ବାଛନ୍ତୁ ।',
        'ସମସ୍ତ ଆବଶ୍ୟକ କ୍ଷେତ୍ର ସଠିକ୍ ଭାବେ ପୂରଣ କରନ୍ତୁ ।',
        'ସଞ୍ଚୟ ପାଇଁ “Submit” କ୍ଲିକ୍ କରନ୍ତୁ ।',
      ],
    },
  },
  {
    id: 'tenant-pg',
    icon: 'bi-house-door',
    chip: { en: 'PG / Tenant verification', or: 'ପିଜି / ଭଡ଼ାଟିଆ ଯାଞ୍ଚ' },
    q: {
      en: 'How to register a PG/Tenant Verification request?',
      or: 'ପିଜି/ଭଡ଼ାଟିଆ ଯାଞ୍ଚ ଅନୁରୋଧ କିପରି ପଞ୍ଜିକରଣ କରିବେ?',
    },
    bullets: {
      en: [
        'Log in to the Citizen Portal (register first if you are a new user).',
        'Update your profile and upload photo, identity proof, and address proof.',
        'Go to Citizen Services → Tenant/PG Verification Request.',
        'Fill all mandatory fields (*) including personal details, address, contact number, and tenant details.',
        'Verify the form, then click “Submit” (requests cannot be edited after submission).',
        'You will receive SMS/email with your Service Request Number; keep the print copy for reference.',
      ],
      or: [
        'ନାଗରିକ ପୋର୍ଟାଲ୍‌ରେ ଲଗଇନ୍ କରନ୍ତୁ (ନୂଆ ବ୍ୟବହାରକାରୀ ହେଲେ ପ୍ରଥମେ ପଞ୍ଜିକରଣ କରନ୍ତୁ) ।',
        'ପ୍ରୋଫାଇଲ୍ ଅପଡେଟ୍ କରି ଫଟୋ, ପରିଚୟ ଓ ଠିକଣା ପ୍ରମାଣ ଅପଲୋଡ୍ କରନ୍ତୁ ।',
        'Citizen Services → Tenant/PG Verification Request କୁ ଯାଆନ୍ତୁ ।',
        'ବାଧ୍ୟତାମୂଳକ (*) କ୍ଷେତ୍ର ସହ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ, ଠିକଣା, ଯୋଗାଯୋଗ ଓ ଭଡ଼ାଟିଆ ବିବରଣୀ ପୂରଣ କରନ୍ତୁ ।',
        'ଫର୍ମ ଯାଞ୍ଚ କରି “Submit” କ୍ଲିକ୍ କରନ୍ତୁ (ଦାଖଲ ପରେ ସମ୍ପାଦନ ହେବ ନାହିଁ) ।',
        'ସେବା ଅନୁରୋଧ ନମ୍ବର ସହ SMS/ଇମେଲ୍ ମିଳିବ; ମୂଦ୍ରଣ ନକଲ ରଖନ୍ତୁ ।',
      ],
    },
  },
  {
    id: 'protest-strike',
    icon: 'bi-megaphone',
    chip: { en: 'Protest / strike', or: 'ବିକ୍ଷୋଭ / ଧର୍ମଘଟ' },
    q: {
      en: 'How to register a Protest/Strike request?',
      or: 'ବିକ୍ଷୋଭ/ଧର୍ମଘଟ ଅନୁରୋଧ କିପରି ପଞ୍ଜିକରଣ କରିବେ?',
    },
    bullets: {
      en: [
        'Log in to the Citizen Portal and update your profile with required documents.',
        'Go to Citizen Services → Protest Strike Request → “Protest/Strike Registration Request”.',
        'Enter personal information under Applicant details.',
        'Enter complete details about the proposed protest or strike (including route details where required).',
        'Verify the form, then click “Submit”.',
        'You will receive SMS/email with your Service Request Number; keep the print copy for reference.',
      ],
      or: [
        'ପୋର୍ଟାଲ୍‌ରେ ଲଗଇନ୍ କରି ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ ସହ ପ୍ରୋଫାଇଲ୍ ଅପଡେଟ୍ କରନ୍ତୁ ।',
        'Citizen Services → Protest Strike Request → “Protest/Strike Registration Request” କୁ ଯାଆନ୍ତୁ ।',
        'ଆବେଦକ ବିବରଣୀରେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
        'ପ୍ରସ୍ତାବିତ ବିକ୍ଷୋଭ/ଧର୍ମଘଟ (ଆବଶ୍ୟକ ହେଲେ ମାର୍ଗ ବିବରଣୀ) ସମ୍ପୂର୍ଣ୍ଣ ଭରନ୍ତୁ ।',
        'ଯାଞ୍ଚ କରି “Submit” କ୍ଲିକ୍ କରନ୍ତୁ ।',
        'ସେବା ଅନୁରୋଧ ନମ୍ବର ସହ ବାର୍ତ୍ତା/ଇମେଲ୍ ମିଳିବ; ମୂଦ୍ରଣ ନକଲ ରଖନ୍ତୁ ।',
      ],
    },
  },
  {
    id: 'event-performance',
    icon: 'bi-calendar-event',
    chip: { en: 'Event / performance', or: 'କାର୍ଯ୍ୟକ୍ରମ / ପରିବେଷଣ' },
    q: {
      en: 'How to register an Event/Performance request?',
      or: 'କାର୍ଯ୍ୟକ୍ରମ/ପରିବେଷଣ ଅନୁରୋଧ କିପରି ପଞ୍ଜିକରଣ କରିବେ?',
    },
    bullets: {
      en: [
        'Log in to the Citizen Portal and update your profile with required documents.',
        'Go to Citizen Services → Event / Performance Request → “Event / Performance Request Registration”.',
        'Enter personal information under Applicant details.',
        'Enter complete details about the event or performance.',
        'Verify the form, then click “Submit”.',
        'You will receive SMS/email with your Service Request Number; keep the print copy for reference.',
      ],
      or: [
        'ପୋର୍ଟାଲ୍‌ରେ ଲଗଇନ୍ କରି ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ ସହ ପ୍ରୋଫାଇଲ୍ ଅପଡେଟ୍ କରନ୍ତୁ ।',
        'Citizen Services → Event / Performance Request → “Event / Performance Request Registration” କୁ ଯାଆନ୍ତୁ ।',
        'ଆବେଦକ ବିବରଣୀରେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
        'କାର୍ଯ୍ୟକ୍ରମ/ପରିବେଷଣ ବିଷୟରେ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ଦିଅନ୍ତୁ ।',
        'ଯାଞ୍ଚ କରି “Submit” କ୍ଲିକ୍ କରନ୍ତୁ ।',
        'ସେବା ଅନୁରୋଧ ନମ୍ବର ସହ ବାର୍ତ୍ତା/ଇମେଲ୍ ମିଳିବ; ମୂଦ୍ରଣ ନକଲ ରଖନ୍ତୁ ।',
      ],
    },
  },
  {
    id: 'procession',
    icon: 'bi-signpost-split',
    chip: { en: 'Procession', or: 'ଶୋଭାଯାତ୍ରା' },
    q: {
      en: 'How to register a Procession request?',
      or: 'ଶୋଭାଯାତ୍ରା ଅନୁରୋଧ କିପରି ପଞ୍ଜିକରଣ କରିବେ?',
    },
    bullets: {
      en: [
        'Log in to the Citizen Portal and update your profile with required documents.',
        'Go to Citizen Services → Procession Request → “Procession Request Registration”.',
        'Enter personal information under Applicant details.',
        'Enter complete details about the procession (including route details where required).',
        'Verify the form, then click “Submit”.',
        'You will receive SMS/email with your Service Request Number; keep the print copy for reference.',
      ],
      or: [
        'ପୋର୍ଟାଲ୍‌ରେ ଲଗଇନ୍ କରି ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ ସହ ପ୍ରୋଫାଇଲ୍ ଅପଡେଟ୍ କରନ୍ତୁ ।',
        'Citizen Services → Procession Request → “Procession Request Registration” କୁ ଯାଆନ୍ତୁ ।',
        'ଆବେଦକ ବିବରଣୀରେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ ।',
        'ଶୋଭାଯାତ୍ରା ବିଷୟରେ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ (ଆବଶ୍ୟକ ହେଲେ ମାର୍ଗ ବିବରଣୀ) ଦିଅନ୍ତୁ ।',
        'ଯାଞ୍ଚ କରି “Submit” କ୍ଲିକ୍ କରନ୍ତୁ ।',
        'ସେବା ଅନୁରୋଧ ନମ୍ବର ସହ ବାର୍ତ୍ତା/ଇମେଲ୍ ମିଳିବ; ମୂଦ୍ରଣ ନକଲ ରଖନ୍ତୁ ।',
      ],
    },
  },
];

export type ChatbotTopic = (typeof CHATBOT_TOPICS)[number];
