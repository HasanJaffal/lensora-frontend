import { CalendarClock, FlaskConical, TriangleAlert, Wallet } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'

import { type DashboardKpisDto } from '../types'
import { KpiCard } from './kpi-card'

type KpiGridProps = {
  kpis: DashboardKpisDto
}

const numberFormatter = new Intl.NumberFormat('en-US')
const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency',
})

export function KpiGrid({ kpis }: KpiGridProps) {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        delta={kpis.appointmentsToday.delta}
        icon={CalendarClock}
        label={t('dashboard.kpis.appointmentsToday')}
        value={numberFormatter.format(kpis.appointmentsToday.value)}
      />
      <KpiCard
        delta={kpis.ordersInLab.delta}
        icon={FlaskConical}
        label={t('dashboard.kpis.ordersInLab')}
        value={numberFormatter.format(kpis.ordersInLab.value)}
      />
      <KpiCard
        delta={kpis.stockAlerts.delta}
        icon={TriangleAlert}
        label={t('dashboard.kpis.stockAlerts')}
        value={numberFormatter.format(kpis.stockAlerts.value)}
      />
      <KpiCard
        delta={kpis.revenueThisMonth.delta}
        icon={Wallet}
        label={t('dashboard.kpis.revenueThisMonth')}
        value={currencyFormatter.format(kpis.revenueThisMonth.value)}
      />
    </div>
  )
}
