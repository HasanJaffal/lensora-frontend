import { Check } from 'lucide-react'

import { StatusPill } from '@/components/custom/status-pill'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { formatPrice } from '../services/order-total'
import { type InventoryItemDto } from '../types'

type FrameCardProps = {
  frame: InventoryItemDto
  isSelected: boolean
  onSelect: (frameId: string) => void
}

export function FrameCard({ frame, isSelected, onSelect }: FrameCardProps) {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(frame.id)}
      className={cn(
        'flex cursor-pointer flex-col gap-2 rounded-xl border bg-card p-4 text-start shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        isSelected ? 'border-primary ring-1 ring-primary/30' : 'border-border hover:bg-muted/50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              'flex size-4 shrink-0 items-center justify-center rounded-full border',
              isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
            )}
          >
            {isSelected ? <Check className="size-3" /> : null}
          </span>
          <span className="text-sm font-semibold text-foreground">{frame.name}</span>
        </div>
        <span className="font-mono text-sm text-foreground">{formatPrice(frame.price)}</span>
      </div>

      <p className="text-sm text-muted-foreground">
        {frame.brand} · {frame.spec}
      </p>

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground">{frame.sku}</span>
        <StatusPill tone={frame.qty <= frame.threshold ? 'accent' : 'primary'}>
          {t('lens.frame.inStockCount', { qty: frame.qty })}
        </StatusPill>
      </div>
    </button>
  )
}
