import { apiClient, type PaginatedResult } from '@/lib/api-client'

import {
  type CreateOrganizationRequest,
  type OrganizationDto,
  type PlatformAdminDashboardDto,
  type SetOrganizationStatusRequest,
} from './types'

export function listOrganizations(
  page: number,
  pageSize: number,
): Promise<PaginatedResult<OrganizationDto[]>> {
  return apiClient.getPaginated<OrganizationDto[]>('/platform-admin/organizations', {
    query: { page, pageSize },
  })
}

export function createOrganization(body: CreateOrganizationRequest): Promise<OrganizationDto> {
  return apiClient.post<OrganizationDto>('/platform-admin/organizations', body)
}

export function getOrganization(id: string): Promise<OrganizationDto> {
  return apiClient.get<OrganizationDto>(`/platform-admin/organizations/${id}`)
}

export function setOrganizationStatus({
  id,
  isActive,
}: SetOrganizationStatusRequest): Promise<OrganizationDto> {
  return apiClient.patch<OrganizationDto>(`/platform-admin/organizations/${id}/status`, {
    isActive,
  })
}

export function getPlatformAdminDashboard(): Promise<PlatformAdminDashboardDto> {
  return apiClient.get<PlatformAdminDashboardDto>('/platform-admin/dashboard')
}
