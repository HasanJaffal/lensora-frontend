import { type Locale } from '@/lib/i18n'

export const assistantKeys = {
  suggestions: (locale: Locale) => ['assistant', 'suggestions', locale] as const,
}
