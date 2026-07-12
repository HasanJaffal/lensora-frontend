export type ApiErrorDetail = {
  field: string
  message: string
}

type ApiErrorParams = {
  code: string
  message: string
  status: number
  details?: ApiErrorDetail[]
}

export class ApiError extends Error {
  readonly code: string
  readonly status: number
  readonly details?: ApiErrorDetail[]

  constructor({ code, message, status, details }: ApiErrorParams) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.details = details
  }
}
