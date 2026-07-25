import { type InventoryFilters } from './types'

export const stockKeys = {
  all: ['inventory'] as const,
  lists: () => [...stockKeys.all, 'list'] as const,
  list: (filters: InventoryFilters) =>
    [...stockKeys.lists(), filters.category ?? 'all', filters.lowStock] as const,
  stats: () => [...stockKeys.all, 'stats'] as const,
}
