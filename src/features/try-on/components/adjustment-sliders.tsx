import { Slider } from '@/components/ui/slider'
import { useTranslation } from '@/lib/i18n'

import { MAX_OVERLAY_SCALE, MIN_OVERLAY_SCALE } from '../services/frame-appearance'
import { type OverlayScale } from '../types'

type AdjustmentSlidersProps = {
  isDisabled: boolean
  onScaleChange: (scale: OverlayScale) => void
  scale: OverlayScale
}

const SLIDER_STEP = 0.01

function readSliderValue(value: number | readonly number[]): number | null {
  const nextValue = Array.isArray(value) ? value[0] : value

  return typeof nextValue === 'number' ? nextValue : null
}

export function AdjustmentSliders({ isDisabled, onScaleChange, scale }: AdjustmentSlidersProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-foreground">{t('tryOn.adjust.title')}</h2>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="overlay-width" className="text-muted-foreground">
            {t('tryOn.adjust.width')}
          </label>
          <span className="font-mono text-xs text-foreground">{scale.width.toFixed(2)}×</span>
        </div>
        <Slider
          id="overlay-width"
          disabled={isDisabled}
          min={MIN_OVERLAY_SCALE}
          max={MAX_OVERLAY_SCALE}
          step={SLIDER_STEP}
          value={[scale.width]}
          onValueChange={(value) => {
            const width = readSliderValue(value)

            if (width !== null) {
              onScaleChange({ ...scale, width })
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="overlay-height" className="text-muted-foreground">
            {t('tryOn.adjust.height')}
          </label>
          <span className="font-mono text-xs text-foreground">{scale.height.toFixed(2)}×</span>
        </div>
        <Slider
          id="overlay-height"
          disabled={isDisabled}
          min={MIN_OVERLAY_SCALE}
          max={MAX_OVERLAY_SCALE}
          step={SLIDER_STEP}
          value={[scale.height]}
          onValueChange={(value) => {
            const height = readSliderValue(value)

            if (height !== null) {
              onScaleChange({ ...scale, height })
            }
          }}
        />
      </div>
    </div>
  )
}
