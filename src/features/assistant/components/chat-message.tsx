import { cn } from '@/lib/utils'

import { type ChatRole } from '../types'

type ChatMessageProps = {
  content: string
  role: ChatRole
}

export function ChatMessage({ content, role }: ChatMessageProps) {
  const isUserMessage = role === 'user'

  return (
    <div className={cn('flex w-full', isUserMessage ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap',
          isUserMessage
            ? 'rounded-ee-sm bg-primary text-primary-foreground'
            : 'rounded-es-sm bg-muted text-foreground',
        )}
      >
        {content}
      </p>
    </div>
  )
}
