import { confirmAttachmentUpload, requestUploadAuthorization } from '../api'
import { type AttachmentDto, type AttachmentFolder, type UploadProgress } from '../types'
import { uploadToSignedUrl } from './upload-to-signed-url'

export type UploadAttachmentInput = {
  file: File
  subfolder: AttachmentFolder
  onProgress?: (progress: UploadProgress) => void
  signal?: AbortSignal
}

/**
 * Authorize, transfer, then confirm.
 *
 * The storage path and the organization it sits under are decided entirely by the backend in
 * step one; the browser only ever receives a URL it is allowed to write to.
 */
export async function uploadAttachment({
  file,
  subfolder,
  onProgress,
  signal,
}: UploadAttachmentInput): Promise<AttachmentDto> {
  const authorization = await requestUploadAuthorization({
    subfolder,
    originalFileName: file.name,
    contentType: file.type,
    sizeBytes: file.size,
  })

  await uploadToSignedUrl({
    uploadUrl: authorization.uploadUrl,
    file,
    onProgress,
    signal,
  })

  return confirmAttachmentUpload(authorization.attachment.id)
}
