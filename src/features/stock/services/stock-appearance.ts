import { type StatusPillTone } from '@/components/custom/status-pill'
import { type TranslationKey } from '@/lib/i18n'

import { type StockCategory, type StockCategoryFilter, type StockStatus } from '../types'

export const stockCategories: StockCategory[] = [
  'frame',
  'sun',
  'lens',
  'contact',
  'solution',
  'care',
]

export const stockCategoryFilters: StockCategoryFilter[] = ['all', ...stockCategories]

const toneByStockStatus: Record<StockStatus, StatusPillTone> = {
  inStock: 'secondary',
  low: 'accent',
  out: 'destructive',
}

const labelKeyByStockStatus: Record<StockStatus, TranslationKey> = {
  inStock: 'common.stockStatus.inStock',
  low: 'common.stockStatus.low',
  out: 'common.stockStatus.out',
}

const quantityBarClassByStockStatus: Record<StockStatus, string> = {
  inStock: '**:data-[slot=progress-indicator]:bg-primary',
  low: '**:data-[slot=progress-indicator]:bg-accent-foreground',
  out: '**:data-[slot=progress-indicator]:bg-destructive',
}

export function toStockCategoryFilter(value: unknown): StockCategoryFilter {
  return stockCategoryFilters.find((category) => category === value) ?? 'all'
}

export function resolveStockStatusTone(status: StockStatus): StatusPillTone {
  return toneByStockStatus[status]
}

export function resolveStockStatusLabelKey(status: StockStatus): TranslationKey {
  return labelKeyByStockStatus[status]
}

export function resolveQuantityBarClass(status: StockStatus): string {
  return quantityBarClassByStockStatus[status]
}

const labelKeyByCategoryFilter: Record<StockCategoryFilter, TranslationKey> = {
  all: 'stock.categories.all',
  frame: 'stock.categories.frame',
  sun: 'stock.categories.sun',
  lens: 'stock.categories.lens',
  contact: 'stock.categories.contact',
  solution: 'stock.categories.solution',
  care: 'stock.categories.care',
}

export function resolveStockCategoryLabelKey(category: StockCategoryFilter): TranslationKey {
  return labelKeyByCategoryFilter[category]
}
