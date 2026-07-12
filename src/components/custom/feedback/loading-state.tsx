import * as React from 'react'
import { LoaderCircle } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type LoadingStateProps = {
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  description?: string
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  title?: string
}

const loadingStateSizeClasses = {
  sm: 'px-4 py-6',
  md: 'px-4 py-10 sm:px-6',
  lg: 'min-h-72 px-4 py-14 sm:px-6',
}

export function LoadingState({
  actions,
  children,
  className,
  description,
  icon,
  size = 'md',
  title,
}: LoadingStateProps) {
  const { t } = useTranslation()
  const stateTitle = title ?? t('feedback.loading.title')
  const stateDescription = description ?? t('feedback.loading.description')

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-xl border border-border bg-card text-center shadow-sm',
        loadingStateSizeClasses[size],
        className,
      )}
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted text-primary">
        {icon ?? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
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
