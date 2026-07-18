export type OrganizationSummaryDto = {
  id: string
  name: string
  slug: string
}

export type UserRole = 'organizationAdmin' | 'platformAdmin'

export type UserDto = {
  id: string
  email: string
  displayNameEn: string
  displayNameAr: string
  role: UserRole
  organization: OrganizationSummaryDto | null
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: UserDto
}
