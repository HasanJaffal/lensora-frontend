import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

import { nonNegativeNumber } from './inventory-field-schemas'
import { stockCategories } from './services/stock-appearance'

export type CreateInventoryItemFormValues = {
  category: string
  name: string
  brand: string
  spec: string
  shape: string
  color: string
  sku: string
  qty: string
  threshold: string
  price: string
}

export function createInventoryItemSchema(t: I18nContextValue['t']) {
  const required = t('forms.validation.required')

  return z.object({
    category: z.enum(stockCategories, { message: required }),
    name: z.string().trim().min(1, required),
    brand: z.string().trim().min(1, required),
    spec: z.string().trim().min(1, required),
    shape: z.string(),
    color: z.string(),
    sku: z.string().trim().min(1, required),
    qty: nonNegativeNumber(t, true),
    threshold: nonNegativeNumber(t, true),
    price: nonNegativeNumber(t, false),
  })
}
