import { apiClient } from '@/lib/api-client'
import { type Locale } from '@/lib/i18n'

import {
  type ChatResponseDto,
  type ChatSuggestionsDto,
  type SendChatMessageVariables,
} from './types'

export function sendChatMessage({
  messages,
  locale,
}: SendChatMessageVariables): Promise<ChatResponseDto> {
  return apiClient.post<ChatResponseDto>('/ai/chat', { messages, locale })
}

export function getChatSuggestions(locale: Locale): Promise<ChatSuggestionsDto> {
  return apiClient.get<ChatSuggestionsDto>('/ai/chat/suggestions', { query: { locale } })
}
