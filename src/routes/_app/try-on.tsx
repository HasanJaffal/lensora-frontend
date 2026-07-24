import { createFileRoute } from '@tanstack/react-router'

import { TryOnPage } from '@/features/try-on/pages/try-on-page'

type TryOnSearch = {
  patientId?: string
  frameId?: string
}

export const Route = createFileRoute('/_app/try-on')({
  validateSearch: (search: Record<string, unknown>): TryOnSearch => ({
    patientId: typeof search.patientId === 'string' ? search.patientId : undefined,
    frameId: typeof search.frameId === 'string' ? search.frameId : undefined,
  }),
  component: TryOnPage,
})
