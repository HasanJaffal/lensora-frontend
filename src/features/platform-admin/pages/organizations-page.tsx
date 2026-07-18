import { useState } from 'react'
import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyState, ErrorState, LoadingState } from '@/components/custom/feedback'
import { useTranslation } from '@/lib/i18n'

import { CreateOrganizationDialog } from '../components/create-organization-dialog'
import { useOrganizations } from '../hooks'

const PAGE_SIZE = 20

export function OrganizationsPage() {
  const { locale, t } = useTranslation()
  const [page, setPage] = useState(1)
  const organizationsQuery = useOrganizations(page, PAGE_SIZE)

  const organizations = organizationsQuery.data?.data ?? []
  const pagination = organizationsQuery.data?.pagination ?? null
  const dateLocale = locale === 'ar' ? ar : enUS

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{t('platformAdmin.list.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('platformAdmin.list.subtitle')}</p>
        </div>
        <CreateOrganizationDialog />
      </div>

      {organizationsQuery.isLoading ? <LoadingState size="lg" /> : null}

      {organizationsQuery.isError ? (
        <ErrorState description={t('platformAdmin.list.loadError')} />
      ) : null}

      {organizationsQuery.isSuccess && organizations.length === 0 ? (
        <EmptyState
          title={t('platformAdmin.list.emptyTitle')}
          description={t('platformAdmin.list.emptyDescription')}
        />
      ) : null}

      {organizationsQuery.isSuccess && organizations.length > 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('platformAdmin.list.columnName')}</TableHead>
                <TableHead>{t('platformAdmin.list.columnSlug')}</TableHead>
                <TableHead>{t('platformAdmin.list.columnAdminEmail')}</TableHead>
                <TableHead>{t('platformAdmin.list.columnAdminName')}</TableHead>
                <TableHead>{t('platformAdmin.list.columnDepositPercent')}</TableHead>
                <TableHead>{t('platformAdmin.list.columnCreatedAt')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((organization) => (
                <TableRow key={organization.id}>
                  <TableCell className="font-medium text-foreground">{organization.name}</TableCell>
                  <TableCell className="text-muted-foreground">{organization.slug}</TableCell>
                  <TableCell className="text-muted-foreground">{organization.adminEmail}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {locale === 'ar'
                      ? organization.adminDisplayNameAr
                      : organization.adminDisplayNameEn}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {Math.round(organization.depositPercent * 100)}%
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(organization.createdAt), 'PPP', { locale: dateLocale })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
