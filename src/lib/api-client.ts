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

// Public endpoints must never carry a credential: a customer may browse a storefront on the
// same device a practice signed in on, and that practice's token must not leave the browser.
const publicPathPrefixes = ['/storefront/']

function isPublicPath(path: string): boolean {
  return publicPathPrefixes.some((prefix) => path.startsWith(prefix))
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

function buildRequestBody(body: unknown, isMultipart: boolean): BodyInit | undefined {
  if (body === undefined) {
    return undefined
  }

  return isMultipart ? (body as FormData) : JSON.stringify(body)
}

async function request<TData>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<PaginatedResult<TData>> {
  const isMultipart = options.body instanceof FormData
  const headers: Record<string, string> = isMultipart ? {} : { 'Content-Type': 'application/json' }
  const token = isPublicPath(path) ? null : getAuthToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response: Response

  try {
    response = await fetch(buildUrl(path, options.query), {
      method,
      headers,
      body: buildRequestBody(options.body, isMultipart),
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
  postForm: <TData>(path: string, formData: FormData, options?: RequestOptions) =>
    request<TData>('POST', path, { ...options, body: formData }).then((result) => result.data),
  put: <TData>(path: string, body?: unknown, options?: RequestOptions) =>
    request<TData>('PUT', path, { ...options, body }).then((result) => result.data),
  patch: <TData>(path: string, body?: unknown, options?: RequestOptions) =>
    request<TData>('PATCH', path, { ...options, body }).then((result) => result.data),
  delete: <TData>(path: string, options?: RequestOptions) =>
    request<TData>('DELETE', path, options).then((result) => result.data),
}
