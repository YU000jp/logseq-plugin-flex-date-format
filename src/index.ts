import '@logseq/libs' //https://plugins-doc.logseq.com/
import { AppInfo, AppUserConfigs, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { openStartWindow } from './demoDateFormat'
import { journalLink, processTimestampElement } from './journalLink'
import { querySelectorAllLinks as domQuerySelectorAllLinks, revertQuerySelectorAllLinks as domRevertQuerySelectorAllLinks, startObservers as domStartObservers, stopObservers as domStopObservers } from './dom'
import { getSettingsSnapshot } from './settingsManager'
import { CSS_HISTORY_KEY, CSS_HISTORY_STYLE, CSS_KEY, CSS_STYLE, MESSAGE_ID } from './constants'
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
import { removeProvideStyle } from './lib'

/**
 * Main plugin class that encapsulates all state and logic for better reusability and testability.
 */
export class FlexibleDateFormatPlugin {
  private userDateFormat: string = ""
  private logseqVersion: string = ""
  private appDbEra: boolean = false // 新UI世代(DB系アプリ: 0.11.x以降 / 2.x)か
  private isDbGraph: boolean = false // 現在のグラフがDBグラフか

  /**
   * Get the file-graph flag (現在のグラフがファイルベースか)。
   */
  public getLogseqVersionMd(): boolean {
    return !this.isDbGraph
  }

  /**
   * Get the current DB graph flag.
   */
  public getDbGraph(): boolean {
    return this.isDbGraph
  }

  /**
   * Get the app generation flag (新UI世代か)。
   */
  public getAppDbEra(): boolean {
    return this.appDbEra
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
    await this.fetchAppInfo()
    await this.checkDbGraph()

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


    if (settingsSnapshot.booleanExcludeJournalLinksFromHistory === true)
      logseq.provideStyle({ key: CSS_HISTORY_KEY, style: CSS_HISTORY_STYLE })

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
      { getAppDbEra: () => this.appDbEra, getFileGraph: () => !this.isDbGraph }
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
      { getAppDbEra: () => this.appDbEra, getFileGraph: () => !this.isDbGraph }
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
      domRevertQuerySelectorAllLinks({ getAppDbEra: () => this.appDbEra, getFileGraph: () => !this.isDbGraph })
    })
    logseq.App.onCurrentGraphChanged(async () => {
      await this.checkDbGraph()
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
      } else
        if (this.shouldReprocessLinks(newSet, oldSet)) {
          domRevertQuerySelectorAllLinks({ getAppDbEra: () => this.appDbEra, getFileGraph: () => !this.isDbGraph })
          setTimeout(() => this.processAllLinks(), 50)
        }
      if (oldSet.booleanExcludeJournalLinksFromHistory !== newSet.booleanExcludeJournalLinksFromHistory) {
        if (newSet.booleanExcludeJournalLinksFromHistory === true) {
          logseq.provideStyle({ key: CSS_HISTORY_KEY, style: CSS_HISTORY_STYLE })
        } else {
          removeProvideStyle(CSS_HISTORY_KEY)
        }
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
   * Fetch app version and determine the app generation (バージョン解析のみ。
   * グラフ種別の判定には使わない)。
   */
  private async fetchAppInfo(): Promise<void> {
    const info = (await logseq.App.getInfo()) as AppInfo | null
    const version = typeof info?.version === "string" ? info.version : "0.0.0"
    const m = version.match(/(\d+)\.(\d+)\.(\d+)/)
    this.logseqVersion = m ? m[0] : version
    // 0.11.x以降 or 2.x = DB系アプリ(新UI)。OG 1.xは旧UI系統なので対象外
    this.appDbEra = m !== null && (Number(m[1]) >= 2 || (Number(m[1]) === 0 && Number(m[2]) >= 11))
  }

  /**
   * Check if current graph is DB graph (公式API。0.10.xホストでは未実装のため false)。
   */
  private async checkDbGraph(): Promise<boolean> {
    try {
      const value = await logseq.App.checkCurrentIsDbGraph()
      this.isDbGraph = typeof value === "boolean" ? value : false
    } catch {
      this.isDbGraph = false // API非搭載ホスト = DBグラフを開けない旧アプリ
    }
    return this.isDbGraph
  }
}

// Export singleton instance
const plugin = new FlexibleDateFormatPlugin()

// Initialize plugin
logseq.ready(() => plugin.initialize().catch(console.error))

// Export for testing or external use
export default plugin