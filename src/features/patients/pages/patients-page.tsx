import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { buttonVariants } from '@/components/constants/button-variants'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import { PatientsTable } from '../components/patients-table'
import { usePatients } from '../hooks'
import { type PatientStatus } from '../types'

const PAGE_SIZE = 20
const SEARCH_DEBOUNCE_MS = 300

type StatusFilter = PatientStatus | 'all'

const statusFilters: StatusFilter[] = ['all', 'active', 'lab', 'ready']

export function PatientsPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeoutId)
  }, [searchInput])

  const patientsQuery = usePatients({
    page,
    pageSize: PAGE_SIZE,
    status: statusFilter === 'all' ? undefined : statusFilter,
    q: debouncedSearch || undefined,
  })

  const patients = patientsQuery.data?.data ?? []
  const pagination = patientsQuery.data?.pagination ?? null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{t('patients.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('patients.subtitle')}</p>
        </div>
        <Link to="/intake" className={cn(buttonVariants({ variant: 'default' }))}>
          <Plus className="size-4" aria-hidden="true" />
          {t('patients.list.newIntake')}
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value as StatusFilter)
            setPage(1)
          }}
        >
          <TabsList>
            {statusFilters.map((filter) => (
              <TabsTrigger key={filter} value={filter}>
                {t(`patients.list.statusFilters.${filter}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full max-w-xs">
          <Search
            className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            aria-label={t('common.actions.search')}
            placeholder={t('patients.searchPlaceholder')}
            className="h-9 ps-8"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {patientsQuery.isLoading ? <LoadingState size="lg" /> : null}

      {patientsQuery.isError ? <ErrorState description={t('patients.list.loadError')} /> : null}

      {patientsQuery.isSuccess && patients.length === 0 ? (
        <EmptyState
          title={t('patients.list.emptyTitle')}
          description={t('patients.list.emptyDescription')}
        />
      ) : null}

      {patientsQuery.isSuccess && patients.length > 0 ? (
        <PatientsTable patients={patients} />
      ) : null}

      {pagination && pagination.totalPages > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {t('platformAdmin.list.pageOf', {
              page: pagination.page,
              totalPages: pagination.totalPages,
            })}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={pagination.page <= 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
              aria-label={t('common.actions.back')}
            >
              <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
              aria-label={t('common.actions.continue')}
            >
              <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
