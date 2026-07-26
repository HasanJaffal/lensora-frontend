import { apiClient } from '@/lib/api-client'

import {
  type AttachmentDto,
  type AttachmentFolder,
  type SignedUrlDto,
  type UploadAuthorizationDto,
  type UploadAuthorizationRequest,
} from './types'

export function requestUploadAuthorization(
  request: UploadAuthorizationRequest,
): Promise<UploadAuthorizationDto> {
  return apiClient.post<UploadAuthorizationDto>('/attachments/upload-authorizations', request)
}

export function confirmAttachmentUpload(attachmentId: string): Promise<AttachmentDto> {
  return apiClient.post<AttachmentDto>(`/attachments/${attachmentId}/confirm`)
}

export function getAttachmentSignedUrl(attachmentId: string): Promise<SignedUrlDto> {
  return apiClient.get<SignedUrlDto>(`/attachments/${attachmentId}/signed-url`)
}

export function listAttachments(subfolder: AttachmentFolder): Promise<AttachmentDto[]> {
  return apiClient.get<AttachmentDto[]>('/attachments', { query: { subfolder } })
}

export function deleteAttachment(attachmentId: string): Promise<null> {
  return apiClient.delete<null>(`/attachments/${attachmentId}`)
}
