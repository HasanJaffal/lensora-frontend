import { Eye } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'

export function LoginPage() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Eye className="size-5" aria-hidden="true" />
        </div>
        <h1 className="text-lg font-semibold text-card-foreground">{t('login.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('login.subtitle')}</p>
      </div>
    </main>
  )
}
