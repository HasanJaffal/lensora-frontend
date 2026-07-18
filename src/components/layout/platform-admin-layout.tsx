import { Eye, LogOut } from 'lucide-react'
import type { ReactNode } from 'react'

import { ThemeSwitch } from '@/components/custom/theme-switch'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/auth-context'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

type PlatformAdminLayoutProps = {
  children: ReactNode
}

export function PlatformAdminLayout({ children }: PlatformAdminLayoutProps) {
  const { locale, t, toggleLocale } = useTranslation()
  const { user, signOut } = useAuth()
  const adminName = user
    ? resolveBilingual({ en: user.displayNameEn, ar: user.displayNameAr }, locale).primary
    : '—'
  const languageLabel = t(
    locale === 'en' ? 'common.actions.switchToArabic' : 'common.actions.switchToEnglish',
  )

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <header className="flex h-16 shrink-0 items-center border-b border-border bg-card px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Eye className="size-4.5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{t('platformAdmin.layout.title')}</p>
            <p className="truncate text-xs text-muted-foreground">{adminName}</p>
          </div>
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
            type="button"
            variant="outline"
            size="icon"
            aria-label={t('common.actions.signOut')}
            title={t('common.actions.signOut')}
            onClick={signOut}
          >
            <LogOut className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">{children}</main>
    </div>
  )
}
