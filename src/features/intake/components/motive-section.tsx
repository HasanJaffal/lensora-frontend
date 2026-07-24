import { withForm } from '@/components/custom/form'
import { useTranslation } from '@/lib/i18n'

import { emptyIntakeFormValues } from '../map-intake'
import { functionalSignOptionValues, visualProblemOptionValues } from '../intake-schema'

export const MotiveSection = withForm({
  defaultValues: emptyIntakeFormValues,
  render: function MotiveSection({ form }) {
    const { t } = useTranslation()

    const visualProblemOptions = visualProblemOptionValues.map((value) => ({
      value,
      label: t(`intake.motive.visualProblemOptions.${value}`),
    }))

    const functionalSignOptions = functionalSignOptionValues.map((value) => ({
      value,
      label: t(`intake.motive.functionalSignOptions.${value}`),
    }))

    return (
      <div className="grid gap-6">
        <form.AppField name="motive.reasonForVisit">
          {(field) => (
            <field.TextareaField
              label={t('intake.motive.reasonForVisit')}
              placeholder={t('intake.motive.reasonForVisitPlaceholder')}
              required
            />
          )}
        </form.AppField>

        <form.AppField name="motive.visualProblems">
          {(field) => (
            <field.ChecklistField
              label={t('intake.motive.visualProblems')}
              options={visualProblemOptions}
            />
          )}
        </form.AppField>

        <form.AppField name="motive.functionalSigns">
          {(field) => (
            <field.ChecklistField
              columns={3}
              label={t('intake.motive.functionalSigns')}
              options={functionalSignOptions}
            />
          )}
        </form.AppField>
      </div>
    )
  },
})
