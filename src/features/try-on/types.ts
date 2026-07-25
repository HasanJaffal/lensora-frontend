import { type FrameUse } from '@/features/lens/types'

export type ProductNeed = FrameUse

export type StylingAdviceRequest = {
  patientId?: string
  frameId: string
  need: ProductNeed
  locale: string
}

export type StylingAdviceDto = {
  tips: string[]
  usedFallback: boolean
}

export type FrameShape =
  'rectangular' | 'round' | 'cat-eye' | 'aviator' | 'wayfarer' | 'clubmaster' | 'sport'

export type OverlayScale = {
  height: number
  width: number
}
