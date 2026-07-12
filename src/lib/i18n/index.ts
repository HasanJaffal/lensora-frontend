import { useContext } from 'react'

import { I18nContext } from './types'

export { backendErrorKeys, isBackendErrorKey } from './backend-error-keys'
export { I18nProvider } from './i18n-provider'
export {
  defaultLocale,
  localeDirections,
  messages,
  type Direction,
  type I18nContextValue,
  type Locale,
  type TranslationKey,
  type TranslationValues,
} from './types'
export type {
  BackendErrorEntity,
  BackendErrorKey,
  BackendErrorMessages,
} from './backend-error-keys'
export { resolveBilingual } from './resolve-bilingual'
export type { BilingualValue, ResolvedBilingual } from './resolve-bilingual'

export function useTranslation() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }

  return context
}
