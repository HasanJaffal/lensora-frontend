import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/components/layout/app-layout'
import { RouteError, RoutePending } from '@/components/custom/route-boundaries'

export const Route = createFileRoute('/_app')({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
