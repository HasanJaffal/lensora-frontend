import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function IntakePage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('intake.title')} description={t('intake.subtitle')} />
}
