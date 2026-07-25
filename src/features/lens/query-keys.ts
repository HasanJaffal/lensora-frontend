import { type FrameUse } from './types'

export const lensKeys = {
  catalog: ['lens', 'catalog'] as const,
  inStockFrames: (use: FrameUse) => ['lens', 'frames', use] as const,
}
