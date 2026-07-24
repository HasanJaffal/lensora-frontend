import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { type PatientDto, type RefractionEyeDto } from '../types'

type PrescriptionTabProps = {
  patient: PatientDto
}

function formatSigned(value: string | null): string {
  if (value === null) {
    return '—'
  }
  const numericValue = Number(value)
  const sign = numericValue > 0 ? '+' : ''
  return `${sign}${numericValue.toFixed(2)}`
}

function formatAxis(value: number | null): string {
  return value === null ? '—' : `${value}°`
}

export function PrescriptionTab({ patient }: PrescriptionTabProps) {
  const { locale, t } = useTranslation()
  const diagnosis =
    patient.diagnosisEn && patient.diagnosisAr
      ? resolveBilingual({ en: patient.diagnosisEn, ar: patient.diagnosisAr }, locale)
      : null

  const eyes: { label: string; eye: RefractionEyeDto }[] = [
    { label: t('patients.record.prescription.od'), eye: patient.refraction.od },
    { label: t('patients.record.prescription.os'), eye: patient.refraction.os },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>{t('patients.record.prescription.sph')}</TableHead>
              <TableHead>{t('patients.record.prescription.cyl')}</TableHead>
              <TableHead>{t('patients.record.prescription.axis')}</TableHead>
              <TableHead>{t('patients.record.prescription.add')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eyes.map(({ label, eye }) => (
              <TableRow key={label}>
                <TableCell className="font-medium text-foreground">{label}</TableCell>
                <TableCell className="font-mono text-foreground">{formatSigned(eye.sph)}</TableCell>
                <TableCell className="font-mono text-foreground">{formatSigned(eye.cyl)}</TableCell>
                <TableCell className="font-mono text-foreground">{formatAxis(eye.axis)}</TableCell>
                <TableCell className="font-mono text-foreground">{formatSigned(eye.add)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:max-w-xs">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">
            {t('patients.record.prescription.pdDist')}
          </p>
          <p className="font-mono text-base text-foreground">
            {patient.pdDist === null ? '—' : patient.pdDist}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">
            {t('patients.record.prescription.pdNear')}
          </p>
          <p className="font-mono text-base text-foreground">
            {patient.pdNear === null ? '—' : patient.pdNear}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">
          {t('patients.record.prescription.diagnosis')}
        </h3>
        {diagnosis ? (
          <p className="mt-1 text-sm text-foreground">
            {diagnosis.primary}{' '}
            <span className="text-muted-foreground">({diagnosis.secondary})</span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">—</p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">
          {t('patients.record.prescription.notes')}
        </h3>
        {patient.notes.length === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {t('patients.record.prescription.notesEmpty')}
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {patient.notes.map((note) => (
              <li key={note.id} className="text-sm text-foreground">
                {locale === 'ar' ? note.ar : note.en}{' '}
                <span className="text-muted-foreground">
                  ({locale === 'ar' ? note.en : note.ar})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
