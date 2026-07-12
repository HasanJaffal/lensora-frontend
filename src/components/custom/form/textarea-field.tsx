import * as React from 'react'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { FormError } from './form-error'
import { useFieldContext } from './form-context'

type TextareaFieldProps = Omit<
  React.ComponentProps<'textarea'>,
  'aria-invalid' | 'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'value'
> & {
  description?: React.ReactNode
  label?: React.ReactNode
}

export function TextareaField({
  className,
  description,
  disabled,
  id,
  label,
  required,
  ...props
}: TextareaFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const controlId = id ?? field.name
  const errorId = `${controlId}-error`
  const descriptionId = description ? `${controlId}-description` : undefined

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label ? (
        <FieldLabel htmlFor={controlId}>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}
      <Textarea
        aria-describedby={[descriptionId, isInvalid ? errorId : undefined]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={isInvalid}
        className={cn('min-h-24 resize-y', className)}
        disabled={disabled}
        id={controlId}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        value={field.state.value}
        {...props}
      />
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <FormError errors={field.state.meta.errors} id={errorId} isVisible={isInvalid} />
    </Field>
  )
}
