import { createFormHook } from '@tanstack/react-form'

import { PasswordField } from './password-field'
import { SubmitButton } from './submit-button'
import { TextareaField } from './textarea-field'
import { TextField } from './text-field'
import { fieldContext, formContext } from './form-context'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    PasswordField,
    TextField,
    TextareaField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
