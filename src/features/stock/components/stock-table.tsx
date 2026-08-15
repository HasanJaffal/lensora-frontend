import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTranslation } from '@/lib/i18n'

import { type InventoryItemDto } from '../types'
import { StockTableRow } from './stock-table-row'

type StockTableProps = {
  items: InventoryItemDto[]
}

export function StockTable({ items }: StockTableProps) {
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('stock.columns.item')}</TableHead>
            <TableHead>{t('stock.columns.spec')}</TableHead>
            <TableHead>{t('stock.columns.sku')}</TableHead>
            <TableHead>{t('stock.columns.quantity')}</TableHead>
            <TableHead>{t('stock.columns.status')}</TableHead>
            <TableHead>{t('stock.columns.price')}</TableHead>
            <TableHead>{t('stock.columns.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <StockTableRow key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
