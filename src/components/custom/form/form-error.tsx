import { FieldError } from '@/components/ui/field'

type FormErrorProps = {
  errors: readonly unknown[]
  id?: string
  isVisible: boolean
}

function getValidationMessage(error: unknown) {
  if (!error) {
    return undefined
  }

  if (typeof error === 'string') {
    return error
  }

  if (typeof error === 'object' && 'message' in error) {
    const message = error.message

    return typeof message === 'string' ? message : undefined
  }

  return undefined
}

export function FormError({ errors, id, isVisible }: FormErrorProps) {
  if (!isVisible) {
    return null
  }

  const fieldErrors = errors
    .map(getValidationMessage)
    .filter((message) => message !== undefined)
    .map((message) => ({ message }))

  return <FieldError errors={fieldErrors} id={id} />
}
