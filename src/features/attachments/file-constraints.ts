export const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024

export const MAX_ATTACHMENT_MB = MAX_ATTACHMENT_BYTES / (1024 * 1024)

export const ACCEPTED_ATTACHMENT_CONTENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const ACCEPTED_ATTACHMENT_FILE_ACCEPT = ACCEPTED_ATTACHMENT_CONTENT_TYPES.join(',')

export type AttachmentFileRejection = 'invalidType' | 'fileTooLarge'

/** Mirrors the server-side limits so the user is told before a byte is uploaded. */
export function findAttachmentFileRejection(file: File): AttachmentFileRejection | null {
  if (!ACCEPTED_ATTACHMENT_CONTENT_TYPES.includes(file.type)) {
    return 'invalidType'
  }

  if (file.size > MAX_ATTACHMENT_BYTES) {
    return 'fileTooLarge'
  }

  return null
}
