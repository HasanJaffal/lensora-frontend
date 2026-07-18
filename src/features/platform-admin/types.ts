export type OrganizationDto = {
  id: string
  name: string
  slug: string
  depositPercent: number
  adminEmail: string
  adminDisplayNameEn: string
  adminDisplayNameAr: string
  createdAt: string
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
