import { createContext, useContext } from 'react'

import { type UserDto } from './types'

export type AuthContextValue = {
  user: UserDto | null
  isAuthenticated: boolean
  isHydrating: boolean
  setSession: (accessToken: string, user: UserDto) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
