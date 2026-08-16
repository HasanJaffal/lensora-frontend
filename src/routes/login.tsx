import { createFileRoute, redirect } from '@tanstack/react-router'

import { RouteError, RoutePending } from '@/components/custom/route-boundaries'
import { LoginPage, resolveLandingPath, resolveOptionalCurrentUser } from '@/features/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const user = await resolveOptionalCurrentUser(context.queryClient)

    if (user !== null) {
      throw redirect({ to: resolveLandingPath(user.role), replace: true })
    }
  },
  component: LoginPage,
  pendingComponent: RoutePending,
  errorComponent: RouteError,
})
