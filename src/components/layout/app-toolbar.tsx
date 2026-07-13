import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, Plus, Search } from 'lucide-react'

import { ThemeSwitch } from '@/components/custom/theme-switch'
import { getPageTitleKey } from '@/components/constants/route-titles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { buttonVariants } from '@/components/constants/button-variants'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type AppToolbarProps = {
  onOpenNavigation: () => void
}

export function AppToolbar({ onOpenNavigation }: AppToolbarProps) {
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

        <div className="relative ms-auto hidden max-w-xs flex-1 items-center lg:flex">
          <Search
            className="pointer-events-none absolute start-2.5 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            aria-label={t('common.actions.search')}
            placeholder={t('patients.searchPlaceholder')}
            className="h-9 ps-8"
          />
        </div>

        <div className={cn('flex items-center gap-2', 'ms-auto lg:ms-0')}>
          <Link to="/lens" className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
            <Plus className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t('common.actions.newRx')}</span>
          </Link>
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
