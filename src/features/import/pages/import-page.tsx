import { useState } from 'react'
import { toast } from 'sonner'

import { LoadingState } from '@/components/custom/feedback'
import { ApiError } from '@/lib/api-error'
import { useTranslation } from '@/lib/i18n'

import { ExtractedQuestionsReview } from '../components/extracted-questions-review'
import { MAX_IMPORT_FILE_MB, type ImportFileRejection } from '../file-constraints'
import { UploadDropzone } from '../components/upload-dropzone'
import { useUploadImportDocument } from '../hooks'
import { type ImportDto } from '../types'

export function ImportPage() {
  const { t, translateBackendError } = useTranslation()
  const [importResult, setImportResult] = useState<ImportDto | null>(null)
  const uploadMutation = useUploadImportDocument()

  const handleFileRejected = (reason: ImportFileRejection) => {
    toast.error(
      reason === 'invalidType'
        ? t('import.upload.invalidType')
        : t('import.upload.fileTooLarge', { maxSizeMb: MAX_IMPORT_FILE_MB }),
    )
  }

  const handleFileSelected = (file: File) => {
    uploadMutation.mutate(file, {
      onSuccess: setImportResult,
      onError: (error) => {
        toast.error(
          error instanceof ApiError
            ? translateBackendError(error.code)
            : t('import.upload.uploadError'),
        )
      },
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{t('import.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('import.subtitle')}</p>
      </div>

      {uploadMutation.isPending ? (
        <LoadingState
          description={t('import.processing.description')}
          size="lg"
          title={t('import.processing.title')}
        />
      ) : null}

      {!uploadMutation.isPending && importResult ? (
        <ExtractedQuestionsReview
          importResult={importResult}
          onImportAnother={() => setImportResult(null)}
        />
      ) : null}

      {!uploadMutation.isPending && !importResult ? (
        <UploadDropzone
          isDisabled={uploadMutation.isPending}
          onFileRejected={handleFileRejected}
          onFileSelected={handleFileSelected}
        />
      ) : null}
    </div>
  )
}
