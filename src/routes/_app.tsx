import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { AppLayout } from '@/components/layout/app-layout'
import { RouteError, RoutePending } from '@/components/custom/route-boundaries'
import { getAuthToken } from '@/lib/auth-token'

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    if (getAuthToken() === null) {
      throw redirect({ to: '/login' })
    }
  },
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
