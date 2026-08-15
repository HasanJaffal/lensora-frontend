import { type ReactNode } from 'react'
import {
  Baby,
  Car,
  Clock,
  Droplet,
  Glasses,
  Lightbulb,
  Monitor,
  Package,
  Shield,
  Sun,
} from 'lucide-react'

import { type StatusPillTone } from '@/components/custom/status-pill'
import { type TranslationKey } from '@/lib/i18n'

import { type TipCategory, type TipCategoryFilter } from '../types'

export const tipCategories: TipCategory[] = ['screen', 'lensCare', 'adapting', 'children', 'sunUv']

export const tipCategoryFilters: TipCategoryFilter[] = ['all', ...tipCategories]

const ICON_CLASS_NAME = 'size-4'

const fallbackTipIcon: ReactNode = <Lightbulb className={ICON_CLASS_NAME} aria-hidden="true" />

const fallbackTipTone: StatusPillTone = 'secondary'

const iconByName: Record<string, ReactNode> = {
  baby: <Baby className={ICON_CLASS_NAME} aria-hidden="true" />,
  car: <Car className={ICON_CLASS_NAME} aria-hidden="true" />,
  clock: <Clock className={ICON_CLASS_NAME} aria-hidden="true" />,
  droplet: <Droplet className={ICON_CLASS_NAME} aria-hidden="true" />,
  glasses: <Glasses className={ICON_CLASS_NAME} aria-hidden="true" />,
  monitor: <Monitor className={ICON_CLASS_NAME} aria-hidden="true" />,
  package: <Package className={ICON_CLASS_NAME} aria-hidden="true" />,
  shield: <Shield className={ICON_CLASS_NAME} aria-hidden="true" />,
  sun: <Sun className={ICON_CLASS_NAME} aria-hidden="true" />,
}

const toneByCategory: Record<TipCategory, StatusPillTone> = {
  screen: 'primary',
  lensCare: 'secondary',
  adapting: 'accent',
  children: 'primary',
  sunUv: 'accent',
}

const labelKeyByCategory: Record<TipCategory, TranslationKey> = {
  screen: 'tips.categories.screen',
  lensCare: 'tips.categories.lensCare',
  adapting: 'tips.categories.adapting',
  children: 'tips.categories.children',
  sunUv: 'tips.categories.sunUv',
}

function findByCategory<TValue>(
  valueByCategory: Record<TipCategory, TValue>,
  category: string,
): TValue | null {
  const knownCategory = tipCategories.find((candidate) => candidate === category)
  return knownCategory ? valueByCategory[knownCategory] : null
}

export function toTipCategoryFilter(value: unknown): TipCategoryFilter {
  return tipCategoryFilters.find((category) => category === value) ?? 'all'
}

export function resolveTipIcon(iconName: string): ReactNode {
  return iconByName[iconName] ?? fallbackTipIcon
}

export function resolveTipTone(category: string): StatusPillTone {
  return findByCategory(toneByCategory, category) ?? fallbackTipTone
}

export function resolveTipLabelKey(category: string): TranslationKey | null {
  return findByCategory(labelKeyByCategory, category)
}

/** An unrecognised category still gets a pill, showing the raw value rather than disappearing. */
export function resolveTipCategoryLabel(
  category: string,
  t: (key: TranslationKey) => string,
): string {
  const labelKey = resolveTipLabelKey(category)

  return labelKey ? t(labelKey) : category
}
