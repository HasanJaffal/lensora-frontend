import { Check } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { lensSteps, stepLabelKey, type LensStep } from '../steps'

type StepProgressProps = {
  currentStep: LensStep
}

export function StepProgress({ currentStep }: StepProgressProps) {
  const { t } = useTranslation()
  const currentIndex = lensSteps.indexOf(currentStep)

  return (
    <nav aria-label={t('lens.progress.label')}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {lensSteps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <li key={step} className="flex items-center gap-2">
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex size-7 items-center justify-center rounded-full border text-xs font-medium transition-colors',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary bg-primary/10 text-primary',
                  !isCompleted && !isCurrent && 'border-border bg-card text-muted-foreground',
                )}
              >
                {isCompleted ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  <span className="font-mono">{index + 1}</span>
                )}
              </span>
              <span
                className={cn(
                  'text-sm',
                  isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {t(stepLabelKey(step))}
              </span>
              {index < lensSteps.length - 1 ? (
                <span aria-hidden="true" className="ms-1 h-px w-5 bg-border sm:w-8" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
