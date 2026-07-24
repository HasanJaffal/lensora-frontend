import { type IntakeListQuery } from './types'

export const intakeKeys = {
  all: ['intake'] as const,
  lists: () => ['intake', 'list'] as const,
  list: (query: IntakeListQuery) => ['intake', 'list', query] as const,
  detail: (intakeId: string) => ['intake', 'detail', intakeId] as const,
}
