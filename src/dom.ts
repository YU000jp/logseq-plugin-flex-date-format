/**
 * DOM selection and MutationObserver management for flexible-date-format plugin.
 *
 * This module keeps DOM-related logic separate from index.ts so it can be reused or
 * unit-tested more easily. It receives the `journalLink` handler and flag getters as
 * parameters to stay decoupled.
 */

import { ROOT_QUERY, buildTitleSelector, buildTitleSelectorLocalized, ID_MAIN_CONTENT_CONTAINER, ID_RIGHT_SIDEBAR } from './constants'

/**
 * Interface for journal link processing function.
 */
export interface JournalLinkProcessor {
  (journalLinkElement: HTMLElement, preferredDateFormat: string, logseqVerMd: boolean): Promise<void>
}

/**
 * Interface for timestamp processing function.
 */
export interface TimestampProcessor {
  (timeElement: HTMLElement, preferredDateFormat: string): Promise<void>
}

/**
 * Interface for flag getters.
 */
export interface FlagGetters {
  getDbGraphFlag(): boolean
  getLogseqVersionMd(): boolean
}

/**
 * DOM Manager class for handling DOM operations.
 */
export class DOMManager {
  private observer: MutationObserver | null = null
  private timestampObservers: MutationObserver[] = []
  private journalObservers: MutationObserver[] = []
  private processingTitleQuery = false

