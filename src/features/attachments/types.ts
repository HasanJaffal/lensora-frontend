export const attachmentFolders = {
  patientDocuments: 'patient-documents',
  patientImages: 'patient-images',
  reports: 'reports',
} as const

export type AttachmentFolder = (typeof attachmentFolders)[keyof typeof attachmentFolders]

export type AttachmentDto = {
  id: string
  subfolder: AttachmentFolder
  storagePath: string
  originalFileName: string
  contentType: string
  sizeBytes: number
  isUploaded: boolean
  createdAt: string
  updatedAt: string
}

export type UploadAuthorizationDto = {
  attachment: AttachmentDto
  uploadUrl: string
}

export type SignedUrlDto = {
  url: string
  expiresIn: number
}

export type UploadAuthorizationRequest = {
  subfolder: AttachmentFolder
  originalFileName: string
  contentType: string
  sizeBytes: number
}

export type UploadProgress = {
  transferredBytes: number
  totalBytes: number
  percent: number
}
