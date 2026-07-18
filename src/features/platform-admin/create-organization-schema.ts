import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

export type CreateOrganizationFormValues = {
  name: string
  slug: string
  depositPercent: string
  adminEmail: string
  adminPassword: string
  adminDisplayNameEn: string
  adminDisplayNameAr: string
}

export function createOrganizationSchema(t: I18nContextValue['t']) {
  const required = t('forms.validation.required')

  return z.object({
    name: z.string().min(1, required),
    slug: z
      .string()
      .min(1, required)
      .regex(/^[a-z0-9-]+$/, t('platformAdmin.form.slugPattern')),
    depositPercent: z
      .string()
      .min(1, required)
      .refine((value) => !Number.isNaN(Number(value)), t('forms.validation.number'))
      .refine((value) => {
        const numericValue = Number(value)
        return numericValue >= 0 && numericValue <= 1
      }, t('platformAdmin.form.depositPercentRange')),
    adminEmail: z
      .string()
      .min(1, required)
      .pipe(z.email(t('forms.validation.email'))),
    adminPassword: z.string().min(8, t('platformAdmin.form.passwordMinLength')),
    adminDisplayNameEn: z.string().min(1, required),
    adminDisplayNameAr: z.string().min(1, required),
  })
}
