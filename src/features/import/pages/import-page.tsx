import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function ImportPage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('import.title')} description={t('import.subtitle')} />
}
