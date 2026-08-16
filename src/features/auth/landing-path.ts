import { type UserRole } from './types'

export type LandingPath = '/' | '/platform-admin'

export function resolveLandingPath(role: UserRole): LandingPath {
  return role === 'platformAdmin' ? '/platform-admin' : '/'
}
