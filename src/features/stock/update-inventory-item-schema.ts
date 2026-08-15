import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

import { nonNegativeNumber } from './inventory-field-schemas'

export type UpdateInventoryItemFormValues = {
  qty: string
  threshold: string
  price: string
}

export function updateInventoryItemSchema(t: I18nContextValue['t']) {
  return z.object({
    qty: nonNegativeNumber(t, true),
    threshold: nonNegativeNumber(t, true),
    price: nonNegativeNumber(t, false),
  })
}
