import { createFileRoute } from '@tanstack/react-router'

import { PlatformAdminDashboardPage } from '@/features/platform-admin/pages/platform-admin-dashboard-page'

export const Route = createFileRoute('/platform-admin/')({
  component: PlatformAdminDashboardPage,
})
