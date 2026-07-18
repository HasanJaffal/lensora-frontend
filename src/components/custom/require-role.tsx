import { useEffect, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useAuth } from '@/features/auth/auth-context'
import type { UserRole } from '@/features/auth/types'

import { RoutePending } from './route-boundaries'

type RequireRoleProps = {
  role: UserRole
  redirectTo: string
  children: ReactNode
}

export function RequireRole({ role, redirectTo, children }: RequireRoleProps) {
  const { user, isHydrating } = useAuth()
  const navigate = useNavigate()
  const isAllowed = user?.role === role

  useEffect(() => {
    if (!isHydrating && !isAllowed) {
      navigate({ to: redirectTo })
    }
  }, [isHydrating, isAllowed, navigate, redirectTo])

  if (isHydrating || !isAllowed) {
    return <RoutePending />
  }

  return children
}
