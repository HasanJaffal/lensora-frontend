import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { ProductCard } from './product-card'
import { type PublicProductDto } from '../types'

type ProductGridProps = {
  isError: boolean
  isLoading: boolean
  products: PublicProductDto[]
}

export function ProductGrid({ isError, isLoading, products }: ProductGridProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState description={t('storefront.products.loadError')} />
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={t('storefront.products.emptyTitle')}
        description={t('storefront.products.emptyDescription')}
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
