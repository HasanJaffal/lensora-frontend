export type OrganizationDto = {
  id: string
  name: string
  slug: string
  depositPercent: number
  isActive: boolean
  adminEmail: string
  adminDisplayNameEn: string
  adminDisplayNameAr: string
  createdAt: string
}

export type SetOrganizationStatusRequest = {
  id: string
  isActive: boolean
}

export type PlatformAdminDashboardDto = {
  totalOrganizations: number
  activeOrganizations: number
  inactiveOrganizations: number
  organizationsCreatedThisMonth: number
}

export type CreateOrganizationRequest = {
  name: string
  slug: string
  depositPercent: number
  adminEmail: string
  adminPassword: string
  adminDisplayNameEn: string
  adminDisplayNameAr: string
}
