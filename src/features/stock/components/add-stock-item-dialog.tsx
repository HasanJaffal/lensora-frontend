import { useState } from 'react'
import { Plus } from 'lucide-react'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { ApiError } from '@/lib/api-error'
import { backendErrorKeys } from '@/lib/i18n/backend-error-keys'
import { useTranslation } from '@/lib/i18n'

import { useCreateInventoryItem } from '../hooks'
import { resolveStockCategoryLabelKey, stockCategories } from '../services/stock-appearance'
import {
  createInventoryItemSchema,
  type CreateInventoryItemFormValues,
} from '../create-inventory-item-schema'
import { type StockCategory } from '../types'

const defaultValues: CreateInventoryItemFormValues = {
  category: 'frame',
  name: '',
  brand: '',
  spec: '',
  shape: '',
  color: '',
  sku: '',
  qty: '',
  threshold: '',
  price: '',
}

function toOptionalText(value: string): string | null {
  const trimmed = value.trim()

  return trimmed.length > 0 ? trimmed : null
}

export function AddStockItemDialog() {
  const { t, translateBackendError } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const createItemMutation = useCreateInventoryItem()

  const categoryOptions = stockCategories.map((category) => ({
    value: category,
    label: t(resolveStockCategoryLabelKey(category)),
  }))

  const form = useAppForm({
    defaultValues,
    validators: { onSubmit: createInventoryItemSchema(t) },
    onSubmit: async ({ value }) => {
      try {
        await createItemMutation.mutateAsync({
          category: value.category as StockCategory,
          name: value.name.trim(),
          brand: value.brand.trim(),
          spec: value.spec.trim(),
          shape: toOptionalText(value.shape),
          color: toOptionalText(value.color),
          sku: value.sku.trim(),
          qty: Number(value.qty),
          threshold: Number(value.threshold),
          price: Number(value.price),
        })
        toast.success(t('stock.add.success'))
        form.reset()
        setIsOpen(false)
      } catch (error) {
        if (error instanceof ApiError && error.code === backendErrorKeys.inventory.skuTaken) {
          form.setFieldMeta('sku', (meta) => ({
            ...meta,
            isTouched: true,
            errorMap: { ...meta.errorMap, onSubmit: translateBackendError(error.code) },
          }))
          return
        }
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
        setIsOpen(nextOpen)
        if (!nextOpen) {
          form.reset()
        }
      }}
    >
      <DialogTrigger
        render={
          <Button type="button">
            <Plus className="size-4" aria-hidden="true" />
            {t('stock.add.action')}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('stock.add.title')}</DialogTitle>
          <DialogDescription>{t('stock.add.description')}</DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.AppField name="category">
            {(field) => (
              <field.RadioGroupField
                label={t('stock.add.category')}
                options={categoryOptions}
                required
              />
            )}
          </form.AppField>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.AppField name="name">
              {(field) => (
                <field.TextField autoComplete="off" label={t('stock.add.name')} required />
              )}
            </form.AppField>

            <form.AppField name="brand">
              {(field) => (
                <field.TextField autoComplete="off" label={t('stock.add.brand')} required />
              )}
            </form.AppField>

            <form.AppField name="spec">
              {(field) => (
                <field.TextField
                  autoComplete="off"
                  label={t('stock.add.spec')}
                  placeholder={t('stock.add.specPlaceholder')}
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="sku">
              {(field) => (
                <field.TextField autoComplete="off" label={t('stock.add.sku')} required />
              )}
            </form.AppField>

            <form.AppField name="shape">
              {(field) => <field.TextField autoComplete="off" label={t('stock.add.shape')} />}
            </form.AppField>

            <form.AppField name="color">
              {(field) => <field.TextField autoComplete="off" label={t('stock.add.color')} />}
            </form.AppField>

            <form.AppField name="qty">
              {(field) => (
                <field.TextField
                  autoComplete="off"
                  inputMode="numeric"
                  label={t('stock.edit.qty')}
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="threshold">
              {(field) => (
                <field.TextField
                  autoComplete="off"
                  inputMode="numeric"
                  label={t('stock.edit.threshold')}
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="price">
              {(field) => (
                <field.TextField
                  autoComplete="off"
                  inputMode="decimal"
                  label={t('stock.edit.price')}
                  required
                />
              )}
            </form.AppField>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              {t('common.actions.cancel')}
            </Button>
            <form.AppForm>
              <form.SubmitButton
                label={t('stock.add.submit')}
                submittingLabel={t('forms.submit.submitting')}
              />
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
