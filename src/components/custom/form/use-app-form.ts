import { createFormHook } from '@tanstack/react-form'

import { CheckboxField } from './checkbox-field'
import { ChecklistField } from './checklist-field'
import { PasswordField } from './password-field'
import { RadioGroupField } from './radio-group-field'
import { SubmitButton } from './submit-button'
import { TextareaField } from './textarea-field'
import { TextField } from './text-field'
import { fieldContext, formContext } from './form-context'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    CheckboxField,
    ChecklistField,
    PasswordField,
    RadioGroupField,
    TextField,
    TextareaField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
