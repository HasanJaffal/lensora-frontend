import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'

import { NeedSwitch, type ProductNeed } from '@/features/try-on'
import { useTranslation } from '@/lib/i18n'

import { ProductGrid } from '../components/product-grid'
import { useStorefrontProducts } from '../hooks'
import { storefrontNeeds, toPublicCategory } from '../services/public-category'

const routeApi = getRouteApi('/store/$slug/')

export function StorefrontBrowsePage() {
  const { t } = useTranslation()
  const { slug } = routeApi.useParams()

  const [need, setNeed] = useState<ProductNeed>('eyeglasses')
  const productsQuery = useStorefrontProducts(slug, toPublicCategory(need))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{t('storefront.browse.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('storefront.browse.subtitle')}</p>
      </div>

      <NeedSwitch need={need} needs={storefrontNeeds} onNeedChange={setNeed} />

      <ProductGrid
        isError={productsQuery.isError}
        isLoading={productsQuery.isLoading}
        products={productsQuery.data ?? []}
      />
    </div>
  )
}
