import { z } from 'zod'

export const intakeSearchSchema = z.object({
  patientId: z.string().optional(),
  intakeId: z.string().optional(),
  importId: z.string().optional(),
})

export type IntakeSearch = z.infer<typeof intakeSearchSchema>
