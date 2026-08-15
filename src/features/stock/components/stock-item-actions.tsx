import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n'

import { DeleteStockItemDialog } from './delete-stock-item-dialog'
import { EditStockItemDialog } from './edit-stock-item-dialog'
import { type InventoryItemDto } from '../types'

type StockItemActionsProps = {
  item: InventoryItemDto
}

export function StockItemActions({ item }: StockItemActionsProps) {
  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = useState<'edit' | 'delete' | null>(null)

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpenDialog('edit')}
        aria-label={t('stock.edit.actionFor', { name: item.name })}
      >
        <Pencil className="size-4" aria-hidden="true" />
        {t('stock.edit.action')}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setOpenDialog('delete')}
        aria-label={t('stock.delete.actionFor', { name: item.name })}
        title={t('stock.delete.action')}
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>

      {/* Mounted only while open so the form initializes from the current item, not a stale one. */}
      {openDialog === 'edit' ? (
        <EditStockItemDialog
          isOpen
          item={item}
          onOpenChange={(isOpen) => setOpenDialog(isOpen ? 'edit' : null)}
        />
      ) : null}

      {openDialog === 'delete' ? (
        <DeleteStockItemDialog
          isOpen
          item={item}
          onOpenChange={(isOpen) => setOpenDialog(isOpen ? 'delete' : null)}
        />
      ) : null}
    </div>
  )
}
