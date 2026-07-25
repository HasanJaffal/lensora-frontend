import { useQuery, skipToken } from '@tanstack/react-query'

import { getStylingAdvice } from './api'
import { tryOnKeys } from './query-keys'
import { type ProductNeed } from './types'

type StylingAdviceOptions = {
  frameId: string | null
  locale: string
  need: ProductNeed
  patientId?: string
}

export function useStylingAdvice({ frameId, locale, need, patientId }: StylingAdviceOptions) {
  return useQuery({
    queryKey: tryOnKeys.stylingAdvice(frameId ?? '', need, locale, patientId),
    queryFn:
      frameId === null ? skipToken : () => getStylingAdvice({ frameId, need, locale, patientId }),
  })
}
