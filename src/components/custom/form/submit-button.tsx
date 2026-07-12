import * as React from 'react'

import { Button } from '@/components/ui/button'

import { useFormContext } from './form-context'

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  label?: React.ReactNode
  submittingLabel?: React.ReactNode
}

export function SubmitButton({
  children,
  disabled,
  label = 'Submit',
  submittingLabel = 'Submitting...',
  type = 'submit',
  ...props
}: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button disabled={disabled || !canSubmit || isSubmitting} type={type} {...props}>
          {children ?? (isSubmitting ? submittingLabel : label)}
        </Button>
      )}
    </form.Subscribe>
  )
}
