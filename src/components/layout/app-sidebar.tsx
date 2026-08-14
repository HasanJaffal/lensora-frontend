import { Eye, LogOut, PanelLeftClose, PanelLeftOpen, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { resolveBilingual, useTranslation } from '@/lib/i18n'
import { useAuth } from '@/features/auth/auth-context'
import { cn } from '@/lib/utils'
import { SidebarItem } from './app-sidebar-item'
import { navigationItems } from '../constants/navigation-items'

type AppSidebarProps = {
  isCollapsed: boolean
  className?: string
  onToggle: () => void
  onNavigate?: () => void
  stockAlertCount?: number
}

export function AppSidebar({
  className,
  isCollapsed,
  onNavigate,
  onToggle,
  stockAlertCount = 0,
}: AppSidebarProps) {
  const { locale, t } = useTranslation()
  const { user, signOut } = useAuth()
  const doctorName = user
    ? resolveBilingual({ en: user.displayNameEn, ar: user.displayNameAr }, locale).primary
    : '—'
  const organizationName = user?.organization?.name ?? t('common.app.tagline')
  const toggleSidebarLabel = t(
    isCollapsed ? 'common.navigation.expandSidebar' : 'common.navigation.collapseSidebar',
  )

  return (
    <aside
      className={cn(
        'flex h-full shrink-0 flex-col bg-sidebar text-sidebar-foreground shadow-sm ring-1 ring-inset ring-sidebar-border/30',
        'transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
        isCollapsed ? 'w-18' : 'w-72',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center px-3',
          isCollapsed ? 'h-24 flex-col justify-center gap-2' : 'h-16 gap-3',
        )}
      >
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-xs">
          <Eye className="size-4" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute -end-0.5 -top-0.5 size-2.5 animate-pulse rounded-full bg-sidebar-ring ring-2 ring-sidebar"
          />
        </div>

        <div className={cn('min-w-0 flex-1', isCollapsed && 'sr-only')}>
          <p className="truncate text-sm font-semibold tracking-tight">{t('common.app.name')}</p>
          <p className="truncate text-xs text-sidebar-foreground/55">{organizationName}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 rounded-xl text-sidebar-foreground/60 hover:bg-sidebar-primary/12 hover:text-sidebar-foreground"
          onClick={onToggle}
          aria-label={toggleSidebarLabel}
          title={toggleSidebarLabel}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="size-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {navigationItems.map((item) => (
          <SidebarItem
            key={item.to}
            badge={item.hasStockBadge ? stockAlertCount : undefined}
            icon={item.icon}
            isCollapsed={isCollapsed}
            label={t(item.labelKey)}
            labelKey={item.labelKey}
            onNavigate={onNavigate}
            to={item.to}
          />
        ))}
      </nav>

      <div className="shrink-0 space-y-3 p-3">
        <div
          className={cn(
            'flex rounded-2xl bg-sidebar-primary/10 p-2.5 ring-1 ring-inset ring-sidebar-primary/12 transition-colors duration-200 hover:bg-sidebar-primary/14',
            isCollapsed ? 'flex-col items-center gap-2' : 'items-center gap-2.5',
          )}
        >
          <div className="relative shrink-0">
            <div className="flex size-8 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <User className="size-4" aria-hidden="true" />
            </div>
            <span
              aria-label={t('common.app.online')}
              className="absolute -bottom-0.5 -end-0.5 size-2.5 rounded-full border-2 border-sidebar bg-sidebar-ring"
            />
          </div>

          <div className={cn('min-w-0 flex-1', isCollapsed && 'sr-only')}>
            <p className="truncate text-sm font-medium leading-snug">{doctorName}</p>
            <p className="truncate text-xs leading-snug text-sidebar-foreground/55">
              {t('common.app.role')}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="size-8 shrink-0 rounded-xl text-sidebar-foreground/60 hover:bg-sidebar-primary/12 hover:text-sidebar-foreground"
            aria-label={t('common.actions.signOut')}
            title={t('common.actions.signOut')}
          >
            <LogOut className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
