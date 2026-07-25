import { apiClient } from '@/lib/api-client'

import { type PublicCategory, type PublicOrganizationDto, type PublicProductDto } from './types'

export function getStorefront(slug: string): Promise<PublicOrganizationDto> {
  return apiClient.get<PublicOrganizationDto>(`/storefront/${encodeURIComponent(slug)}`)
}

export function getStorefrontProducts(
  slug: string,
  category: PublicCategory,
): Promise<PublicProductDto[]> {
  return apiClient.get<PublicProductDto[]>(`/storefront/${encodeURIComponent(slug)}/products`, {
    query: { category },
  })
}
