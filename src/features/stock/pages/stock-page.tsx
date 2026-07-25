import { useState } from 'react'

import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { StockCard } from '../components/stock-card'
import { StockFilters } from '../components/stock-filters'
import { StockStats } from '../components/stock-stats'
import { StockTable } from '../components/stock-table'
import { useInventory, useInventoryStats } from '../hooks'
import { type StockCategoryFilter, type StockViewMode } from '../types'

export function StockPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<StockCategoryFilter>('all')
  const [isLowStockOnly, setIsLowStockOnly] = useState(false)
  const [viewMode, setViewMode] = useState<StockViewMode>('grid')

  const statsQuery = useInventoryStats()
  const inventoryQuery = useInventory({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    lowStock: isLowStockOnly,
  })
  const items = inventoryQuery.data ?? []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{t('stock.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('stock.subtitle')}</p>
      </div>

      {statsQuery.isSuccess ? <StockStats stats={statsQuery.data} /> : null}

      {statsQuery.isError ? <ErrorState description={t('stock.statsError')} /> : null}

      <StockFilters
        isLowStockOnly={isLowStockOnly}
        onCategoryChange={setSelectedCategory}
        onLowStockOnlyChange={setIsLowStockOnly}
        onViewModeChange={setViewMode}
        selectedCategory={selectedCategory}
        viewMode={viewMode}
      />

      {inventoryQuery.isLoading ? <LoadingState size="lg" /> : null}

      {inventoryQuery.isError ? <ErrorState description={t('stock.loadError')} /> : null}

      {inventoryQuery.isSuccess && items.length === 0 ? (
        <EmptyState title={t('stock.emptyTitle')} description={t('stock.emptyDescription')} />
      ) : null}

      {inventoryQuery.isSuccess && items.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <StockCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <StockTable items={items} />
        )
      ) : null}
    </div>
  )
}
