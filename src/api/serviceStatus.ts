import axios from 'axios';
import { getApi } from './httpClient';
import { serviceStatusPath } from './config';
import type {
  ServiceStatusApiRaw,
  ServiceStatusFields,
  ServiceStatusRequest,
  ServiceStatusResult,
} from './types/serviceStatus';
import { ServiceStatusApiError } from './types/serviceStatus';

function pickFields(
  source: (Partial<ServiceStatusFields> & { status?: string }) | undefined,
): Omit<ServiceStatusResult, 'success' | 'message'> {
  if (!source) {
    return {};
  }
  return {
    APPLICANT_NAME: source.APPLICANT_NAME,
    SERVICE_DATE: source.SERVICE_DATE,
    STATUS: source.STATUS ?? source.status,
    RELATIVE_NAME: source.RELATIVE_NAME,
    PresentAddress: source.PresentAddress,
    PermanandeAddress: source.PermanandeAddress,
    FileBytes: source.FileBytes,
  };
}

function normalizeServiceStatusResult(raw: ServiceStatusApiRaw): ServiceStatusResult {
  const nested = raw.data && typeof raw.data === 'object' ? raw.data : undefined;
  const fields = {
    ...pickFields(raw),
    ...pickFields(nested),
  };

  if (!fields.STATUS && typeof raw.status === 'string') {
    fields.STATUS = raw.status;
  }
  if (!fields.STATUS && nested?.status) {
    fields.STATUS = nested.status;
  }

  return {
    success: raw.success === true,
    message: raw.message?.trim() ?? '',
    ...fields,
  };
}

function messageFromBody(data: unknown): string | undefined {
  if (data && typeof data === 'object' && 'message' in data) {
    const msg = (data as { message?: unknown }).message;
    return typeof msg === 'string' ? msg : undefined;
  }
  return undefined;
}

function mapServiceStatusError(err: unknown): ServiceStatusApiError {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return new ServiceStatusApiError(
        'Network error. Check that the API is running and VITE_API_BASE_URL is correct.',
        'network',
      );
    }

    const status = err.response.status;
    const bodyMsg = messageFromBody(err.response.data);

    if (status === 404) {
      return new ServiceStatusApiError(bodyMsg ?? 'No record found.', 'not_found');
    }
    if (status === 400) {
      return new ServiceStatusApiError(bodyMsg ?? 'Invalid request. Check request number and service type.', 'client');
    }
    if (status >= 500) {
      return new ServiceStatusApiError(bodyMsg ?? 'Server error. Please try again later.', 'server');
    }

    return new ServiceStatusApiError(bodyMsg ?? `Request failed (${status}).`, 'client');
  }

  if (err instanceof ServiceStatusApiError) {
    return err;
  }

  return new ServiceStatusApiError('Unable to fetch status. Please try again later.', 'network');
}

/**
 * POST /api/service/status — body is JSON with numeric requestNumber and serviceType.
 */
export async function postServiceStatus(
  request: ServiceStatusRequest,
): Promise<ServiceStatusResult> {
  try {
    const { data } = await getApi().post<ServiceStatusApiRaw>(serviceStatusPath, request);
    return normalizeServiceStatusResult(data);
  } catch (err) {
    throw mapServiceStatusError(err);
  }
}
