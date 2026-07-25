import { LoaderCircle, Sparkles } from 'lucide-react'

import { type Locale, useTranslation } from '@/lib/i18n'

import { useChatSuggestions } from '../hooks'

type SuggestionPromptsProps = {
  isDisabled: boolean
  locale: Locale
  onSelectSuggestion: (suggestion: string) => void
}

export function SuggestionPrompts({
  isDisabled,
  locale,
  onSelectSuggestion,
}: SuggestionPromptsProps) {
  const { t } = useTranslation()
  const suggestionsQuery = useChatSuggestions(locale, true)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <Sparkles className="size-6 text-primary" aria-hidden="true" />
        <p className="text-sm font-semibold text-foreground">{t('assistant.emptyTitle')}</p>
        <p className="text-xs text-muted-foreground">{t('assistant.emptyDescription')}</p>
      </div>

      {suggestionsQuery.isPending ? (
        <div className="flex justify-center py-2 text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          <span className="sr-only">{t('feedback.loading.title')}</span>
        </div>
      ) : null}

      {suggestionsQuery.isError ? (
        <p className="text-center text-xs text-muted-foreground">
          {t('assistant.suggestionsError')}
        </p>
      ) : null}

      {suggestionsQuery.data ? (
        <ul className="flex flex-col gap-2">
          {suggestionsQuery.data.suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onSelectSuggestion(suggestion)}
                className="w-full cursor-pointer rounded-xl border border-border bg-card px-3 py-2 text-start text-sm text-foreground transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
