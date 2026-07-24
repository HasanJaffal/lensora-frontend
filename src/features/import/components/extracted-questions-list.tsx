import { resolveBilingual, useTranslation } from '@/lib/i18n'

import { AnswerTypeBadge } from './answer-type-badge'
import { type ExtractedQuestionDto } from '../types'

type ExtractedQuestionsListProps = {
  questions: ExtractedQuestionDto[]
}

export function ExtractedQuestionsList({ questions }: ExtractedQuestionsListProps) {
  const { locale } = useTranslation()

  return (
    <ol className="grid gap-2">
      {questions.map((question, index) => {
        const { primary, secondary } = resolveBilingual(
          { en: question.textEn, ar: question.textAr },
          locale,
        )

        return (
          <li
            className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border p-3"
            key={`${index}-${question.textEn}`}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{primary}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{secondary}</p>
            </div>
            <AnswerTypeBadge answerType={question.answerType} />
          </li>
        )
      })}
    </ol>
  )
}
