import { useTranslation } from '@/lib/i18n'

const dotDelays = ['0ms', '150ms', '300ms']

export function TypingIndicator() {
  const { t } = useTranslation()

  return (
    <div className="flex w-full justify-start" role="status" aria-live="polite">
      <span className="sr-only">{t('assistant.typing')}</span>
      <span className="flex items-center gap-1 rounded-2xl rounded-es-sm bg-muted px-3 py-3">
        {dotDelays.map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: delay }}
            aria-hidden="true"
          />
        ))}
      </span>
    </div>
  )
}
