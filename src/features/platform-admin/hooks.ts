import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createOrganization,
  getOrganization,
  getPlatformAdminDashboard,
  listOrganizations,
  setOrganizationStatus,
} from './api'
import { platformAdminKeys } from './query-keys'

export function useOrganizations(page: number, pageSize: number) {
  return useQuery({
    queryKey: platformAdminKeys.organizations(page, pageSize),
    queryFn: () => listOrganizations(page, pageSize),
  })
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: platformAdminKeys.organization(id),
    queryFn: () => getOrganization(id),
  })
}

export function usePlatformAdminDashboard() {
  return useQuery({
    queryKey: platformAdminKeys.dashboard(),
    queryFn: getPlatformAdminDashboard,
  })
}

export function useCreateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: platformAdminKeys.all })
    },
  })
}

export function useSetOrganizationStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setOrganizationStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: platformAdminKeys.all })
    },
  })
}
