import { resolveBilingual, useTranslation, type TranslationKey } from '@/lib/i18n'

import {
  calculateRunningTotal,
  formatPrice,
  type OrderSlot,
  type OrderSummaryLine,
} from '../services/order-total'

type OrderSummaryPanelProps = {
  lines: OrderSummaryLine[]
}

const summarySlots: OrderSlot[] = ['lensType', 'material', 'coatings', 'tint', 'frame']

function slotLabelKey(slot: OrderSlot): TranslationKey {
  return `lens.steps.${slot}` as TranslationKey
}

export function OrderSummaryPanel({ lines }: OrderSummaryPanelProps) {
  const { locale, t } = useTranslation()
  const runningTotal = calculateRunningTotal(lines)

  return (
    <aside className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-sm font-semibold text-foreground">{t('lens.summary.title')}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{t('lens.summary.serverPricingNote')}</p>

      <dl className="mt-4 flex flex-col gap-3">
        {summarySlots.map((slot) => {
          const slotLines = lines.filter((line) => line.slot === slot)

          return (
            <div key={slot} className="flex flex-col gap-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {t(slotLabelKey(slot))}
              </dt>
              {slotLines.length === 0 ? (
                <dd className="text-sm text-muted-foreground italic">
                  {t('lens.summary.pending')}
                </dd>
              ) : (
                slotLines.map((line, index) => {
                  const label = resolveBilingual({ en: line.labelEn, ar: line.labelAr }, locale)

                  return (
                    <dd
                      key={`${line.labelEn}-${index}`}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-foreground">{label.primary}</span>
                      <span className="font-mono text-foreground">{formatPrice(line.price)}</span>
                    </dd>
                  )
                })
              )}
            </div>
          )
        })}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold">
        <span className="text-foreground">{t('lens.summary.runningTotal')}</span>
        <span className="font-mono text-foreground">{formatPrice(runningTotal)}</span>
      </div>
    </aside>
  )
}
