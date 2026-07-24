import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field'
import { cn } from '@/lib/utils'

import { FormError } from './form-error'
import { type FieldOption } from './field-options'
import { useFieldContext } from './form-context'

type ChecklistFieldProps = {
  className?: string
  columns?: 2 | 3
  description?: React.ReactNode
  disabled?: boolean
  label?: React.ReactNode
  options: readonly FieldOption[]
}

const columnClasses: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
}

export function ChecklistField({
  className,
  columns = 2,
  description,
  disabled,
  label,
  options,
}: ChecklistFieldProps) {
  const field = useFieldContext<string[] | undefined>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const errorId = `${field.name}-error`
  const descriptionId = description ? `${field.name}-description` : undefined
  const selectedValues = field.state.value ?? []

  const toggleOption = (value: string, isChecked: boolean) => {
    field.handleChange(
      isChecked
        ? [...selectedValues, value]
        : selectedValues.filter((selected) => selected !== value),
    )
  }

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label ? <FieldTitle>{label}</FieldTitle> : null}
      <div
        aria-describedby={[descriptionId, isInvalid ? errorId : undefined]
          .filter(Boolean)
          .join(' ')}
        className={cn('grid grid-cols-1 gap-2', columnClasses[columns], className)}
        role="group"
      >
        {options.map((option) => (
          <FieldLabel className="flex-row items-center gap-2 font-normal" key={option.value}>
            <Checkbox
              checked={selectedValues.includes(option.value)}
              disabled={disabled}
              name={`${field.name}.${option.value}`}
              onBlur={field.handleBlur}
              onCheckedChange={(checked) => toggleOption(option.value, checked)}
            />
            {option.label}
          </FieldLabel>
        ))}
      </div>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <FormError errors={field.state.meta.errors} id={errorId} isVisible={isInvalid} />
    </Field>
  )
}
