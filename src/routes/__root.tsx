import { Outlet, createRootRoute } from '@tanstack/react-router'

import { RootNotFound } from '@/components/custom/root-not-found'

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: RootNotFound,
})
