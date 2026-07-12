import * as React from 'react'

import {
  I18nContext,
  createBackendErrorTranslator,
  createTranslator,
  defaultLocale,
  localeDirections,
  type Locale,
} from './types'

type I18nProviderProps = {
  children: React.ReactNode
}

const localeStorageKey = 'sour-optic-locale'

function getInitialLocale(): Locale {
  const storedLocale = window.localStorage.getItem(localeStorageKey)

  if (storedLocale === 'en' || storedLocale === 'ar') {
    return storedLocale
  }

  if (window.navigator.language.toLowerCase().startsWith('ar')) {
    return 'ar'
  }

  return defaultLocale
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = React.useState<Locale>(getInitialLocale)

  const setLocale = React.useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem(localeStorageKey, nextLocale)
  }, [])

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }, [locale, setLocale])

  const t = React.useMemo(() => createTranslator(locale), [locale])
  const translateBackendError = React.useMemo(() => createBackendErrorTranslator(t), [t])
  const direction = localeDirections[locale]

  React.useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = direction
  }, [direction, locale])

  const value = React.useMemo(
    () => ({
      direction,
      locale,
      setLocale,
      t,
      toggleLocale,
      translateBackendError,
    }),
    [direction, locale, setLocale, t, toggleLocale, translateBackendError],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
