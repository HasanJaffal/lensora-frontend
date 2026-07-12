import { useState, type ReactNode } from 'react'

import { AppToolbar } from '@/components/layout/app-toolbar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { cn } from '@/lib/utils'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen min-h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
        className="hidden md:flex"
      />

      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-opacity md:hidden',
          isMobileSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed inset-y-0 start-0 z-50 transition-transform duration-200 md:hidden',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full',
        )}
      >
        <AppSidebar
          isCollapsed={false}
          onToggle={() => setIsMobileSidebarOpen(false)}
          onNavigate={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-card">
        <AppToolbar onOpenNavigation={() => setIsMobileSidebarOpen(true)} />

        <main className="min-h-0 flex-1 overflow-hidden bg-card px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="h-full overflow-hidden rounded-2xl border border-border bg-background">
            <div className="h-full overflow-y-auto">
              <div className="w-full px-4 py-5 sm:px-5 sm:py-5 lg:px-6 lg:py-6">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
