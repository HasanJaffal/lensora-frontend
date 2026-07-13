import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function StockPage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('stock.title')} description={t('stock.subtitle')} />
}
