import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const THEME_STORAGE_KEY = 'vite-ui-theme'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function getPreferredTheme(defaultTheme: Theme): Theme {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return defaultTheme
}
