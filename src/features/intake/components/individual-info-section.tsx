import { withForm } from '@/components/custom/form'
import { useTranslation } from '@/lib/i18n'

import { emptyIntakeFormValues } from '../map-intake'
import { genderOptionValues } from '../intake-schema'

export const IndividualInfoSection = withForm({
  defaultValues: emptyIntakeFormValues,
  render: function IndividualInfoSection({ form }) {
    const { t } = useTranslation()

    const genderOptions = genderOptionValues.map((value) => ({
      value,
      label: t(`intake.individualInfo.genderOptions.${value}`),
    }))

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <form.AppField name="individualInfo.name">
          {(field) => (
            <field.TextField autoComplete="off" label={t('intake.individualInfo.name')} required />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.formDate">
          {(field) => <field.TextField label={t('intake.individualInfo.formDate')} type="date" />}
        </form.AppField>

        <form.AppField name="individualInfo.birthdate">
          {(field) => (
            <field.TextField label={t('intake.individualInfo.birthdate')} required type="date" />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.lastEyeExamDate">
          {(field) => (
            <field.TextField label={t('intake.individualInfo.lastEyeExamDate')} type="date" />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.email">
          {(field) => (
            <field.TextField
              autoComplete="off"
              label={t('intake.individualInfo.email')}
              type="email"
            />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.city">
          {(field) => (
            <field.TextField autoComplete="off" label={t('intake.individualInfo.city')} />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.homePhone">
          {(field) => (
            <field.TextField
              autoComplete="off"
              inputMode="tel"
              label={t('intake.individualInfo.homePhone')}
            />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.cellPhone">
          {(field) => (
            <field.TextField
              autoComplete="off"
              inputMode="tel"
              label={t('intake.individualInfo.cellPhone')}
            />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.profession">
          {(field) => (
            <field.TextField autoComplete="off" label={t('intake.individualInfo.profession')} />
          )}
        </form.AppField>

        <form.AppField name="individualInfo.hobbies">
          {(field) => (
            <field.TextField autoComplete="off" label={t('intake.individualInfo.hobbies')} />
          )}
        </form.AppField>

        <div className="md:col-span-2">
          <form.AppField name="individualInfo.address">
            {(field) => (
              <field.TextareaField autoComplete="off" label={t('intake.individualInfo.address')} />
            )}
          </form.AppField>
        </div>

        <div className="md:col-span-2">
          <form.AppField name="individualInfo.gender">
            {(field) => (
              <field.RadioGroupField
                label={t('intake.individualInfo.gender')}
                options={genderOptions}
              />
            )}
          </form.AppField>
        </div>
      </div>
    )
  },
})
