import { LayoutDashboard } from 'lucide-react'
import type { LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import type { TranslationKey } from '@/lib/i18n'

export type NavigationItem = {
  labelKey: TranslationKey
  to: LinkProps['to']
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  {
    labelKey: 'common.navigation.dashboard',
    to: '/',
    icon: LayoutDashboard,
  },
]
