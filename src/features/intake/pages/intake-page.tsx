import { useRef, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useAppForm } from '@/components/custom/form'
import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'

import { AntecedentsSection } from '../components/antecedents-section'
import { ImportedQuestionsPanel } from '../components/imported-questions-panel'
import { IndividualInfoSection } from '../components/individual-info-section'
import { IntakeStatusBadge } from '../components/intake-status-badge'
import { MotiveSection } from '../components/motive-section'
import { RefractionHistorySection } from '../components/refraction-history-section'
import { ThemesSection } from '../components/themes-section'
import { createIntakeCompleteSchema, createIntakeDraftSchema } from '../intake-schema'
import { toIntakeFormValues, toIntakeRequest } from '../map-intake'
import { useCreateIntake, useIntake, useUpdateIntake } from '../hooks'
import { type IntakeStatus } from '../types'

const routeApi = getRouteApi('/_app/intake')

type IntakeTab = 'individualInfo' | 'motive' | 'refractionHistory' | 'antecedents'

const tabByFieldPrefix: Record<string, IntakeTab> = {
  individualInfo: 'individualInfo',
  motive: 'motive',
  themes: 'motive',
  refractionHistory: 'refractionHistory',
  antecedents: 'antecedents',
}

export function IntakePage() {
  const { t, translateBackendError } = useTranslation()
  const search = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const [activeTab, setActiveTab] = useState<IntakeTab>('individualInfo')
  const submitStatusRef = useRef<IntakeStatus>('draft')

  const intakeQuery = useIntake(search.intakeId)
  const createIntakeMutation = useCreateIntake()
  const updateIntakeMutation = useUpdateIntake()

  const loadedIntake = intakeQuery.data

  const focusFieldTab = (fieldPath: string) => {
    const targetTab = tabByFieldPrefix[fieldPath.split('.')[0]]
    if (targetTab) {
      setActiveTab(targetTab)
    }
  }

  const form = useAppForm({
    defaultValues: toIntakeFormValues(loadedIntake),
    validators: {
      onSubmit: ({ value }) =>
        submitStatusRef.current === 'completed'
          ? createIntakeCompleteSchema(t).safeParse(value).error
          : createIntakeDraftSchema(t).safeParse(value).error,
    },
    onSubmit: async ({ value }) => {
      const status = submitStatusRef.current
      const request = toIntakeRequest(value, status, search.patientId ?? null)

      try {
        if (search.intakeId) {
          await updateIntakeMutation.mutateAsync({ intakeId: search.intakeId, request })
        } else {
          const created = await createIntakeMutation.mutateAsync(request)
          await navigate({ search: { ...search, intakeId: created.id }, replace: true })
        }

        toast.success(
          status === 'completed' ? t('intake.actions.completed') : t('intake.actions.draftSaved'),
        )
      } catch (error) {
        if (error instanceof ApiError) {
          const firstDetail = error.details?.[0]
          if (firstDetail) {
            focusFieldTab(firstDetail.field)
          }
          toast.error(translateBackendError(error.code))
          return
        }
        toast.error(t('backendErrors.fallback'))
      }
    },
  })

  const revealClientValidationErrors = () => {
    const schema =
      submitStatusRef.current === 'completed'
        ? createIntakeCompleteSchema(t)
        : createIntakeDraftSchema(t)
    const result = schema.safeParse(form.state.values)

    if (result.success) {
      return
    }

    const [firstIssue] = result.error.issues
    if (!firstIssue) {
      return
    }

    for (const issue of result.error.issues) {
      const fieldPath = issue.path.join('.') as Parameters<typeof form.setFieldMeta>[0]

      // Fields on inactive tabs are unmounted and have no meta yet; the tab switch surfaces them.
      if (!form.state.fieldMeta[fieldPath]) {
        continue
      }

      form.setFieldMeta(fieldPath, (meta) => ({
        ...meta,
        isTouched: true,
        errorMap: { ...meta.errorMap, onSubmit: issue.message },
      }))
    }

    focusFieldTab(firstIssue.path.join('.'))
    toast.error(t('intake.actions.validationFailed'))
  }

  const submitWithStatus = async (status: IntakeStatus) => {
    submitStatusRef.current = status
    await form.handleSubmit()

    if (!form.state.isValid) {
      revealClientValidationErrors()
    }
  }

  if (intakeQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (intakeQuery.isError) {
    return <ErrorState description={t('intake.loadError')} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{t('intake.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('intake.subtitle')}</p>
        </div>
        {loadedIntake ? <IntakeStatusBadge status={loadedIntake.status} /> : null}
      </div>

      {search.importId ? <ImportedQuestionsPanel importId={search.importId} /> : null}

      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <Tabs onValueChange={(value) => setActiveTab(value as IntakeTab)} value={activeTab}>
          <TabsList>
            <TabsTrigger value="individualInfo">{t('intake.tabs.individualInfo')}</TabsTrigger>
            <TabsTrigger value="motive">{t('intake.tabs.motive')}</TabsTrigger>
            <TabsTrigger value="refractionHistory">
              {t('intake.tabs.refractionHistory')}
            </TabsTrigger>
            <TabsTrigger value="antecedents">{t('intake.tabs.antecedents')}</TabsTrigger>
          </TabsList>

          <TabsContent value="individualInfo">
            <IndividualInfoSection form={form} />
          </TabsContent>
          <TabsContent value="motive">
            <div className="grid gap-6">
              <MotiveSection form={form} />
              <ThemesSection form={form} />
            </div>
          </TabsContent>
          <TabsContent value="refractionHistory">
            <RefractionHistorySection form={form} />
          </TabsContent>
          <TabsContent value="antecedents">
            <AntecedentsSection form={form} />
          </TabsContent>
        </Tabs>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button
                disabled={isSubmitting}
                onClick={() => void submitWithStatus('draft')}
                type="button"
                variant="outline"
              >
                {isSubmitting ? t('intake.actions.saving') : t('intake.actions.saveDraft')}
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={() => void submitWithStatus('completed')}
                type="button"
              >
                {t('intake.actions.complete')}
              </Button>
            </div>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
