import { useState } from 'react'
import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/features/lens'
import { useTranslation } from '@/lib/i18n'

import { type InventoryItemDto } from '../types'
import { EditStockItemDialog } from './edit-stock-item-dialog'
import { QuantityBar } from './quantity-bar'
import { StockStatusPill } from './stock-status-pill'

type StockTableRowProps = {
  item: InventoryItemDto
}

export function StockTableRow({ item }: StockTableRowProps) {
  const { t } = useTranslation()
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <span className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{item.name}</span>
          <span className="text-xs text-muted-foreground">{item.brand}</span>
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground">{item.spec}</TableCell>
      <TableCell className="font-mono text-muted-foreground">{item.sku}</TableCell>
      <TableCell className="min-w-40">
        <QuantityBar
          qty={item.qty}
          quantityRatio={item.quantityRatio}
          status={item.status}
          threshold={item.threshold}
        />
      </TableCell>
      <TableCell>
        <StockStatusPill status={item.status} />
      </TableCell>
      <TableCell className="font-mono text-foreground">{formatPrice(item.price)}</TableCell>
      <TableCell>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={t('stock.edit.action')}
          onClick={() => setIsEditOpen(true)}
        >
          <Pencil className="size-4" aria-hidden="true" />
        </Button>
        <EditStockItemDialog isOpen={isEditOpen} item={item} onOpenChange={setIsEditOpen} />
      </TableCell>
    </TableRow>
  )
}
