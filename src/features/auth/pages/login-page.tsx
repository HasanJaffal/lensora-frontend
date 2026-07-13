import { Eye } from 'lucide-react'
import { toast } from 'sonner'

import { useAppForm } from '@/components/custom/form'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'

import { useAuth } from '../auth-context'
import { useLogin } from '../hooks'
import { createLoginSchema, type LoginFormValues } from '../login-schema'

export function LoginPage() {
  const { t, translateBackendError } = useTranslation()
  const { setSession } = useAuth()
  const loginMutation = useLogin()

  const form = useAppForm({
    defaultValues: { email: '', password: '' } as LoginFormValues,
    validators: { onSubmit: createLoginSchema(t) },
    onSubmit: async ({ value }) => {
      try {
        const session = await loginMutation.mutateAsync(value)
        setSession(session.accessToken, session.user)
      } catch (error) {
        const message =
          error instanceof ApiError
            ? translateBackendError(error.code)
            : t('backendErrors.fallback')
        toast.error(message)
      }
    },
  })

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Eye className="size-5" aria-hidden="true" />
          </div>
          <h1 className="text-lg font-semibold text-card-foreground">{t('login.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('login.subtitle')}</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                autoComplete="email"
                label={t('login.email')}
                placeholder={t('login.emailPlaceholder')}
                required
                type="email"
              />
            )}
          </form.AppField>

          <form.AppField name="password">
            {(field) => (
              <field.PasswordField
                autoComplete="current-password"
                label={t('login.password')}
                placeholder={t('login.passwordPlaceholder')}
                required
              />
            )}
          </form.AppField>

          <form.AppForm>
            <form.SubmitButton
              className="w-full"
              label={t('common.actions.signIn')}
              submittingLabel={t('forms.submit.submitting')}
            />
          </form.AppForm>
        </form>
      </div>
    </main>
  )
}
