import { apiClient } from '@/lib/api-client'

import {
  type InventoryFilters,
  type InventoryItemDto,
  type InventoryStatsDto,
  type InventoryUpdateRequest,
} from './types'

export function listInventory(filters: InventoryFilters): Promise<InventoryItemDto[]> {
  return apiClient.get<InventoryItemDto[]>('/inventory', {
    query: { category: filters.category, lowStock: filters.lowStock ? true : undefined },
  })
}

export function getInventoryStats(): Promise<InventoryStatsDto> {
  return apiClient.get<InventoryStatsDto>('/inventory/stats')
}

export function updateInventoryItem(
  itemId: string,
  changes: InventoryUpdateRequest,
): Promise<InventoryItemDto> {
  return apiClient.patch<InventoryItemDto>(`/inventory/${itemId}`, changes)
}
