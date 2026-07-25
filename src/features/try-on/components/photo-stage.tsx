import { ImageOff } from 'lucide-react'

import { EmptyState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { FrameOverlay } from './frame-overlay'
import { type OverlayScale, type ProductNeed, type TryOnFrame } from '../types'

type PhotoStageProps = {
  emptyDescription?: string
  need: ProductNeed
  photoUrl: string | null
  previewAlt?: string
  scale: OverlayScale
  selectedFrame: TryOnFrame | null
}

export function PhotoStage({
  emptyDescription,
  need,
  photoUrl,
  previewAlt,
  scale,
  selectedFrame,
}: PhotoStageProps) {
  const { t } = useTranslation()

  if (!photoUrl) {
    return (
      <EmptyState
        icon={<ImageOff className="size-5" aria-hidden="true" />}
        title={t('tryOn.photo.emptyTitle')}
        description={emptyDescription ?? t('tryOn.photo.emptyDescription')}
        className="min-h-72"
      />
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
      <img
        src={photoUrl}
        alt={previewAlt ?? t('tryOn.photo.previewAlt')}
        className="w-full object-cover"
      />
      {selectedFrame ? (
        <FrameOverlay
          color={selectedFrame.color}
          need={need}
          scale={scale}
          shape={selectedFrame.shape}
        />
      ) : null}
    </div>
  )
}
