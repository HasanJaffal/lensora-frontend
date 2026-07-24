import { getRouteApi } from '@tanstack/react-router'

import { ErrorState, LoadingState } from '@/components/custom/feedback'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from '@/lib/i18n'

import { HistoryTab } from '../components/history-tab'
import { LensFrameTab } from '../components/lens-frame-tab'
import { PatientRecordHeader } from '../components/patient-record-header'
import { PrescriptionTab } from '../components/prescription-tab'
import { TipsTab } from '../components/tips-tab'
import { usePatient } from '../hooks'

const routeApi = getRouteApi('/_app/patients/$patientId')

export function PatientRecordPage() {
  const { t } = useTranslation()
  const { patientId } = routeApi.useParams()
  const patientQuery = usePatient(patientId)

  if (patientQuery.isLoading) {
    return <LoadingState size="lg" />
  }

  if (patientQuery.isError || !patientQuery.data) {
    return <ErrorState description={t('patients.record.loadError')} />
  }

  const patient = patientQuery.data

  return (
    <div className="flex flex-col gap-6">
      <PatientRecordHeader patient={patient} />

      <Tabs defaultValue="prescription">
        <TabsList>
          <TabsTrigger value="prescription">{t('patients.record.tabs.prescription')}</TabsTrigger>
          <TabsTrigger value="lensFrame">{t('patients.record.tabs.lensFrame')}</TabsTrigger>
          <TabsTrigger value="tips">{t('patients.record.tabs.tips')}</TabsTrigger>
          <TabsTrigger value="history">{t('patients.record.tabs.history')}</TabsTrigger>
        </TabsList>

        <TabsContent value="prescription">
          <PrescriptionTab patient={patient} />
        </TabsContent>
        <TabsContent value="lensFrame">
          <LensFrameTab patientId={patient.id} />
        </TabsContent>
        <TabsContent value="tips">
          <TipsTab patientId={patient.id} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTab history={patient.history} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
