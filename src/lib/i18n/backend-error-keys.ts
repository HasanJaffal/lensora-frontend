export const backendErrorKeys = {
  auth: {
    invalidCredentials: 'auth.invalidCredentials',
    unauthorized: 'auth.unauthorized',
    sessionExpired: 'auth.sessionExpired',
    accountDisabled: 'auth.accountDisabled',
    emailTaken: 'auth.emailTaken',
  },
  organization: {
    slugTaken: 'organization.slugTaken',
    deactivated: 'organization.deactivated',
  },
  tenant: {
    forbidden: 'tenant.forbidden',
  },
  resource: {
    notFound: 'resource.notFound',
    conflict: 'resource.conflict',
  },
  validation: {
    error: 'validation.error',
  },
  server: {
    internal: 'server.internal',
  },
  ai: {
    unavailable: 'ai.unavailable',
  },
  patient: {
    notFound: 'patient.notFound',
  },
  inventory: {
    outOfStock: 'inventory.outOfStock',
  },
  import: {
    fileTooLarge: 'import.fileTooLarge',
    unsupportedType: 'import.unsupportedType',
  },
  network: {
    error: 'network.error',
  },
} as const

type BackendErrorKeyMap = typeof backendErrorKeys

export type BackendErrorEntity = keyof BackendErrorKeyMap

export type BackendErrorKey = {
  [Entity in BackendErrorEntity]: BackendErrorKeyMap[Entity][keyof BackendErrorKeyMap[Entity]]
}[BackendErrorEntity]

export type BackendErrorMessages = {
  [Entity in BackendErrorEntity]: {
    [ErrorName in keyof BackendErrorKeyMap[Entity]]: string
  }
}

const backendErrorKeyValues = Object.values(backendErrorKeys).flatMap((entityKeys) =>
  Object.values(entityKeys),
)

export function isBackendErrorKey(value: string): value is BackendErrorKey {
  return (backendErrorKeyValues as readonly string[]).includes(value)
}
