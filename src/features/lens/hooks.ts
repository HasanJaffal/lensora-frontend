import { useMutation, useQuery } from '@tanstack/react-query'

import { createLensOrder, getInStockFrames, getLensCatalog } from './api'
import { lensKeys } from './query-keys'
import { type FrameUse } from './types'

export function useLensCatalog() {
  return useQuery({
    queryKey: lensKeys.catalog,
    queryFn: getLensCatalog,
  })
}

export function useInStockFrames(use: FrameUse) {
  return useQuery({
    queryKey: lensKeys.inStockFrames(use),
    queryFn: () => getInStockFrames(use),
  })
}

export function useCreateLensOrder() {
  return useMutation({
    mutationFn: createLensOrder,
  })
}
