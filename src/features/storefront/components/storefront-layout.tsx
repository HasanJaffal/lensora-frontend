import { type ReactNode } from 'react'

import { LoadingState, NotFoundState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { StorefrontHeader } from './storefront-header'
import { useStorefront } from '../hooks'

type StorefrontLayoutProps = {
  children: ReactNode
  slug: string
}

export function StorefrontLayout({ children, slug }: StorefrontLayoutProps) {
  const { t } = useTranslation()
  const storefrontQuery = useStorefront(slug)

  if (storefrontQuery.isLoading) {
    return <LoadingState className="min-h-screen" />
  }

  // A deactivated organization is indistinguishable from one that never existed (FR-STORE-6).
  if (storefrontQuery.isError || !storefrontQuery.data) {
    return (
      <NotFoundState
        className="min-h-screen"
        title={t('storefront.notFound.title')}
        description={t('storefront.notFound.description')}
      />
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StorefrontHeader organizationName={storefrontQuery.data.name} slug={slug} />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">{children}</main>
    </div>
  )
}
