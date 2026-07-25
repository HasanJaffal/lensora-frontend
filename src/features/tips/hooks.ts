import { useMutation, useQuery } from '@tanstack/react-query'

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
  return useMutation({
    mutationFn: ({ tipId, patientId }: SendTipVariables) => sendTipToPatient(tipId, patientId),
  })
}
