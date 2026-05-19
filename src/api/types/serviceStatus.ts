export interface ServiceStatusRequest {
  requestNumber: number;
  serviceType: number;
}

/** Optional citizen service fields returned by POST /api/service/status */
export interface ServiceStatusFields {
  APPLICANT_NAME?: string;
  SERVICE_DATE?: string;
  STATUS?: string;
  RELATIVE_NAME?: string;
  PresentAddress?: string;
  PermanandeAddress?: string;
  FileBytes?: string;
}

export interface ServiceStatusResult extends ServiceStatusFields {
  success: boolean;
  message: string;
}

export type ServiceStatusErrorKind = 'network' | 'client' | 'server' | 'not_found';

export class ServiceStatusApiError extends Error {
  readonly kind: ServiceStatusErrorKind;

  constructor(message: string, kind: ServiceStatusErrorKind) {
    super(message);
    this.name = 'ServiceStatusApiError';
    this.kind = kind;
  }
}

/** Raw API payload (flat or nested under data). */
export interface ServiceStatusApiRaw extends Partial<ServiceStatusFields> {
  success?: boolean;
  message?: string;
  data?: Partial<ServiceStatusFields> & {
    requestNumber?: number | string;
    status?: string;
  };
  requestNumber?: number | string;
  status?: string;
}
