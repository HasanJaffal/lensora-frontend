import { z } from 'zod'

import { type I18nContextValue } from '@/lib/i18n'

const genderValues = ['male', 'female', 'other'] as const
const onsetValues = ['sudden', 'progressive'] as const
const correctionPreferenceValues = ['eyeglasses', 'contacts', 'noPreference'] as const

const visualProblemValues = [
  'blurredVision',
  'colourVision',
  'doubleVision',
  'fixationConcentration',
  'visualField',
  'phoria',
  'tropia',
] as const

const functionalSignValues = [
  'photophobia',
  'tearing',
  'redness',
  'vertigo',
  'blepharospasm',
  'floaters',
  'phosphenes',
  'halos',
  'headache',
  'ocularPain',
  'burning',
  'itching',
  'dryness',
  'discharge',
  'swelling',
  'foreignBodySensation',
  'nightBlindness',
  'eyeStrain',
] as const

export const visualProblemOptionValues = visualProblemValues
export const functionalSignOptionValues = functionalSignValues
export const genderOptionValues = genderValues
export const onsetOptionValues = onsetValues
export const correctionPreferenceOptionValues = correctionPreferenceValues

const eyewearHistorySchema = z.object({
  wears: z.boolean(),
  wearHistory: z.string(),
  activity: z.string(),
  lastPrescriptionDate: z.string(),
  lastAcuity: z.string(),
  correctionValue: z.string(),
  centering: z.string(),
  satisfaction: z.string(),
  lensType: z.string(),
  brand: z.string(),
  wearFrequency: z.string(),
})

function buildIntakeSchema(t: I18nContextValue['t'], isCompletion: boolean) {
  const required = t('forms.validation.required')
  const requiredText = (value: string) => !isCompletion || value.trim().length > 0

  return z.object({
    individualInfo: z.object({
      name: z.string().refine(requiredText, required),
      formDate: z.string(),
      address: z.string(),
      homePhone: z.string(),
      city: z.string().refine(requiredText, required),
      cellPhone: z.string().refine(requiredText, required),
      email: z
        .string()
        .refine(
          (value) => value.trim().length === 0 || z.email().safeParse(value).success,
          t('forms.validation.email'),
        ),
      birthdate: z.string().refine(requiredText, required),
      gender: z.union([z.enum(genderValues), z.literal('')]),
      lastEyeExamDate: z.string(),
      profession: z.string(),
      hobbies: z.string(),
    }),
    motive: z.object({
      reasonForVisit: z.string().refine(requiredText, required),
      visualProblems: z.array(z.enum(visualProblemValues)),
      functionalSigns: z.array(z.enum(functionalSignValues)),
    }),
    themes: z.object({
      onset: z.union([z.enum(onsetValues), z.literal('')]),
      timing: z.string(),
      timeOfDay: z.string(),
      context: z.string(),
      correctionState: z.string(),
      associatedComplaints: z.string(),
      firstOccurrence: z.string(),
      trend: z.string(),
      permanence: z.string(),
      reliefMeasures: z.string(),
    }),
    refractionHistory: z.object({
      eyeglasses: eyewearHistorySchema,
      contactLenses: eyewearHistorySchema,
      overallPreference: z.union([z.enum(correctionPreferenceValues), z.literal('')]),
    }),
    antecedents: z.object({
      ocularHistory: z.object({
        pathology: z.string(),
        surgery: z.string(),
        trauma: z.string(),
        orthopticTreatment: z.string(),
      }),
      generalHealth: z.object({
        diabetes: z.boolean(),
        hypertension: z.boolean(),
        other: z.string(),
      }),
      medication: z.string(),
      familyHistory: z.object({
        refractive: z.string(),
        pathological: z.string(),
        relationship: z.string(),
      }),
    }),
  })
}

export function createIntakeDraftSchema(t: I18nContextValue['t']) {
  return buildIntakeSchema(t, false)
}

export function createIntakeCompleteSchema(t: I18nContextValue['t']) {
  return buildIntakeSchema(t, true)
}

export type IntakeFormValues = z.infer<ReturnType<typeof createIntakeDraftSchema>>
