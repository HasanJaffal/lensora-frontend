import { resolveBilingual, useTranslation, type TranslationKey } from '@/lib/i18n'

import { type GreetingDto } from '../types'

type GreetingBannerProps = {
  greeting: GreetingDto
}

function getSalutationKey(hour: number): TranslationKey {
  if (hour < 12) {
    return 'dashboard.greeting.morning'
  }
  if (hour < 18) {
    return 'dashboard.greeting.afternoon'
  }
  return 'dashboard.greeting.evening'
}

export function GreetingBanner({ greeting }: GreetingBannerProps) {
  const { locale, t } = useTranslation()
  const doctorName = resolveBilingual(
    { en: greeting.doctorNameEn, ar: greeting.doctorNameAr },
    locale,
  ).primary
  const salutationKey = getSalutationKey(new Date().getHours())

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        {t(salutationKey, { doctorName })}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t('dashboard.greeting.summary', {
          appointments: greeting.appointmentsToday,
          ordersInLab: greeting.ordersInLab,
          stockAlerts: greeting.stockAlerts,
        })}
      </p>
    </div>
  )
}
