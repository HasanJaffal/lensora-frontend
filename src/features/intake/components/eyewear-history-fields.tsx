import { withForm } from '@/components/custom/form'
import { useTranslation } from '@/lib/i18n'

import { emptyIntakeFormValues } from '../map-intake'

export const EyewearHistoryFields = withForm({
  defaultValues: emptyIntakeFormValues,
  props: { eyewearKind: 'eyeglasses' as 'eyeglasses' | 'contactLenses' },
  render: function EyewearHistoryFields({ form, eyewearKind }) {
    const { t } = useTranslation()

    return (
      <section className="grid gap-4 rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold text-foreground">
          {t(`intake.refractionHistory.${eyewearKind}`)}
        </h3>

        <form.AppField name={`refractionHistory.${eyewearKind}.wears`}>
          {(field) => <field.CheckboxField label={t('intake.refractionHistory.wears')} />}
        </form.AppField>

        <div className="grid gap-4 md:grid-cols-2">
          <form.AppField name={`refractionHistory.${eyewearKind}.lastPrescriptionDate`}>
            {(field) => (
              <field.TextField
                label={t('intake.refractionHistory.lastPrescriptionDate')}
                type="date"
              />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.lastAcuity`}>
            {(field) => (
              <field.TextField
                autoComplete="off"
                label={t('intake.refractionHistory.lastAcuity')}
              />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.correctionValue`}>
            {(field) => (
              <field.TextField
                autoComplete="off"
                label={t('intake.refractionHistory.correctionValue')}
              />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.centering`}>
            {(field) => (
              <field.TextField autoComplete="off" label={t('intake.refractionHistory.centering')} />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.lensType`}>
            {(field) => (
              <field.TextField autoComplete="off" label={t('intake.refractionHistory.lensType')} />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.brand`}>
            {(field) => (
              <field.TextField autoComplete="off" label={t('intake.refractionHistory.brand')} />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.wearFrequency`}>
            {(field) => (
              <field.TextField
                autoComplete="off"
                label={t('intake.refractionHistory.wearFrequency')}
              />
            )}
          </form.AppField>

          <form.AppField name={`refractionHistory.${eyewearKind}.activity`}>
            {(field) => (
              <field.TextField autoComplete="off" label={t('intake.refractionHistory.activity')} />
            )}
          </form.AppField>
        </div>

        <form.AppField name={`refractionHistory.${eyewearKind}.wearHistory`}>
          {(field) => <field.TextareaField label={t('intake.refractionHistory.wearHistory')} />}
        </form.AppField>

        <form.AppField name={`refractionHistory.${eyewearKind}.satisfaction`}>
          {(field) => <field.TextareaField label={t('intake.refractionHistory.satisfaction')} />}
        </form.AppField>
      </section>
    )
  },
})
