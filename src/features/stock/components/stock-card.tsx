import { useState } from 'react'
import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/features/lens'
import { useTranslation } from '@/lib/i18n'

import { type InventoryItemDto } from '../types'
import { EditStockItemDialog } from './edit-stock-item-dialog'
import { QuantityBar } from './quantity-bar'
import { StockStatusPill } from './stock-status-pill'

type StockCardProps = {
  item: InventoryItemDto
}

export function StockCard({ item }: StockCardProps) {
  const { t } = useTranslation()
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">{item.name}</h3>
          <p className="truncate text-xs text-muted-foreground">{item.brand}</p>
        </div>
        <StockStatusPill status={item.status} />
      </div>

      <p className="truncate text-xs text-muted-foreground">{item.spec}</p>

      <QuantityBar
        qty={item.qty}
        quantityRatio={item.quantityRatio}
        status={item.status}
        threshold={item.threshold}
      />

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="truncate font-mono text-xs text-muted-foreground">{item.sku}</span>
        <span className="font-mono text-sm font-medium text-foreground">
          {formatPrice(item.price)}
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="self-start"
        onClick={() => setIsEditOpen(true)}
      >
        <Pencil className="size-4" aria-hidden="true" />
        {t('stock.edit.action')}
      </Button>

      <EditStockItemDialog isOpen={isEditOpen} item={item} onOpenChange={setIsEditOpen} />
    </article>
  )
}
