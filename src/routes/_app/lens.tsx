import { createFileRoute } from '@tanstack/react-router'

import { LensSelectorPage } from '@/features/lens/pages/lens-selector-page'

export const Route = createFileRoute('/_app/lens')({
  component: LensSelectorPage,
})
