import { type BackendErrorMessages } from '@/lib/i18n/backend-error-keys'

const backendErrors = {
  auth: {
    invalidCredentials: 'The email or password is incorrect.',
    unauthorized: 'You are not authorized to perform this action.',
    sessionExpired: 'Your session has expired. Please sign in again.',
    accountDisabled: 'This account is disabled. Contact an administrator.',
    emailTaken: 'This email address is already in use.',
  },
  organization: {
    slugTaken: 'This organization identifier is already in use.',
  },
  tenant: {
    forbidden: 'You do not have access to this organization.',
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
  import: {
    fileTooLarge: 'This file is too large to upload.',
    unsupportedType: 'This file type is not supported.',
  },
  network: {
    error: 'Unable to reach the server. Check your connection and try again.',
  },
} satisfies BackendErrorMessages

export const enMessages = {
  common: {
    actions: {
      add: 'Add',
      back: 'Back',
      cancel: 'Cancel',
      close: 'Close',
      confirm: 'Confirm',
      continue: 'Continue',
      goHome: 'Go home',
      newRx: 'New Rx',
      retry: 'Retry',
      save: 'Save',
      search: 'Search',
      sendToPatient: 'Send to patient',
      signIn: 'Sign in',
      signOut: 'Sign out',
      switchToArabic: 'Switch to Arabic',
      switchToEnglish: 'Switch to English',
    },
    app: {
      name: 'Lensora',
      tagline: 'Practice management',
      online: 'Online',
      role: 'Optometrist',
    },
    navigation: {
      collapseSidebar: 'Collapse sidebar',
      dashboard: 'Dashboard',
      expandSidebar: 'Expand sidebar',
      help: 'Help',
      importForm: 'Import Form',
      intake: 'Intake',
      lensSelector: 'Lens Selector',
      notifications: 'Notifications',
      openNavigation: 'Open navigation',
      patients: 'Patients',
      settings: 'Settings',
      stock: 'Stock',
      tips: 'Tips',
      virtualTryOn: 'Virtual Try-On',
    },
    status: {
      active: 'Active',
      inLab: 'In lab',
      ready: 'Ready',
    },
    stockStatus: {
      inStock: 'In stock',
      low: 'Low',
      out: 'Out',
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
    validation: {
      email: 'Enter a valid email address.',
      number: 'Enter a valid number.',
      required: 'This field is required.',
    },
  },
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to Lensora',
    email: 'Email',
    emailPlaceholder: 'name@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
  },
  dashboard: {
    title: 'Dashboard',
    subtitle: "Today's overview at Lensora.",
    greeting: {
      morning: 'Good morning, {doctorName}',
      afternoon: 'Good afternoon, {doctorName}',
      evening: 'Good evening, {doctorName}',
      summary:
        'You have {appointments} appointments today, {ordersInLab} orders in the lab, and {stockAlerts} stock alerts.',
    },
    kpis: {
      appointmentsToday: 'Appointments today',
      ordersInLab: 'Orders in lab',
      stockAlerts: 'Active stock alerts',
      revenueThisMonth: 'Revenue this month',
    },
    schedule: {
      title: "Today's schedule",
      empty: 'No appointments scheduled for today.',
      reasons: {
        lensFitting: 'Lens fitting',
        pickup: 'Pickup',
        followUp: 'Follow-up',
      },
    },
    readyForPickup: {
      title: 'Ready for pickup',
      empty: 'No orders ready for pickup.',
    },
    lowStock: {
      title: 'Low-stock alerts',
      empty: 'All items are sufficiently stocked.',
      remaining: '{qty} left',
    },
  },
  patients: {
    title: 'Patients',
    subtitle: 'Patient records and prescriptions.',
    searchPlaceholder: 'Search patients, frames, or SKUs',
    list: {
      newIntake: 'New intake',
      statusFilters: {
        all: 'All',
        active: 'Active',
        lab: 'In lab',
        ready: 'Ready',
      },
      columnName: 'Name',
      columnPhone: 'Phone',
      columnAge: 'Age',
      columnLastVisit: 'Last visit',
      columnRx: 'Rx',
      columnStatus: 'Status',
      loadError: 'We could not load the patient list.',
      emptyTitle: 'No patients yet',
      emptyDescription: 'Patients will appear here once they are added.',
    },
    record: {
      loadError: 'We could not load this patient record.',
      age: 'Age',
      town: 'Town',
      phone: 'Phone',
      rxNumberDate: 'Rx number / date',
      launchTryOn: 'Virtual Try-On',
      newLensOrder: 'New lens order',
      tabs: {
        prescription: 'Prescription',
        lensFrame: 'Lens & frame',
        tips: 'Tips',
        history: 'History',
      },
      prescription: {
        od: 'OD',
        os: 'OS',
        sph: 'SPH',
        cyl: 'CYL',
        axis: 'AXIS',
        add: 'ADD',
        pdDist: 'PD (distance)',
        pdNear: 'PD (near)',
        diagnosis: 'Diagnosis',
        notes: 'Clinical notes',
        notesEmpty: 'No clinical notes yet.',
      },
      lensFrame: {
        loadError: 'We could not load the lens order.',
        emptyTitle: 'No lens order yet',
        emptyDescription:
          'Start a new lens order to configure and price this patient’s lenses and frame.',
        frame: 'Frame',
        total: 'Total',
        deposit: 'Deposit ({percent}%)',
      },
      tips: {
        loadError: 'We could not load matched tips.',
        emptyTitle: 'No matched tips',
        emptyDescription: 'Tips matched to this patient’s tags will appear here.',
        sendSuccess: 'Tip sent to patient.',
      },
      history: {
        emptyTitle: 'No visit history yet',
        emptyDescription: 'Past visits will appear here.',
      },
    },
  },
  intake: {
    title: 'Intake',
    subtitle: 'First-visit patient intake questionnaire.',
  },
  import: {
    title: 'Import Form',
    subtitle: 'Convert a paper form into a digital questionnaire.',
  },
  lens: {
    title: 'Lens Selector',
    subtitle: 'Build and price a new lens order.',
  },
  tryOn: {
    title: 'Virtual Try-On',
    subtitle: 'Preview frames on the patient.',
  },
  tips: {
    title: 'Tips',
    subtitle: 'Personalized patient care tips.',
  },
  stock: {
    title: 'Stock',
    subtitle: 'Inventory and stock alerts.',
  },
  assistant: {
    title: 'Assistant',
    placeholder: 'Ask the practice assistant...',
  },
  platformAdmin: {
    layout: {
      title: 'Platform Administration',
    },
    list: {
      title: 'Organizations',
      subtitle: 'Manage practice organizations and their admin logins.',
      addOrganization: 'Add organization',
      columnName: 'Name',
      columnSlug: 'Slug',
      columnAdminEmail: 'Admin email',
      columnAdminName: 'Admin name',
      columnDepositPercent: 'Deposit %',
      columnCreatedAt: 'Created',
      emptyTitle: 'No organizations yet',
      emptyDescription: 'Add your first organization to get started.',
      loadError: 'We could not load organizations. Please try again.',
      pageOf: 'Page {page} of {totalPages}',
    },
    form: {
      title: 'Add organization',
      description: 'Creates the organization and its single admin login.',
      name: 'Organization name',
      slug: 'Slug',
      slugPlaceholder: 'acme-optometry',
      slugPattern: 'Use lowercase letters, numbers, and hyphens only.',
      depositPercent: 'Deposit percent (0–1)',
      depositPercentRange: 'Enter a value between 0 and 1.',
      adminDisplayNameEn: 'Admin display name (English)',
      adminDisplayNameAr: 'Admin display name (Arabic)',
      adminEmail: 'Admin email',
      adminPassword: 'Admin password',
      passwordMinLength: 'Password must be at least 8 characters.',
      success: 'Organization created successfully.',
    },
  },
}

export type I18nMessages = typeof enMessages
