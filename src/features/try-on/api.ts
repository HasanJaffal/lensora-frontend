import { apiClient } from '@/lib/api-client'

import { type StylingAdviceDto, type StylingAdviceRequest } from './types'

export function getStylingAdvice(request: StylingAdviceRequest): Promise<StylingAdviceDto> {
  return apiClient.post<StylingAdviceDto>('/ai/styling-advice', request)
}
