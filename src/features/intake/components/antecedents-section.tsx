import { withForm } from '@/components/custom/form'
import { useTranslation } from '@/lib/i18n'

import { emptyIntakeFormValues } from '../map-intake'

export const AntecedentsSection = withForm({
  defaultValues: emptyIntakeFormValues,
  render: function AntecedentsSection({ form }) {
    const { t } = useTranslation()

    return (
      <div className="grid gap-6">
        <section className="grid gap-4 rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">
            {t('intake.antecedents.ocularHistory')}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <form.AppField name="antecedents.ocularHistory.pathology">
              {(field) => (
                <field.TextField autoComplete="off" label={t('intake.antecedents.pathology')} />
              )}
            </form.AppField>

            <form.AppField name="antecedents.ocularHistory.surgery">
              {(field) => (
                <field.TextField autoComplete="off" label={t('intake.antecedents.surgery')} />
              )}
            </form.AppField>

            <form.AppField name="antecedents.ocularHistory.trauma">
              {(field) => (
                <field.TextField autoComplete="off" label={t('intake.antecedents.trauma')} />
              )}
            </form.AppField>

            <form.AppField name="antecedents.ocularHistory.orthopticTreatment">
              {(field) => (
                <field.TextField
                  autoComplete="off"
                  label={t('intake.antecedents.orthopticTreatment')}
                />
              )}
            </form.AppField>
          </div>
        </section>

        <section className="grid gap-4 rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">
            {t('intake.antecedents.generalHealth')}
          </h3>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <form.AppField name="antecedents.generalHealth.diabetes">
              {(field) => <field.CheckboxField label={t('intake.antecedents.diabetes')} />}
            </form.AppField>

            <form.AppField name="antecedents.generalHealth.hypertension">
              {(field) => <field.CheckboxField label={t('intake.antecedents.hypertension')} />}
            </form.AppField>
          </div>

          <form.AppField name="antecedents.generalHealth.other">
            {(field) => <field.TextareaField label={t('intake.antecedents.generalHealthOther')} />}
          </form.AppField>
        </section>

        <form.AppField name="antecedents.medication">
          {(field) => <field.TextareaField label={t('intake.antecedents.medication')} />}
        </form.AppField>

        <section className="grid gap-4 rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">
            {t('intake.antecedents.familyHistory')}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <form.AppField name="antecedents.familyHistory.refractive">
              {(field) => (
                <field.TextField autoComplete="off" label={t('intake.antecedents.refractive')} />
              )}
            </form.AppField>

            <form.AppField name="antecedents.familyHistory.pathological">
              {(field) => (
                <field.TextField autoComplete="off" label={t('intake.antecedents.pathological')} />
              )}
            </form.AppField>

            <form.AppField name="antecedents.familyHistory.relationship">
              {(field) => (
                <field.TextField autoComplete="off" label={t('intake.antecedents.relationship')} />
              )}
            </form.AppField>
          </div>
        </section>
      </div>
    )
  },
})
