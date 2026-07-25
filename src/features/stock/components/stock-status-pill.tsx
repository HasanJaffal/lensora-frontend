import { StatusPill } from '@/components/custom/status-pill'
import { useTranslation } from '@/lib/i18n'

import { resolveStockStatusLabelKey, resolveStockStatusTone } from '../services/stock-appearance'
import { type StockStatus } from '../types'

type StockStatusPillProps = {
  status: StockStatus
}

export function StockStatusPill({ status }: StockStatusPillProps) {
  const { t } = useTranslation()

  return (
    <StatusPill tone={resolveStockStatusTone(status)}>
      {t(resolveStockStatusLabelKey(status))}
    </StatusPill>
  )
}
