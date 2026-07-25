import { type ProductNeed } from '@/features/try-on'

import { type PublicCategory } from '../types'

// Customers can only browse what the try-on overlay renders, so contacts are excluded.
export const storefrontNeeds: ProductNeed[] = ['eyeglasses', 'sunglasses']

const needCategories: Record<'eyeglasses' | 'sunglasses', PublicCategory> = {
  eyeglasses: 'frame',
  sunglasses: 'sun',
}

export function toPublicCategory(need: ProductNeed): PublicCategory {
  return need === 'sunglasses' ? needCategories.sunglasses : needCategories.eyeglasses
}
