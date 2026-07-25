import { createFileRoute } from '@tanstack/react-router'

import { RouteError, RoutePending } from '@/components/custom/route-boundaries'
import { StorefrontRouteLayout } from '@/features/storefront'

// Deliberately no `beforeLoad` auth guard: the storefront is public (FR-STORE-1).
export const Route = createFileRoute('/store/$slug')({
  component: StorefrontRouteLayout,
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
