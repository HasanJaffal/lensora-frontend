import { CalendarClock, FlaskConical, TriangleAlert, Wallet } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { formatCount, formatCurrency } from '@/lib/format-number'

import { type DashboardKpisDto } from '../types'
import { KpiCard } from './kpi-card'

type KpiGridProps = {
  kpis: DashboardKpisDto
}

export function KpiGrid({ kpis }: KpiGridProps) {
  const { locale, t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        delta={kpis.appointmentsToday.delta}
        icon={CalendarClock}
        label={t('dashboard.kpis.appointmentsToday')}
        value={formatCount(kpis.appointmentsToday.value, locale)}
      />
      <KpiCard
        delta={kpis.ordersInLab.delta}
        icon={FlaskConical}
        label={t('dashboard.kpis.ordersInLab')}
        value={formatCount(kpis.ordersInLab.value, locale)}
      />
      <KpiCard
        delta={kpis.stockAlerts.delta}
        icon={TriangleAlert}
        label={t('dashboard.kpis.stockAlerts')}
        value={formatCount(kpis.stockAlerts.value, locale)}
      />
      <KpiCard
        delta={kpis.revenueThisMonth.delta}
        icon={Wallet}
        label={t('dashboard.kpis.revenueThisMonth')}
        value={formatCurrency(kpis.revenueThisMonth.value, locale)}
      />
    </div>
  )
}
