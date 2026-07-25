import { formatPrice } from '@/features/lens'
import { resolveFinishColor } from '@/features/try-on'
import { useTranslation } from '@/lib/i18n'

import { type PublicProductDto } from '../types'

type ProductCardProps = {
  product: PublicProductDto
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation()

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div aria-hidden="true" className="flex h-24 items-center justify-center rounded-lg bg-muted">
        <span
          className="size-10 rounded-full border-2 border-background shadow-sm"
          style={{ backgroundColor: resolveFinishColor(product.color) }}
        />
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">{product.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{product.brand}</p>
      </div>

      <dl className="flex flex-col gap-1 text-xs text-muted-foreground">
        <div className="flex items-center justify-between gap-2">
          <dt>{t('storefront.product.spec')}</dt>
          <dd className="truncate font-mono text-foreground">{product.spec}</dd>
        </div>
        {product.color ? (
          <div className="flex items-center justify-between gap-2">
            <dt>{t('storefront.product.finish')}</dt>
            <dd className="truncate text-foreground">{product.color}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-auto font-mono text-sm font-semibold text-foreground">
        {t('storefront.product.price', { price: formatPrice(product.price) })}
      </p>
    </article>
  )
}
