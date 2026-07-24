import { type IntakeFormValues } from './intake-schema'
import {
  type EyewearHistoryDto,
  type IntakeCreateRequest,
  type IntakeDto,
  type IntakeStatus,
} from './types'

function toOptionalText(value: string): string | null {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function toFormText(value: string | null): string {
  return value ?? ''
}

function toFormBoolean(value: boolean | null): boolean {
  return value ?? false
}

const emptyEyewearHistory: IntakeFormValues['refractionHistory']['eyeglasses'] = {
  wears: false,
  wearHistory: '',
  activity: '',
  lastPrescriptionDate: '',
  lastAcuity: '',
  correctionValue: '',
  centering: '',
  satisfaction: '',
  lensType: '',
  brand: '',
  wearFrequency: '',
}

export const emptyIntakeFormValues: IntakeFormValues = {
  individualInfo: {
    name: '',
    formDate: '',
    address: '',
    homePhone: '',
    city: '',
    cellPhone: '',
    email: '',
    birthdate: '',
    gender: '',
    lastEyeExamDate: '',
    profession: '',
    hobbies: '',
  },
  motive: {
    reasonForVisit: '',
    visualProblems: [],
    functionalSigns: [],
  },
  themes: {
    onset: '',
    timing: '',
    timeOfDay: '',
    context: '',
    correctionState: '',
    associatedComplaints: '',
    firstOccurrence: '',
    trend: '',
    permanence: '',
    reliefMeasures: '',
  },
  refractionHistory: {
    eyeglasses: { ...emptyEyewearHistory },
    contactLenses: { ...emptyEyewearHistory },
    overallPreference: '',
  },
  antecedents: {
    ocularHistory: { pathology: '', surgery: '', trauma: '', orthopticTreatment: '' },
    generalHealth: { diabetes: false, hypertension: false, other: '' },
    medication: '',
    familyHistory: { refractive: '', pathological: '', relationship: '' },
  },
}

function toEyewearFormValues(
  history: EyewearHistoryDto | undefined,
): IntakeFormValues['refractionHistory']['eyeglasses'] {
  if (!history) {
    return { ...emptyEyewearHistory }
  }

  return {
    wears: toFormBoolean(history.wears),
    wearHistory: toFormText(history.wearHistory),
    activity: toFormText(history.activity),
    lastPrescriptionDate: toFormText(history.lastPrescriptionDate),
    lastAcuity: toFormText(history.lastAcuity),
    correctionValue: toFormText(history.correctionValue),
    centering: toFormText(history.centering),
    satisfaction: toFormText(history.satisfaction),
    lensType: toFormText(history.lensType),
    brand: toFormText(history.brand),
    wearFrequency: toFormText(history.wearFrequency),
  }
}

export function toIntakeFormValues(intake: IntakeDto | undefined): IntakeFormValues {
  if (!intake) {
    return structuredClone(emptyIntakeFormValues)
  }

  const { individualInfo, motive, themes, refractionHistory, antecedents } = intake

  return {
    individualInfo: {
      name: toFormText(individualInfo?.name ?? null),
      formDate: toFormText(individualInfo?.formDate ?? null),
      address: toFormText(individualInfo?.address ?? null),
      homePhone: toFormText(individualInfo?.homePhone ?? null),
      city: toFormText(individualInfo?.city ?? null),
      cellPhone: toFormText(individualInfo?.cellPhone ?? null),
      email: toFormText(individualInfo?.email ?? null),
      birthdate: toFormText(individualInfo?.birthdate ?? null),
      gender: individualInfo?.gender ?? '',
      lastEyeExamDate: toFormText(individualInfo?.lastEyeExamDate ?? null),
      profession: toFormText(individualInfo?.profession ?? null),
      hobbies: toFormText(individualInfo?.hobbies ?? null),
    },
    motive: {
      reasonForVisit: toFormText(motive?.reasonForVisit ?? null),
      visualProblems: motive?.visualProblems ?? [],
      functionalSigns: motive?.functionalSigns ?? [],
    },
    themes: {
      onset: themes?.onset ?? '',
      timing: toFormText(themes?.timing ?? null),
      timeOfDay: toFormText(themes?.timeOfDay ?? null),
      context: toFormText(themes?.context ?? null),
      correctionState: toFormText(themes?.correctionState ?? null),
      associatedComplaints: toFormText(themes?.associatedComplaints ?? null),
      firstOccurrence: toFormText(themes?.firstOccurrence ?? null),
      trend: toFormText(themes?.trend ?? null),
      permanence: toFormText(themes?.permanence ?? null),
      reliefMeasures: toFormText(themes?.reliefMeasures ?? null),
    },
    refractionHistory: {
      eyeglasses: toEyewearFormValues(refractionHistory?.eyeglasses),
      contactLenses: toEyewearFormValues(refractionHistory?.contactLenses),
      overallPreference: refractionHistory?.overallPreference ?? '',
    },
    antecedents: {
      ocularHistory: {
        pathology: toFormText(antecedents?.ocularHistory?.pathology ?? null),
        surgery: toFormText(antecedents?.ocularHistory?.surgery ?? null),
        trauma: toFormText(antecedents?.ocularHistory?.trauma ?? null),
        orthopticTreatment: toFormText(antecedents?.ocularHistory?.orthopticTreatment ?? null),
      },
      generalHealth: {
        diabetes: toFormBoolean(antecedents?.generalHealth?.diabetes ?? null),
        hypertension: toFormBoolean(antecedents?.generalHealth?.hypertension ?? null),
        other: toFormText(antecedents?.generalHealth?.other ?? null),
      },
      medication: toFormText(antecedents?.medication ?? null),
      familyHistory: {
        refractive: toFormText(antecedents?.familyHistory?.refractive ?? null),
        pathological: toFormText(antecedents?.familyHistory?.pathological ?? null),
        relationship: toFormText(antecedents?.familyHistory?.relationship ?? null),
      },
    },
  }
}

function toEyewearPayload(
  history: IntakeFormValues['refractionHistory']['eyeglasses'],
): EyewearHistoryDto {
  return {
    wears: history.wears,
    wearHistory: toOptionalText(history.wearHistory),
    activity: toOptionalText(history.activity),
    lastPrescriptionDate: toOptionalText(history.lastPrescriptionDate),
    lastAcuity: toOptionalText(history.lastAcuity),
    correctionValue: toOptionalText(history.correctionValue),
    centering: toOptionalText(history.centering),
    satisfaction: toOptionalText(history.satisfaction),
    lensType: toOptionalText(history.lensType),
    brand: toOptionalText(history.brand),
    wearFrequency: toOptionalText(history.wearFrequency),
  }
}

export function toIntakeRequest(
  values: IntakeFormValues,
  status: IntakeStatus,
  patientId: string | null,
): IntakeCreateRequest {
  return {
    status,
    patientId,
    individualInfo: {
      name: toOptionalText(values.individualInfo.name),
      formDate: toOptionalText(values.individualInfo.formDate),
      address: toOptionalText(values.individualInfo.address),
      homePhone: toOptionalText(values.individualInfo.homePhone),
      city: toOptionalText(values.individualInfo.city),
      cellPhone: toOptionalText(values.individualInfo.cellPhone),
      email: toOptionalText(values.individualInfo.email),
      birthdate: toOptionalText(values.individualInfo.birthdate),
      gender: values.individualInfo.gender === '' ? null : values.individualInfo.gender,
      lastEyeExamDate: toOptionalText(values.individualInfo.lastEyeExamDate),
      profession: toOptionalText(values.individualInfo.profession),
      hobbies: toOptionalText(values.individualInfo.hobbies),
    },
    motive: {
      reasonForVisit: toOptionalText(values.motive.reasonForVisit),
      visualProblems: values.motive.visualProblems,
      functionalSigns: values.motive.functionalSigns,
    },
    themes: {
      onset: values.themes.onset === '' ? null : values.themes.onset,
      timing: toOptionalText(values.themes.timing),
      timeOfDay: toOptionalText(values.themes.timeOfDay),
      context: toOptionalText(values.themes.context),
      correctionState: toOptionalText(values.themes.correctionState),
      associatedComplaints: toOptionalText(values.themes.associatedComplaints),
      firstOccurrence: toOptionalText(values.themes.firstOccurrence),
      trend: toOptionalText(values.themes.trend),
      permanence: toOptionalText(values.themes.permanence),
      reliefMeasures: toOptionalText(values.themes.reliefMeasures),
    },
    refractionHistory: {
      eyeglasses: toEyewearPayload(values.refractionHistory.eyeglasses),
      contactLenses: toEyewearPayload(values.refractionHistory.contactLenses),
      overallPreference:
        values.refractionHistory.overallPreference === ''
          ? null
          : values.refractionHistory.overallPreference,
    },
    antecedents: {
      ocularHistory: {
        pathology: toOptionalText(values.antecedents.ocularHistory.pathology),
        surgery: toOptionalText(values.antecedents.ocularHistory.surgery),
        trauma: toOptionalText(values.antecedents.ocularHistory.trauma),
        orthopticTreatment: toOptionalText(values.antecedents.ocularHistory.orthopticTreatment),
      },
      generalHealth: {
        diabetes: values.antecedents.generalHealth.diabetes,
        hypertension: values.antecedents.generalHealth.hypertension,
        other: toOptionalText(values.antecedents.generalHealth.other),
      },
      medication: toOptionalText(values.antecedents.medication),
      familyHistory: {
        refractive: toOptionalText(values.antecedents.familyHistory.refractive),
        pathological: toOptionalText(values.antecedents.familyHistory.pathological),
        relationship: toOptionalText(values.antecedents.familyHistory.relationship),
      },
    },
  }
}
