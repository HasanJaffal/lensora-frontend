import { useEffect, useRef, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'

import { useInStockFrames } from '@/features/lens/hooks'
import { resolvePreselectedFrame } from '@/features/lens/services/resolve-frame'
import { useTranslation } from '@/lib/i18n'

import { AdjustmentSliders } from '../components/adjustment-sliders'
import { FramePicker } from '../components/frame-picker'
import { NeedSwitch } from '../components/need-switch'
import { PhotoInput } from '../components/photo-input'
import { PhotoStage } from '../components/photo-stage'
import { defaultOverlayScale } from '../services/frame-appearance'
import { type OverlayScale, type ProductNeed } from '../types'

const routeApi = getRouteApi('/_app/try-on')

export function TryOnPage() {
  const { t } = useTranslation()
  const search = routeApi.useSearch()

  const [need, setNeed] = useState<ProductNeed>('eyeglasses')
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null)
  const [scale, setScale] = useState<OverlayScale>(defaultOverlayScale)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  // The captured photo stays in the browser as an object URL and is never uploaded (NFR-5);
  // the ref lets us revoke the previous URL without re-running an effect on every render.
  const photoUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (photoUrlRef.current) {
        URL.revokeObjectURL(photoUrlRef.current)
      }
    }
  }, [])

  const framesQuery = useInStockFrames(need)
  const frames = framesQuery.data ?? []

  const preselectedFrame = resolvePreselectedFrame(frames, search.frameId)
  const effectiveFrameId = selectedFrameId ?? preselectedFrame?.id ?? null
  const selectedFrame = frames.find((frame) => frame.id === effectiveFrameId) ?? null

  const replacePhoto = (nextUrl: string | null) => {
    if (photoUrlRef.current) {
      URL.revokeObjectURL(photoUrlRef.current)
    }

    photoUrlRef.current = nextUrl
    setPhotoUrl(nextUrl)
  }

  const selectPhoto = (file: File) => {
    replacePhoto(URL.createObjectURL(file))
  }

  const changeNeed = (nextNeed: ProductNeed) => {
    setNeed(nextNeed)
    setSelectedFrameId(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{t('tryOn.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('tryOn.subtitle')}</p>
      </div>

      <NeedSwitch need={need} onNeedChange={changeNeed} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-4">
          <PhotoStage need={need} photoUrl={photoUrl} scale={scale} selectedFrame={selectedFrame} />
          <PhotoInput
            photoUrl={photoUrl}
            onSelectPhoto={selectPhoto}
            onClearPhoto={() => replacePhoto(null)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">{t('tryOn.frames.title')}</h2>
            <FramePicker
              frames={frames}
              isError={framesQuery.isError}
              isLoading={framesQuery.isLoading}
              onSelectFrame={setSelectedFrameId}
              selectedFrameId={effectiveFrameId}
            />
          </section>

          {need === 'contacts' ? null : (
            <AdjustmentSliders
              isDisabled={selectedFrame === null || photoUrl === null}
              onScaleChange={setScale}
              scale={scale}
            />
          )}
        </div>
      </div>
    </div>
  )
}
