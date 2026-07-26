import { useCallback, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deleteAttachment, getAttachmentSignedUrl, listAttachments } from './api'
import { attachmentKeys } from './query-keys'
import { uploadAttachment } from './services/upload-attachment'
import { type AttachmentFolder, type UploadProgress } from './types'

// Kept well below the backend's signed-URL lifetime so a cached URL is never handed out
// after it has expired.
const SIGNED_URL_STALE_TIME_MS = 5 * 60_000

export function useAttachments(subfolder: AttachmentFolder) {
  return useQuery({
    queryKey: attachmentKeys.list(subfolder),
    queryFn: () => listAttachments(subfolder),
  })
}

export function useAttachmentSignedUrl(attachmentId: string, isEnabled = true) {
  return useQuery({
    queryKey: attachmentKeys.signedUrl(attachmentId),
    queryFn: () => getAttachmentSignedUrl(attachmentId),
    staleTime: SIGNED_URL_STALE_TIME_MS,
    enabled: isEnabled,
  })
}

export function useUploadAttachment(subfolder: AttachmentFolder) {
  const queryClient = useQueryClient()
  const [progress, setProgress] = useState<UploadProgress | null>(null)

  const mutation = useMutation({
    mutationFn: (file: File) => uploadAttachment({ file, subfolder, onProgress: setProgress }),
    onSettled: async () => {
      setProgress(null)
      await queryClient.invalidateQueries({ queryKey: attachmentKeys.list(subfolder) })
    },
  })

  const { reset: resetMutation } = mutation

  const reset = useCallback(() => {
    setProgress(null)
    resetMutation()
  }, [resetMutation])

  return { ...mutation, progress, reset }
}

export function useDeleteAttachment(subfolder: AttachmentFolder) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: async (_result, attachmentId) => {
      queryClient.removeQueries({ queryKey: attachmentKeys.signedUrl(attachmentId) })
      await queryClient.invalidateQueries({ queryKey: attachmentKeys.list(subfolder) })
    },
  })
}
