import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function TryOnPage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('tryOn.title')} description={t('tryOn.subtitle')} />
}
