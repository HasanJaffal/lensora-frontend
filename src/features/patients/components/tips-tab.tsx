import { ContentLanguageToggle } from '@/components/custom/content-language-toggle'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { TipCard } from '@/features/tips'
import { useTranslation } from '@/lib/i18n'

import { useMatchedTips } from '../hooks'

type TipsTabProps = {
  patientId: string
}

export function TipsTab({ patientId }: TipsTabProps) {
  const { t } = useTranslation()
  const matchedTipsQuery = useMatchedTips(patientId)

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <ContentLanguageToggle />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tips.map((tip) => (
          <TipCard key={tip.id} patientId={patientId} tip={tip} />
        ))}
      </div>
    </div>
  )
}
