import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/lib/i18n'

import { type IntakeStatus } from '../types'

type IntakeStatusBadgeProps = {
  status: IntakeStatus
}

const variantByStatus: Record<IntakeStatus, 'secondary' | 'default'> = {
  draft: 'secondary',
  completed: 'default',
}

export function IntakeStatusBadge({ status }: IntakeStatusBadgeProps) {
  const { t } = useTranslation()

  return <Badge variant={variantByStatus[status]}>{t(`intake.status.${status}`)}</Badge>
}
