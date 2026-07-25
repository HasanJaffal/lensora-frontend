import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { useRouterState } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

import { ThemeSwitch } from '@/components/custom/theme-switch'
import { getPageTitleKey } from '@/components/constants/route-titles'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n'

type PlatformAdminToolbarProps = {
  onOpenNavigation: () => void
}

export function PlatformAdminToolbar({ onOpenNavigation }: PlatformAdminToolbarProps) {
  const { locale, t, toggleLocale } = useTranslation()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const pageTitle = t(getPageTitleKey(pathname))
  const today = format(new Date(), 'PPP', { locale: locale === 'ar' ? ar : enUS })
  const languageLabel = t(
    locale === 'en' ? 'common.actions.switchToArabic' : 'common.actions.switchToEnglish',
  )

  return (
    <header className="flex h-16 shrink-0 items-center bg-card px-3 sm:px-4">
      <div className="flex w-full items-center gap-3">
        <div className="min-w-0 ps-2">
          <p className="truncate text-sm font-semibold">{pageTitle}</p>
          <p className="truncate text-xs text-muted-foreground">{today}</p>
        </div>

        <div className="ms-auto flex items-center gap-2">
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
