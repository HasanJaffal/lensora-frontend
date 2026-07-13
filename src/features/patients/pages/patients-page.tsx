import { PlaceholderPage } from '@/components/custom/placeholder-page'
import { useTranslation } from '@/lib/i18n'

export function PatientsPage() {
  const { t } = useTranslation()

  return <PlaceholderPage title={t('patients.title')} description={t('patients.subtitle')} />
}
