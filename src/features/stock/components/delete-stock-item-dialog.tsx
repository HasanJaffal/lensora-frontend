import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'

import { useDeleteInventoryItem } from '../hooks'
import { type InventoryItemDto } from '../types'

type DeleteStockItemDialogProps = {
  isOpen: boolean
  item: InventoryItemDto
  onOpenChange: (isOpen: boolean) => void
}

export function DeleteStockItemDialog({ isOpen, item, onOpenChange }: DeleteStockItemDialogProps) {
  const { t, translateBackendError } = useTranslation()
  const deleteItemMutation = useDeleteInventoryItem()

  const confirmDelete = async () => {
    try {
      await deleteItemMutation.mutateAsync(item.id)
      toast.success(t('stock.delete.success'))
      onOpenChange(false)
    } catch (error) {
      const message =
        error instanceof ApiError ? translateBackendError(error.code) : t('backendErrors.fallback')
      toast.error(message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('stock.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('stock.delete.description', { name: item.name, sku: item.sku })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.actions.cancel')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteItemMutation.isPending}
            onClick={() => void confirmDelete()}
          >
            {deleteItemMutation.isPending
              ? t('forms.submit.submitting')
              : t('stock.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
