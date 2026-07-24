export type KpiDto = {
  delta: string
  value: number
}

export type DashboardKpisDto = {
  appointmentsToday: KpiDto
  ordersInLab: KpiDto
  revenueThisMonth: KpiDto
  stockAlerts: KpiDto
}

export type PatientStatus = 'active' | 'lab' | 'ready'

export type ScheduleReason = 'followUp' | 'lensFitting' | 'pickup'

export type SchedulePatientDto = {
  avatar: string
  id: string
  name: string
}

export type ScheduleEntryDto = {
  patient: SchedulePatientDto
  reason: ScheduleReason
  status: PatientStatus
  time: string
}

export type ReadyForPickupDto = {
  patientId: string
  patientName: string
  product: string
  totalDue: number | null
}

export type StockStatus = 'inStock' | 'low' | 'out'

export type LowStockAlertDto = {
  id: string
  name: string
  qty: number
  sku: string
  status: StockStatus
  threshold: number
}

export type GreetingDto = {
  appointmentsToday: number
  doctorNameAr: string
  doctorNameEn: string
  ordersInLab: number
  stockAlerts: number
}

export type DashboardSummaryDto = {
  greeting: GreetingDto
  kpis: DashboardKpisDto
  lowStock: LowStockAlertDto[]
  readyForPickup: ReadyForPickupDto[]
  schedule: ScheduleEntryDto[]
}
