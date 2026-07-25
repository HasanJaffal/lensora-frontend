import { apiClient } from '@/lib/api-client'

import { type SendTipResultDto, type TipCategory, type TipDto } from './types'

export function listTips(category: TipCategory | undefined): Promise<TipDto[]> {
  return apiClient.get<TipDto[]>('/tips', { query: { category } })
}

export function sendTipToPatient(tipId: string, patientId: string): Promise<SendTipResultDto> {
  return apiClient.post<SendTipResultDto>(`/tips/${tipId}/send`, { patientId })
}
