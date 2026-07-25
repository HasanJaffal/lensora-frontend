import { type PublicCategory } from './types'

export const storefrontKeys = {
  organization: (slug: string) => ['storefront', slug] as const,
  products: (slug: string, category: PublicCategory) =>
    ['storefront', slug, 'products', category] as const,
}
