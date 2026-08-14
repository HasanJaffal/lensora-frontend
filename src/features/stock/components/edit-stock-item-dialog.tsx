import { toast } from 'sonner'

import { useAppForm } from '@/components/custom/form'
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

import { useUpdateInventoryItem } from '../hooks'
import { type InventoryItemDto, type InventoryUpdateRequest } from '../types'
import {
  updateInventoryItemSchema,
  type UpdateInventoryItemFormValues,
} from '../update-inventory-item-schema'

type EditStockItemDialogProps = {
  isOpen: boolean
  item: InventoryItemDto
  onOpenChange: (isOpen: boolean) => void
}

function collectChangedFields(
  values: UpdateInventoryItemFormValues,
  item: InventoryItemDto,
): InventoryUpdateRequest {
  const changes: InventoryUpdateRequest = {}

  if (Number(values.qty) !== item.qty) {
    changes.qty = Number(values.qty)
  }

  if (Number(values.threshold) !== item.threshold) {
    changes.threshold = Number(values.threshold)
  }

  if (Number(values.price) !== Number(item.price)) {
    changes.price = Number(values.price)
  }

  return changes
}

export function EditStockItemDialog({ isOpen, item, onOpenChange }: EditStockItemDialogProps) {
  const { t, translateBackendError } = useTranslation()
  const updateItemMutation = useUpdateInventoryItem()

  const form = useAppForm({
    defaultValues: {
      qty: String(item.qty),
      threshold: String(item.threshold),
      price: String(item.price),
    } satisfies UpdateInventoryItemFormValues,
    validators: { onSubmit: updateInventoryItemSchema(t) },
    onSubmit: async ({ value }) => {
      const changes = collectChangedFields(value, item)

      if (Object.keys(changes).length === 0) {
        onOpenChange(false)
        return
      }

      try {
        await updateItemMutation.mutateAsync({ itemId: item.id, changes })
        toast.success(t('stock.edit.success'))
        onOpenChange(false)
      } catch (error) {
        const message =
          error instanceof ApiError
            ? translateBackendError(error.code)
            : t('backendErrors.fallback')
        toast.error(message)
      }
    },
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen)
        if (!nextOpen) {
          form.reset()
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('stock.edit.title')}</DialogTitle>
          <DialogDescription>
            {t('stock.edit.description', { name: item.name, sku: item.sku })}
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.AppField name="qty">
            {(field) => (
              <field.TextField
                label={t('stock.edit.qty')}
                required
                inputMode="numeric"
                autoComplete="off"
              />
            )}
          </form.AppField>

          <form.AppField name="threshold">
            {(field) => (
              <field.TextField
                label={t('stock.edit.threshold')}
                required
                inputMode="numeric"
                autoComplete="off"
              />
            )}
          </form.AppField>

          <form.AppField name="price">
            {(field) => (
              <field.TextField
                label={t('stock.edit.price')}
                required
                inputMode="decimal"
                autoComplete="off"
              />
            )}
          </form.AppField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.actions.cancel')}
            </Button>
            <form.AppForm>
              <form.SubmitButton
                label={t('common.actions.save')}
                submittingLabel={t('forms.submit.submitting')}
              />
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
