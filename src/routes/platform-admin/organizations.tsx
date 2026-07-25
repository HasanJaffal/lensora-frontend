import { createFileRoute } from '@tanstack/react-router'

import { OrganizationsPage } from '@/features/platform-admin/pages/organizations-page'

export const Route = createFileRoute('/platform-admin/organizations')({
  component: OrganizationsPage,
})
