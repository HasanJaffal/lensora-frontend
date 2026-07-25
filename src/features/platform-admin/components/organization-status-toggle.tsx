import { useState } from 'react'
import { toast } from 'sonner'

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
import { useTranslation } from '@/lib/i18n'

import { useSetOrganizationStatus } from '../hooks'
import { type OrganizationDto } from '../types'

type OrganizationStatusToggleProps = {
  organization: OrganizationDto
}

export function OrganizationStatusToggle({ organization }: OrganizationStatusToggleProps) {
  const { t, translateBackendError } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const setStatusMutation = useSetOrganizationStatus()
  const nextIsActive = !organization.isActive

  const confirmStatusChange = async () => {
    try {
      await setStatusMutation.mutateAsync({ id: organization.id, isActive: nextIsActive })
      toast.success(
        t(
          nextIsActive
            ? 'platformAdmin.status.activateSuccess'
            : 'platformAdmin.status.deactivateSuccess',
        ),
      )
      setIsOpen(false)
    } catch (error) {
      const message =
        error instanceof ApiError ? translateBackendError(error.code) : t('backendErrors.fallback')
      toast.error(message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            {t(nextIsActive ? 'platformAdmin.status.activate' : 'platformAdmin.status.deactivate')}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t(
              nextIsActive
                ? 'platformAdmin.status.activateTitle'
                : 'platformAdmin.status.deactivateTitle',
            )}
          </DialogTitle>
          <DialogDescription>
            {t(
              nextIsActive
                ? 'platformAdmin.status.activateDescription'
                : 'platformAdmin.status.deactivateDescription',
              { name: organization.name },
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('common.actions.cancel')}
          </Button>
          <Button
            variant={nextIsActive ? 'default' : 'destructive'}
            disabled={setStatusMutation.isPending}
            onClick={() => void confirmStatusChange()}
          >
            {setStatusMutation.isPending
              ? t('forms.submit.submitting')
              : t('common.actions.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
