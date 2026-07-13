import { ErrorState, LoadingState } from '@/components/custom/feedback'

export function RoutePending() {
  return <LoadingState size="lg" />
}

export function RouteError() {
  return <ErrorState />
}
