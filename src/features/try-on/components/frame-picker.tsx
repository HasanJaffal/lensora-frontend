import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { resolveFinishColor } from '../services/frame-appearance'
import { type TryOnFrame } from '../types'

type FramePickerProps = {
  emptyDescription?: string
  frames: TryOnFrame[]
  isError: boolean
  isLoading: boolean
  label?: string
  onSelectFrame: (frameId: string) => void
  selectedFrameId: string | null
}

export function FramePicker({
  emptyDescription,
  frames,
  isError,
  isLoading,
  label,
  onSelectFrame,
  selectedFrameId,
}: FramePickerProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingState size="sm" />
  }

  if (isError) {
    return <ErrorState description={t('tryOn.frames.loadError')} />
  }

  if (frames.length === 0) {
    return (
      <EmptyState
        title={t('tryOn.frames.emptyTitle')}
        description={emptyDescription ?? t('tryOn.frames.emptyDescription')}
      />
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label={label ?? t('tryOn.frames.title')}
      className="grid gap-2 sm:grid-cols-2"
    >
      {frames.map((frame) => {
        const isSelected = frame.id === selectedFrameId

        return (
          <button
            key={frame.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectFrame(frame.id)}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 text-start transition-colors',
              'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              isSelected
                ? 'border-primary ring-1 ring-primary/30'
                : 'border-border hover:bg-muted/50',
            )}
          >
            <span
              aria-hidden="true"
              className="size-5 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: resolveFinishColor(frame.color) }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {frame.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {frame.brand}
                {frame.color ? ` · ${frame.color}` : ''}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
