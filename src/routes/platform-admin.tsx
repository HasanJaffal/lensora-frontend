import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { PlatformAdminLayout } from '@/components/layout/platform-admin-layout'
import { RequireRole } from '@/components/custom/require-role'
import { RouteError, RoutePending } from '@/components/custom/route-boundaries'
import { getAuthToken } from '@/lib/auth-token'

export const Route = createFileRoute('/platform-admin')({
  beforeLoad: () => {
    if (getAuthToken() === null) {
      throw redirect({ to: '/login' })
    }
  },
  component: () => (
    <RequireRole role="platformAdmin" redirectTo="/">
      <PlatformAdminLayout>
        <Outlet />
      </PlatformAdminLayout>
    </RequireRole>
  ),
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
