import { getRouteApi } from '@tanstack/react-router'

import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { IntakeForm } from '../components/intake-form'
import { IntakeStatusBadge } from '../components/intake-status-badge'
import { useIntake } from '../hooks'

const routeApi = getRouteApi('/_app/intake')

export function IntakePage() {
  const { t } = useTranslation()
  const search = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const intakeQuery = useIntake(search.intakeId)

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
        {intakeQuery.data ? <IntakeStatusBadge status={intakeQuery.data.status} /> : null}
      </div>

      {/* Keyed so switching records rebuilds the form: TanStack Form ignores defaultValues changes. */}
      <IntakeForm
        intake={intakeQuery.data}
        intakeId={search.intakeId}
        key={search.intakeId ?? 'new'}
        onIntakeCreated={async (intakeId) => {
          await navigate({ search: { ...search, intakeId }, replace: true })
        }}
        patientId={search.patientId}
      />
    </div>
  )
}
