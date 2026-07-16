const tokenStorageKey = 'lensora-token'

let inMemoryToken: string | null = null

export function getAuthToken(): string | null {
  if (inMemoryToken !== null) {
    return inMemoryToken
  }

  inMemoryToken = window.localStorage.getItem(tokenStorageKey)

  return inMemoryToken
}

export function setAuthToken(token: string | null): void {
  inMemoryToken = token

  if (token === null) {
    window.localStorage.removeItem(tokenStorageKey)
    return
  }

  window.localStorage.setItem(tokenStorageKey, token)
}
