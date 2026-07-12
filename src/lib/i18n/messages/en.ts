import { type BackendErrorMessages } from '@/lib/i18n/backend-error-keys'

const backendErrors = {
  auth: {
    invalidCredentials: 'The email or password is incorrect.',
    unauthorized: 'You are not authorized to perform this action.',
    sessionExpired: 'Your session has expired. Please sign in again.',
    accountDisabled: 'This account is disabled. Contact an administrator.',
  },
  resource: {
    notFound: 'The requested item could not be found.',
    conflict: 'This action conflicts with the current state.',
  },
  validation: {
    error: 'Some of the information provided is invalid.',
  },
  server: {
    internal: 'Something went wrong on our side. Please try again.',
  },
  ai: {
    unavailable: 'The assistant is temporarily unavailable.',
  },
  patient: {
    notFound: 'The requested patient could not be found.',
  },
  inventory: {
    outOfStock: 'This item is out of stock.',
  },
  network: {
    error: 'Unable to reach the server. Check your connection and try again.',
  },
} satisfies BackendErrorMessages

export const enMessages = {
  common: {
    actions: {
      goHome: 'Go home',
      retry: 'Retry',
      signIn: 'Sign in',
      signOut: 'Sign out',
      switchToArabic: 'Switch to Arabic',
      switchToEnglish: 'Switch to English',
    },
    app: {
      name: 'Sour Optic',
      tagline: 'Practice management',
      online: 'Online',
      role: 'Optometrist',
    },
    navigation: {
      collapseSidebar: 'Collapse sidebar',
      dashboard: 'Dashboard',
      expandSidebar: 'Expand sidebar',
      help: 'Help',
      notifications: 'Notifications',
      openNavigation: 'Open navigation',
      settings: 'Settings',
    },
    theme: {
      switchToDark: 'Switch to dark theme',
      switchToLight: 'Switch to light theme',
    },
  },
  backendErrors: {
    ...backendErrors,
    fallback: 'Something went wrong. Please try again.',
    unknownKey: 'The server returned an untranslated error key: {key}',
  },
  feedback: {
    empty: {
      description: 'Once data is added, it will appear here.',
      title: 'Nothing here yet',
    },
    error: {
      description: 'We could not load this section. Please try again.',
      title: 'Something went wrong',
    },
    loading: {
      description: 'Please wait while we fetch the data.',
      title: 'Loading...',
    },
    notFound: {
      description: 'The item you are looking for does not exist or is no longer available.',
      title: 'Not found',
    },
    pageNotFound: {
      description: 'The page you are looking for does not exist.',
      title: 'Page not found',
    },
  },
  forms: {
    submit: {
      idle: 'Submit',
      submitting: 'Submitting...',
    },
  },
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to Sour Optic',
    email: 'Email',
    emailPlaceholder: 'name@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
  },
}

export type I18nMessages = typeof enMessages
