import { createFileRoute } from '@tanstack/react-router'

import { StorefrontTryOnPage } from '@/features/storefront'

export const Route = createFileRoute('/store/$slug/try-on')({
  component: StorefrontTryOnPage,
})
