import { usePatient } from '@/features/patients/hooks'
import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { PatientPicker } from './patient-picker'
import { formatPrice, type OrderSummaryLine } from '../services/order-total'

type ReviewStepProps = {
  lines: OrderSummaryLine[]
  onSelectPatient: (patientId: string) => void
  patientId: string | null
}

type SelectedPatientSummaryProps = {
  patientId: string
}

function SelectedPatientSummary({ patientId }: SelectedPatientSummaryProps) {
  const { locale, t } = useTranslation()
  const patientQuery = usePatient(patientId)

  if (patientQuery.isLoading) {
    return <LoadingState size="sm" />
  }

  if (patientQuery.isError || !patientQuery.data) {
    return <ErrorState description={t('lens.review.patientLoadError')} />
  }

  const patient = patientQuery.data
  const name = resolveBilingual({ en: patient.nameEn, ar: patient.nameAr }, locale)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
      <span className="font-medium text-foreground">{name.primary}</span>
      <span className="font-mono text-xs text-muted-foreground">{patient.phone}</span>
    </div>
  )
}

export function ReviewStep({ lines, onSelectPatient, patientId }: ReviewStepProps) {
  const { locale, t } = useTranslation()

  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-foreground">{t('lens.steps.review')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('lens.review.description')}</p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">{t('lens.review.patient')}</h3>
        {patientId ? (
          <SelectedPatientSummary patientId={patientId} />
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{t('lens.review.noPatientSelected')}</p>
            <PatientPicker onSelectPatient={onSelectPatient} selectedPatientId={patientId} />
          </>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <h3 className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
          {t('lens.review.configuration')}
        </h3>
        <ul className="divide-y divide-border">
          {lines.map((line, index) => {
            const label = resolveBilingual({ en: line.labelEn, ar: line.labelAr }, locale)

            return (
              <li
                key={`${line.labelEn}-${index}`}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
              >
                <span className="text-foreground">{label.primary}</span>
                <span className="font-mono text-foreground">{formatPrice(line.price)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
