import { apiClient, type PaginatedResult } from '@/lib/api-client'
import { ApiError } from '@/lib/api-error'
import { type TipDto } from '@/features/tips'

import {
  type LensOrderDto,
  type PatientDto,
  type PatientListItemDto,
  type PatientListQuery,
} from './types'

export function listPatients(
  query: PatientListQuery,
): Promise<PaginatedResult<PatientListItemDto[]>> {
  return apiClient.getPaginated<PatientListItemDto[]>('/patients', { query })
}

export function getPatient(patientId: string): Promise<PatientDto> {
  return apiClient.get<PatientDto>(`/patients/${patientId}`)
}

export async function getPatientLensOrder(patientId: string): Promise<LensOrderDto | null> {
  try {
    return await apiClient.get<LensOrderDto>(`/lenses/patients/${patientId}/order`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }
    throw error
  }
}

export function getMatchedTips(patientId: string): Promise<TipDto[]> {
  return apiClient.get<TipDto[]>('/tips/matched', { query: { patientId } })
}
