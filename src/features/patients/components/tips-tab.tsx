import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { ApiError } from '@/lib/api-error'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { useMatchedTips, useSendTip } from '../hooks'

type TipsTabProps = {
  patientId: string
}

export function TipsTab({ patientId }: TipsTabProps) {
  const { locale, t, translateBackendError } = useTranslation()
  const matchedTipsQuery = useMatchedTips(patientId)
  const sendTipMutation = useSendTip()

  if (matchedTipsQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (matchedTipsQuery.isError) {
    return <ErrorState description={t('patients.record.tips.loadError')} />
  }

  const tips = matchedTipsQuery.data ?? []

  if (tips.length === 0) {
    return (
      <EmptyState
        title={t('patients.record.tips.emptyTitle')}
        description={t('patients.record.tips.emptyDescription')}
      />
    )
  }

  async function handleSendTip(tipId: string) {
    try {
      await sendTipMutation.mutateAsync({ tipId, patientId })
      toast.success(t('patients.record.tips.sendSuccess'))
    } catch (error) {
      const message =
        error instanceof ApiError ? translateBackendError(error.code) : t('backendErrors.fallback')
      toast.error(message)
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tips.map((tip) => {
        const title = resolveBilingual({ en: tip.titleEn, ar: tip.titleAr }, locale)
        const body = resolveBilingual({ en: tip.bodyEn, ar: tip.bodyAr }, locale)

        return (
          <div
            key={tip.id}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title.primary}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body.primary}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="self-start"
              disabled={sendTipMutation.isPending}
              onClick={() => void handleSendTip(tip.id)}
            >
              {t('common.actions.sendToPatient')}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
