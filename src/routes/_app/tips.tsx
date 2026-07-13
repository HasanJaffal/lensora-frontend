import { createFileRoute } from '@tanstack/react-router'

import { TipsPage } from '@/features/tips/pages/tips-page'

export const Route = createFileRoute('/_app/tips')({
  component: TipsPage,
})
