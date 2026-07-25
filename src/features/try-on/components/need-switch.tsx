import { useTranslation, type TranslationKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { type ProductNeed } from '../types'

type NeedSwitchProps = {
  need: ProductNeed
  onNeedChange: (need: ProductNeed) => void
}

const productNeeds: ProductNeed[] = ['eyeglasses', 'sunglasses', 'contacts']

function needLabelKey(need: ProductNeed): TranslationKey {
  return `tryOn.needs.${need}` as TranslationKey
}

export function NeedSwitch({ need, onNeedChange }: NeedSwitchProps) {
  const { t } = useTranslation()

  return (
    <div
      role="radiogroup"
      aria-label={t('tryOn.needs.label')}
      className="inline-flex rounded-lg border border-border bg-card p-1"
    >
      {productNeeds.map((productNeed) => {
        const isSelected = productNeed === need

        return (
          <button
            key={productNeed}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onNeedChange(productNeed)}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t(needLabelKey(productNeed))}
          </button>
        )
      })}
    </div>
  )
}
