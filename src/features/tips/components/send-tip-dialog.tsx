import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PatientPicker } from '@/features/lens'
import { useTranslation } from '@/lib/i18n'

type SendTipDialogProps = {
  isOpen: boolean
  isSending: boolean
  onOpenChange: (isOpen: boolean) => void
  onConfirm: (patientId: string) => void
  tipTitle: string
}

export function SendTipDialog({
  isOpen,
  isSending,
  onOpenChange,
  onConfirm,
  tipTitle,
}: SendTipDialogProps) {
  const { t } = useTranslation()
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

  const closeDialog = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSelectedPatientId(null)
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('tips.send.dialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('tips.send.dialogDescription', { tip: tipTitle })}
          </DialogDescription>
        </DialogHeader>

        <PatientPicker
          onSelectPatient={setSelectedPatientId}
          selectedPatientId={selectedPatientId}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => closeDialog(false)}>
            {t('common.actions.cancel')}
          </Button>
          <Button
            type="button"
            disabled={selectedPatientId === null || isSending}
            onClick={() => {
              if (selectedPatientId !== null) {
                onConfirm(selectedPatientId)
              }
            }}
          >
            {t('common.actions.sendToPatient')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
