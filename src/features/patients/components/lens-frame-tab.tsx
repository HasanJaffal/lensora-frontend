import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/constants/button-variants'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { resolveBilingual, useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { usePatientLensOrder } from '../hooks'

type LensFrameTabProps = {
  patientId: string
}

function formatPrice(value: string): string {
  return Number(value).toFixed(2)
}

export function LensFrameTab({ patientId }: LensFrameTabProps) {
  const { locale, t } = useTranslation()
  const lensOrderQuery = usePatientLensOrder(patientId)

  if (lensOrderQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (lensOrderQuery.isError) {
    return <ErrorState description={t('patients.record.lensFrame.loadError')} />
  }

  const order = lensOrderQuery.data

  if (!order) {
    return (
      <EmptyState
        title={t('patients.record.lensFrame.emptyTitle')}
        description={t('patients.record.lensFrame.emptyDescription')}
        actions={
          <Link
            to="/lens"
            search={{ patientId }}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            {t('patients.record.newLensOrder')}
          </Link>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">
          {t('patients.record.lensFrame.frame')}
        </h3>
        <p className="mt-1 text-sm text-foreground">
          {order.frame.name ?? '—'}{' '}
          <span className="font-mono text-muted-foreground">{order.frame.sku ?? ''}</span>
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <ul className="divide-y divide-border">
          {order.items.map((item, index) => {
            const label = resolveBilingual({ en: item.labelEn, ar: item.labelAr }, locale)

            return (
              <li
                key={`${item.labelEn}-${index}`}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="text-foreground">{label.primary}</span>
                <span className="font-mono text-foreground">{formatPrice(item.price)}</span>
              </li>
            )
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm font-semibold">
          <span className="text-foreground">{t('patients.record.lensFrame.total')}</span>
          <span className="font-mono text-foreground">{formatPrice(order.total)}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            {t('patients.record.lensFrame.deposit', {
              percent: Math.round(Number(order.depositPercent) * 100),
            })}
          </span>
          <span className="font-mono text-foreground">{formatPrice(order.deposit)}</span>
        </div>
      </div>
    </div>
  )
}
