import { type AttachmentFolder } from './types'

export const attachmentKeys = {
  all: ['attachments'] as const,
  lists: () => [...attachmentKeys.all, 'list'] as const,
  list: (subfolder: AttachmentFolder) => [...attachmentKeys.lists(), subfolder] as const,
  signedUrl: (attachmentId: string) => [...attachmentKeys.all, 'signed-url', attachmentId] as const,
}
