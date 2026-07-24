export type IntakeStatus = 'draft' | 'completed'

export type Gender = 'male' | 'female' | 'other'

export type VisualProblem =
  | 'blurredVision'
  | 'colourVision'
  | 'doubleVision'
  | 'fixationConcentration'
  | 'visualField'
  | 'phoria'
  | 'tropia'

export type FunctionalSign =
  | 'photophobia'
  | 'tearing'
  | 'redness'
  | 'vertigo'
  | 'blepharospasm'
  | 'floaters'
  | 'phosphenes'
  | 'halos'
  | 'headache'
  | 'ocularPain'
  | 'burning'
  | 'itching'
  | 'dryness'
  | 'discharge'
  | 'swelling'
  | 'foreignBodySensation'
  | 'nightBlindness'
  | 'eyeStrain'

export type Onset = 'sudden' | 'progressive'

export type CorrectionPreference = 'eyeglasses' | 'contacts' | 'noPreference'

export type IndividualInfoDto = {
  name: string | null
  formDate: string | null
  address: string | null
  homePhone: string | null
  city: string | null
  cellPhone: string | null
  email: string | null
  birthdate: string | null
  gender: Gender | null
  lastEyeExamDate: string | null
  profession: string | null
  hobbies: string | null
}

export type MotiveDto = {
  reasonForVisit: string | null
  visualProblems: VisualProblem[]
  functionalSigns: FunctionalSign[]
}

export type ThemesDto = {
  onset: Onset | null
  timing: string | null
  timeOfDay: string | null
  context: string | null
  correctionState: string | null
  associatedComplaints: string | null
  firstOccurrence: string | null
  trend: string | null
  permanence: string | null
  reliefMeasures: string | null
}

export type EyewearHistoryDto = {
  wears: boolean | null
  wearHistory: string | null
  activity: string | null
  lastPrescriptionDate: string | null
  lastAcuity: string | null
  correctionValue: string | null
  centering: string | null
  satisfaction: string | null
  lensType: string | null
  brand: string | null
  wearFrequency: string | null
}

export type RefractionHistoryDto = {
  eyeglasses: EyewearHistoryDto
  contactLenses: EyewearHistoryDto
  overallPreference: CorrectionPreference | null
}

export type OcularHistoryDto = {
  pathology: string | null
  surgery: string | null
  trauma: string | null
  orthopticTreatment: string | null
}

export type GeneralHealthDto = {
  diabetes: boolean | null
  hypertension: boolean | null
  other: string | null
}

export type FamilyHistoryDto = {
  refractive: string | null
  pathological: string | null
  relationship: string | null
}

export type AntecedentsDto = {
  ocularHistory: OcularHistoryDto
  generalHealth: GeneralHealthDto
  medication: string | null
  familyHistory: FamilyHistoryDto
}

export type IntakeDto = {
  id: string
  status: IntakeStatus
  patientId: string | null
  individualInfo: IndividualInfoDto
  motive: MotiveDto
  themes: ThemesDto
  refractionHistory: RefractionHistoryDto
  antecedents: AntecedentsDto
  createdAt: string
  updatedAt: string
}

export type IntakeListItemDto = {
  id: string
  status: IntakeStatus
  patientId: string | null
  name: string | null
  createdAt: string
  updatedAt: string
}

export type IntakeSectionsPayload = {
  individualInfo: IndividualInfoDto
  motive: MotiveDto
  themes: ThemesDto
  refractionHistory: RefractionHistoryDto
  antecedents: AntecedentsDto
}

export type IntakeCreateRequest = IntakeSectionsPayload & {
  status: IntakeStatus
  patientId: string | null
}

export type IntakeUpdateRequest = IntakeCreateRequest

export type IntakeListQuery = {
  patientId?: string
  status?: IntakeStatus
}
