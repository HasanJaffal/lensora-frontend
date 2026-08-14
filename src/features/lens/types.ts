// Decimal fields serialize as JSON strings (e.g. "45.00") to preserve precision.
export type LensOptionDto = {
  id: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  price: string
}

export type LensCatalogDto = {
  types: LensOptionDto[]
  materials: LensOptionDto[]
  coatings: LensOptionDto[]
  tints: LensOptionDto[]
}

export type FrameUse = 'eyeglasses' | 'sunglasses' | 'contacts'

// The inventory contract is owned by the stock feature; frames are the same `/inventory` rows.
export type { InventoryItemDto } from '@/features/stock/types'

export type CreateOrderRequest = {
  patientId: string
  lensTypeId: string
  materialId: string
  coatingIds: string[]
  tintId: string
  frameId: string
}

export type OrderItemDto = {
  labelEn: string
  labelAr: string
  price: string
}

export type OrderFrameDto = {
  sku: string | null
  name: string | null
}

export type OrderDto = {
  id: string
  patientId: string
  items: OrderItemDto[]
  total: string
  deposit: string
  depositPercent: string
  frame: OrderFrameDto
  createdAt: string
}

export type LensSelection = {
  lensTypeId: string | null
  materialId: string | null
  coatingIds: string[]
  tintId: string | null
  frameId: string | null
}
