import { useState } from 'react'
import { toast } from 'sonner'

import { useAppForm } from '@/components/custom/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ApiError } from '@/lib/api-error'
import { backendErrorKeys } from '@/lib/i18n/backend-error-keys'
import { useTranslation } from '@/lib/i18n'

import { useCreateOrganization } from '../hooks'
import {
  createOrganizationSchema,
  type CreateOrganizationFormValues,
} from '../create-organization-schema'

const defaultValues: CreateOrganizationFormValues = {
  name: '',
  slug: '',
  depositPercent: '0.4',
  adminEmail: '',
  adminPassword: '',
  adminDisplayNameEn: '',
  adminDisplayNameAr: '',
}

export function CreateOrganizationDialog() {
  const { t, translateBackendError } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const createOrganizationMutation = useCreateOrganization()

  const form = useAppForm({
    defaultValues,
    validators: { onSubmit: createOrganizationSchema(t) },
    onSubmit: async ({ value }) => {
      try {
        await createOrganizationMutation.mutateAsync({
          name: value.name,
          slug: value.slug,
          depositPercent: Number(value.depositPercent),
          adminEmail: value.adminEmail,
          adminPassword: value.adminPassword,
          adminDisplayNameEn: value.adminDisplayNameEn,
          adminDisplayNameAr: value.adminDisplayNameAr,
        })
        toast.success(t('platformAdmin.form.success'))
        form.reset()
        setIsOpen(false)
      } catch (error) {
        if (error instanceof ApiError && error.code === backendErrorKeys.organization.slugTaken) {
          form.setFieldMeta('slug', (meta) => ({
            ...meta,
            isTouched: true,
            errorMap: { ...meta.errorMap, onSubmit: translateBackendError(error.code) },
          }))
          return
        }
        if (error instanceof ApiError && error.code === backendErrorKeys.auth.emailTaken) {
          form.setFieldMeta('adminEmail', (meta) => ({
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
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogTrigger render={<Button>{t('platformAdmin.list.addOrganization')}</Button>} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('platformAdmin.form.title')}</DialogTitle>
          <DialogDescription>{t('platformAdmin.form.description')}</DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.AppField name="name">
            {(field) => (
              <field.TextField label={t('platformAdmin.form.name')} required autoComplete="off" />
            )}
          </form.AppField>

          <form.AppField name="slug">
            {(field) => (
              <field.TextField
                label={t('platformAdmin.form.slug')}
                placeholder={t('platformAdmin.form.slugPlaceholder')}
                required
                autoComplete="off"
              />
            )}
          </form.AppField>

          <form.AppField name="depositPercent">
            {(field) => (
              <field.TextField
                label={t('platformAdmin.form.depositPercent')}
                placeholder="0.40"
                required
                inputMode="decimal"
                autoComplete="off"
              />
            )}
          </form.AppField>

          <form.AppField name="adminDisplayNameEn">
            {(field) => (
              <field.TextField
                label={t('platformAdmin.form.adminDisplayNameEn')}
                required
                autoComplete="off"
              />
            )}
          </form.AppField>

          <form.AppField name="adminDisplayNameAr">
            {(field) => (
              <field.TextField
                label={t('platformAdmin.form.adminDisplayNameAr')}
                required
                autoComplete="off"
                dir="rtl"
              />
            )}
          </form.AppField>

          <form.AppField name="adminEmail">
            {(field) => (
              <field.TextField
                label={t('platformAdmin.form.adminEmail')}
                required
                type="email"
                autoComplete="off"
              />
            )}
          </form.AppField>

          <form.AppField name="adminPassword">
            {(field) => (
              <field.PasswordField
                label={t('platformAdmin.form.adminPassword')}
                required
                autoComplete="new-password"
              />
            )}
          </form.AppField>

          <DialogFooter>
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
