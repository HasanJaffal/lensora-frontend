import { ApiError } from '@/lib/api-error'

import { type UploadProgress } from '../types'

type UploadToSignedUrlOptions = {
  uploadUrl: string
  file: File
  onProgress?: (progress: UploadProgress) => void
  signal?: AbortSignal
}

/**
 * Sends the file straight to storage using the URL the backend signed.
 *
 * Uses XHR rather than `fetch` because only XHR reports upload progress, which the caller
 * needs to drive a progress bar for large scans.
 */
export function uploadToSignedUrl({
  uploadUrl,
  file,
  onProgress,
  signal,
}: UploadToSignedUrlOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(
        new ApiError({ code: 'storage.operationFailed', message: 'Upload aborted.', status: 0 }),
      )
      return
    }

    const xhr = new XMLHttpRequest()

    const abortUpload = () => xhr.abort()
    const cleanUp = () => signal?.removeEventListener('abort', abortUpload)

    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', file.type)

    xhr.upload.addEventListener('progress', (event) => {
      if (!onProgress || !event.lengthComputable) {
        return
      }

      onProgress({
        transferredBytes: event.loaded,
        totalBytes: event.total,
        percent: Math.round((event.loaded / event.total) * 100),
      })
    })

    xhr.addEventListener('load', () => {
      cleanUp()

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve()
        return
      }

      reject(
        new ApiError({
          code: 'storage.operationFailed',
          message: 'The file could not be uploaded to storage.',
          status: xhr.status,
        }),
      )
    })

    xhr.addEventListener('error', () => {
      cleanUp()
      reject(
        new ApiError({ code: 'network.error', message: 'Unable to reach storage.', status: 0 }),
      )
    })

    xhr.addEventListener('abort', () => {
      cleanUp()
      reject(
        new ApiError({ code: 'storage.operationFailed', message: 'Upload aborted.', status: 0 }),
      )
    })

    signal?.addEventListener('abort', abortUpload)
    xhr.send(file)
  })
}
