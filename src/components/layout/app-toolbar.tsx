import { Bell, Menu } from 'lucide-react'

import { ThemeSwitch } from '@/components/custom/theme-switch'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n'

type AppToolbarProps = {
  onOpenNavigation: () => void
}

export function AppToolbar({ onOpenNavigation }: AppToolbarProps) {
  const { locale, t, toggleLocale } = useTranslation()
  const languageLabel = t(
    locale === 'en' ? 'common.actions.switchToArabic' : 'common.actions.switchToEnglish',
  )

  return (
    <header className="flex h-16 shrink-0 items-center bg-card px-3 sm:px-4">
      <div className="flex w-full items-center justify-between">
        <div className="min-w-0 ps-2">
          <p className="truncate text-sm font-semibold">{t('common.app.name')}</p>
          <p className="truncate text-xs text-muted-foreground">{t('common.app.tagline')}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={t('common.navigation.notifications')}
            title={t('common.navigation.notifications')}
          >
            <Bell className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={languageLabel}
            title={languageLabel}
            onClick={toggleLocale}
          >
            <span className="text-xs font-semibold uppercase">{locale === 'en' ? 'AR' : 'EN'}</span>
          </Button>
          <ThemeSwitch />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={onOpenNavigation}
            aria-label={t('common.navigation.openNavigation')}
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  )
}
