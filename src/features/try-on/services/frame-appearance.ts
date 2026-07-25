import { type FrameShape, type OverlayScale } from '../types'

// These hex values represent physical product finishes from the inventory `color` field,
// not UI chrome, so they are intentionally literal rather than theme tokens.
const frameFinishColors: Record<string, string> = {
  black: '#1c1c1e',
  blue: '#1f3a8a',
  brown: '#5b3a21',
  gold: '#c8a24a',
  gunmetal: '#4a4f55',
  silver: '#b8bdc4',
  tortoise: '#7a4a1e',
}

const defaultFinishColor = '#3f3f46'

export const MIN_OVERLAY_SCALE = 0.7
export const MAX_OVERLAY_SCALE = 1.3

export const defaultOverlayScale: OverlayScale = { height: 1, width: 1 }

const frameShapes: FrameShape[] = [
  'rectangular',
  'round',
  'cat-eye',
  'aviator',
  'wayfarer',
  'clubmaster',
  'sport',
]

export function resolveFinishColor(color: string | null): string {
  if (!color) {
    return defaultFinishColor
  }

  return frameFinishColors[color.trim().toLowerCase()] ?? defaultFinishColor
}

export function resolveFrameShape(shape: string | null): FrameShape | null {
  if (!shape) {
    return null
  }

  const normalized = shape.trim().toLowerCase()

  return frameShapes.find((frameShape) => frameShape === normalized) ?? null
}

export function clampOverlayScale(value: number): number {
  return Math.min(MAX_OVERLAY_SCALE, Math.max(MIN_OVERLAY_SCALE, value))
}
