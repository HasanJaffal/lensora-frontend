export type StockCategory = 'frame' | 'sun' | 'lens' | 'contact' | 'solution' | 'care'

export type StockCategoryFilter = StockCategory | 'all'

export type StockStatus = 'inStock' | 'low' | 'out'

// Decimal fields serialize as JSON strings (e.g. "145.00") to preserve precision.
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
  price: string
  status: StockStatus
  quantityRatio: number
}

export type InventoryStatsDto = {
  totalSkus: number
  lowStockCount: number
  outOfStockCount: number
  totalValue: string
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

export type InventoryCreateRequest = {
  category: StockCategory
  name: string
  brand: string
  spec: string
  shape: string | null
  color: string | null
  sku: string
  qty: number
  threshold: number
  price: number
}

export type UpdateInventoryItemVariables = {
  itemId: string
  changes: InventoryUpdateRequest
}

export type StockViewMode = 'grid' | 'list'
