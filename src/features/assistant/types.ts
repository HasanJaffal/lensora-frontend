import { type Locale } from '@/lib/i18n'

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  role: ChatRole
  content: string
}

export type ChatResponseDto = {
  message: ChatMessage
  usedFallback: boolean
}

export type ChatSuggestionsDto = {
  suggestions: string[]
}

export type SendChatMessageVariables = {
  messages: ChatMessage[]
  locale: Locale
}
