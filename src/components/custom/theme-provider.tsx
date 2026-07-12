import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { getPreferredTheme, ThemeContext, THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getPreferredTheme(defaultTheme))

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeState,
      toggleTheme: () =>
        setThemeState((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
