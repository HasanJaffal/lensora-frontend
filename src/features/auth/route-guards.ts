import { type QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { ApiError } from '@/lib/api-error'
import { getAuthToken, setAuthToken } from '@/lib/auth-token'

import { currentUserQueryOptions } from './current-user-query'
import { resolveLandingPath } from './landing-path'
import { type UserDto, type UserRole } from './types'

async function loadCurrentUser(queryClient: QueryClient): Promise<UserDto | null> {
  try {
    return await queryClient.ensureQueryData(currentUserQueryOptions)
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      setAuthToken(null)
      queryClient.removeQueries({ queryKey: currentUserQueryOptions.queryKey })
      return null
    }

    throw error
  }
}

export async function resolveOptionalCurrentUser(
  queryClient: QueryClient,
): Promise<UserDto | null> {
  if (getAuthToken() === null) {
    return null
  }

  return loadCurrentUser(queryClient)
}

export async function ensureRoleAccess(queryClient: QueryClient, role: UserRole): Promise<void> {
  const user = await resolveOptionalCurrentUser(queryClient)

  if (user === null) {
    throw redirect({ to: '/login', replace: true })
  }

  if (user.role !== role) {
    throw redirect({ to: resolveLandingPath(user.role), replace: true })
  }
}
