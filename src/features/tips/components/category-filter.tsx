import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from '@/lib/i18n'

import { tipCategoryFilters, toTipCategoryFilter } from '../services/tip-appearance'
import { type TipCategoryFilter } from '../types'

type CategoryFilterProps = {
  onCategoryChange: (category: TipCategoryFilter) => void
  selectedCategory: TipCategoryFilter
}

export function CategoryFilter({ onCategoryChange, selectedCategory }: CategoryFilterProps) {
  const { t } = useTranslation()

  return (
    <Tabs
      value={selectedCategory}
      onValueChange={(value) => onCategoryChange(toTipCategoryFilter(value))}
    >
      <TabsList>
        {tipCategoryFilters.map((category) => (
          <TabsTrigger key={category} value={category}>
            {t(`tips.categories.${category}`)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
