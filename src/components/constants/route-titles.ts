import { type TranslationKey } from '@/lib/i18n'

const routeTitleKeys: { prefix: string; titleKey: TranslationKey }[] = [
  { prefix: '/patients', titleKey: 'patients.title' },
  { prefix: '/intake', titleKey: 'intake.title' },
  { prefix: '/import', titleKey: 'import.title' },
  { prefix: '/lens', titleKey: 'lens.title' },
  { prefix: '/try-on', titleKey: 'tryOn.title' },
  { prefix: '/tips', titleKey: 'tips.title' },
  { prefix: '/stock', titleKey: 'stock.title' },
  { prefix: '/platform-admin', titleKey: 'platformAdmin.list.title' },
]

export function getPageTitleKey(pathname: string): TranslationKey {
  const match = routeTitleKeys.find((entry) => pathname.startsWith(entry.prefix))

  return match?.titleKey ?? 'dashboard.title'
}
