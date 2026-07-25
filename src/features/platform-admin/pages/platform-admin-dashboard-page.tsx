import { Building2, CalendarPlus, CircleCheck, CircleSlash } from 'lucide-react'

import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { KpiCard } from '@/features/dashboard'
import { useTranslation } from '@/lib/i18n'

import { usePlatformAdminDashboard } from '../hooks'

const numberFormatter = new Intl.NumberFormat('en-US')

export function PlatformAdminDashboardPage() {
  const { t } = useTranslation()
  const dashboardQuery = usePlatformAdminDashboard()

  if (dashboardQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return <ErrorState description={t('platformAdmin.dashboard.loadError')} />
  }

  const {
    activeOrganizations,
    inactiveOrganizations,
    organizationsCreatedThisMonth,
    totalOrganizations,
  } = dashboardQuery.data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {t('platformAdmin.dashboard.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('platformAdmin.dashboard.subtitle')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Building2}
          label={t('platformAdmin.dashboard.totalOrganizations')}
          value={numberFormatter.format(totalOrganizations)}
        />
        <KpiCard
          icon={CircleCheck}
          label={t('platformAdmin.dashboard.activeOrganizations')}
          value={numberFormatter.format(activeOrganizations)}
        />
        <KpiCard
          icon={CircleSlash}
          label={t('platformAdmin.dashboard.inactiveOrganizations')}
          value={numberFormatter.format(inactiveOrganizations)}
        />
        <KpiCard
          icon={CalendarPlus}
          label={t('platformAdmin.dashboard.createdThisMonth')}
          value={numberFormatter.format(organizationsCreatedThisMonth)}
        />
      </div>
    </div>
  )
}
