import { apiClient } from '@/lib/api-client'

import {
  type IntakeCreateRequest,
  type IntakeDto,
  type IntakeListItemDto,
  type IntakeListQuery,
  type IntakeUpdateRequest,
} from './types'

export function listIntakes(query: IntakeListQuery): Promise<IntakeListItemDto[]> {
  return apiClient.get<IntakeListItemDto[]>('/intake', { query })
}

export function getIntake(intakeId: string): Promise<IntakeDto> {
  return apiClient.get<IntakeDto>(`/intake/${intakeId}`)
}

export function createIntake(request: IntakeCreateRequest): Promise<IntakeDto> {
  return apiClient.post<IntakeDto>('/intake', request)
}

export function updateIntake(intakeId: string, request: IntakeUpdateRequest): Promise<IntakeDto> {
  return apiClient.patch<IntakeDto>(`/intake/${intakeId}`, request)
}
