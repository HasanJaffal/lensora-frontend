import { cn } from '@/lib/utils'

type PatientAvatarProps = {
  className?: string
  name: string
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) {
    return ''
  }
  const first = words[0]?.[0] ?? ''
  const second = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return `${first}${second}`.toUpperCase()
}

export function PatientAvatar({ className, name }: PatientAvatarProps) {
  return (
    <span
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-medium text-foreground',
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
