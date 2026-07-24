import { Link } from '@tanstack/react-router'
import { Info } from 'lucide-react'

import { EmptyState } from '@/components/custom/feedback'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/constants/button-variants'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n'

import { ExtractedQuestionsList } from './extracted-questions-list'
import { type ImportDto } from '../types'

type ExtractedQuestionsReviewProps = {
  importResult: ImportDto
  onImportAnother: () => void
}

export function ExtractedQuestionsReview({
  importResult,
  onImportAnother,
}: ExtractedQuestionsReviewProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      {importResult.usedFallback ? (
        <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t('import.review.fallbackNotice')}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">{t('import.review.title')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('import.review.questionCount', { count: importResult.questionCount })}
            {' · '}
            {t('import.review.sourceFile', { fileName: importResult.sourceFileName })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onImportAnother} type="button" variant="outline">
            {t('import.review.importAnother')}
          </Button>
          <Link
            className={cn(buttonVariants({ variant: 'default' }))}
            search={{ importId: importResult.id }}
            to="/intake"
          >
            {t('import.review.useAsIntake')}
          </Link>
        </div>
      </div>

      {importResult.questions.length === 0 ? (
        <EmptyState
          description={t('import.review.emptyDescription')}
          title={t('import.review.emptyTitle')}
        />
      ) : (
        <ExtractedQuestionsList questions={importResult.questions} />
      )}
    </div>
  )
}
