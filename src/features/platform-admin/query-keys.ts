export const platformAdminKeys = {
  all: ['platform-admin'] as const,
  organizations: (page: number, pageSize: number) =>
    [...platformAdminKeys.all, 'organizations', { page, pageSize }] as const,
  organization: (id: string) => [...platformAdminKeys.all, 'organizations', id] as const,
  dashboard: () => [...platformAdminKeys.all, 'dashboard'] as const,
}
