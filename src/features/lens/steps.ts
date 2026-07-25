import { type TranslationKey } from '@/lib/i18n'

export type LensStep = 'lensType' | 'material' | 'coatings' | 'tint' | 'frame' | 'review'

export const lensSteps: LensStep[] = ['lensType', 'material', 'coatings', 'tint', 'frame', 'review']

export function stepLabelKey(step: LensStep): TranslationKey {
  return `lens.steps.${step}` as TranslationKey
}
