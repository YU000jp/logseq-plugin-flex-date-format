/**
 * DOM selection and MutationObserver management for flexible-date-format plugin.
 *
 * This module keeps DOM-related logic separate from index.ts so it can be reused or
 * unit-tested more easily. It receives the `journalLink` handler and flag getters as
 * parameters to stay decoupled.
 */

import { ROOT_QUERY, buildTitleSelector, buildTitleSelectorLocalized, ID_MAIN_CONTENT_CONTAINER, ID_RIGHT_SIDEBAR } from './constants'

let processingTitleQuery = false
let observer: MutationObserver | null = null

export const querySelectorAllLinks = async (
  journalLinkFn: (el: HTMLElement, preferredDateFormat: string, logseqVerMd: boolean) => Promise<void>,
  preferredDateFormat: string,
  getDbGraphFlag: () => boolean,
  getLogseqVersionMd: () => boolean,
): Promise<void> => {
  if (processingTitleQuery) return
  processingTitleQuery = true

  const logseqDbGraph = getDbGraphFlag()
  const logseqVersionMd = getLogseqVersionMd()

  ;(parent.document.body.querySelector(ROOT_QUERY) as HTMLElement | null)?.querySelectorAll(
    buildTitleSelector(logseqDbGraph, logseqVersionMd),
  ).forEach(async (titleElement) => await journalLinkFn(titleElement as HTMLElement, preferredDateFormat, logseqVersionMd))

  setTimeout(() => (processingTitleQuery = false), 30)
}

export const revertQuerySelectorAllLinks = (
  getDbGraphFlag: () => boolean,
  getLogseqVersionMd: () => boolean,
): void => {
  const logseqDbGraph = getDbGraphFlag()
  const logseqVersionMd = getLogseqVersionMd()

  ;(parent.document.querySelectorAll(
    buildTitleSelectorLocalized(logseqDbGraph, logseqVersionMd)) as NodeListOf<HTMLElement>).forEach(async (titleElement) => {
    titleElement.removeAttribute('data-localize')
    if (titleElement.dataset.ref) titleElement.textContent = titleElement.dataset.ref
  })
}

export const startObservers = (
  journalLinkFn: (el: HTMLElement, preferredDateFormat: string, logseqVerMd: boolean) => Promise<void>,
  preferredDateFormatGetter: () => string,
  getDbGraphFlag: () => boolean,
  getLogseqVersionMd: () => boolean,
): void => {
  if (observer) observer.disconnect()

  observer = new MutationObserver(async (): Promise<void> => {
    observer?.disconnect()
    await querySelectorAllLinks(journalLinkFn, preferredDateFormatGetter(), getDbGraphFlag, getLogseqVersionMd)
    setTimeout(() => startObservers(journalLinkFn, preferredDateFormatGetter, getDbGraphFlag, getLogseqVersionMd), 800)
  })

  const mainContent = parent.document.getElementById(ID_MAIN_CONTENT_CONTAINER) as HTMLDivElement | null
  const rightSidebar = parent.document.getElementById(ID_RIGHT_SIDEBAR) as HTMLDivElement | null
  if (mainContent) observer.observe(mainContent, { attributes: true, subtree: true, attributeFilter: ['class'] })
  if (rightSidebar) observer.observe(rightSidebar, { attributes: true, subtree: true, attributeFilter: ['class'] })
}

export const stopObservers = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}
