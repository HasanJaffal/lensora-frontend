import { useCallback, useMemo, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { setAuthToken } from '@/lib/auth-token'

import { AuthContext } from './auth-context'
import { currentUserQueryOptions } from './current-user-query'
import { resolveLandingPath } from './landing-path'
import { type UserDto } from './types'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Route guards resolve the session before a route commits; this only subscribes to the
  // resulting cache entry, so the public storefront never triggers an authenticated request.
  const currentUserQuery = useQuery({ ...currentUserQueryOptions, enabled: false })

  const setSession = useCallback(
    (accessToken: string, user: UserDto) => {
      setAuthToken(accessToken)
      queryClient.setQueryData(currentUserQueryOptions.queryKey, user)
      navigate({ to: resolveLandingPath(user.role), replace: true })
    },
    [navigate, queryClient],
  )

  const signOut = useCallback(() => {
    setAuthToken(null)
    queryClient.removeQueries({ queryKey: currentUserQueryOptions.queryKey })
    navigate({ to: '/login', replace: true })
  }, [navigate, queryClient])

  const value = useMemo(
    () => ({
      user: currentUserQuery.data ?? null,
      setSession,
      signOut,
    }),
    [currentUserQuery.data, setSession, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
