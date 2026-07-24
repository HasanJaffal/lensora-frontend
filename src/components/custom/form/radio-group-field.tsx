import * as React from 'react'

import { Field, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

import { FormError } from './form-error'
import { type FieldOption } from './field-options'
import { useFieldContext } from './form-context'

type RadioGroupFieldProps = {
  className?: string
  description?: React.ReactNode
  disabled?: boolean
  label?: React.ReactNode
  options: readonly FieldOption[]
  required?: boolean
}

export function RadioGroupField({
  className,
  description,
  disabled,
  label,
  options,
  required,
}: RadioGroupFieldProps) {
  const field = useFieldContext<string | undefined>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const errorId = `${field.name}-error`
  const descriptionId = description ? `${field.name}-description` : undefined

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label ? (
        <FieldTitle>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          ) : null}
        </FieldTitle>
      ) : null}
      <RadioGroup
        aria-describedby={[descriptionId, isInvalid ? errorId : undefined]
          .filter(Boolean)
          .join(' ')}
        className={cn('flex flex-wrap gap-x-6 gap-y-2', className)}
        disabled={disabled}
        name={field.name}
        onValueChange={(value) => field.handleChange(String(value))}
        value={field.state.value ?? ''}
      >
        {options.map((option) => (
          <FieldLabel className="flex-row items-center gap-2 font-normal" key={option.value}>
            <RadioGroupItem
              aria-invalid={isInvalid}
              onBlur={field.handleBlur}
              value={option.value}
            />
            {option.label}
          </FieldLabel>
        ))}
      </RadioGroup>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <FormError errors={field.state.meta.errors} id={errorId} isVisible={isInvalid} />
    </Field>
  )
}
