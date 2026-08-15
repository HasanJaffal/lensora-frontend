import { useState } from 'react'
import { Search } from 'lucide-react'

import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/lib/i18n'

import { AddStockItemDialog } from '../components/add-stock-item-dialog'
import { StockCard } from '../components/stock-card'
import { StockFilters } from '../components/stock-filters'
import { StockStats } from '../components/stock-stats'
import { StockTable } from '../components/stock-table'
import { useInventory, useInventoryStats } from '../hooks'
import { filterInventoryBySearch } from '../services/filter-inventory'
import { type StockCategoryFilter, type StockViewMode } from '../types'

export function StockPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<StockCategoryFilter>('all')
  const [isLowStockOnly, setIsLowStockOnly] = useState(false)
  const [viewMode, setViewMode] = useState<StockViewMode>('grid')
  const [search, setSearch] = useState('')

  const statsQuery = useInventoryStats()
  const inventoryQuery = useInventory({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    lowStock: isLowStockOnly,
  })
  const items = inventoryQuery.data ?? []
  const visibleItems = filterInventoryBySearch(items, search)
  const hasSearchWithNoMatches = items.length > 0 && visibleItems.length === 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{t('stock.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('stock.subtitle')}</p>
        </div>
        <AddStockItemDialog />
      </div>

      {statsQuery.isSuccess ? <StockStats stats={statsQuery.data} /> : null}

      {statsQuery.isError ? <ErrorState description={t('stock.statsError')} /> : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <StockFilters
          isLowStockOnly={isLowStockOnly}
          onCategoryChange={setSelectedCategory}
          onLowStockOnlyChange={setIsLowStockOnly}
          onViewModeChange={setViewMode}
          selectedCategory={selectedCategory}
          viewMode={viewMode}
        />

        <div className="relative w-full max-w-xs">
          <Search
            className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            aria-label={t('stock.searchLabel')}
            placeholder={t('stock.searchPlaceholder')}
            className="h-9 ps-8"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {inventoryQuery.isLoading ? <LoadingState size="lg" /> : null}

      {inventoryQuery.isError ? <ErrorState description={t('stock.loadError')} /> : null}

      {inventoryQuery.isSuccess && items.length === 0 ? (
        <EmptyState title={t('stock.emptyTitle')} description={t('stock.emptyDescription')} />
      ) : null}

      {hasSearchWithNoMatches ? (
        <EmptyState
          title={t('stock.noSearchMatchesTitle')}
          description={t('stock.noSearchMatchesDescription', { search: search.trim() })}
        />
      ) : null}

      {inventoryQuery.isSuccess && visibleItems.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <StockCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <StockTable items={visibleItems} />
        )
      ) : null}
    </div>
  )
}
