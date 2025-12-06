export type PluginSettings = {
  dateFormat: string
  selectLocale: string
  booleanShortOrLong: 'unset' | 'short' | 'long'
  booleanLocalizeDayOfWeek: boolean
  booleanRelativeDateInText: boolean
  relativeDateDaysBefore: number
  relativeDateDaysAfter: number
  booleanRelativeTime: boolean
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

export const getSettingsSnapshot = (): PluginSettings => {
  const s = (logseq as any).settings as Partial<PluginSettings> | undefined

  return {
    dateFormat: s?.dateFormat ?? DEFAULT_DATE_FORMAT,
    selectLocale: s?.selectLocale ?? 'default',
    booleanShortOrLong: (s?.booleanShortOrLong as PluginSettings['booleanShortOrLong']) ?? 'unset',
    booleanLocalizeDayOfWeek: s?.booleanLocalizeDayOfWeek ?? true,
    booleanRelativeDateInText: s?.booleanRelativeDateInText ?? false,
    relativeDateDaysBefore: (s?.relativeDateDaysBefore as number) ?? 7,
    relativeDateDaysAfter: (s?.relativeDateDaysAfter as number) ?? 7,
    booleanRelativeTime: s?.booleanRelativeTime ?? true,
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
}

export const resolveShortOrLong = (prefs: PluginSettings, requested: 'short' | 'long') =>
  prefs.booleanShortOrLong === 'unset' ? requested : prefs.booleanShortOrLong as 'short' | 'long'
