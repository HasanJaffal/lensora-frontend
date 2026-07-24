import { withForm } from '@/components/custom/form'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from '@/lib/i18n'

import { emptyIntakeFormValues } from '../map-intake'
import { onsetOptionValues } from '../intake-schema'

export const ThemesSection = withForm({
  defaultValues: emptyIntakeFormValues,
  render: function ThemesSection({ form }) {
    const { t } = useTranslation()

    const onsetOptions = onsetOptionValues.map((value) => ({
      value,
      label: t(`intake.themes.onsetOptions.${value}`),
    }))

    return (
      <div className="grid gap-4">
        <Separator />
        <h3 className="text-sm font-semibold text-foreground">{t('intake.themes.title')}</h3>

        <form.AppField name="themes.onset">
          {(field) => (
            <field.RadioGroupField label={t('intake.themes.onset')} options={onsetOptions} />
          )}
        </form.AppField>

        <div className="grid gap-4 md:grid-cols-2">
          <form.AppField name="themes.timing">
            {(field) => <field.TextField label={t('intake.themes.timing')} autoComplete="off" />}
          </form.AppField>

          <form.AppField name="themes.timeOfDay">
            {(field) => <field.TextField label={t('intake.themes.timeOfDay')} autoComplete="off" />}
          </form.AppField>

          <form.AppField name="themes.context">
            {(field) => <field.TextField label={t('intake.themes.context')} autoComplete="off" />}
          </form.AppField>

          <form.AppField name="themes.correctionState">
            {(field) => (
              <field.TextField label={t('intake.themes.correctionState')} autoComplete="off" />
            )}
          </form.AppField>

          <form.AppField name="themes.firstOccurrence">
            {(field) => (
              <field.TextField label={t('intake.themes.firstOccurrence')} autoComplete="off" />
            )}
          </form.AppField>

          <form.AppField name="themes.trend">
            {(field) => <field.TextField label={t('intake.themes.trend')} autoComplete="off" />}
          </form.AppField>

          <form.AppField name="themes.permanence">
            {(field) => (
              <field.TextField label={t('intake.themes.permanence')} autoComplete="off" />
            )}
          </form.AppField>
        </div>

        <form.AppField name="themes.associatedComplaints">
          {(field) => <field.TextareaField label={t('intake.themes.associatedComplaints')} />}
        </form.AppField>

        <form.AppField name="themes.reliefMeasures">
          {(field) => <field.TextareaField label={t('intake.themes.reliefMeasures')} />}
        </form.AppField>
      </div>
    )
  },
})
