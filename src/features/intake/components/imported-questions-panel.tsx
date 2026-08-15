import { ChevronDown } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { ExtractedQuestionsList, useImportIntakeDefinition } from '@/features/import'
import { useTranslation } from '@/lib/i18n'

type ImportedQuestionsPanelProps = {
  importId: string
}

export function ImportedQuestionsPanel({ importId }: ImportedQuestionsPanelProps) {
  const { t } = useTranslation()
  const definitionQuery = useImportIntakeDefinition(importId)

  return (
    <Collapsible className="group rounded-lg border border-border bg-card">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-start">
        <div>
          <h2 className="text-sm font-semibold text-card-foreground">
            {t('intake.importReference.title')}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('intake.importReference.description')}
          </p>
        </div>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-t border-border p-4">
        {definitionQuery.isLoading ? <LoadingState size="sm" /> : null}

        {definitionQuery.isError ? (
          <ErrorState description={t('intake.importReference.loadError')} />
        ) : null}

        {definitionQuery.isSuccess ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              {t('intake.importReference.questionCount', {
                count: definitionQuery.data.questionCount,
              })}
            </p>
            <ExtractedQuestionsList questions={definitionQuery.data.questions} />
          </div>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  )
}
