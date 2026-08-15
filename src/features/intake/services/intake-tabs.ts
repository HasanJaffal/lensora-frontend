import { type TranslationKey } from '@/lib/i18n'

export type IntakeTab = 'individualInfo' | 'motive' | 'refractionHistory' | 'antecedents'

export const intakeTabs: IntakeTab[] = [
  'individualInfo',
  'motive',
  'refractionHistory',
  'antecedents',
]

// `themes` renders inside the motive tab, so its issues surface there.
const tabByFieldPrefix: Record<string, IntakeTab> = {
  individualInfo: 'individualInfo',
  motive: 'motive',
  themes: 'motive',
  refractionHistory: 'refractionHistory',
  antecedents: 'antecedents',
}

export function resolveTabForField(fieldPath: string): IntakeTab | null {
  const [prefix] = fieldPath.split('.')

  return prefix ? (tabByFieldPrefix[prefix] ?? null) : null
}

export function collectInvalidTabs(fieldPaths: string[]): Set<IntakeTab> {
  const invalidTabs = new Set<IntakeTab>()

  for (const fieldPath of fieldPaths) {
    const tab = resolveTabForField(fieldPath)

    if (tab) {
      invalidTabs.add(tab)
    }
  }

  return invalidTabs
}

export function intakeTabLabelKey(tab: IntakeTab): TranslationKey {
  return `intake.tabs.${tab}` as TranslationKey
}
