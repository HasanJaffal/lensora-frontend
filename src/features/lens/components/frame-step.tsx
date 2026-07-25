import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/constants/button-variants'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { FrameCard } from './frame-card'
import { type InventoryItemDto } from '../types'

type FrameStepProps = {
  frames: InventoryItemDto[]
  isError: boolean
  isLoading: boolean
  onSelectFrame: (frameId: string) => void
  selectedFrameId: string | null
}

export function FrameStep({
  frames,
  isError,
  isLoading,
  onSelectFrame,
  selectedFrameId,
}: FrameStepProps) {
  const { t } = useTranslation()
  const title = t('lens.steps.frame')

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('lens.frame.description')}</p>
      </div>

      {isLoading ? <LoadingState size="lg" /> : null}

      {isError ? <ErrorState description={t('lens.frame.loadError')} /> : null}

      {!isLoading && !isError && frames.length === 0 ? (
        <EmptyState
          title={t('lens.frame.emptyTitle')}
          description={t('lens.frame.emptyDescription')}
          actions={
            <Link to="/stock" className={cn(buttonVariants({ variant: 'outline' }))}>
              {t('lens.frame.goToStock')}
            </Link>
          }
        />
      ) : null}

      {!isLoading && !isError && frames.length > 0 ? (
        <div role="radiogroup" aria-label={title} className="grid gap-3 sm:grid-cols-2">
          {frames.map((frame) => (
            <FrameCard
              key={frame.id}
              frame={frame}
              isSelected={frame.id === selectedFrameId}
              onSelect={onSelectFrame}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
