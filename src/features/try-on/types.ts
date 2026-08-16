import { type FrameUse } from '@/features/lens/types'

export type ProductNeed = FrameUse

// The only fields the try-on renderer reads. Kept narrower than InventoryItemDto so the
// same components serve both the tenant catalog and the public storefront catalog.
export type TryOnFrame = {
  id: string
  name: string
  brand: string
  shape: string | null
  color: string | null
}

export type FrameShape =
  'rectangular' | 'round' | 'cat-eye' | 'aviator' | 'wayfarer' | 'clubmaster' | 'sport'

export type OverlayScale = {
  height: number
  width: number
}
