import { TableCell, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/features/lens'

import { type InventoryItemDto } from '../types'
import { QuantityBar } from './quantity-bar'
import { StockItemActions } from './stock-item-actions'
import { StockStatusPill } from './stock-status-pill'

type StockTableRowProps = {
  item: InventoryItemDto
}

export function StockTableRow({ item }: StockTableRowProps) {
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
        <StockItemActions item={item} />
      </TableCell>
    </TableRow>
  )
}
