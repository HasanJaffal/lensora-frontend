import { Outlet, useParams } from '@tanstack/react-router'

import { StorefrontLayout } from './storefront-layout'

export function StorefrontRouteLayout() {
  const { slug } = useParams({ from: '/store/$slug' })

  return (
    <StorefrontLayout slug={slug}>
      <Outlet />
    </StorefrontLayout>
  )
}
