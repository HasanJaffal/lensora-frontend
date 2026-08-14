import { Boxes, CircleOff, TriangleAlert, Wallet } from 'lucide-react'

import { KpiCard } from '@/features/dashboard'
import { useTranslation } from '@/lib/i18n'
import { formatCount, formatCurrency } from '@/lib/format-number'

import { type InventoryStatsDto } from '../types'

type StockStatsProps = {
  stats: InventoryStatsDto
}

export function StockStats({ stats }: StockStatsProps) {
  const { locale, t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={Boxes}
        label={t('stock.stats.totalSkus')}
        value={formatCount(stats.totalSkus, locale)}
      />
      <KpiCard
        icon={TriangleAlert}
        label={t('stock.stats.lowStockCount')}
        value={formatCount(stats.lowStockCount, locale)}
      />
      <KpiCard
        icon={CircleOff}
        label={t('stock.stats.outOfStockCount')}
        value={formatCount(stats.outOfStockCount, locale)}
      />
      <KpiCard
        icon={Wallet}
        label={t('stock.stats.totalValue')}
        value={formatCurrency(stats.totalValue, locale)}
      />
    </div>
  )
}
