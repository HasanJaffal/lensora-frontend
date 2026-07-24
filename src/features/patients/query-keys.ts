import { type PatientListQuery } from './types'

export const patientsKeys = {
  list: (query: PatientListQuery) => ['patients', 'list', query] as const,
  detail: (patientId: string) => ['patients', 'detail', patientId] as const,
  lensOrder: (patientId: string) => ['patients', patientId, 'lens-order'] as const,
  matchedTips: (patientId: string) => ['patients', patientId, 'matched-tips'] as const,
}
