import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

import { StatusPill, type StatusPillTone } from '@/components/custom/status-pill'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { type LowStockAlertDto, type StockStatus } from '../types'

type LowStockAlertCardProps = {
  className?: string
  lowStock: LowStockAlertDto[]
}

const toneByStockStatus: Record<StockStatus, StatusPillTone> = {
  inStock: 'secondary',
  low: 'accent',
  out: 'destructive',
}

const labelKeyByStockStatus: Record<StockStatus, TranslationKey> = {
  inStock: 'common.stockStatus.inStock',
  low: 'common.stockStatus.low',
  out: 'common.stockStatus.out',
}

export function LowStockAlertCard({ className, lowStock }: LowStockAlertCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to="/stock"
      className={cn(
        'block rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/40',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-foreground">{t('dashboard.lowStock.title')}</h2>
        <ChevronRight
          className="size-4 shrink-0 text-muted-foreground rtl:rotate-180"
          aria-hidden="true"
        />
      </div>

      {lowStock.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{t('dashboard.lowStock.empty')}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {lowStock.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">
                  {item.name}
                </span>
                <span className="block truncate font-mono text-xs text-muted-foreground">
                  {item.sku}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-mono text-sm text-foreground">
                  {t('dashboard.lowStock.remaining', { qty: item.qty })}
                </span>
                <StatusPill tone={toneByStockStatus[item.status]}>
                  {t(labelKeyByStockStatus[item.status])}
                </StatusPill>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Link>
  )
}
