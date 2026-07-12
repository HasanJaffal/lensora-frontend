import * as React from 'react'
import { Inbox } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  description?: string
  icon?: React.ReactNode
  title?: string
}

export function EmptyState({
  actions,
  children,
  className,
  description,
  icon,
  title,
}: EmptyStateProps) {
  const { t } = useTranslation()
  const stateTitle = title ?? t('feedback.empty.title')
  const stateDescription = description ?? t('feedback.empty.description')

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/60 px-4 py-10 text-center sm:px-6',
        className,
      )}
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-5" aria-hidden="true" />}
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
