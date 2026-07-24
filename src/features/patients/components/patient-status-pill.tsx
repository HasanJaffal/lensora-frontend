import { StatusPill, type StatusPillTone } from '@/components/custom/status-pill'
import { useTranslation, type TranslationKey } from '@/lib/i18n'

import { type PatientStatus } from '../types'

type PatientStatusPillProps = {
  status: PatientStatus
}

const toneByStatus: Record<PatientStatus, StatusPillTone> = {
  active: 'primary',
  lab: 'secondary',
  ready: 'accent',
}

const labelKeyByStatus: Record<PatientStatus, TranslationKey> = {
  active: 'common.status.active',
  lab: 'common.status.inLab',
  ready: 'common.status.ready',
}

export function PatientStatusPill({ status }: PatientStatusPillProps) {
  const { t } = useTranslation()

  return <StatusPill tone={toneByStatus[status]}>{t(labelKeyByStatus[status])}</StatusPill>
}
