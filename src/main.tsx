import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { QueryProvider } from '@/components/custom/query-provider'
import { ScrollbarActivity } from '@/components/custom/scrollbar-activity'
import { ThemeProvider } from '@/components/custom/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { I18nProvider } from '@/lib/i18n'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider>
          <ScrollbarActivity />
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  </StrictMode>,
)
