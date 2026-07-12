import { createContext } from 'react'

import { isBackendErrorKey } from '@/lib/i18n/backend-error-keys'

import { arMessages } from './messages/ar'
import { enMessages, type I18nMessages } from './messages/en'

export type Locale = 'en' | 'ar'

export type Direction = 'ltr' | 'rtl'

export type TranslationValues = Record<string, string | number>

type NestedTranslationKey<TMessages> = {
  [Key in Extract<keyof TMessages, string>]: TMessages[Key] extends string
    ? Key
    : `${Key}.${NestedTranslationKey<TMessages[Key]>}`
}[Extract<keyof TMessages, string>]

export type TranslationKey = NestedTranslationKey<I18nMessages>

export type I18nContextValue = {
  direction: Direction
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, values?: TranslationValues) => string
  toggleLocale: () => void
  translateBackendError: (key: string) => string
}

export const messages = {
  en: enMessages,
  ar: arMessages,
} as const

export const localeDirections = {
  en: 'ltr',
  ar: 'rtl',
} as const satisfies Record<Locale, Direction>

export const defaultLocale = 'en' satisfies Locale

export const I18nContext = createContext<I18nContextValue | null>(null)

function formatMessage(message: string, values?: TranslationValues) {
  if (!values) {
    return message
  }

  return Object.entries(values).reduce(
    (formattedMessage, [key, value]) => formattedMessage.replaceAll(`{${key}}`, String(value)),
    message,
  )
}

export function createTranslator(locale: Locale) {
  return (key: TranslationKey, values?: TranslationValues) => {
    const message = key.split('.').reduce<unknown>((currentValue, keyPart) => {
      if (!currentValue || typeof currentValue !== 'object') {
        return undefined
      }

      return (currentValue as Record<string, unknown>)[keyPart]
    }, messages[locale])

    if (typeof message === 'string') {
      return formatMessage(message, values)
    }

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`Missing translation for key: ${key}`)
    }

    return key
  }
}

export function createBackendErrorTranslator(t: I18nContextValue['t']) {
  return (key: string) => {
    if (!isBackendErrorKey(key)) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(`Unknown backend error key: ${key}`)
      }

      return t('backendErrors.unknownKey', { key })
    }

    return t(`backendErrors.${key}` as TranslationKey)
  }
}
