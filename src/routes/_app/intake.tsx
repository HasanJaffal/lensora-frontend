import { createFileRoute } from '@tanstack/react-router'

import { IntakePage } from '@/features/intake/pages/intake-page'
import { intakeSearchSchema } from '@/features/intake/intake-search'

export const Route = createFileRoute('/_app/intake')({
  validateSearch: intakeSearchSchema,
  component: IntakePage,
})
