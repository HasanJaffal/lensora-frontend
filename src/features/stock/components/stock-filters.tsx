import { LayoutGrid, List } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from '@/lib/i18n'

import {
  resolveStockCategoryLabelKey,
  stockCategoryFilters,
  toStockCategoryFilter,
} from '../services/stock-appearance'
import { type StockCategoryFilter, type StockViewMode } from '../types'

type StockFiltersProps = {
  isLowStockOnly: boolean
  onCategoryChange: (category: StockCategoryFilter) => void
  onLowStockOnlyChange: (isLowStockOnly: boolean) => void
  onViewModeChange: (viewMode: StockViewMode) => void
  selectedCategory: StockCategoryFilter
  viewMode: StockViewMode
}

export function StockFilters({
  isLowStockOnly,
  onCategoryChange,
  onLowStockOnlyChange,
  onViewModeChange,
  selectedCategory,
  viewMode,
}: StockFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Tabs
        value={selectedCategory}
        onValueChange={(value) => onCategoryChange(toStockCategoryFilter(value))}
      >
        <TabsList>
          {stockCategoryFilters.map((category) => (
            <TabsTrigger key={category} value={category}>
              {t(resolveStockCategoryLabelKey(category))}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={isLowStockOnly ? 'default' : 'outline'}
          aria-pressed={isLowStockOnly}
          onClick={() => onLowStockOnlyChange(!isLowStockOnly)}
        >
          {t('stock.filters.lowStockOnly')}
        </Button>

        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button
            type="button"
            size="icon"
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            aria-label={t('stock.filters.gridView')}
            aria-pressed={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
          >
            <LayoutGrid className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            aria-label={t('stock.filters.listView')}
            aria-pressed={viewMode === 'list'}
            onClick={() => onViewModeChange('list')}
          >
            <List className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
