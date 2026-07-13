import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function LensSelectorPage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('lens.title')} description={t('lens.subtitle')} />
}
