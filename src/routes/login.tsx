import { createFileRoute, redirect } from '@tanstack/react-router'

import { LoginPage } from '@/features/auth'
import { getAuthToken } from '@/lib/auth-token'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (getAuthToken() !== null) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})
