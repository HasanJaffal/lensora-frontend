import { createFileRoute } from '@tanstack/react-router'

import { StorefrontBrowsePage } from '@/features/storefront'

export const Route = createFileRoute('/store/$slug/')({
  component: StorefrontBrowsePage,
})
