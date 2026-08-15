import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useTranslation } from '@/lib/i18n'

type ConfirmSendTipDialogProps = {
  isOpen: boolean
  isSending: boolean
  onConfirm: () => void
  onOpenChange: (isOpen: boolean) => void
  tipTitle: string
}

export function ConfirmSendTipDialog({
  isOpen,
  isSending,
  onConfirm,
  onOpenChange,
  tipTitle,
}: ConfirmSendTipDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('tips.send.confirmTitle')}</DialogTitle>
          <DialogDescription>
            {t('tips.send.confirmDescription', { tip: tipTitle })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.actions.cancel')}
          </Button>
          <Button type="button" disabled={isSending} onClick={onConfirm}>
            {isSending ? t('forms.submit.submitting') : t('common.actions.sendToPatient')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
