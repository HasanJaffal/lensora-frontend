import { Building2, LayoutDashboard } from 'lucide-react'

import type { NavigationItem } from './navigation-items'

export const platformAdminNavigationItems: NavigationItem[] = [
  { labelKey: 'platformAdmin.navigation.dashboard', to: '/platform-admin', icon: LayoutDashboard },
  {
    labelKey: 'platformAdmin.navigation.organizations',
    to: '/platform-admin/organizations',
    icon: Building2,
  },
]
