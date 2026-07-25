import { useRef, type ChangeEvent } from 'react'
import { Camera, RotateCcw, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n'

type PhotoInputProps = {
  onClearPhoto: () => void
  onSelectPhoto: (file: File) => void
  photoUrl: string | null
}

export function PhotoInput({ onClearPhoto, onSelectPhoto, photoUrl }: PhotoInputProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      onSelectPhoto(file)
    }

    // Allow re-selecting the same file after a clear.
    event.target.value = ''
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-label={t('tryOn.photo.selectLabel')}
        onChange={handleFileChange}
      />
      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
        {photoUrl ? (
          <RotateCcw className="size-4" aria-hidden="true" />
        ) : (
          <Camera className="size-4" aria-hidden="true" />
        )}
        {photoUrl ? t('tryOn.photo.retake') : t('tryOn.photo.capture')}
      </Button>

      {photoUrl ? (
        <Button type="button" variant="ghost" onClick={onClearPhoto}>
          <Trash2 className="size-4" aria-hidden="true" />
          {t('tryOn.photo.remove')}
        </Button>
      ) : null}

      <p className="w-full text-xs text-muted-foreground">{t('tryOn.photo.privacyNote')}</p>
    </div>
  )
}
