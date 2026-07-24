import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createIntake, getIntake, listIntakes, updateIntake } from './api'
import { intakeKeys } from './query-keys'
import { type IntakeListQuery, type IntakeUpdateRequest } from './types'

export function useIntakeList(query: IntakeListQuery) {
  return useQuery({
    queryKey: intakeKeys.list(query),
    queryFn: () => listIntakes(query),
  })
}

export function useIntake(intakeId: string | undefined) {
  return useQuery({
    queryKey: intakeKeys.detail(intakeId ?? ''),
    queryFn: () => {
      if (intakeId === undefined) {
        throw new Error('useIntake requires an intake id')
      }
      return getIntake(intakeId)
    },
    enabled: intakeId !== undefined,
  })
}

export function useCreateIntake() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createIntake,
    onSuccess: (intake) => {
      queryClient.setQueryData(intakeKeys.detail(intake.id), intake)
      void queryClient.invalidateQueries({ queryKey: intakeKeys.lists() })
    },
  })
}

export function useUpdateIntake() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ intakeId, request }: { intakeId: string; request: IntakeUpdateRequest }) =>
      updateIntake(intakeId, request),
    onSuccess: (intake) => {
      queryClient.setQueryData(intakeKeys.detail(intake.id), intake)
      void queryClient.invalidateQueries({ queryKey: intakeKeys.lists() })
    },
  })
}
