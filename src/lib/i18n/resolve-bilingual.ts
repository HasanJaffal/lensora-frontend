import { type Locale } from './types'

export type BilingualValue = {
  en: string
  ar: string
}

export type ResolvedBilingual = {
  primary: string
  secondary: string
}

export function resolveBilingual(value: BilingualValue, locale: Locale): ResolvedBilingual {
  if (locale === 'ar') {
    return { primary: value.ar, secondary: value.en }
  }

  return { primary: value.en, secondary: value.ar }
}
