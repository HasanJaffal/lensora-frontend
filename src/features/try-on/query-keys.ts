import { type ProductNeed } from './types'

export const tryOnKeys = {
  stylingAdvice: (frameId: string, need: ProductNeed, locale: string, patientId?: string) =>
    ['try-on', 'styling-advice', frameId, need, locale, patientId ?? null] as const,
}
