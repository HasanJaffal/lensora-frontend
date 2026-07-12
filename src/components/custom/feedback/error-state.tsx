import * as React from 'react'
import { CircleAlert } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type ErrorStateProps = {
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  description?: string
  icon?: React.ReactNode
  title?: string
}

export function ErrorState({
  actions,
  children,
  className,
  description,
  icon,
  title,
}: ErrorStateProps) {
  const { t } = useTranslation()
  const stateTitle = title ?? t('feedback.error.title')
  const stateDescription = description ?? t('feedback.error.description')

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-10 text-center shadow-sm sm:px-6',
        className,
      )}
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        {icon ?? <CircleAlert className="size-5" aria-hidden="true" />}
      </div>
      <h2 className="text-base font-semibold text-card-foreground">{stateTitle}</h2>
      {stateDescription ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{stateDescription}</p>
      ) : null}
      {children ? (
        <div className="mt-4 w-full max-w-md text-sm text-foreground">{children}</div>
      ) : null}
      {actions ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      ) : null}
    </div>
  )
}
