export type OrganizationSummaryDto = {
  id: string
  name: string
  slug: string
}

export type UserDto = {
  id: string
  email: string
  displayNameEn: string
  displayNameAr: string
  role: string
  organization: OrganizationSummaryDto
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: UserDto
}
