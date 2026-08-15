import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

export function nonNegativeNumber(t: I18nContextValue['t'], isInteger: boolean) {
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
