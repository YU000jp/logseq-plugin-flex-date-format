import '@logseq/libs' //https://plugins-doc.logseq.com/
import { AppInfo, AppUserConfigs, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { openStartWindow } from './demoDateFormat'
import { journalLink, processTimestampElement } from './journalLink'
import { querySelectorAllLinks as domQuerySelectorAllLinks, revertQuerySelectorAllLinks as domRevertQuerySelectorAllLinks, startObservers as domStartObservers, stopObservers as domStopObservers } from './dom'
import { getSettingsSnapshot } from './settingsManager'
import { CSS_KEY, CSS_STYLE, MESSAGE_ID, SELECTOR_BLOCK_TAGS } from './constants'
import { settingsTemplate } from './settings'
import af from "./translations/af.json"
import de from "./translations/de.json"
import es from "./translations/es.json"
import fr from "./translations/fr.json"
import id from "./translations/id.json"
import it from "./translations/it.json"
import ja from "./translations/ja.json"
import ko from "./translations/ko.json"
import nbNO from "./translations/nb-NO.json"
import nl from "./translations/nl.json"
import pl from "./translations/pl.json"
import ptBR from "./translations/pt-BR.json"
import ptPT from "./translations/pt-PT.json"
import ru from "./translations/ru.json"
import sk from "./translations/sk.json"
import tr from "./translations/tr.json"
import uk from "./translations/uk.json"
import zhCN from "./translations/zh-CN.json"
import zhHant from "./translations/zh-Hant.json"

/**
 * Main plugin class that encapsulates all state and logic for better reusability and testability.
 */
export class FlexibleDateFormatPlugin {
  private userDateFormat: string = ""
  private logseqVersion: string = ""
  private logseqVersionMd: boolean = false
  private logseqDbGraph: boolean = false

  /**
   * Get the current Logseq version MD flag.
   */
  public getLogseqVersionMd(): boolean {
    return this.logseqVersionMd
  }

  /**
   * Get the current DB graph flag.
   */
  public getDbGraph(): boolean {
    return this.logseqDbGraph
  }

  /**
   * Get the current user date format.
   */
  public getUserDateFormat(): string {
    return this.userDateFormat
  }

  /**
   * Initialize the plugin.
   */
  public async initialize(): Promise<void> {
    // Version and graph checks
    this.logseqVersionMd = await this.checkLogseqVersion()
    this.logseqDbGraph = await this.checkDbGraph()

    // Localization setup
    await l10nSetup({
      builtinTranslations: {
        ja, af, de, es, fr, id, it, ko, "nb-NO": nbNO, nl, pl, "pt-BR": ptBR, "pt-PT": ptPT, ru, sk, tr, uk, "zh-CN": zhCN, "zh-Hant": zhHant
      }
    })

    // Settings schema
    logseq.useSettingsSchema(settingsTemplate())

    // Inject CSS
    logseq.provideStyle({ key: CSS_KEY, style: CSS_STYLE })

    // First load check
    const settingsSnapshot = getSettingsSnapshot()
    if (settingsSnapshot.firstLoad !== MESSAGE_ID) {
      setTimeout(() => logseq.showSettingsUI(), 300)
      logseq.UI.showMsg("New setting items have been added to flexible-date-format plugin.", "info", { timeout: 5000 })
      logseq.updateSettings({ firstLoad: MESSAGE_ID })
    }

    // Wait for DOM
    await new Promise(resolve => setTimeout(resolve, 100))

    // Get user date format
    await this.checkUserDateFormat()

    // Initial processing
    setTimeout(() => this.processAllLinks(), 100)
    setTimeout(() => this.startObservers(), 2000)

    // Event listeners
    this.setupEventListeners()

    // Settings change handler
    this.setupSettingsChangeHandler()
  }

  /**
   * Check and get user preferred date format.
   */
  private async checkUserDateFormat(): Promise<void> {
    const { preferredDateFormat } = await logseq.App.getUserConfigs() as { preferredDateFormat: AppUserConfigs["preferredDateFormat"] }
    this.userDateFormat = preferredDateFormat
  }

  /**
   * Process all journal links and timestamps.
   */
  private processAllLinks(): void {
    domQuerySelectorAllLinks(
      journalLink,
      processTimestampElement,
      this.userDateFormat,
      { getDbGraphFlag: () => this.logseqDbGraph, getLogseqVersionMd: () => this.logseqVersionMd }
    )
  }

  /**
   * Start DOM observers.
   */
  private startObservers(): void {
    domStartObservers(
      journalLink,
      processTimestampElement,
      () => this.userDateFormat,
      { getDbGraphFlag: () => this.logseqDbGraph, getLogseqVersionMd: () => this.logseqVersionMd }
    )
  }

  /**
   * Setup event listeners.
   */
  private setupEventListeners(): void {
    logseq.App.onRouteChanged(() => setTimeout(() => this.processAllLinks(), 50))
    logseq.App.onPageHeadActionsSlotted(() => setTimeout(() => this.processAllLinks(), 50))
    logseq.App.onSidebarVisibleChanged(() => setTimeout(() => this.processAllLinks(), 50))
    logseq.beforeunload(async () => {
      domStopObservers()
      domRevertQuerySelectorAllLinks({ getDbGraphFlag: () => this.logseqDbGraph, getLogseqVersionMd: () => this.logseqVersionMd })
    })
    logseq.App.onCurrentGraphChanged(async () => {
      this.logseqDbGraph = await this.checkDbGraph()
    })
  }

  /**
   * Setup settings change handler.
   */
  private setupSettingsChangeHandler(): void {
    logseq.onSettingsChanged((newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]) => {
      if (oldSet.loadDateFormatDemo === false && newSet.loadDateFormatDemo === true) {
        openStartWindow()
        setTimeout(() => logseq.updateSettings({ loadDateFormatDemo: false }), 300)
      } else if (this.shouldReprocessLinks(newSet, oldSet)) {
        domRevertQuerySelectorAllLinks({ getDbGraphFlag: () => this.logseqDbGraph, getLogseqVersionMd: () => this.logseqVersionMd })
        setTimeout(() => this.processAllLinks(), 50)
      }
    })
  }

  /**
   * Check if links should be reprocessed based on settings change.
   */
  private shouldReprocessLinks(newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]): boolean {
    return (
      newSet.dateFormat !== oldSet.dateFormat ||
      newSet.selectLocale !== oldSet.selectLocale ||
      newSet.booleanShortOrLong !== oldSet.booleanShortOrLong ||
      oldSet.booleanLocalizeDayOfWeek !== newSet.booleanLocalizeDayOfWeek ||
      oldSet.booleanRelativeTime !== newSet.booleanRelativeTime ||
      oldSet.booleanRelativeDateInText !== newSet.booleanRelativeDateInText ||
      oldSet.relativeDateDaysBefore !== newSet.relativeDateDaysBefore ||
      oldSet.relativeDateDaysAfter !== newSet.relativeDateDaysAfter ||
      oldSet.booleanAddIcon !== newSet.booleanAddIcon ||
      oldSet.booleanYearPattern !== newSet.booleanYearPattern ||
      oldSet.iconBeforeYear !== newSet.iconBeforeYear ||
      oldSet.iconAfterYear !== newSet.iconAfterYear
    )
  }

  /**
   * Check Logseq version and determine if it's MD model.
   */
  private async checkLogseqVersion(): Promise<boolean> {
    const logseqInfo = (await logseq.App.getInfo("version")) as AppInfo | any
    const version = logseqInfo.match(/(\d+)\.(\d+)\.(\d+)/)
    if (version) {
      this.logseqVersion = version[0]
      if (this.logseqVersion.match(/0\.([0-9]|10)\.\d+/)) {
        this.logseqVersionMd = true
        return true
      } else {
        this.logseqVersionMd = false
      }
    } else {
      this.logseqVersion = "0.0.0"
    }
    return false
  }

  /**
   * Check if current graph is DB graph.
   */
  private async checkDbGraph(): Promise<boolean> {
    const element = parent.document.querySelector(SELECTOR_BLOCK_TAGS) as HTMLDivElement | null
    if (element) {
      this.logseqDbGraph = true
      return true
    } else {
      this.logseqDbGraph = false
      return false
    }
  }
}

// Export singleton instance
const plugin = new FlexibleDateFormatPlugin()

// Initialize plugin
logseq.ready(() => plugin.initialize().catch(console.error))

// Export for testing or external use
export default plugin