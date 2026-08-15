import { type InventoryItemDto } from '../types'

export function filterInventoryBySearch(
  items: InventoryItemDto[],
  search: string,
): InventoryItemDto[] {
  const query = search.trim().toLowerCase()

  if (query.length === 0) {
    return items
  }

  return items.filter((item) =>
    [item.name, item.brand, item.sku, item.spec].some((field) =>
      field.toLowerCase().includes(query),
    ),
  )
}
