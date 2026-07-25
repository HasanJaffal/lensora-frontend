import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

export type UpdateInventoryItemFormValues = {
  qty: string
  threshold: string
  price: string
}

function nonNegativeNumber(t: I18nContextValue['t'], isInteger: boolean) {
  return z
    .string()
    .min(1, t('forms.validation.required'))
    .refine((value) => value.trim() !== '' && !Number.isNaN(Number(value)), {
      message: t('forms.validation.number'),
    })
    .refine((value) => Number(value) >= 0, { message: t('stock.edit.negativeValue') })
    .refine((value) => !isInteger || Number.isInteger(Number(value)), {
      message: t('stock.edit.wholeNumber'),
    })
}

export function updateInventoryItemSchema(t: I18nContextValue['t']) {
  return z.object({
    qty: nonNegativeNumber(t, true),
    threshold: nonNegativeNumber(t, true),
    price: nonNegativeNumber(t, false),
  })
}
