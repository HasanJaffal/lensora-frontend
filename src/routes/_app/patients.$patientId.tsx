import { createFileRoute } from '@tanstack/react-router'

import { PatientRecordPage } from '@/features/patients/pages/patient-record-page'

export const Route = createFileRoute('/_app/patients/$patientId')({
  component: PatientRecordPage,
})
