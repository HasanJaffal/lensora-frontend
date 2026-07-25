import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { patientsKeys } from '@/features/patients/query-keys'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'

import { CatalogStep } from '../components/catalog-step'
import { FrameStep } from '../components/frame-step'
import { OrderSummaryPanel } from '../components/order-summary-panel'
import { ReviewStep } from '../components/review-step'
import { StepProgress } from '../components/step-progress'
import { useCreateLensOrder, useInStockFrames, useLensCatalog } from '../hooks'
import { buildSummaryLines } from '../services/order-total'
import { resolvePreselectedFrame } from '../services/resolve-frame'
import { lensSteps, type LensStep } from '../steps'
import { type LensSelection } from '../types'

const routeApi = getRouteApi('/_app/lens')

const emptySelection: LensSelection = {
  lensTypeId: null,
  materialId: null,
  coatingIds: [],
  tintId: null,
  frameId: null,
}

export function LensSelectorPage() {
  const { t, translateBackendError } = useTranslation()
  const search = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const queryClient = useQueryClient()

  const [currentStep, setCurrentStep] = useState<LensStep>('lensType')
  const [selection, setSelection] = useState<LensSelection>(emptySelection)
  const [patientId, setPatientId] = useState<string | null>(search.patientId ?? null)

  const catalogQuery = useLensCatalog()
  const framesQuery = useInStockFrames('eyeglasses')
  const createOrderMutation = useCreateLensOrder()

  const frames = framesQuery.data ?? []

  // The route prefill is a SKU or a UUID and resolves only once frames load, so it is derived
  // during render rather than synced into state; an explicit pick always wins over it.
  const preselectedFrame = resolvePreselectedFrame(frames, search.frameId)
  const effectiveSelection: LensSelection = {
    ...selection,
    frameId: selection.frameId ?? preselectedFrame?.id ?? null,
  }

  const summaryLines = buildSummaryLines(catalogQuery.data, framesQuery.data, effectiveSelection)
  const currentStepIndex = lensSteps.indexOf(currentStep)

  const selectSingleOption =
    (key: 'lensTypeId' | 'materialId' | 'tintId') => (optionId: string) => {
      setSelection((current) => ({ ...current, [key]: optionId }))
    }

  const toggleCoating = (coatingId: string) => {
    setSelection((current) => ({
      ...current,
      coatingIds: current.coatingIds.includes(coatingId)
        ? current.coatingIds.filter((id) => id !== coatingId)
        : [...current.coatingIds, coatingId],
    }))
  }

  const selectFrame = (frameId: string) => {
    setSelection((current) => ({ ...current, frameId }))
  }

  const canContinue = (): boolean => {
    switch (currentStep) {
      case 'lensType':
        return selection.lensTypeId !== null
      case 'material':
        return selection.materialId !== null
      case 'coatings':
        return true
      case 'tint':
        return selection.tintId !== null
      case 'frame':
        return effectiveSelection.frameId !== null
      case 'review':
        return false
    }
  }

  const goBack = () => {
    if (currentStepIndex === 0) {
      void navigate({ to: '/' })
      return
    }

    setCurrentStep(lensSteps[currentStepIndex - 1])
  }

  const goForward = () => {
    setCurrentStep(lensSteps[currentStepIndex + 1])
  }

  const { lensTypeId, materialId, coatingIds, tintId, frameId } = effectiveSelection
  const isConfirmable =
    patientId !== null &&
    lensTypeId !== null &&
    materialId !== null &&
    tintId !== null &&
    frameId !== null

  const confirmOrder = async () => {
    if (
      patientId === null ||
      lensTypeId === null ||
      materialId === null ||
      tintId === null ||
      frameId === null
    ) {
      return
    }

    try {
      await createOrderMutation.mutateAsync({
        patientId,
        lensTypeId,
        materialId,
        coatingIds,
        tintId,
        frameId,
      })

      await queryClient.invalidateQueries({ queryKey: patientsKeys.lensOrder(patientId) })
      await queryClient.invalidateQueries({ queryKey: patientsKeys.detail(patientId) })

      toast.success(t('lens.review.orderCreated'))
      void navigate({ to: '/patients/$patientId', params: { patientId } })
    } catch (error) {
      const message =
        error instanceof ApiError ? translateBackendError(error.code) : t('backendErrors.fallback')
      toast.error(message)
    }
  }

  if (catalogQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (catalogQuery.isError || !catalogQuery.data) {
    return <ErrorState description={t('lens.catalog.loadError')} />
  }

  const catalog = catalogQuery.data

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{t('lens.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('lens.subtitle')}</p>
      </div>

      <StepProgress currentStep={currentStep} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-6">
          {currentStep === 'lensType' ? (
            <CatalogStep
              title={t('lens.steps.lensType')}
              description={t('lens.lensType.description')}
              options={catalog.types}
              selectedOptionIds={selection.lensTypeId ? [selection.lensTypeId] : []}
              onToggleOption={selectSingleOption('lensTypeId')}
              selectionMode="single"
            />
          ) : null}

          {currentStep === 'material' ? (
            <CatalogStep
              title={t('lens.steps.material')}
              description={t('lens.material.description')}
              options={catalog.materials}
              selectedOptionIds={selection.materialId ? [selection.materialId] : []}
              onToggleOption={selectSingleOption('materialId')}
              selectionMode="single"
            />
          ) : null}

          {currentStep === 'coatings' ? (
            <CatalogStep
              title={t('lens.steps.coatings')}
              description={t('lens.coatings.description')}
              options={catalog.coatings}
              selectedOptionIds={selection.coatingIds}
              onToggleOption={toggleCoating}
              selectionMode="multiple"
            />
          ) : null}

          {currentStep === 'tint' ? (
            <CatalogStep
              title={t('lens.steps.tint')}
              description={t('lens.tint.description')}
              options={catalog.tints}
              selectedOptionIds={selection.tintId ? [selection.tintId] : []}
              onToggleOption={selectSingleOption('tintId')}
              selectionMode="single"
            />
          ) : null}

          {currentStep === 'frame' ? (
            <FrameStep
              frames={frames}
              isError={framesQuery.isError}
              isLoading={framesQuery.isLoading}
              onSelectFrame={selectFrame}
              selectedFrameId={effectiveSelection.frameId}
            />
          ) : null}

          {currentStep === 'review' ? (
            <ReviewStep lines={summaryLines} onSelectPatient={setPatientId} patientId={patientId} />
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={goBack}>
              <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
              {t('common.actions.back')}
            </Button>

            {currentStep === 'review' ? (
              <Button
                type="button"
                disabled={!isConfirmable || createOrderMutation.isPending}
                onClick={() => void confirmOrder()}
              >
                {createOrderMutation.isPending
                  ? t('lens.review.confirming')
                  : t('lens.review.confirmOrder')}
              </Button>
            ) : (
              <Button type="button" disabled={!canContinue()} onClick={goForward}>
                {t('common.actions.continue')}
                <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        <OrderSummaryPanel lines={summaryLines} />
      </div>
    </div>
  )
}
