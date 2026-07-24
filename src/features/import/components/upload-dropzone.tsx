import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n'

import {
  ACCEPTED_IMPORT_FILE_ACCEPT,
  MAX_IMPORT_FILE_MB,
  findImportFileRejection,
} from '../file-constraints'

type UploadDropzoneProps = {
  isDisabled: boolean
  onFileRejected: (reason: 'invalidType' | 'fileTooLarge') => void
  onFileSelected: (file: File) => void
}

export function UploadDropzone({
  isDisabled,
  onFileRejected,
  onFileSelected,
}: UploadDropzoneProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleFile = (file: File | undefined) => {
    if (!file) {
      return
    }

    const rejection = findImportFileRejection(file)
    if (rejection) {
      onFileRejected(rejection)
      return
    }

    onFileSelected(file)
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border px-6 py-12 text-center transition-colors',
        isDraggingOver && 'border-primary bg-primary/5',
        isDisabled && 'pointer-events-none opacity-60',
      )}
      onDragLeave={() => setIsDraggingOver(false)}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDraggingOver(true)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDraggingOver(false)
        handleFile(event.dataTransfer.files[0])
      }}
    >
      <UploadCloud aria-hidden="true" className="size-8 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium text-foreground">{t('import.upload.dropzoneLabel')}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('import.upload.dropzoneHint', { maxSizeMb: MAX_IMPORT_FILE_MB })}
        </p>
      </div>
      <Button
        disabled={isDisabled}
        onClick={() => fileInputRef.current?.click()}
        type="button"
        variant="outline"
      >
        {t('import.upload.browse')}
      </Button>
      <input
        accept={ACCEPTED_IMPORT_FILE_ACCEPT}
        className="sr-only"
        onChange={(event) => {
          handleFile(event.target.files?.[0])
          event.target.value = ''
        }}
        ref={fileInputRef}
        type="file"
      />
    </div>
  )
}
