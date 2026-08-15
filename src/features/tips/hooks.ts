import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { patientsKeys } from '@/features/patients/query-keys'

import { listTips, sendTipToPatient } from './api'
import { tipsKeys } from './query-keys'
import { type SendTipVariables, type TipCategory } from './types'

export function useTips(category: TipCategory | undefined) {
  return useQuery({
    queryKey: tipsKeys.list(category),
    queryFn: () => listTips(category),
  })
}

export function useSendTip() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ tipId, patientId }: SendTipVariables) => sendTipToPatient(tipId, patientId),
    onSuccess: async (_result, { patientId }) => {
      await queryClient.invalidateQueries({ queryKey: patientsKeys.matchedTips(patientId) })
    },
  })
}
