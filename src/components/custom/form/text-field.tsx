import * as React from 'react'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { FormError } from './form-error'
import { useFieldContext } from './form-context'

type TextFieldProps = Omit<
  React.ComponentProps<'input'>,
  'aria-invalid' | 'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'value'
> & {
  description?: React.ReactNode
  label?: React.ReactNode
}

export function TextField({
  className,
  description,
  disabled,
  id,
  label,
  required,
  type = 'text',
  ...props
}: TextFieldProps) {
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
      <Input
        aria-describedby={[descriptionId, isInvalid ? errorId : undefined]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={isInvalid}
        className={className}
        disabled={disabled}
        id={controlId}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        type={type}
        value={field.state.value}
        {...props}
      />
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <FormError errors={field.state.meta.errors} id={errorId} isVisible={isInvalid} />
    </Field>
  )
}
