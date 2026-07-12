import * as React from 'react'
import { FileQuestion } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type PageNotFoundStateProps = {
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  description?: string
  icon?: React.ReactNode
  title?: string
}

export function PageNotFoundState({
  actions,
  children,
  className,
  description,
  icon,
  title,
}: PageNotFoundStateProps) {
  const { t } = useTranslation()
  const stateTitle = title ?? t('feedback.pageNotFound.title')
  const stateDescription = description ?? t('feedback.pageNotFound.description')

  return (
    <section
      className={cn(
        'flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-12 text-center sm:px-6',
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <FileQuestion className="size-6" aria-hidden="true" />}
      </div>
      <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
        {stateTitle}
      </h1>
      {stateDescription ? (
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          {stateDescription}
        </p>
      ) : null}
      {children ? (
        <div className="mt-5 w-full max-w-md text-sm text-foreground">{children}</div>
      ) : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      ) : null}
    </section>
  )
}
