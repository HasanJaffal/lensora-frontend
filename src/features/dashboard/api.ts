import { apiClient } from '@/lib/api-client'

import { type DashboardSummaryDto } from './types'

export function getDashboardSummary(): Promise<DashboardSummaryDto> {
  return apiClient.get<DashboardSummaryDto>('/dashboard/summary')
}
