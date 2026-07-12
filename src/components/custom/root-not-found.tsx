import { Link } from '@tanstack/react-router'

import { PageNotFoundState } from '@/components/custom/feedback'
import { buttonVariants } from '@/components/constants/button-variants'
import { useTranslation } from '@/lib/i18n'

export function RootNotFound() {
  const { t } = useTranslation()

  return (
    <PageNotFoundState
      className="h-screen"
      actions={
        <Link to="/" className={buttonVariants({ variant: 'outline' })}>
          {t('common.actions.goHome')}
        </Link>
      }
    />
  )
}
