import { Sparkles, WifiOff } from 'lucide-react'

import { StatusPill } from '@/components/custom/status-pill'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { useStylingAdvice } from '../hooks'
import { type ProductNeed } from '../types'

type StylingAdvicePanelProps = {
  frameId: string | null
  need: ProductNeed
  patientId?: string
}

export function StylingAdvicePanel({ frameId, need, patientId }: StylingAdvicePanelProps) {
  const { locale, t } = useTranslation()
  const stylingAdviceQuery = useStylingAdvice({ frameId, locale, need, patientId })

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          {t('tryOn.advice.title')}
        </h2>
        {stylingAdviceQuery.data?.usedFallback ? (
          <StatusPill tone="secondary">
            <WifiOff className="me-1 size-3" aria-hidden="true" />
            {t('tryOn.advice.offline')}
          </StatusPill>
        ) : null}
      </div>

      {frameId === null ? (
        <EmptyState
          title={t('tryOn.advice.noFrameTitle')}
          description={t('tryOn.advice.noFrameDescription')}
        />
      ) : null}

      {frameId !== null && stylingAdviceQuery.isPending ? <LoadingState size="sm" /> : null}

      {frameId !== null && stylingAdviceQuery.isError ? (
        <ErrorState description={t('tryOn.advice.loadError')} />
      ) : null}

      {stylingAdviceQuery.data ? (
        <ul className="flex flex-col gap-2">
          {stylingAdviceQuery.data.tips.map((tip, index) => (
            <li
              key={`${index}-${tip}`}
              className="flex gap-2 rounded-lg bg-muted/50 p-3 text-sm text-foreground"
            >
              <span aria-hidden="true" className="font-mono text-muted-foreground">
                {index + 1}.
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
