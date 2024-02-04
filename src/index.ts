import '@logseq/libs' //https://plugins-doc.logseq.com/
import { AppUserConfigs, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { openStartWindow } from './demoDateFormat'
import { journalLink } from './journalLink'
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
let userDateFormat: string = ""

const checkUserDateFormat = async () => {
  const { preferredDateFormat } = await logseq.App.getUserConfigs() as { preferredDateFormat: AppUserConfigs["preferredDateFormat"] }
  userDateFormat = preferredDateFormat
}

/* main */
const main = async () => {
  await l10nSetup({
    builtinTranslations: {//Full translations
      ja, af, de, es, fr, id, it, ko, "nb-NO": nbNO, nl, pl, "pt-BR": ptBR, "pt-PT": ptPT, ru, sk, tr, uk, "zh-CN": zhCN, "zh-Hant": zhHant
    }
  })
  /* user settings */
  logseq.useSettingsSchema(settingsTemplate())

  const messageId = "20240204-01"
  if (logseq.settings!.firstLoad !== messageId) {
    setTimeout(() => logseq.showSettingsUI(), 300)
    logseq.UI.showMsg("New setting items have been added to flexible-date-format plugin.", "info", { timeout: 5000 })
    logseq.updateSettings({ firstLoad: messageId })
  }

  await checkUserDateFormat() //ユーザーの日付形式を取得

  //Logseqを開いたときに実行
  setTimeout(() => querySelectorAllLinks(), 100)
  setTimeout(() => observerMainRight(), 2000) //スクロール用

  //ほかのページを開いたときに実行
  logseq.App.onRouteChanged(() => setTimeout(() => querySelectorAllLinks(), 50))
  logseq.App.onPageHeadActionsSlotted(() => setTimeout(() => querySelectorAllLinks(), 50))
  //サイドバーを開いたときに実行
  logseq.App.onSidebarVisibleChanged(() => setTimeout(() => querySelectorAllLinks(), 50))
  //修了する前に実行
  logseq.beforeunload(async () => {
    observer.disconnect()//監視を終了
    revertQuerySelectorAllLinks()//元に戻す
  })

  onSettingsChanged() //設定が変更されたときに実行

}/* end_main */


const onSettingsChanged = () => logseq.onSettingsChanged((newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]) => {
  if (oldSet.loadDateFormatDemo === false
    && newSet.loadDateFormatDemo === true) {
    openStartWindow()
    setTimeout(() => logseq.updateSettings({ loadDateFormatDemo: false }), 300)
  } else
    if (newSet.dateFormat !== oldSet.dateFormat
      || newSet.selectLocale !== oldSet.selectLocale
      || newSet.booleanShortOrLong !== oldSet.booleanShortOrLong
      || oldSet.booleanLocalizeDayOfWeek !== newSet.booleanLocalizeDayOfWeek
      || oldSet.booleanRelativeTime !== newSet.booleanRelativeTime
      || oldSet.booleanAddIcon !== newSet.booleanAddIcon
      || oldSet.booleanYearPattern !== newSet.booleanYearPattern
      || oldSet.iconBeforeYear !== newSet.iconBeforeYear
      || oldSet.iconAfterYear !== newSet.iconAfterYear) {
      revertQuerySelectorAllLinks()
      setTimeout(() => querySelectorAllLinks(), 50)
    }
})

//querySelectorAll
let processingTitleQuery: boolean = false
const querySelectorAllLinks = async (): Promise<void> => {
  if (processingTitleQuery) return
  processingTitleQuery = true;

  (parent.document.body.querySelector("div#root>div>main") as HTMLElement | null)?.querySelectorAll("div#main-content-container div:is(.journal,.is-journals) h1.title:not([data-localize]), div:is(#main-content-container,#right-sidebar) a[data-ref]:not([data-localize]), div#left-sidebar li span.page-title:not([data-localize]), div#right-sidebar div.sidebar-item div.page-title>span+span.text-ellipsis:not([data-localize])")
    .forEach(async (titleElement) => await journalLink(titleElement as HTMLElement, userDateFormat))

  setTimeout(() => processingTitleQuery = false, 30)
}

//observer
const observer = new MutationObserver(async (): Promise<void> => {
  observer.disconnect()
  await querySelectorAllLinks()
  setTimeout(() => observerMainRight(), 800)
})

const observerMainRight = () => {
  observer.observe(parent.document.getElementById("main-content-container") as HTMLDivElement, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  })
  observer.observe(parent.document.getElementById("right-sidebar") as HTMLDivElement, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  })
}

//元に戻す
const revertQuerySelectorAllLinks = () => {
  (parent.document.querySelectorAll("div#main-content-container div:is(.journal,.is-journals) h1.title[data-localize], div:is(#main-content-container,#right-sidebar) a[data-ref][data-localize], div#left-sidebar li span.page-title[data-localize], div#right-sidebar div.sidebar-item div.page-title>span+span.text-ellipsis[data-localize]") as NodeListOf<HTMLElement>)
    .forEach(async (titleElement) => {
      titleElement.removeAttribute("data-localize")
      if (titleElement.dataset.ref) titleElement.textContent = titleElement.dataset.ref
    })
}

logseq.ready(main).catch(console.error)