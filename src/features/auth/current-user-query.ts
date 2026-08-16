import { queryOptions } from '@tanstack/react-query'

import { fetchCurrentUser } from './api'
import { authKeys } from './query-keys'

export const currentUserQueryOptions = queryOptions({
  queryKey: authKeys.currentUser,
  queryFn: fetchCurrentUser,
  staleTime: Infinity,
  retry: false,
})
