import { Link } from '@tanstack/react-router'

import { StatusPill, type StatusPillTone } from '@/components/custom/status-pill'
import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { type PatientStatus, type ScheduleEntryDto, type ScheduleReason } from '../types'

type TodaysScheduleCardProps = {
  className?: string
  schedule: ScheduleEntryDto[]
}

const toneByStatus: Record<PatientStatus, StatusPillTone> = {
  active: 'primary',
  lab: 'secondary',
  ready: 'accent',
}

const statusLabelKeyByStatus: Record<PatientStatus, TranslationKey> = {
  active: 'common.status.active',
  lab: 'common.status.inLab',
  ready: 'common.status.ready',
}

const reasonLabelKeyByReason: Record<ScheduleReason, TranslationKey> = {
  followUp: 'dashboard.schedule.reasons.followUp',
  lensFitting: 'dashboard.schedule.reasons.lensFitting',
  pickup: 'dashboard.schedule.reasons.pickup',
}

export function TodaysScheduleCard({ className, schedule }: TodaysScheduleCardProps) {
  const { t } = useTranslation()

  return (
    <article
      className={cn('rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6', className)}
    >
      <h2 className="text-base font-semibold text-foreground">{t('dashboard.schedule.title')}</h2>

      {schedule.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{t('dashboard.schedule.empty')}</p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {schedule.map((entry) => (
            <li key={`${entry.time}-${entry.patient.id}`}>
              <Link
                to="/patients/$patientId"
                params={{ patientId: entry.patient.id }}
                className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
              >
                <span className="w-14 shrink-0 font-mono text-sm text-muted-foreground">
                  {entry.time}
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-medium text-foreground">
                  {entry.patient.avatar}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {entry.patient.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t(reasonLabelKeyByReason[entry.reason])}
                  </span>
                </span>
                <StatusPill tone={toneByStatus[entry.status]}>
                  {t(statusLabelKeyByStatus[entry.status])}
                </StatusPill>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
