import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function TipsPage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('tips.title')} description={t('tips.subtitle')} />
}
