import { type TipCategory } from './types'

export const tipsKeys = {
  list: (category: TipCategory | undefined) => ['tips', 'list', category ?? 'all'] as const,
}
