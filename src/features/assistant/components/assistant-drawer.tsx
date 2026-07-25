import { useEffect, useRef } from 'react'
import { Send, Sparkles, WifiOff, X } from 'lucide-react'

import { StatusPill } from '@/components/custom/status-pill'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Locale, useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { ChatMessage } from './chat-message'
import { SuggestionPrompts } from './suggestion-prompts'
import { TypingIndicator } from './typing-indicator'
import { type ChatMessage as ChatMessageModel } from '../types'

type AssistantDrawerProps = {
  draft: string
  errorMessage: string | null
  isAwaitingReply: boolean
  isOpen: boolean
  locale: Locale
  messages: ChatMessageModel[]
  onClose: () => void
  onDraftChange: (draft: string) => void
  onSendDraft: () => void
  onSendSuggestion: (suggestion: string) => void
  usedFallback: boolean
}

export function AssistantDrawer({
  draft,
  errorMessage,
  isAwaitingReply,
  isOpen,
  locale,
  messages,
  onClose,
  onDraftChange,
  onSendDraft,
  onSendSuggestion,
  usedFallback,
}: AssistantDrawerProps) {
  const { t } = useTranslation()
  const composerRef = useRef<HTMLInputElement>(null)
  const conversationEndRef = useRef<HTMLDivElement>(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    if (isOpen) {
      composerRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ block: 'end' })
  }, [isAwaitingReply, messages])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        inert={!isOpen}
        aria-label={t('assistant.title')}
        className={cn(
          'fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col border-s border-border bg-card shadow-lg transition-transform duration-200',
          isOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full',
        )}
      >
        <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">{t('assistant.title')}</h2>

          {usedFallback ? (
            <StatusPill tone="secondary">
              <WifiOff className="me-1 size-3" aria-hidden="true" />
              {t('assistant.offline')}
            </StatusPill>
          ) : null}

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="ms-auto"
            onClick={onClose}
            aria-label={t('assistant.close')}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {hasMessages ? (
            <div className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <ChatMessage
                  key={`${index}-${message.role}`}
                  content={message.content}
                  role={message.role}
                />
              ))}

              {isAwaitingReply ? <TypingIndicator /> : null}
            </div>
          ) : (
            <SuggestionPrompts
              isDisabled={isAwaitingReply}
              locale={locale}
              onSelectSuggestion={onSendSuggestion}
            />
          )}

          {errorMessage ? (
            <p role="alert" className="mt-3 text-center text-xs text-destructive">
              {errorMessage}
            </p>
          ) : null}

          <div ref={conversationEndRef} />
        </div>

        <form
          className="flex shrink-0 items-center gap-2 border-t border-border px-4 py-3"
          onSubmit={(event) => {
            event.preventDefault()
            onSendDraft()
          }}
        >
          <Input
            ref={composerRef}
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={t('assistant.placeholder')}
            aria-label={t('assistant.placeholder')}
            disabled={isAwaitingReply}
            className="h-9"
          />
          <Button
            type="submit"
            size="icon-sm"
            disabled={isAwaitingReply || draft.trim().length === 0}
            aria-label={t('assistant.send')}
          >
            <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          </Button>
        </form>
      </aside>
    </>
  )
}
