import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createInventoryItem,
  deleteInventoryItem,
  getInventoryStats,
  listInventory,
  updateInventoryItem,
} from './api'
import { stockKeys } from './query-keys'
import { type InventoryFilters, type UpdateInventoryItemVariables } from './types'

const STATS_STALE_TIME_MS = 60_000

export function useInventory(filters: InventoryFilters) {
  return useQuery({
    queryKey: stockKeys.list(filters),
    queryFn: () => listInventory(filters),
  })
}

export function useInventoryStats() {
  return useQuery({
    queryKey: stockKeys.stats(),
    queryFn: getInventoryStats,
    staleTime: STATS_STALE_TIME_MS,
    refetchOnWindowFocus: false,
  })
}

function useInventoryInvalidation() {
  const queryClient = useQueryClient()

  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: stockKeys.lists() }),
      queryClient.invalidateQueries({ queryKey: stockKeys.stats() }),
    ])
  }
}

export function useCreateInventoryItem() {
  const invalidateInventory = useInventoryInvalidation()

  return useMutation({
    mutationFn: createInventoryItem,
    onSuccess: invalidateInventory,
  })
}

export function useUpdateInventoryItem() {
  const invalidateInventory = useInventoryInvalidation()

  return useMutation({
    mutationFn: ({ itemId, changes }: UpdateInventoryItemVariables) =>
      updateInventoryItem(itemId, changes),
    onSuccess: invalidateInventory,
  })
}

export function useDeleteInventoryItem() {
  const invalidateInventory = useInventoryInvalidation()

  return useMutation({
    mutationFn: deleteInventoryItem,
    onSuccess: invalidateInventory,
  })
}
