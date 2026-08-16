import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/components/layout/app-layout'
import { RouteError, RoutePending } from '@/components/custom/route-boundaries'
import { ensureRoleAccess } from '@/features/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context }) => ensureRoleAccess(context.queryClient, 'organizationAdmin'),
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
