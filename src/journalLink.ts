import { PageEntity } from "@logseq/libs/dist/LSPlugin"
import { format, parse } from "date-fns"
import { DateUtils } from "./lib"
import { doesPageExistAsJournal } from "./query/advancedQuery"
import { getSettingsSnapshot } from './settingsManager'
import { DateFormatUtils } from './utils'
import { ICON_CALENDAR, CLASS_RELATIVE_DATE } from './constants'

/**
 * Service class for processing journal links and timestamps.
 */
export class JournalLinkProcessor {
  /**
   * Process a journal link element.
   */
  static async processJournalLink(
    journalLinkElement: HTMLElement,
    preferredDateFormat: string,
    logseqVerMd: boolean
  ): Promise<void> {
    try {
      if (!journalLinkElement.textContent || journalLinkElement.dataset.localize === 'true') return

      const journalDay = await doesPageExistAsJournal(journalLinkElement.textContent, logseqVerMd) as PageEntity["journalDay"] | null
      let parsedJournalDay: PageEntity["journalDay"] | null = journalDay

      if (journalDay === null) {
        // Try to parse the text as a date using alternative formats
        const settings = getSettingsSnapshot()
        const alternativeFormats = [
          settings.alternativeDateFormat1,
          settings.alternativeDateFormat2,
          settings.alternativeDateFormat3
        ].filter(fmt => fmt !== 'Unset') as string[]

        for (const fmt of alternativeFormats) {
          try {
            const parsedDate = parse(journalLinkElement.textContent!, fmt, new Date())
            if (!Number.isNaN(parsedDate.getTime())) {
              parsedJournalDay = DateUtils.getJournalDayFromDate(parsedDate)
              break
            }
          } catch {
            // Ignore parsing errors
          }
        }

        if (parsedJournalDay === null) return
      }

      const settings = getSettingsSnapshot()
      if (parsedJournalDay) JournalLinkProcessor.replaceDateFormat(parsedJournalDay, journalLinkElement, preferredDateFormat, settings)
    } catch (error) {
      // Silently handle errors to avoid disrupting the user experience
    }
  }

  /**
   * Replace the date format in a journal link element.
   */
  private static replaceDateFormat(
    journalDay: PageEntity["journalDay"],
    journalLinkElement: HTMLElement,
    preferredDateFormat: string,
    settings: ReturnType<typeof getSettingsSnapshot>
  ): void {
    try {
      const journalDate: Date = DateUtils.getJournalDayDate(String(journalDay))
      if (Number.isNaN(journalDate.getTime())) {
        return
      }

      journalLinkElement.dataset.ref = journalLinkElement.textContent as string | undefined

      // Check if we should display relative date as main text
      const isJournalPageTitle = journalLinkElement.tagName === 'H1' || (journalLinkElement.tagName === 'SPAN' && journalLinkElement.closest('.ls-page-title'))
      const shouldShowRelativeInText = settings.booleanRelativeDateInText === true && !isJournalPageTitle
      const daysBefore = settings.relativeDateDaysBefore || 7
      const daysAfter = settings.relativeDateDaysAfter || 7
      const isInRelativeRange = DateUtils.isWithinRelativeDateRange(journalDate, daysBefore, daysAfter)

      let formattedDate = ""

      // Generate the formatted date based on settings
      formattedDate = DateFormatUtils.formatDateBySettings(journalDate, settings, preferredDateFormat)

      // Decide what to display as main text
      if (shouldShowRelativeInText && isInRelativeRange) {
        // Display relative date as main text, formatted date in tooltip
        const relativeText = DateFormatUtils.formatRelative(journalDate, settings.selectLocale as string, true)
        journalLinkElement.textContent = `${ICON_CALENDAR} ${relativeText}`
        journalLinkElement.title = formattedDate
        // Add custom class for styling relative dates with border (Dynalist-like design)
        journalLinkElement.classList.add(CLASS_RELATIVE_DATE)
      } else {
        // Display formatted date as main text
        journalLinkElement.textContent = formattedDate
        // Save original date format to tooltip
        journalLinkElement.title = format(journalDate, preferredDateFormat)
        // Remove custom class if it was previously added
        journalLinkElement.classList.remove(CLASS_RELATIVE_DATE)
      }

      // Add relative time to tooltip
      if (settings.booleanRelativeTime === true) {
        if (shouldShowRelativeInText && isInRelativeRange) {
          // If showing relative in text, add the user date format to tooltip instead
          journalLinkElement.title += "\n" + format(journalDate, preferredDateFormat)
        } else {
          // If showing formatted date, add relative time to tooltip
          journalLinkElement.title += "\n" + DateFormatUtils.formatRelative(journalDate, settings.selectLocale as string)
        }
      }

      if (settings.booleanAddIcon === true) DateFormatUtils.addIcon(journalDate, journalLinkElement, settings)

      journalLinkElement.dataset.localize = "true"
    } catch (error) {
      // Silently handle errors to avoid disrupting the user experience
    }
  }
}

/**
 * Process a timestamp DOM element that contains a leading date.
 */
export class TimestampProcessor {
  /**
   * Process a timestamp element.
   */
  static async processTimestampElement(timeElement: HTMLElement, preferredDateFormat: string): Promise<void> {
    try {
      if (!timeElement.textContent || timeElement.dataset.localize === 'true') return

      const text = timeElement.textContent.trim()
      // Capture a leading date in YYYY-MM-DD or YYYY/MM/DD form
      const m = text.match(/^(\d{4}[-/]\d{2}[-/]\d{2})(.*)$/)
      if (!m) return

      const datePart = m[1]
      let trailing = m[2] || ''

      // Remove weekday names from trailing text (e.g., " Fri " -> " ")
      trailing = trailing.replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b\s*/g, '')

      const parsed = new Date(datePart)
      if (Number.isNaN(parsed.getTime())) return

      const settings = getSettingsSnapshot()
      const formatted = DateFormatUtils.formatDateBySettings(parsed, settings, preferredDateFormat)

      // Save original text so revert can restore it
      timeElement.dataset.ref = timeElement.textContent as string | undefined
      timeElement.textContent = `${formatted}${trailing}`
      timeElement.dataset.localize = 'true'
    } catch (error) {
      console.error('Error processing timestamp element:', error, { timeElement, preferredDateFormat })
    }
  }
}

// Backward compatibility exports
export const journalLink = JournalLinkProcessor.processJournalLink
export const processTimestampElement = TimestampProcessor.processTimestampElement
