import { useRef, useState } from 'react'
import { useStore } from '@tanstack/react-form'
import { useBlocker } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useAppForm } from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { AntecedentsSection } from './antecedents-section'
import { IndividualInfoSection } from './individual-info-section'
import { MotiveSection } from './motive-section'
import { RefractionHistorySection } from './refraction-history-section'
import { ThemesSection } from './themes-section'
import { createIntakeCompleteSchema, createIntakeDraftSchema } from '../intake-schema'
import { toIntakeFormValues, toIntakeRequest } from '../map-intake'
import { useCreateIntake, useUpdateIntake } from '../hooks'
import {
  collectInvalidTabs,
  intakeTabLabelKey,
  intakeTabs,
  resolveTabForField,
  type IntakeTab,
} from '../services/intake-tabs'
import { type IntakeDto, type IntakeStatus } from '../types'

type IntakeFormProps = {
  intake: IntakeDto | undefined
  intakeId: string | undefined
  onIntakeCreated: (intakeId: string) => Promise<void>
  patientId: string | undefined
}

export function IntakeForm({ intake, intakeId, onIntakeCreated, patientId }: IntakeFormProps) {
  const { t, translateBackendError } = useTranslation()

  const [activeTab, setActiveTab] = useState<IntakeTab>('individualInfo')
  const [invalidTabs, setInvalidTabs] = useState<Set<IntakeTab>>(new Set())
  const submitStatusRef = useRef<IntakeStatus>('draft')

  const createIntakeMutation = useCreateIntake()
  const updateIntakeMutation = useUpdateIntake()

  const focusFieldTab = (fieldPath: string) => {
    const targetTab = resolveTabForField(fieldPath)

    if (targetTab) {
      setActiveTab(targetTab)
    }
  }

  const form = useAppForm({
    defaultValues: toIntakeFormValues(intake),
    validators: {
      onSubmit: ({ value }) =>
        submitStatusRef.current === 'completed'
          ? createIntakeCompleteSchema(t).safeParse(value).error
          : createIntakeDraftSchema(t).safeParse(value).error,
    },
    onSubmit: async ({ value }) => {
      const status = submitStatusRef.current
      const request = toIntakeRequest(value, status, patientId ?? null)

      try {
        let createdIntakeId: string | null = null

        if (intakeId) {
          await updateIntakeMutation.mutateAsync({ intakeId, request })
        } else {
          createdIntakeId = (await createIntakeMutation.mutateAsync(request)).id
        }

        setInvalidTabs(new Set())
        // Reset before redirecting so the unsaved-changes blocker does not challenge our own navigation.
        form.reset(value)

        if (createdIntakeId !== null) {
          await onIntakeCreated(createdIntakeId)
        }

        toast.success(
          status === 'completed' ? t('intake.actions.completed') : t('intake.actions.draftSaved'),
        )
      } catch (error) {
        if (error instanceof ApiError) {
          const firstDetail = error.details?.[0]
          if (firstDetail) {
            setInvalidTabs(collectInvalidTabs(error.details?.map((detail) => detail.field) ?? []))
            focusFieldTab(firstDetail.field)
          }
          toast.error(translateBackendError(error.code))
          return
        }
        toast.error(t('backendErrors.fallback'))
      }
    },
  })

  const isDirty = useStore(form.store, (state) => state.isDirty)
  useBlocker({
    shouldBlockFn: () => !window.confirm(t('intake.actions.discardChanges')),
    enableBeforeUnload: isDirty,
    disabled: !isDirty,
  })

  const revealClientValidationErrors = () => {
    const schema =
      submitStatusRef.current === 'completed'
        ? createIntakeCompleteSchema(t)
        : createIntakeDraftSchema(t)
    const result = schema.safeParse(form.state.values)

    if (result.success) {
      setInvalidTabs(new Set())
      return
    }

    const fieldPaths = result.error.issues.map((issue) => issue.path.join('.'))
    setInvalidTabs(collectInvalidTabs(fieldPaths))

    for (const issue of result.error.issues) {
      const fieldPath = issue.path.join('.') as Parameters<typeof form.setFieldMeta>[0]

      form.setFieldMeta(fieldPath, (meta) => ({
        ...meta,
        isTouched: true,
        errorMap: { ...meta.errorMap, onSubmit: issue.message },
      }))
    }

    const [firstFieldPath] = fieldPaths
    if (firstFieldPath) {
      focusFieldTab(firstFieldPath)
    }

    toast.error(t('intake.actions.validationFailed'))
  }

  const submitWithStatus = async (status: IntakeStatus) => {
    submitStatusRef.current = status
    await form.handleSubmit()

    if (!form.state.isValid) {
      revealClientValidationErrors()
    }
  }

  return (
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
          {intakeTabs.map((tab) => {
            const isInvalid = invalidTabs.has(tab)

            return (
              <TabsTrigger
                className={cn(isInvalid && 'text-destructive data-active:text-destructive')}
                key={tab}
                value={tab}
              >
                {t(intakeTabLabelKey(tab))}
                {isInvalid ? (
                  <span
                    aria-label={t('intake.actions.tabHasErrors')}
                    className="ms-1.5 size-1.5 rounded-full bg-destructive"
                  />
                ) : null}
              </TabsTrigger>
            )
          })}
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
            <p className="me-auto text-sm text-muted-foreground">
              {t('intake.actions.completeRequirementHint')}
            </p>
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
              {isSubmitting ? t('intake.actions.saving') : t('intake.actions.complete')}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
