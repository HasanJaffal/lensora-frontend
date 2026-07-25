import { useEffect, useRef, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'

import {
  AdjustmentSliders,
  FramePicker,
  NeedSwitch,
  PhotoInput,
  PhotoStage,
  defaultOverlayScale,
  type OverlayScale,
  type ProductNeed,
} from '@/features/try-on'
import { useTranslation } from '@/lib/i18n'

import { useStorefrontProducts } from '../hooks'
import { storefrontNeeds, toPublicCategory } from '../services/public-category'

const routeApi = getRouteApi('/store/$slug/try-on')

export function StorefrontTryOnPage() {
  const { t } = useTranslation()
  const { slug } = routeApi.useParams()

  const [need, setNeed] = useState<ProductNeed>('eyeglasses')
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null)
  const [scale, setScale] = useState<OverlayScale>(defaultOverlayScale)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  // The visitor's photo stays in the browser as an object URL and is never uploaded (NFR-5);
  // the ref lets us revoke the previous URL without re-running an effect on every render.
  const photoUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (photoUrlRef.current) {
        URL.revokeObjectURL(photoUrlRef.current)
      }
    }
  }, [])

  const productsQuery = useStorefrontProducts(slug, toPublicCategory(need))
  const frames = productsQuery.data ?? []
  const selectedFrame = frames.find((frame) => frame.id === selectedFrameId) ?? null

  const replacePhoto = (nextUrl: string | null) => {
    if (photoUrlRef.current) {
      URL.revokeObjectURL(photoUrlRef.current)
    }

    photoUrlRef.current = nextUrl
    setPhotoUrl(nextUrl)
  }

  const changeNeed = (nextNeed: ProductNeed) => {
    setNeed(nextNeed)
    setSelectedFrameId(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{t('storefront.tryOn.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('storefront.tryOn.subtitle')}</p>
      </div>

      <NeedSwitch need={need} needs={storefrontNeeds} onNeedChange={changeNeed} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-4">
          <PhotoStage
            emptyDescription={t('storefront.tryOn.photoEmptyDescription')}
            need={need}
            photoUrl={photoUrl}
            previewAlt={t('storefront.tryOn.photoPreviewAlt')}
            scale={scale}
            selectedFrame={selectedFrame}
          />
          <PhotoInput
            photoUrl={photoUrl}
            onSelectPhoto={(file) => replacePhoto(URL.createObjectURL(file))}
            onClearPhoto={() => replacePhoto(null)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">
              {t('storefront.tryOn.framesTitle')}
            </h2>
            <FramePicker
              emptyDescription={t('storefront.tryOn.framesEmptyDescription')}
              frames={frames}
              isError={productsQuery.isError}
              isLoading={productsQuery.isLoading}
              label={t('storefront.tryOn.framesTitle')}
              onSelectFrame={setSelectedFrameId}
              selectedFrameId={selectedFrameId}
            />
          </section>

          <AdjustmentSliders
            isDisabled={selectedFrame === null || photoUrl === null}
            onScaleChange={setScale}
            scale={scale}
          />
        </div>
      </div>
    </div>
  )
}
