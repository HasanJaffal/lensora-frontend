import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { type ReadyForPickupDto } from '../types'

type ReadyForPickupCardProps = {
  className?: string
  readyForPickup: ReadyForPickupDto[]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
})

export function ReadyForPickupCard({ className, readyForPickup }: ReadyForPickupCardProps) {
  const { t } = useTranslation()

  return (
    <article className={cn('rounded-2xl border border-border bg-card p-5 shadow-sm', className)}>
      <h2 className="text-base font-semibold text-foreground">
        {t('dashboard.readyForPickup.title')}
      </h2>

      {readyForPickup.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{t('dashboard.readyForPickup.empty')}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {readyForPickup.map((entry) => (
            <li key={entry.patientId} className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">
                  {entry.patientName}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {entry.product}
                </span>
              </span>
              <span className="shrink-0 font-mono text-sm font-medium text-foreground">
                {entry.totalDue === null ? '—' : currencyFormatter.format(entry.totalDue)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
