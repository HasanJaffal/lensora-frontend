import { useMutation, useQuery } from '@tanstack/react-query'

import { convertImportToIntakeDefinition, uploadImportDocument } from './api'
import { importKeys } from './query-keys'

export function useUploadImportDocument() {
  return useMutation({ mutationFn: uploadImportDocument })
}

export function useImportIntakeDefinition(importId: string) {
  return useQuery({
    queryKey: importKeys.intakeDefinition(importId),
    queryFn: () => convertImportToIntakeDefinition(importId),
  })
}
