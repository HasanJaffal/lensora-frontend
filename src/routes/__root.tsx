import { Outlet, createRootRoute } from '@tanstack/react-router'

import { RootNotFound } from '@/components/custom/root-not-found'
import { AuthProvider } from '@/features/auth'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
  notFoundComponent: RootNotFound,
})
