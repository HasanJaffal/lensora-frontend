import { Outlet, createFileRoute } from '@tanstack/react-router'

import { PlatformAdminLayout } from '@/components/layout/platform-admin-layout'
import { RouteError, RoutePending } from '@/components/custom/route-boundaries'
import { ensureRoleAccess } from '@/features/auth'

export const Route = createFileRoute('/platform-admin')({
  beforeLoad: ({ context }) => ensureRoleAccess(context.queryClient, 'platformAdmin'),
  component: () => (
    <PlatformAdminLayout>
      <Outlet />
    </PlatformAdminLayout>
  ),
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
