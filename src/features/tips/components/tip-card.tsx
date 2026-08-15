import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/custom/status-pill'
import { ApiError } from '@/lib/api-error'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { useSendTip } from '../hooks'
import { resolveTipCategoryLabel, resolveTipIcon, resolveTipTone } from '../services/tip-appearance'
import { type TipDto } from '../types'
import { ConfirmSendTipDialog } from './confirm-send-tip-dialog'
import { SendTipDialog } from './send-tip-dialog'

type TipCardProps = {
  patientId?: string
  tip: TipDto
}

export function TipCard({ patientId, tip }: TipCardProps) {
  const { locale, t, translateBackendError } = useTranslation()
  const sendTipMutation = useSendTip()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const title = resolveBilingual({ en: tip.titleEn, ar: tip.titleAr }, locale)
  const body = resolveBilingual({ en: tip.bodyEn, ar: tip.bodyAr }, locale)
  const categoryIcon = resolveTipIcon(tip.icon)
  const categoryLabel = resolveTipCategoryLabel(tip.category, t)
  const isSending = sendTipMutation.isPending

  async function sendTip(recipientPatientId: string) {
    if (isSending) {
      return
    }

    try {
      await sendTipMutation.mutateAsync({ tipId: tip.id, patientId: recipientPatientId })
      setIsDialogOpen(false)
      toast.success(t('tips.send.success'))
    } catch (error) {
      const message =
        error instanceof ApiError ? translateBackendError(error.code) : t('backendErrors.fallback')
      toast.error(message)
    }
  }

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {categoryIcon}
        </span>
        <StatusPill tone={resolveTipTone(tip.category)}>{categoryLabel}</StatusPill>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{title.primary}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{body.primary}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-auto self-start"
        disabled={isSending}
        onClick={() => setIsDialogOpen(true)}
      >
        {t('common.actions.sendToPatient')}
      </Button>

      {/* A tip opened from a patient record already knows its recipient, so it only confirms. */}
      {isDialogOpen && patientId ? (
        <ConfirmSendTipDialog
          isOpen
          isSending={isSending}
          onConfirm={() => void sendTip(patientId)}
          onOpenChange={setIsDialogOpen}
          tipTitle={title.primary}
        />
      ) : null}

      {isDialogOpen && !patientId ? (
        <SendTipDialog
          isOpen
          isSending={isSending}
          onConfirm={(selectedPatientId) => void sendTip(selectedPatientId)}
          onOpenChange={setIsDialogOpen}
          tipTitle={title.primary}
        />
      ) : null}
    </article>
  )
}
