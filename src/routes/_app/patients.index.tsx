import { createFileRoute } from '@tanstack/react-router'

import { PatientsPage } from '@/features/patients/pages/patients-page'

export const Route = createFileRoute('/_app/patients/')({
  component: PatientsPage,
})
