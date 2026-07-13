import { createFileRoute } from '@tanstack/react-router'

import { IntakePage } from '@/features/intake/pages/intake-page'

export const Route = createFileRoute('/_app/intake')({
  component: IntakePage,
})
