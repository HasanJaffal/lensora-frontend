import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, Plus } from 'lucide-react'

import { ContentLanguageToggle } from '@/components/custom/content-language-toggle'
import { ThemeSwitch } from '@/components/custom/theme-switch'
import { getPageTitleKey } from '@/components/constants/route-titles'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/constants/button-variants'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type AppToolbarProps = {
  onOpenNavigation: () => void
}

export function AppToolbar({ onOpenNavigation }: AppToolbarProps) {
  const { locale, t } = useTranslation()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const pageTitle = t(getPageTitleKey(pathname))
  const today = format(new Date(), 'PPP', { locale: locale === 'ar' ? ar : enUS })

  return (
    <header className="flex h-16 shrink-0 items-center bg-card px-3 sm:px-4">
      <div className="flex w-full items-center gap-3">
        <div className="min-w-0 ps-2">
          <p className="truncate text-sm font-semibold">{pageTitle}</p>
          <p className="truncate text-xs text-muted-foreground">{today}</p>
        </div>

        <div className="ms-auto flex items-center gap-2">
          <Link to="/lens" className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
            <Plus className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t('common.actions.newRx')}</span>
          </Link>
          <ContentLanguageToggle />
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
