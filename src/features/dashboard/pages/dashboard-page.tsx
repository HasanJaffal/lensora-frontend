import { EmptyState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

export function DashboardPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{t('dashboard.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('dashboard.subtitle')}</p>
      </div>
      <EmptyState />
    </div>
  )
}
