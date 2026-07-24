import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/lib/i18n'

import { type AnswerType } from '../types'

type AnswerTypeBadgeProps = {
  answerType: AnswerType
}

const variantByAnswerType: Record<AnswerType, 'secondary' | 'outline' | 'default'> = {
  short: 'secondary',
  long: 'outline',
  checklist: 'default',
}

export function AnswerTypeBadge({ answerType }: AnswerTypeBadgeProps) {
  const { t } = useTranslation()

  return (
    <Badge variant={variantByAnswerType[answerType]}>
      {t(`import.review.answerTypes.${answerType}`)}
    </Badge>
  )
}
