import { useQuery } from '@tanstack/react-query'

import { getDashboardSummary } from './api'
import { dashboardKeys } from './query-keys'

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary,
    queryFn: getDashboardSummary,
  })
}
