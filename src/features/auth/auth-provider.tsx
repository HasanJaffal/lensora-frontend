import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { ApiError } from '@/lib/api-error'
import { getAuthToken, setAuthToken } from '@/lib/auth-token'

import { AuthContext } from './auth-context'
import { fetchCurrentUser } from './api'
import { authKeys } from './query-keys'
import { type UserDto } from './types'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const currentUserQuery = useQuery<UserDto | null>({
    queryKey: authKeys.currentUser,
    queryFn: () => (getAuthToken() === null ? null : fetchCurrentUser()),
    retry: false,
    staleTime: Infinity,
  })

  const isSessionExpired =
    currentUserQuery.error instanceof ApiError && currentUserQuery.error.status === 401

  useEffect(() => {
    if (isSessionExpired) {
      setAuthToken(null)
      navigate({ to: '/login' })
    }
  }, [isSessionExpired, navigate])

  const setSession = useCallback(
    (accessToken: string, user: UserDto) => {
      setAuthToken(accessToken)
      queryClient.setQueryData(authKeys.currentUser, user)
      if (user.role === 'platformAdmin') {
        navigate({ to: '/platform-admin' })
        return
      }
      navigate({ to: '/' })
    },
    [navigate, queryClient],
  )

  const signOut = useCallback(() => {
    setAuthToken(null)
    queryClient.setQueryData(authKeys.currentUser, null)
    navigate({ to: '/login' })
  }, [navigate, queryClient])

  const user = currentUserQuery.data ?? null

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isHydrating: currentUserQuery.isLoading,
      setSession,
      signOut,
    }),
    [user, currentUserQuery.isLoading, setSession, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
