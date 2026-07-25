import { Link } from '@tanstack/react-router'
import { Glasses } from 'lucide-react'

import { ContentLanguageToggle } from '@/components/custom/content-language-toggle'
import { useTranslation } from '@/lib/i18n'

type StorefrontHeaderProps = {
  organizationName: string
  slug: string
}

export function StorefrontHeader({ organizationName, slug }: StorefrontHeaderProps) {
  const { t } = useTranslation()

  const tabClassName = 'rounded-md px-3 py-1.5 text-sm font-medium transition-colors'
  const activeProps = { className: 'bg-primary text-primary-foreground' }
  const inactiveProps = { className: 'text-muted-foreground hover:text-foreground' }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 p-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <Glasses className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{organizationName}</p>
            <p className="truncate text-xs text-muted-foreground">{t('storefront.tagline')}</p>
          </div>
        </div>

        <nav aria-label={t('storefront.nav.label')} className="flex items-center gap-1">
          <Link
            to="/store/$slug"
            params={{ slug }}
            activeOptions={{ exact: true }}
            className={tabClassName}
            activeProps={activeProps}
            inactiveProps={inactiveProps}
          >
            {t('storefront.nav.browse')}
          </Link>
          <Link
            to="/store/$slug/try-on"
            params={{ slug }}
            className={tabClassName}
            activeProps={activeProps}
            inactiveProps={inactiveProps}
          >
            {t('storefront.nav.tryOn')}
          </Link>
        </nav>

        <ContentLanguageToggle />
      </div>
    </header>
  )
}
