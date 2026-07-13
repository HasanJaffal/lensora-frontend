import {
  Camera,
  ClipboardList,
  FileUp,
  Glasses,
  LayoutDashboard,
  Lightbulb,
  Package,
  Users,
} from 'lucide-react'
import type { LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import type { TranslationKey } from '@/lib/i18n'

export type NavigationItem = {
  labelKey: TranslationKey
  to: LinkProps['to']
  icon: LucideIcon
  hasStockBadge?: boolean
}

export const navigationItems: NavigationItem[] = [
  { labelKey: 'common.navigation.dashboard', to: '/', icon: LayoutDashboard },
  { labelKey: 'common.navigation.patients', to: '/patients', icon: Users },
  { labelKey: 'common.navigation.intake', to: '/intake', icon: ClipboardList },
  { labelKey: 'common.navigation.lensSelector', to: '/lens', icon: Glasses },
  { labelKey: 'common.navigation.virtualTryOn', to: '/try-on', icon: Camera },
  { labelKey: 'common.navigation.stock', to: '/stock', icon: Package, hasStockBadge: true },
  { labelKey: 'common.navigation.tips', to: '/tips', icon: Lightbulb },
  { labelKey: 'common.navigation.importForm', to: '/import', icon: FileUp },
]
