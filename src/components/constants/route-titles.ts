import { type TranslationKey } from '@/lib/i18n'

const routeTitleKeys: { prefix: string; titleKey: TranslationKey }[] = [
  { prefix: '/patients', titleKey: 'patients.title' },
  { prefix: '/intake', titleKey: 'intake.title' },
  { prefix: '/lens', titleKey: 'lens.title' },
  { prefix: '/try-on', titleKey: 'tryOn.title' },
  { prefix: '/tips', titleKey: 'tips.title' },
  { prefix: '/stock', titleKey: 'stock.title' },
  // Longest platform-admin prefix first: `getPageTitleKey` matches on `startsWith`.
  { prefix: '/platform-admin/organizations', titleKey: 'platformAdmin.list.title' },
  { prefix: '/platform-admin', titleKey: 'platformAdmin.dashboard.title' },
]

export function getPageTitleKey(pathname: string): TranslationKey {
  const match = routeTitleKeys.find((entry) => pathname.startsWith(entry.prefix))

  return match?.titleKey ?? 'dashboard.title'
}
