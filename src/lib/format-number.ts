import { type Locale } from '@/lib/i18n'

// Prices cross the API as decimal strings; every formatter here accepts both forms.
type NumericValue = number | string

const localeTags: Record<Locale, string> = {
  en: 'en-US',
  ar: 'ar-EG',
}

const CURRENCY_CODE = 'USD'

function toFiniteNumber(value: NumericValue): number | null {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) ? numericValue : null
}

export function formatCount(value: NumericValue, locale: Locale): string {
  const numericValue = toFiniteNumber(value)

  return numericValue === null
    ? '—'
    : new Intl.NumberFormat(localeTags[locale]).format(numericValue)
}

export function formatCurrency(value: NumericValue, locale: Locale): string {
  const numericValue = toFiniteNumber(value)

  if (numericValue === null) {
    return '—'
  }

  return new Intl.NumberFormat(localeTags[locale], {
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(numericValue)
}

export function formatCurrencyPrecise(value: NumericValue, locale: Locale): string {
  const numericValue = toFiniteNumber(value)

  if (numericValue === null) {
    return '—'
  }

  return new Intl.NumberFormat(localeTags[locale], {
    currency: CURRENCY_CODE,
    style: 'currency',
  }).format(numericValue)
}
