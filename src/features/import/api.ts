import { apiClient } from '@/lib/api-client'

import { type ImportDto, type IntakeFormDefinitionDto } from './types'

export function uploadImportDocument(file: File): Promise<ImportDto> {
  const formData = new FormData()
  formData.append('file', file)

  return apiClient.postForm<ImportDto>('/imports', formData)
}

export function getImport(importId: string): Promise<ImportDto> {
  return apiClient.get<ImportDto>(`/imports/${importId}`)
}

export function convertImportToIntakeDefinition(
  importId: string,
): Promise<IntakeFormDefinitionDto> {
  return apiClient.post<IntakeFormDefinitionDto>(`/imports/${importId}/use-as-intake`)
}
