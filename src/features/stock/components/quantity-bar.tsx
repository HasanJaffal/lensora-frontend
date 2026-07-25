import { Progress } from '@/components/ui/progress'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { resolveQuantityBarClass } from '../services/stock-appearance'
import { type StockStatus } from '../types'

const RATIO_TO_PERCENT = 100

type QuantityBarProps = {
  qty: number
  quantityRatio: number
  status: StockStatus
  threshold: number
}

export function QuantityBar({ qty, quantityRatio, status, threshold }: QuantityBarProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-sm text-foreground">{qty}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {t('stock.item.threshold', { threshold })}
        </span>
      </div>
      <Progress
        value={quantityRatio * RATIO_TO_PERCENT}
        aria-label={t('stock.item.quantityBarLabel', { qty })}
        className={cn('block', resolveQuantityBarClass(status))}
      />
    </div>
  )
}
