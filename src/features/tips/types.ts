export type TipCategory = 'screen' | 'lensCare' | 'adapting' | 'children' | 'sunUv'

export type TipCategoryFilter = TipCategory | 'all'

export type TipDto = {
  id: string
  category: string
  tags: string[]
  icon: string
  color: string
  titleEn: string
  titleAr: string
  bodyEn: string
  bodyAr: string
}

export type SendTipResultDto = {
  tipId: string
  patientId: string
  channel: string
  status: string
}

export type SendTipVariables = {
  tipId: string
  patientId: string
}
