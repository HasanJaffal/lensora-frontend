import { withForm } from '@/components/custom/form'
import { useTranslation } from '@/lib/i18n'

import { EyewearHistoryFields } from './eyewear-history-fields'
import { correctionPreferenceOptionValues } from '../intake-schema'
import { emptyIntakeFormValues } from '../map-intake'

export const RefractionHistorySection = withForm({
  defaultValues: emptyIntakeFormValues,
  render: function RefractionHistorySection({ form }) {
    const { t } = useTranslation()

    const preferenceOptions = correctionPreferenceOptionValues.map((value) => ({
      value,
      label: t(`intake.refractionHistory.overallPreferenceOptions.${value}`),
    }))

    return (
      <div className="grid gap-6">
        <div className="grid gap-4 xl:grid-cols-2">
          <EyewearHistoryFields eyewearKind="eyeglasses" form={form} />
          <EyewearHistoryFields eyewearKind="contactLenses" form={form} />
        </div>

        <form.AppField name="refractionHistory.overallPreference">
          {(field) => (
            <field.RadioGroupField
              label={t('intake.refractionHistory.overallPreference')}
              options={preferenceOptions}
            />
          )}
        </form.AppField>
      </div>
    )
  },
})
