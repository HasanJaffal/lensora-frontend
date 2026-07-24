import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'

import { FormError } from './form-error'
import { useFieldContext } from './form-context'

type CheckboxFieldProps = {
  className?: string
  description?: React.ReactNode
  disabled?: boolean
  id?: string
  label: React.ReactNode
}

export function CheckboxField({ className, description, disabled, id, label }: CheckboxFieldProps) {
  const field = useFieldContext<boolean | undefined>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const controlId = id ?? field.name
  const errorId = `${controlId}-error`
  const descriptionId = description ? `${controlId}-description` : undefined

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      <FieldLabel className="flex-row items-center gap-2" htmlFor={controlId}>
        <Checkbox
          aria-describedby={[descriptionId, isInvalid ? errorId : undefined]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={isInvalid}
          checked={field.state.value ?? false}
          className={className}
          disabled={disabled}
          id={controlId}
          name={field.name}
          onBlur={field.handleBlur}
          onCheckedChange={(checked) => field.handleChange(checked)}
        />
        {label}
      </FieldLabel>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <FormError errors={field.state.meta.errors} id={errorId} isVisible={isInvalid} />
    </Field>
  )
}