  /**
   * Query and process all journal links and timestamps.
   */
  public async querySelectorAllLinks(
    journalLinkFn: JournalLinkProcessor,
    timestampFn: TimestampProcessor,
    preferredDateFormat: string,
    flagGetters: FlagGetters,
  ): Promise<void> {
    if (this.processingTitleQuery) return
    this.processingTitleQuery = true

    const logseqDbGraph = flagGetters.getDbGraphFlag()
    const logseqVersionMd = flagGetters.getLogseqVersionMd()

    // Process journal links
    const rootElement = parent.document.body.querySelector(ROOT_QUERY) as HTMLElement | null
    if (rootElement) {
      const journalSelector = buildTitleSelector(logseqDbGraph, logseqVersionMd)
      const journalElements = rootElement.querySelectorAll(journalSelector)

      // Filter elements that contain 4-digit numbers in their text content
      // but exclude those containing "/Q", "/W", "yyyy/MM" format only (not yyyy/MM/dd), or "yyyy" format only
      const allJournalElements = Array.from(journalElements)
      const filteredJournalElements = allJournalElements.filter(el => {
        const text = el.textContent || ''
        const hasFourDigits = /\d{4}/.test(text)
        const hasQuarterOrWeek = /\/[QW]/.test(text)
        const hasYearMonthOnlyFormat = /\d{4}\/\d{1,2}(?![\/\d])/.test(text)
        const isYearOnlyFormat = /^\d{4}$/.test(text.trim())
        return hasFourDigits && !hasQuarterOrWeek && !hasYearMonthOnlyFormat && !isYearOnlyFormat
      })

      filteredJournalElements.forEach((el, index) => {
        const htmlEl = el as HTMLElement
        journalLinkFn(htmlEl, preferredDateFormat, logseqVersionMd)
      })
    }

    // Process timestamp elements
    if (rootElement) {
      const timestampSelector = 'div[blockid]>div.timestamp span.time-start + time'
      const timestampElements = rootElement.querySelectorAll(timestampSelector)
      timestampElements.forEach((el, index) => {
        const htmlEl = el as HTMLElement
        timestampFn(htmlEl, preferredDateFormat)
      })
      // Process table-based created/updated timestamps (e.g., plugin or app lists)
      const tableTimestampSelector = 'table.cp__all_pages_table>tbody>tr>td:is(.created-at,.updated-at)'
      const tableTimestampElements = rootElement.querySelectorAll(tableTimestampSelector)
      tableTimestampElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        timestampFn(htmlEl, preferredDateFormat)
      })
    }

    setTimeout(() => (this.processingTitleQuery = false), 30)
  }

  /**
   * Revert all processed links and timestamps.
   */
  public revertQuerySelectorAllLinks(flagGetters: FlagGetters): void {
    const logseqDbGraph = flagGetters.getDbGraphFlag()
    const logseqVersionMd = flagGetters.getLogseqVersionMd()

    // Revert journal links
    ; (parent.document.querySelectorAll(
      buildTitleSelectorLocalized(logseqDbGraph, logseqVersionMd)) as NodeListOf<HTMLElement>).forEach(async (titleElement) => {
        titleElement.removeAttribute('data-localize')
        if (titleElement.dataset.ref) titleElement.textContent = titleElement.dataset.ref
      })

    // Revert timestamp elements
    ; (parent.document.querySelectorAll('div[block-id] div.timestamp time[data-localize], div[block-id] div.timestamp a span.time-start + time[data-localize]') as NodeListOf<HTMLElement>).forEach((timeEl) => {
      timeEl.removeAttribute('data-localize')
      if (timeEl.dataset.ref) timeEl.textContent = timeEl.dataset.ref
    })

    // Revert table-based timestamps
    ; (parent.document.querySelectorAll('table.cp__all_pages_table>tbody>tr>td.created-at[data-localize], table.cp__all_pages_table>tbody>tr>td.updated-at[data-localize]') as NodeListOf<HTMLElement>).forEach((tdEl) => {
      tdEl.removeAttribute('data-localize')
      if (tdEl.dataset.ref) tdEl.textContent = tdEl.dataset.ref
    })
  }

  /**
   * Start DOM observers for dynamic content changes.
   */
  public startObservers(
    journalLinkFn: JournalLinkProcessor,
    timestampFn: TimestampProcessor,
    preferredDateFormatGetter: () => string,
    flagGetters: FlagGetters,
  ): void {
    // Stop existing observers
    this.stopObservers()

    // Overall observer for general changes
    this.observer = new MutationObserver(async (): Promise<void> => {
      this.observer?.disconnect()
      await this.querySelectorAllLinks(journalLinkFn, timestampFn, preferredDateFormatGetter(), flagGetters)
      setTimeout(() => this.startObservers(journalLinkFn, timestampFn, preferredDateFormatGetter, flagGetters), 800)
    })

    const mainContent = parent.document.getElementById(ID_MAIN_CONTENT_CONTAINER) as HTMLDivElement | null
    const rightSidebar = parent.document.getElementById(ID_RIGHT_SIDEBAR) as HTMLDivElement | null
    if (mainContent) this.observer.observe(mainContent, { attributes: true, subtree: true, attributeFilter: ['class'], childList: true })
    if (rightSidebar) this.observer.observe(rightSidebar, { attributes: true, subtree: true, attributeFilter: ['class'], childList: true })

    // Individual observers for timestamp elements
    const timestampSelector = 'div[blockid]>div.timestamp span.time-start + time'
    const timestampElements = parent.document.querySelectorAll(timestampSelector)
    timestampElements.forEach((el) => {
      const observer = new MutationObserver(async (mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'characterData' || (mutation.type === 'attributes' && mutation.attributeName === 'data-ref')) {
            await timestampFn(el as HTMLElement, preferredDateFormatGetter())
            break
          }
        }
      })
      observer.observe(el, { characterData: true, subtree: true, attributes: true, attributeFilter: ['data-ref'] })
      this.timestampObservers.push(observer)
    })

    // Individual observers for table-based timestamp cells
    const tableTimestampSelector = 'table.cp__all_pages_table>tbody>tr>td:is(.created-at,.updated-at)'
    const tableTimestampElements = parent.document.querySelectorAll(tableTimestampSelector)
    tableTimestampElements.forEach((el) => {
      const observer = new MutationObserver(async (mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'characterData' || (mutation.type === 'attributes' && mutation.attributeName === 'data-ref')) {
            await timestampFn(el as HTMLElement, preferredDateFormatGetter())
            break
          }
        }
      })
      observer.observe(el, { characterData: true, subtree: true, attributes: true, attributeFilter: ['data-ref'] })
      this.timestampObservers.push(observer)
    })

    // Individual observers for journal link elements
    const logseqDbGraph = flagGetters.getDbGraphFlag()
    const logseqVersionMd = flagGetters.getLogseqVersionMd()
    const journalSelector = buildTitleSelector(logseqDbGraph, logseqVersionMd)
    const journalElements = parent.document.querySelectorAll(journalSelector)
    journalElements.forEach((el) => {
      const observer = new MutationObserver(async (mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'characterData' || (mutation.type === 'attributes' && mutation.attributeName === 'data-ref')) {
            await journalLinkFn(el as HTMLElement, preferredDateFormatGetter(), logseqVersionMd)
            break
          }
        }
      })
      observer.observe(el, { characterData: true, subtree: true, attributes: true, attributeFilter: ['data-ref'] })
      this.journalObservers.push(observer)
    })
  }

  /**
   * Stop DOM observers.
   */
  public stopObservers(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    this.timestampObservers.forEach(observer => observer.disconnect())
    this.timestampObservers = []
    this.journalObservers.forEach(observer => observer.disconnect())
    this.journalObservers = []
  }
}

// Singleton instance for backward compatibility
const domManager = new DOMManager()

// Export functions for backward compatibility
export const querySelectorAllLinks = domManager.querySelectorAllLinks.bind(domManager)
export const revertQuerySelectorAllLinks = domManager.revertQuerySelectorAllLinks.bind(domManager)
export const startObservers = domManager.startObservers.bind(domManager)
export const stopObservers = domManager.stopObservers.bind(domManager)

// Export class for advanced usage
export { domManager }
