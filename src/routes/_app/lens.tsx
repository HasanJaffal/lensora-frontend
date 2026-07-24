import { createFileRoute } from '@tanstack/react-router'

import { LensSelectorPage } from '@/features/lens/pages/lens-selector-page'

type LensSelectorSearch = {
  patientId?: string
  frameId?: string
}

export const Route = createFileRoute('/_app/lens')({
  validateSearch: (search: Record<string, unknown>): LensSelectorSearch => ({
    patientId: typeof search.patientId === 'string' ? search.patientId : undefined,
    frameId: typeof search.frameId === 'string' ? search.frameId : undefined,
  }),
  component: LensSelectorPage,
})
