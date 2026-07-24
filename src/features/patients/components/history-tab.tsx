import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'

import { EmptyState } from '@/components/custom/feedback'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { type VisitHistoryDto } from '../types'

type HistoryTabProps = {
  history: VisitHistoryDto[]
}

export function HistoryTab({ history }: HistoryTabProps) {
  const { locale, t } = useTranslation()
  const dateLocale = locale === 'ar' ? ar : enUS

  if (history.length === 0) {
    return (
      <EmptyState
        title={t('patients.record.history.emptyTitle')}
        description={t('patients.record.history.emptyDescription')}
      />
    )
  }

  return (
    <ol className="flex flex-col gap-4">
      {history.map((visit) => {
        const title = resolveBilingual({ en: visit.titleEn, ar: visit.titleAr }, locale)
        const detail = resolveBilingual({ en: visit.detailEn, ar: visit.detailAr }, locale)

        return (
          <li key={visit.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="font-mono text-xs text-muted-foreground">
              {format(new Date(visit.date), 'PPP', { locale: dateLocale })}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-foreground">{title.primary}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{detail.primary}</p>
          </li>
        )
      })}
    </ol>
  )
}
