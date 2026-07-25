import { apiClient } from '@/lib/api-client'

import {
  type CreateOrderRequest,
  type FrameUse,
  type InventoryItemDto,
  type LensCatalogDto,
  type OrderDto,
} from './types'

export function getLensCatalog(): Promise<LensCatalogDto> {
  return apiClient.get<LensCatalogDto>('/lenses/catalog')
}

export function getInStockFrames(use: FrameUse): Promise<InventoryItemDto[]> {
  return apiClient.get<InventoryItemDto[]>('/inventory/frames', {
    query: { use, inStock: true },
  })
}

export function createLensOrder(request: CreateOrderRequest): Promise<OrderDto> {
  return apiClient.post<OrderDto>('/lenses/orders', request)
}
