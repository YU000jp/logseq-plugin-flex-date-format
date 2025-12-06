import { getISOWeekYear } from 'date-fns'
import { localizeDayOfWeek, formatRelativeDate } from './lib'
import { YEAR_PATTERN_SAME, YEAR_PATTERN_MAP, ICON_ELEMENT_CLASS } from './constants'
import type { PluginSettings } from './settingsManager'

export const replaceDayOfWeek = (text: string, journalDate: Date, locale: string, shortOrLong: 'short' | 'long') => {
  const longFormat = localizeDayOfWeek('long', journalDate, locale)
  const shortFormat = localizeDayOfWeek('short', journalDate, locale)

  return text.replace(/(?:Sunday|Sun|Monday|Mon|Tuesday|Tue|Wednesday|Wed|Thursday|Thu|Friday|Fri|Saturday|Sat)/g,
    match => match.length > 3 ? longFormat : shortFormat)
}

export const shortOrLongFromSettings = (settings: PluginSettings, select: 'short' | 'long') =>
  settings.booleanShortOrLong === 'unset' ? select : settings.booleanShortOrLong as 'short' | 'long'

export const checkYear = (journalDate: Date, settings: PluginSettings): boolean => {
  const currentDate = new Date()
  if (settings.booleanYearPattern === YEAR_PATTERN_SAME) return currentDate.getFullYear() === journalDate.getFullYear()

  const years = YEAR_PATTERN_MAP[settings.booleanYearPattern]
  return years ? journalDate > new Date(currentDate.getFullYear() - years, currentDate.getMonth(), currentDate.getDate()) : false
}

export const addIcon = (journalDate: Date, journalLinkElement: HTMLElement, settings: PluginSettings) => {
  const element = document.createElement('span')
  element.className = ICON_ELEMENT_CLASS
  const setIcon = checkYear(journalDate, settings) ? settings.iconAfterYear : settings.iconBeforeYear
  if (!setIcon) return
  element.innerHTML = setIcon
  journalLinkElement.prepend(element)
}

/**
 * A small helper that formats the relative text, optionally capitalizing.
 */
export const formatRelative = (date: Date, locales: string, capitalize = false) => formatRelativeDate(date, locales, capitalize)
