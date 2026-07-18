export const platformAdminKeys = {
  organizations: (page: number, pageSize: number) =>
    ['platform-admin', 'organizations', { page, pageSize }] as const,
  organization: (id: string) => ['platform-admin', 'organizations', id] as const,
}
