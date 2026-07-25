export type PatientStatus = 'active' | 'lab' | 'ready'

// Decimal fields serialize as JSON strings (e.g. "-2.25") to preserve precision — see api.ts formatters.
export type RxSummaryDto = {
  odSph: string | null
  osSph: string | null
}

export type RefractionEyeDto = {
  sph: string | null
  cyl: string | null
  axis: number | null
  add: string | null
}

export type RefractionDto = {
  od: RefractionEyeDto
  os: RefractionEyeDto
}

export type LensConfigDto = {
  lensType: string | null
  material: string | null
  coatings: string[]
  tint: string | null
  frameSku: string | null
}

export type PatientNoteDto = {
  id: string
  en: string
  ar: string
}

export type VisitHistoryDto = {
  id: string
  date: string
  titleEn: string
  titleAr: string
  detailEn: string
  detailAr: string
}

export type PatientListItemDto = {
  id: string
  nameEn: string
  nameAr: string
  phone: string
  age: number
  lastVisit: string | null
  status: PatientStatus
  rxSummary: RxSummaryDto
}

export type PatientDto = {
  id: string
  nameEn: string
  nameAr: string
  phone: string
  townEn: string
  townAr: string
  birthYear: number
  age: number
  lastVisit: string | null
  status: PatientStatus
  refraction: RefractionDto
  pdDist: string | null
  pdNear: string | null
  diagnosisEn: string | null
  diagnosisAr: string | null
  rxNumber: string | null
  rxDate: string | null
  lensConfig: LensConfigDto | null
  tags: string[]
  notes: PatientNoteDto[]
  history: VisitHistoryDto[]
}

export type OrderItemDto = {
  labelEn: string
  labelAr: string
  price: string
}

export type OrderFrameDto = {
  sku: string | null
  name: string | null
}

export type LensOrderDto = {
  id: string
  patientId: string
  items: OrderItemDto[]
  total: string
  deposit: string
  depositPercent: string
  frame: OrderFrameDto
  createdAt: string
}

export type PatientListQuery = {
  page: number
  pageSize: number
  status?: PatientStatus
  q?: string
}
