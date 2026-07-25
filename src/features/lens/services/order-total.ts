import { type InventoryItemDto, type LensCatalogDto, type LensOptionDto } from '../types'

export type OrderSummaryLine = {
  slot: OrderSlot
  labelEn: string
  labelAr: string
  price: string
}

export type OrderSlot = 'lensType' | 'material' | 'coatings' | 'tint' | 'frame'

function findOption(options: LensOptionDto[], optionId: string | null): LensOptionDto | null {
  if (!optionId) {
    return null
  }

  return options.find((option) => option.id === optionId) ?? null
}

export function buildSummaryLines(
  catalog: LensCatalogDto | undefined,
  frames: InventoryItemDto[] | undefined,
  selection: {
    lensTypeId: string | null
    materialId: string | null
    coatingIds: string[]
    tintId: string | null
    frameId: string | null
  },
): OrderSummaryLine[] {
  if (!catalog) {
    return []
  }

  const lines: OrderSummaryLine[] = []
  const lensType = findOption(catalog.types, selection.lensTypeId)
  const material = findOption(catalog.materials, selection.materialId)
  const tint = findOption(catalog.tints, selection.tintId)

  if (lensType) {
    lines.push({
      slot: 'lensType',
      labelEn: lensType.nameEn,
      labelAr: lensType.nameAr,
      price: lensType.price,
    })
  }

  if (material) {
    lines.push({
      slot: 'material',
      labelEn: material.nameEn,
      labelAr: material.nameAr,
      price: material.price,
    })
  }

  for (const coatingId of selection.coatingIds) {
    const coating = findOption(catalog.coatings, coatingId)

    if (coating) {
      lines.push({
        slot: 'coatings',
        labelEn: coating.nameEn,
        labelAr: coating.nameAr,
        price: coating.price,
      })
    }
  }

  if (tint) {
    lines.push({ slot: 'tint', labelEn: tint.nameEn, labelAr: tint.nameAr, price: tint.price })
  }

  const frame = frames?.find((item) => item.id === selection.frameId) ?? null

  if (frame) {
    lines.push({ slot: 'frame', labelEn: frame.name, labelAr: frame.name, price: frame.price })
  }

  return lines
}

export function calculateRunningTotal(lines: OrderSummaryLine[]): number {
  return lines.reduce((total, line) => {
    const price = Number(line.price)

    return Number.isFinite(price) ? total + price : total
  }, 0)
}

export function formatPrice(value: number | string): string {
  const price = Number(value)

  return Number.isFinite(price) ? price.toFixed(2) : '—'
}
