export type PluginSettings = {
  dateFormat: string
  selectLocale: string
  booleanShortOrLong: 'unset' | 'short' | 'long'
  booleanRelativeDateInText: boolean
  relativeDateDaysBefore: number
  relativeDateDaysAfter: number
  booleanAddIcon: boolean
  booleanYearPattern: string
  iconBeforeYear: string
  iconAfterYear: string
  alternativeDateFormat1: string
  alternativeDateFormat2: string
  alternativeDateFormat3: string
  weekNumberFormat?: string
  firstLoad?: string
  loadDateFormatDemo?: boolean
}

/**
 * Returns a typed, safe snapshot of the plugin settings.
 * This keeps other modules from directly referencing `logseq.settings` everywhere.
 */
import { DEFAULT_ICON_BEFORE, DEFAULT_ICON_AFTER, DEFAULT_DATE_FORMAT } from './constants'

let cachedSettings: PluginSettings | null = null
let lastSettingsCheck = 0
const CACHE_DURATION = 1000 // 1 second

export const getSettingsSnapshot = (s: Partial<PluginSettings>): PluginSettings => {
  const now = Date.now()
  if (cachedSettings && (now - lastSettingsCheck) < CACHE_DURATION) {
    return cachedSettings
  }

  cachedSettings = {
    dateFormat: s?.dateFormat ?? DEFAULT_DATE_FORMAT,
    selectLocale: s?.selectLocale ?? 'default',
    booleanShortOrLong: (s?.booleanShortOrLong as PluginSettings['booleanShortOrLong']) ?? 'unset',
    booleanRelativeDateInText: s?.booleanRelativeDateInText ?? false,
    relativeDateDaysBefore: (s?.relativeDateDaysBefore as number) ?? 7,
    relativeDateDaysAfter: (s?.relativeDateDaysAfter as number) ?? 7,
    booleanAddIcon: s?.booleanAddIcon ?? true,
    booleanYearPattern: s?.booleanYearPattern ?? 'same year',
    iconBeforeYear: s?.iconBeforeYear ?? DEFAULT_ICON_BEFORE,
    iconAfterYear: s?.iconAfterYear ?? DEFAULT_ICON_AFTER,
    alternativeDateFormat1: s?.alternativeDateFormat1 ?? 'Unset',
    alternativeDateFormat2: s?.alternativeDateFormat2 ?? 'Unset',
    alternativeDateFormat3: s?.alternativeDateFormat3 ?? 'Unset',
    weekNumberFormat: s?.weekNumberFormat,
    firstLoad: s?.firstLoad,
    loadDateFormatDemo: s?.loadDateFormatDemo,
  }

  lastSettingsCheck = now
  return cachedSettings
}

export const resolveShortOrLong = (prefs: PluginSettings, requested: 'short' | 'long') =>
  prefs.booleanShortOrLong === 'unset' ? requested : prefs.booleanShortOrLong as 'short' | 'long'
