import { cn } from '@/lib/utils'
import { Link, type LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { type TranslationKey } from '@/lib/i18n'

type SidebarItemProps = {
  badge?: number
  icon: LucideIcon
  isCollapsed: boolean
  label: string
  labelKey: TranslationKey
  onNavigate?: () => void
  to: LinkProps['to']
}

export function SidebarItem({
  badge,
  icon: Icon,
  isCollapsed,
  label,
  labelKey,
  onNavigate,
  to,
}: SidebarItemProps) {
  const showBadge = typeof badge === 'number' && badge > 0
  return (
    <Link
      to={to}
      onClick={onNavigate}
      activeOptions={{ exact: to === '/' }}
      className={cn('block', isCollapsed && 'flex justify-center')}
      title={isCollapsed ? label : undefined}
      aria-label={label}
      data-translation-key={labelKey}
      activeProps={{ className: 'text-sidebar-accent-foreground' }}
      inactiveProps={{ className: 'text-sidebar-foreground/70 hover:text-sidebar-foreground' }}
    >
      {({ isActive }) => (
        <span
          className={cn(
            'relative flex h-10 items-center rounded-xl text-sm font-medium transition-all duration-200',
            isCollapsed ? 'w-10 justify-center' : 'gap-3 px-3',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-xs'
              : 'hover:bg-sidebar-accent/45',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute rounded-full bg-sidebar-ring transition-all duration-200',
              isCollapsed
                ? 'bottom-1.5 left-1/2 h-0.5 w-3 -translate-x-1/2'
                : 'start-1.5 top-1/2 h-4 w-0.5 -translate-y-1/2',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
          />

          <Icon
            className={cn(
              'size-4 shrink-0 transition-transform duration-200',
              isActive && 'scale-105',
            )}
            aria-hidden="true"
          />

          <span className={cn('truncate', isCollapsed && 'sr-only')}>{label}</span>

          {showBadge ? (
            isCollapsed ? (
              <span
                aria-hidden="true"
                className="absolute end-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-sidebar"
              />
            ) : (
              <span className="ms-auto inline-flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-destructive-foreground">
                {badge}
              </span>
            )
          ) : null}
        </span>
      )}
    </Link>
  )
}
