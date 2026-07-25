import { type InventoryItemDto } from '../types'

/** Callers pass either a frame UUID or a SKU — patient records carry `lensConfig.frameSku`. */
export function resolvePreselectedFrame(
  frames: InventoryItemDto[],
  frameIdOrSku: string | undefined,
): InventoryItemDto | null {
  if (!frameIdOrSku) {
    return null
  }

  return frames.find((frame) => frame.id === frameIdOrSku || frame.sku === frameIdOrSku) ?? null
}
