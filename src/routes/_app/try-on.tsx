import { createFileRoute } from '@tanstack/react-router'

import { TryOnPage } from '@/features/try-on/pages/try-on-page'

export const Route = createFileRoute('/_app/try-on')({
  component: TryOnPage,
})
