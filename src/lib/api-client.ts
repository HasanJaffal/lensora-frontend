import { env } from '@/lib/env'
import { ApiError, type ApiErrorDetail } from '@/lib/api-error'
import { getAuthToken } from '@/lib/auth-token'

export type PaginationMeta = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type PaginatedResult<TData> = {
  data: TData
  pagination: PaginationMeta | null
}

type Envelope<TData> = {
  success: boolean
  data: TData | null
  error: { code: string; message: string; details?: ApiErrorDetail[] | null } | null
  meta: { pagination?: PaginationMeta | null } | null
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>

type RequestOptions = {
  body?: unknown
  query?: QueryParams
  signal?: AbortSignal
}

function buildUrl(path: string, query?: QueryParams): string {
  const url = new URL(`${env.VITE_API_BASE_URL}${path}`)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    }
  }

  return url.toString()
}

async function request<TData>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<PaginatedResult<TData>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getAuthToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response: Response

  try {
    response = await fetch(buildUrl(path, options.query), {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal,
    })
  } catch {
    throw new ApiError({
      code: 'network.error',
      message: 'Unable to reach the server.',
      status: 0,
    })
  }

  const envelope = (await response.json().catch(() => null)) as Envelope<TData> | null

  if (!response.ok || !envelope || !envelope.success) {
    throw new ApiError({
      code: envelope?.error?.code ?? 'server.internal',
      message: envelope?.error?.message ?? 'Something went wrong.',
      status: response.status,
      details: envelope?.error?.details ?? undefined,
    })
  }

  return {
    data: envelope.data as TData,
    pagination: envelope.meta?.pagination ?? null,
  }
}

export const apiClient = {
  get: <TData>(path: string, options?: RequestOptions) =>
    request<TData>('GET', path, options).then((result) => result.data),
  getPaginated: <TData>(path: string, options?: RequestOptions) =>
    request<TData>('GET', path, options),
  post: <TData>(path: string, body?: unknown, options?: RequestOptions) =>
    request<TData>('POST', path, { ...options, body }).then((result) => result.data),
  put: <TData>(path: string, body?: unknown, options?: RequestOptions) =>
    request<TData>('PUT', path, { ...options, body }).then((result) => result.data),
  patch: <TData>(path: string, body?: unknown, options?: RequestOptions) =>
    request<TData>('PATCH', path, { ...options, body }).then((result) => result.data),
  delete: <TData>(path: string, options?: RequestOptions) =>
    request<TData>('DELETE', path, options).then((result) => result.data),
}
