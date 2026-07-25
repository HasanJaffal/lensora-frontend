import { useQuery } from '@tanstack/react-query'

import { getStorefront, getStorefrontProducts } from './api'
import { storefrontKeys } from './query-keys'
import { type PublicCategory } from './types'

export function useStorefront(slug: string) {
  return useQuery({
    queryKey: storefrontKeys.organization(slug),
    queryFn: () => getStorefront(slug),
    retry: false,
  })
}

export function useStorefrontProducts(slug: string, category: PublicCategory) {
  return useQuery({
    queryKey: storefrontKeys.products(slug, category),
    queryFn: () => getStorefrontProducts(slug, category),
  })
}
