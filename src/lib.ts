import { getISOWeekYear, getISOWeek, getWeekYear, getWeek } from "date-fns"
import { WEEK_FORMAT_ISO } from './constants'

/**
 * Date utility functions for journal and calendar operations.
 */
export class DateUtils {
  /**
   * Convert journal day string to Date object.
   */
  static getJournalDayDate(str: string): Date {
    return new Date(
      Number(str.slice(0, 4)), // year
      Number(str.slice(4, 6)) - 1, // month 0-11
      Number(str.slice(6)) // day
    )
  }

  /**
   * Convert Date object to journal day number.
   */
  static getJournalDayFromDate(date: Date): number {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return Number(`${year}${month}${day}`)
  }

  /**
   * Calculate a week number and year for a date.
   */
  static getWeeklyNumberFromDate(
    journalDate: Date,
    weekStartsOn: 0 | 1,
    weekNumberFormat?: string
  ): { year: number, weekString: string } {
    let year: number
    let week: number
    if (weekNumberFormat === WEEK_FORMAT_ISO) {
      year = getISOWeekYear(journalDate)
      week = getISOWeek(journalDate)
    } else {
      year = getWeekYear(journalDate, { weekStartsOn })
      week = getWeek(journalDate, { weekStartsOn })
    }
    const weekString: string = (week < 10) ? String("0" + week) : String(week)
    return { year, weekString }
  }

  /**
   * Get localized day of week name.
   */
  static localizeDayOfWeek(weekday: "short" | "long", journalDate: Date, locales: string): string {
    return new Intl.DateTimeFormat(locales, { weekday }).format(journalDate)
  }

  /**
   * Format relative date string.
   */
  static formatRelativeDate(targetDate: Date, locales: string, capitalize: boolean = false): string {
    const currentDate = new Date()
    let relativeDate = new Intl.RelativeTimeFormat(locales, { numeric: 'auto' }).format(
      (Math.floor(((new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())).getTime() -
        (new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())).getTime()) / (1000 * 60 * 60 * 24)) as number),
      'day'
    ) as string

    // Capitalize first letter if requested
    if (capitalize && relativeDate.length > 0) {
      relativeDate = relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)
    }

    return relativeDate
  }

  /**
   * Check if a date is within the relative date range.
   */
  static isWithinRelativeDateRange(targetDate: Date, daysBefore: number, daysAfter: number): boolean {
    const currentDate = new Date()
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())

    const daysDiff = Math.floor((targetDateOnly.getTime() - currentDateOnly.getTime()) / (1000 * 60 * 60 * 24))

    return daysDiff >= -daysBefore && daysDiff <= daysAfter
  }
}

// Backward compatibility exports
export const getJournalDayDate = DateUtils.getJournalDayDate
export const getJournalDayFromDate = DateUtils.getJournalDayFromDate
export const getWeeklyNumberFromDate = DateUtils.getWeeklyNumberFromDate
export const localizeDayOfWeek = DateUtils.localizeDayOfWeek
export const formatRelativeDate = DateUtils.formatRelativeDate
export const isWithinRelativeDateRange = DateUtils.isWithinRelativeDateRange
