import { useMutation, useQuery } from '@tanstack/react-query'

import { type Locale } from '@/lib/i18n'

import { getChatSuggestions, sendChatMessage } from './api'
import { assistantKeys } from './query-keys'
import { type SendChatMessageVariables } from './types'

export function useChatSuggestions(locale: Locale, isEnabled: boolean) {
  return useQuery({
    queryKey: assistantKeys.suggestions(locale),
    queryFn: () => getChatSuggestions(locale),
    enabled: isEnabled,
  })
}

export function useSendChatMessage() {
  return useMutation({
    mutationFn: (variables: SendChatMessageVariables) => sendChatMessage(variables),
  })
}
