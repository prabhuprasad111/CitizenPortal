/** Citizen portal service types for status lookup (id matches backend). */
export interface ServiceTypeOption {
  id: number;
  nameEn: string;
  nameOr: string;
}

export const SERVICE_TYPES: readonly ServiceTypeOption[] = [
  { id: 9, nameEn: 'Character Certificate', nameOr: 'ଚରିତ୍ର ପ୍ରମାଣପତ୍ର' },
  { id: 23, nameEn: 'Complaint', nameOr: 'ଅଭିଯୋଗ' },
  { id: 4, nameEn: 'Employee Verification', nameOr: 'କର୍ମଚାରୀ ଯାଞ୍ଚ' },
  { id: 1, nameEn: 'Event / Performance', nameOr: 'କାର୍ଯ୍ୟକ୍ରମ / ପରିବେଷଣ' },
  { id: 21, nameEn: 'Lost Property', nameOr: 'ହଜିଲା ସମ୍ପତ୍ତି' },
  { id: 17, nameEn: 'NOC for Loudspeaker', nameOr: 'ଲାଉଡ୍‌ସ୍ପିକର୍ ପାଇଁ NOC' },
  { id: 2, nameEn: 'Procession', nameOr: 'ଶୋଭାଯାତ୍ରା' },
  { id: 3, nameEn: 'Protest / Strike', nameOr: 'ବିକ୍ଷୋଭ / ଧର୍ମଘଟ' },
  { id: 13, nameEn: 'Final Form Copy', nameOr: 'ଫାଇନାଲ୍ ଫର୍ମ ନକଲ' },
  { id: 20, nameEn: 'Senior Citizen', nameOr: 'ବରିଷ୍ଠ ନାଗରିକ' },
  { id: 6, nameEn: 'Tenant Verification', nameOr: 'ଭଡ଼ାଟିଆ ଯାଞ୍ଚ' },
  { id: 15, nameEn: 'FIR Copy', nameOr: 'ଏଫ୍‌ଆଇଆର୍ ନକଲ' },
] as const;
