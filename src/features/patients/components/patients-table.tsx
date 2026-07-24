import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { useNavigate } from '@tanstack/react-router'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { PatientStatusPill } from './patient-status-pill'
import { type PatientListItemDto } from '../types'

type PatientsTableProps = {
  patients: PatientListItemDto[]
}

function formatSph(value: string | null): string {
  if (value === null) {
    return '—'
  }
  const numericValue = Number(value)
  const sign = numericValue > 0 ? '+' : ''
  return `${sign}${numericValue.toFixed(2)}`
}

export function PatientsTable({ patients }: PatientsTableProps) {
  const { locale, t } = useTranslation()
  const navigate = useNavigate()
  const dateLocale = locale === 'ar' ? ar : enUS

  function goToPatient(patientId: string) {
    void navigate({ to: '/patients/$patientId', params: { patientId } })
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('patients.list.columnName')}</TableHead>
            <TableHead>{t('patients.list.columnPhone')}</TableHead>
            <TableHead>{t('patients.list.columnAge')}</TableHead>
            <TableHead>{t('patients.list.columnLastVisit')}</TableHead>
            <TableHead>{t('patients.list.columnRx')}</TableHead>
            <TableHead>{t('patients.list.columnStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const name = resolveBilingual({ en: patient.nameEn, ar: patient.nameAr }, locale)

            return (
              <TableRow
                key={patient.id}
                tabIndex={0}
                role="link"
                aria-label={name.primary}
                className="cursor-pointer"
                onClick={() => goToPatient(patient.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    goToPatient(patient.id)
                  }
                }}
              >
                <TableCell>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">{name.primary}</span>
                    <span className="text-xs text-muted-foreground">{name.secondary}</span>
                  </span>
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">{patient.phone}</TableCell>
                <TableCell className="text-muted-foreground">{patient.age}</TableCell>
                <TableCell className="text-muted-foreground">
                  {patient.lastVisit
                    ? format(new Date(patient.lastVisit), 'PP', { locale: dateLocale })
                    : '—'}
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">
                  R {formatSph(patient.rxSummary.odSph)} · L {formatSph(patient.rxSummary.osSph)}
                </TableCell>
                <TableCell>
                  <PatientStatusPill status={patient.status} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
