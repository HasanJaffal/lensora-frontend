import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { Link } from '@tanstack/react-router'
import { Scan, Sparkles } from 'lucide-react'

import { buttonVariants } from '@/components/constants/button-variants'
import { resolveBilingual, useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { PatientAvatar } from './patient-avatar'
import { PatientStatusPill } from './patient-status-pill'
import { type PatientDto } from '../types'

type PatientRecordHeaderProps = {
  patient: PatientDto
}

export function PatientRecordHeader({ patient }: PatientRecordHeaderProps) {
  const { locale, t } = useTranslation()
  const dateLocale = locale === 'ar' ? ar : enUS
  const name = resolveBilingual({ en: patient.nameEn, ar: patient.nameAr }, locale)
  const town = resolveBilingual({ en: patient.townEn, ar: patient.townAr }, locale)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <PatientAvatar name={name.primary} className="size-14 text-base" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">{name.primary}</h1>
              <PatientStatusPill status={patient.status} />
            </div>
            <p className="text-sm text-muted-foreground">{name.secondary}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/try-on"
            search={{ patientId: patient.id, frameId: patient.lensConfig?.frameSku ?? undefined }}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Scan className="size-4" aria-hidden="true" />
            {t('patients.record.launchTryOn')}
          </Link>
          <Link
            to="/lens"
            search={{ patientId: patient.id }}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {t('patients.record.newLensOrder')}
          </Link>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-muted-foreground">{t('patients.record.age')}</dt>
          <dd className="font-mono text-foreground">{patient.age}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t('patients.record.town')}</dt>
          <dd className="text-foreground">
            {town.primary} <span className="text-muted-foreground">({town.secondary})</span>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t('patients.record.phone')}</dt>
          <dd className="font-mono text-foreground">{patient.phone}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t('patients.record.rxNumberDate')}</dt>
          <dd className="font-mono text-foreground">
            {patient.rxNumber ?? '—'}
            {patient.rxDate
              ? ` · ${format(new Date(patient.rxDate), 'PP', { locale: dateLocale })}`
              : ''}
          </dd>
        </div>
      </dl>
    </div>
  )
}
