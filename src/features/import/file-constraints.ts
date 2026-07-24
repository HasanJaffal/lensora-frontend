export const MAX_IMPORT_FILE_BYTES = 20 * 1024 * 1024

export const MAX_IMPORT_FILE_MB = MAX_IMPORT_FILE_BYTES / (1024 * 1024)

export const ACCEPTED_IMPORT_CONTENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png']

export const ACCEPTED_IMPORT_FILE_ACCEPT = ACCEPTED_IMPORT_CONTENT_TYPES.join(',')

export type ImportFileRejection = 'invalidType' | 'fileTooLarge'

export function findImportFileRejection(file: File): ImportFileRejection | null {
  if (!ACCEPTED_IMPORT_CONTENT_TYPES.includes(file.type)) {
    return 'invalidType'
  }

  if (file.size > MAX_IMPORT_FILE_BYTES) {
    return 'fileTooLarge'
  }

  return null
}
