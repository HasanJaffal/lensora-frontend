import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

export type LoginFormValues = {
  email: string
  password: string
}

export function createLoginSchema(t: I18nContextValue['t']) {
  return z.object({
    email: z
      .string()
      .min(1, t('forms.validation.required'))
      .pipe(z.email(t('forms.validation.email'))),
    password: z.string().min(1, t('forms.validation.required')),
  })
}
