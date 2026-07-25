import { EmptyState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { OptionCard } from './option-card'
import { type LensOptionDto } from '../types'

type CatalogStepProps = {
  description: string
  onToggleOption: (optionId: string) => void
  options: LensOptionDto[]
  selectedOptionIds: string[]
  selectionMode: 'single' | 'multiple'
  title: string
}

export function CatalogStep({
  description,
  onToggleOption,
  options,
  selectedOptionIds,
  selectionMode,
  title,
}: CatalogStepProps) {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {options.length === 0 ? (
        <EmptyState
          title={t('lens.catalog.emptyTitle')}
          description={t('lens.catalog.emptyDescription')}
        />
      ) : (
        <div
          role={selectionMode === 'multiple' ? 'group' : 'radiogroup'}
          aria-label={title}
          className="grid gap-3 sm:grid-cols-2"
        >
          {options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selectedOptionIds.includes(option.id)}
              onSelect={onToggleOption}
              selectionMode={selectionMode}
            />
          ))}
        </div>
      )}
    </section>
  )
}
