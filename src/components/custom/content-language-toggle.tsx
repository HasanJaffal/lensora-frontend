import { Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n'

export function ContentLanguageToggle() {
  const { locale, t, toggleLocale } = useTranslation()
  const languageLabel = t(
    locale === 'en' ? 'common.actions.switchToArabic' : 'common.actions.switchToEnglish',
  )

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={languageLabel}
      title={languageLabel}
      onClick={toggleLocale}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span>{locale === 'en' ? 'AR' : 'EN'}</span>
    </Button>
  )
}
