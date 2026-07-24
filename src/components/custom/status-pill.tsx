import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type StatusPillTone = 'accent' | 'destructive' | 'primary' | 'secondary'

type StatusPillProps = {
  children: ReactNode
  className?: string
  tone: StatusPillTone
}

const toneClasses: Record<StatusPillTone, string> = {
  accent: 'bg-accent/15 text-accent-foreground',
  destructive: 'bg-destructive/10 text-destructive',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary text-secondary-foreground',
}

export function StatusPill({ children, className, tone }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium tracking-normal',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
