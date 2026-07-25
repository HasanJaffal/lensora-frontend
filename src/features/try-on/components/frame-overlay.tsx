import { type ReactElement } from 'react'

import { resolveFinishColor, resolveFrameShape } from '../services/frame-appearance'
import { type FrameShape, type OverlayScale, type ProductNeed } from '../types'

type FrameOverlayProps = {
  color: string | null
  need: ProductNeed
  scale: OverlayScale
  shape: string | null
}

const OVERLAY_VIEWBOX_WIDTH = 200
const OVERLAY_VIEWBOX_HEIGHT = 80
const SUNGLASS_LENS_TINT = '#101014'
const SUNGLASS_LENS_OPACITY = 0.62

function leftLens(shape: FrameShape): ReactElement {
  switch (shape) {
    case 'round':
      return <circle cx="58" cy="40" r="26" />
    case 'aviator':
      return <path d="M32 26h52l-6 28a20 20 0 0 1-40 0z" />
    case 'cat-eye':
      return <path d="M30 30q14-14 54-6l-4 24a24 24 0 0 1-46 2z" />
    case 'clubmaster':
      return <path d="M30 26h56l-6 22a24 24 0 0 1-44 0z" />
    case 'sport':
      return <path d="M30 28h56l-2 22a22 22 0 0 1-44 2z" />
    case 'wayfarer':
      return <path d="M30 26h56l-5 26a23 23 0 0 1-46 0z" />
    case 'rectangular':
      return <rect x="30" y="26" width="56" height="30" rx="6" />
  }
}

function rightLens(shape: FrameShape): ReactElement {
  switch (shape) {
    case 'round':
      return <circle cx="142" cy="40" r="26" />
    case 'aviator':
      return <path d="M116 26h52l-6 28a20 20 0 0 1-40 0z" />
    case 'cat-eye':
      return <path d="M170 30q-14-14-54-6l4 24a24 24 0 0 0 46 2z" />
    case 'clubmaster':
      return <path d="M114 26h56l-6 22a24 24 0 0 1-44 0z" />
    case 'sport':
      return <path d="M114 28h56l-2 22a22 22 0 0 1-44 2z" />
    case 'wayfarer':
      return <path d="M114 26h56l-5 26a23 23 0 0 1-46 0z" />
    case 'rectangular':
      return <rect x="114" y="26" width="56" height="30" rx="6" />
  }
}

/** Clubmaster's defining feature is a heavy browline across the top of both lenses. */
function browLine(shape: FrameShape, color: string): ReactElement | null {
  if (shape !== 'clubmaster') {
    return null
  }

  return <path d="M28 26h60l6 6h12l6-6h60v8h-58l-6 6h-12l-6-6H28z" fill={color} stroke="none" />
}

export function FrameOverlay({ color, need, scale, shape }: FrameOverlayProps) {
  const resolvedShape = resolveFrameShape(shape)

  // FR-TRY-2: contacts never render a frame overlay.
  if (need === 'contacts' || resolvedShape === null) {
    return null
  }

  const finishColor = resolveFinishColor(color)
  const isSunglasses = need === 'sunglasses'

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${OVERLAY_VIEWBOX_WIDTH} ${OVERLAY_VIEWBOX_HEIGHT}`}
      className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto w-[68%] -translate-y-1/2"
      style={{ transform: `translateY(-50%) scaleX(${scale.width}) scaleY(${scale.height})` }}
    >
      <g
        fill={isSunglasses ? SUNGLASS_LENS_TINT : 'none'}
        fillOpacity={isSunglasses ? SUNGLASS_LENS_OPACITY : 0}
        stroke={finishColor}
        strokeWidth={5}
        strokeLinejoin="round"
      >
        {leftLens(resolvedShape)}
        {rightLens(resolvedShape)}
        <path d="M86 32h28" strokeLinecap="round" />
        <path d="M30 30L8 24" strokeLinecap="round" />
        <path d="M170 30l22-6" strokeLinecap="round" />
      </g>
      {browLine(resolvedShape, finishColor)}
    </svg>
  )
}
