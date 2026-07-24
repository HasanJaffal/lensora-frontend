import { useMutation, useQuery } from '@tanstack/react-query'

import {
  getMatchedTips,
  getPatient,
  getPatientLensOrder,
  listPatients,
  sendTipToPatient,
} from './api'
import { patientsKeys } from './query-keys'
import { type PatientListQuery } from './types'

export function usePatients(query: PatientListQuery) {
  return useQuery({
    queryKey: patientsKeys.list(query),
    queryFn: () => listPatients(query),
  })
}

export function usePatient(patientId: string) {
  return useQuery({
    queryKey: patientsKeys.detail(patientId),
    queryFn: () => getPatient(patientId),
  })
}

export function usePatientLensOrder(patientId: string) {
  return useQuery({
    queryKey: patientsKeys.lensOrder(patientId),
    queryFn: () => getPatientLensOrder(patientId),
  })
}

export function useMatchedTips(patientId: string) {
  return useQuery({
    queryKey: patientsKeys.matchedTips(patientId),
    queryFn: () => getMatchedTips(patientId),
  })
}

export function useSendTip() {
  return useMutation({
    mutationFn: ({ tipId, patientId }: { tipId: string; patientId: string }) =>
      sendTipToPatient(tipId, patientId),
  })
}
