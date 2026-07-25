import { useCallback, useState } from 'react'
import { Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'

import { AssistantDrawer } from './assistant-drawer'
import { useSendChatMessage } from '../hooks'
import { type ChatMessage } from '../types'

export function AssistantDock() {
  const { locale, t, translateBackendError } = useTranslation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const sendChatMessageMutation = useSendChatMessage()

  const isAwaitingReply = sendChatMessageMutation.isPending

  const sendMessage = useCallback(
    (content: string) => {
      const trimmedContent = content.trim()

      if (trimmedContent.length === 0 || isAwaitingReply) {
        return
      }

      const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmedContent }]

      setMessages(nextMessages)
      setDraft('')
      setErrorMessage(null)

      sendChatMessageMutation.mutate(
        { messages: nextMessages, locale },
        {
          onSuccess: (response) => {
            setMessages((currentMessages) => [...currentMessages, response.message])
            setUsedFallback(response.usedFallback)
          },
          onError: (error) => {
            setErrorMessage(
              error instanceof ApiError
                ? translateBackendError(error.code)
                : t('assistant.sendError'),
            )
          },
        },
      )
    },
    [isAwaitingReply, locale, messages, sendChatMessageMutation, t, translateBackendError],
  )

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const submitDockDraft = () => {
    openDrawer()
    sendMessage(draft)
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-3 sm:px-4 sm:pb-4">
        <form
          className="pointer-events-auto flex w-full max-w-xl items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-lg"
          onSubmit={(event) => {
            event.preventDefault()
            submitDockDraft()
          }}
        >
          <Sparkles className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onFocus={openDrawer}
            placeholder={t('assistant.placeholder')}
            aria-label={t('assistant.placeholder')}
            className="h-9 border-0 shadow-none focus-visible:ring-0"
          />
          <Button type="submit" size="sm" disabled={draft.trim().length === 0 || isAwaitingReply}>
            {t('assistant.ask')}
          </Button>
        </form>
      </div>

      <AssistantDrawer
        draft={draft}
        errorMessage={errorMessage}
        isAwaitingReply={isAwaitingReply}
        isOpen={isDrawerOpen}
        locale={locale}
        messages={messages}
        onClose={() => setIsDrawerOpen(false)}
        onDraftChange={setDraft}
        onSendDraft={() => sendMessage(draft)}
        onSendSuggestion={sendMessage}
        usedFallback={usedFallback}
      />
    </>
  )
}
