import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type ThemeSwitchProps = {
  className?: string
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'
  const label = t(isDark ? 'common.theme.switchToLight' : 'common.theme.switchToDark')

  return (
    <Button
      type="button"
      variant="outline"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className={cn(
        'relative h-9 w-16 overflow-hidden rounded-full border-border bg-card p-0 text-foreground shadow-xs transition-colors duration-300 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDark && 'bg-secondary',
        className,
      )}
    >
      <span
        className={cn(
          'absolute inset-0 bg-accent/20 opacity-100 transition-opacity duration-300',
          isDark ? 'opacity-0' : 'opacity-100',
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'absolute inset-0 bg-primary/12 opacity-0 transition-opacity duration-300',
          isDark && 'opacity-100',
        )}
        aria-hidden="true"
      />

      <span
        className={cn(
          'absolute start-0 top-1/2 z-10 flex size-7 -translate-y-1/2 translate-x-1 items-center justify-center rounded-full bg-background text-accent-foreground shadow-sm transition-transform duration-300 ease-out rtl:-translate-x-1',
          isDark && 'translate-x-8 bg-primary text-primary-foreground rtl:-translate-x-8',
        )}
        aria-hidden="true"
      >
        <Sun
          className={cn(
            'absolute size-4 rotate-0 scale-100 text-accent transition-all duration-300',
            isDark && 'rotate-90 scale-0 opacity-0',
          )}
        />
        <Moon
          className={cn(
            'absolute size-4 -rotate-90 scale-0 text-primary-foreground opacity-0 transition-all duration-300',
            isDark && 'rotate-0 scale-100 opacity-100',
          )}
        />
      </span>
    </Button>
  )
}
