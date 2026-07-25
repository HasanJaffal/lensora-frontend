export type StockCategory = 'frame' | 'sun' | 'lens' | 'contact' | 'solution' | 'care'

export type StockCategoryFilter = StockCategory | 'all'

export type StockStatus = 'inStock' | 'low' | 'out'

export type InventoryItemDto = {
  id: string
  category: string
  name: string
  brand: string
  spec: string
  shape: string | null
  color: string | null
  sku: string
  qty: number
  threshold: number
  price: number
  status: StockStatus
  quantityRatio: number
}

export type InventoryStatsDto = {
  totalSkus: number
  lowStockCount: number
  outOfStockCount: number
  totalValue: number
}

export type InventoryFilters = {
  category: StockCategory | undefined
  lowStock: boolean
}

export type InventoryUpdateRequest = {
  qty?: number
  threshold?: number
  price?: number
}

export type UpdateInventoryItemVariables = {
  itemId: string
  changes: InventoryUpdateRequest
}

export type StockViewMode = 'grid' | 'list'
