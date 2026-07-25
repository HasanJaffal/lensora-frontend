import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/custom/status-pill'
import { ApiError } from '@/lib/api-error'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { useSendTip } from '../hooks'
import { resolveTipIcon, resolveTipLabelKey, resolveTipTone } from '../services/tip-appearance'
import { type TipDto } from '../types'
import { SendTipDialog } from './send-tip-dialog'

type TipCardProps = {
  patientId?: string
  tip: TipDto
}

export function TipCard({ patientId, tip }: TipCardProps) {
  const { locale, t, translateBackendError } = useTranslation()
  const sendTipMutation = useSendTip()
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const title = resolveBilingual({ en: tip.titleEn, ar: tip.titleAr }, locale)
  const body = resolveBilingual({ en: tip.bodyEn, ar: tip.bodyAr }, locale)
  const categoryIcon = resolveTipIcon(tip.icon)
  const categoryLabelKey = resolveTipLabelKey(tip.category)

  async function sendTip(recipientPatientId: string) {
    try {
      await sendTipMutation.mutateAsync({ tipId: tip.id, patientId: recipientPatientId })
      setIsPickerOpen(false)
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
        {categoryLabelKey ? (
          <StatusPill tone={resolveTipTone(tip.category)}>{t(categoryLabelKey)}</StatusPill>
        ) : null}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{title.primary}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{body.primary}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-auto self-start"
        disabled={sendTipMutation.isPending}
        onClick={() => {
          if (patientId) {
            void sendTip(patientId)
            return
          }

          setIsPickerOpen(true)
        }}
      >
        {t('common.actions.sendToPatient')}
      </Button>

      {patientId ? null : (
        <SendTipDialog
          isOpen={isPickerOpen}
          isSending={sendTipMutation.isPending}
          onOpenChange={setIsPickerOpen}
          onConfirm={(selectedPatientId) => void sendTip(selectedPatientId)}
          tipTitle={title.primary}
        />
      )}
    </article>
  )
}
