import { useState } from 'react'

import { ContentLanguageToggle } from '@/components/custom/content-language-toggle'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { CategoryFilter } from '../components/category-filter'
import { TipCard } from '../components/tip-card'
import { useTips } from '../hooks'
import { type TipCategoryFilter } from '../types'

export function TipsPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<TipCategoryFilter>('all')

  const tipsQuery = useTips(selectedCategory === 'all' ? undefined : selectedCategory)
  const tips = tipsQuery.data ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{t('tips.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('tips.subtitle')}</p>
        </div>
        <ContentLanguageToggle />
      </div>

      <CategoryFilter onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory} />

      {tipsQuery.isLoading ? <LoadingState size="lg" /> : null}

      {tipsQuery.isError ? <ErrorState description={t('tips.loadError')} /> : null}

      {tipsQuery.isSuccess && tips.length === 0 ? (
        <EmptyState title={t('tips.emptyTitle')} description={t('tips.emptyDescription')} />
      ) : null}

      {tipsQuery.isSuccess && tips.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
