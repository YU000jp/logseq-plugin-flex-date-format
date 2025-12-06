import { getISOWeekYear } from 'date-fns'
import { localizeDayOfWeek, formatRelativeDate } from './lib'
import { YEAR_PATTERN_SAME, YEAR_PATTERN_MAP, ICON_ELEMENT_CLASS } from './constants'
import type { PluginSettings } from './settingsManager'
import { format } from 'date-fns'

/**
 * Utility functions for date formatting and DOM manipulation.
 */
export class DateFormatUtils {
  /**
   * Replace English day names with localized versions.
   */
  static replaceDayOfWeek(text: string, journalDate: Date, locale: string, shortOrLong: 'short' | 'long'): string {
    const longFormat = localizeDayOfWeek('long', journalDate, locale)
    const shortFormat = localizeDayOfWeek('short', journalDate, locale)

    return text.replace(/(?:Sunday|Sun|Monday|Mon|Tuesday|Tue|Wednesday|Wed|Thursday|Thu|Friday|Fri|Saturday|Sat)/g,
      match => match.length > 3 ? longFormat : shortFormat)
  }

  /**
   * Get short or long format based on settings.
   */
  static shortOrLongFromSettings(settings: PluginSettings, select: 'short' | 'long'): 'short' | 'long' {
    return settings.booleanShortOrLong === 'unset' ? select : settings.booleanShortOrLong as 'short' | 'long'
  }

  /**
   * Check if the year should be displayed based on settings.
   */
  static checkYear(journalDate: Date, settings: PluginSettings): boolean {
    const currentDate = new Date()
    if (settings.booleanYearPattern === YEAR_PATTERN_SAME) return currentDate.getFullYear() === journalDate.getFullYear()

    const years = YEAR_PATTERN_MAP[settings.booleanYearPattern]
    return years ? journalDate > new Date(currentDate.getFullYear() - years, currentDate.getMonth(), currentDate.getDate()) : false
  }

  /**
   * Add an icon to a journal link element.
   */
  static addIcon(journalDate: Date, journalLinkElement: HTMLElement, settings: PluginSettings): void {
    const element = document.createElement('span')
    element.className = ICON_ELEMENT_CLASS
    const setIcon = DateFormatUtils.checkYear(journalDate, settings) ? settings.iconAfterYear : settings.iconBeforeYear
    if (!setIcon) return
    element.innerHTML = setIcon
    journalLinkElement.prepend(element)
  }

  /**
   * Format relative date text.
   */
  static formatRelative(date: Date, locales: string, capitalize = false): string {
    return formatRelativeDate(date, locales, capitalize)
  }

  /**
   * Format a date according to plugin settings or the user's preferred format.
   */
  static formatDateBySettings(
    journalDate: Date,
    settings: PluginSettings,
    preferredDateFormat: string,
  ): string {
    let formattedDate = ''

    switch (settings.dateFormat as string) {
      case 'Unset':
        formattedDate = format(journalDate, preferredDateFormat)
        break
      case 'Localize':
        formattedDate = journalDate.toLocaleDateString(settings.selectLocale as string, {
          weekday: DateFormatUtils.shortOrLongFromSettings(settings, 'short'),
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
        break
      default:
        formattedDate = format(journalDate, settings.dateFormat as string)
        if ((settings.dateFormat as string).includes('E'))
          formattedDate = DateFormatUtils.replaceDayOfWeek(formattedDate, journalDate, settings.selectLocale as string, DateFormatUtils.shortOrLongFromSettings(settings, 'long'))
        else
          formattedDate += ` (${localizeDayOfWeek(DateFormatUtils.shortOrLongFromSettings(settings, 'short'), journalDate, settings.selectLocale as string)})`

        if (settings.selectLocale === 'de-DE')
          formattedDate = formattedDate.replace('tagtag', 'tag').replace('Motag', 'Montag')
    }

    return formattedDate
  }
}

// Backward compatibility exports
export const replaceDayOfWeek = DateFormatUtils.replaceDayOfWeek
export const shortOrLongFromSettings = DateFormatUtils.shortOrLongFromSettings
export const checkYear = DateFormatUtils.checkYear
export const addIcon = DateFormatUtils.addIcon
export const formatRelative = DateFormatUtils.formatRelative
export const formatDateBySettings = DateFormatUtils.formatDateBySettings
