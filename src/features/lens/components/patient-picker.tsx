import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { usePatients } from '@/features/patients/hooks'
import { resolveBilingual, useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const PATIENT_PICKER_PAGE_SIZE = 8
const SEARCH_DEBOUNCE_MS = 300

type PatientPickerProps = {
  onSelectPatient: (patientId: string) => void
  selectedPatientId: string | null
}

export function PatientPicker({ onSelectPatient, selectedPatientId }: PatientPickerProps) {
  const { locale, t } = useTranslation()
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeoutId)
  }, [searchInput])

  const patientsQuery = usePatients({
    page: 1,
    pageSize: PATIENT_PICKER_PAGE_SIZE,
    q: debouncedSearch || undefined,
  })

  const patients = patientsQuery.data?.data ?? []

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          aria-label={t('lens.review.searchPatient')}
          placeholder={t('lens.review.searchPatientPlaceholder')}
          className="h-9 ps-8"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      {patientsQuery.isLoading ? <LoadingState size="sm" /> : null}

      {patientsQuery.isError ? (
        <ErrorState description={t('lens.review.patientLoadError')} />
      ) : null}

      {patientsQuery.isSuccess && patients.length === 0 ? (
        <EmptyState title={t('lens.review.noPatientsTitle')} />
      ) : null}

      {patientsQuery.isSuccess && patients.length > 0 ? (
        <ul
          role="radiogroup"
          aria-label={t('lens.review.searchPatient')}
          className="flex flex-col gap-2"
        >
          {patients.map((patient) => {
            const name = resolveBilingual({ en: patient.nameEn, ar: patient.nameAr }, locale)
            const isSelected = patient.id === selectedPatientId

            return (
              <li key={patient.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectPatient(patient.id)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-start text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                    isSelected
                      ? 'border-primary ring-1 ring-primary/30'
                      : 'border-border hover:bg-muted/50',
                  )}
                >
                  <span className="text-foreground">{name.primary}</span>
                  <span className="font-mono text-xs text-muted-foreground">{patient.phone}</span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
