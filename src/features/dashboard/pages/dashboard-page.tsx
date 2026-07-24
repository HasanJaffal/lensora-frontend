import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { GreetingBanner } from '../components/greeting-banner'
import { KpiGrid } from '../components/kpi-grid'
import { LowStockAlertCard } from '../components/low-stock-alert-card'
import { ReadyForPickupCard } from '../components/ready-for-pickup-card'
import { TodaysScheduleCard } from '../components/todays-schedule-card'
import { useDashboardSummary } from '../hooks'

export function DashboardPage() {
  const { t } = useTranslation()
  const summaryQuery = useDashboardSummary()

  if (summaryQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (summaryQuery.isError || !summaryQuery.data) {
    return <ErrorState description={t('feedback.error.description')} />
  }

  const { greeting, kpis, lowStock, readyForPickup, schedule } = summaryQuery.data

  return (
    <div className="space-y-6">
      <GreetingBanner greeting={greeting} />
      <KpiGrid kpis={kpis} />
      <div className="grid gap-4 lg:grid-cols-3">
        <TodaysScheduleCard className="lg:col-span-2" schedule={schedule} />
        <div className="space-y-4">
          <ReadyForPickupCard readyForPickup={readyForPickup} />
          <LowStockAlertCard lowStock={lowStock} />
        </div>
      </div>
    </div>
  )
}
