import { Check } from 'lucide-react'

import { resolveBilingual, useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { formatPrice } from '../services/order-total'
import { type LensOptionDto } from '../types'

type OptionCardProps = {
  isSelected: boolean
  onSelect: (optionId: string) => void
  option: LensOptionDto
  selectionMode: 'single' | 'multiple'
}

export function OptionCard({ isSelected, onSelect, option, selectionMode }: OptionCardProps) {
  const { locale } = useTranslation()
  const name = resolveBilingual({ en: option.nameEn, ar: option.nameAr }, locale)
  const description = resolveBilingual(
    { en: option.descriptionEn, ar: option.descriptionAr },
    locale,
  )

  return (
    <button
      type="button"
      role={selectionMode === 'multiple' ? 'checkbox' : 'radio'}
      aria-checked={isSelected}
      onClick={() => onSelect(option.id)}
      className={cn(
        'flex cursor-pointer flex-col gap-2 rounded-xl border bg-card p-4 text-start shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        isSelected ? 'border-primary ring-1 ring-primary/30' : 'border-border hover:bg-muted/50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              'flex size-4 shrink-0 items-center justify-center border',
              selectionMode === 'multiple' ? 'rounded-sm' : 'rounded-full',
              isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
            )}
          >
            {isSelected ? <Check className="size-3" /> : null}
          </span>
          <span className="text-sm font-semibold text-foreground">{name.primary}</span>
        </div>
        <span className="font-mono text-sm text-foreground">{formatPrice(option.price)}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description.primary}</p>
    </button>
  )
}
