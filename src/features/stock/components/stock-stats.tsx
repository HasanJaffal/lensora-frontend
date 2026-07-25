import { Boxes, CircleOff, TriangleAlert, Wallet } from 'lucide-react'

import { KpiCard } from '@/features/dashboard'
import { useTranslation } from '@/lib/i18n'

import { type InventoryStatsDto } from '../types'

type StockStatsProps = {
  stats: InventoryStatsDto
}

const numberFormatter = new Intl.NumberFormat('en-US')
const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency',
})

export function StockStats({ stats }: StockStatsProps) {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={Boxes}
        label={t('stock.stats.totalSkus')}
        value={numberFormatter.format(stats.totalSkus)}
      />
      <KpiCard
        icon={TriangleAlert}
        label={t('stock.stats.lowStockCount')}
        value={numberFormatter.format(stats.lowStockCount)}
      />
      <KpiCard
        icon={CircleOff}
        label={t('stock.stats.outOfStockCount')}
        value={numberFormatter.format(stats.outOfStockCount)}
      />
      <KpiCard
        icon={Wallet}
        label={t('stock.stats.totalValue')}
        value={currencyFormatter.format(stats.totalValue)}
      />
    </div>
  )
}
