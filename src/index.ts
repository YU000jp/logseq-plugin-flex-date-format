import '@logseq/libs' //https://plugins-doc.logseq.com/
import { settingsTemplate } from './settings'
import { setup as l10nSetup } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import ja from "./translations/ja.json"
import af from "./translations/af.json"
import de from "./translations/de.json"
import es from "./translations/es.json"
import fr from "./translations/fr.json"
import id from "./translations/id.json"
import it from "./translations/it.json"
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

import { journalLink } from './journalLink'
import { AppUserConfigs, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { openStartWindow } from './demoDateFormat'
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
  if (!logseq.settings!.firstLoad) {
    setTimeout(() => logseq.showSettingsUI(), 300)
    logseq.updateSettings({ firstLoad: "20230823no01" })
  }

  await checkUserDateFormat()

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
    //監視を終了
    observer.disconnect()
    //元に戻す
    revertQuerySelectorAllLinks()
  })

  //設定が変更されたときに実行
  onSettingsChanged()

}/* end_main */



const onSettingsChanged = () => logseq.onSettingsChanged((newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]) => {
  if (newSet.booleanJournalLinkDateFormat === true
    && newSet.dateFormat !== oldSet.dateFormat
    || newSet.selectLocale !== oldSet.selectLocale) {
    revertQuerySelectorAllLinks()
    setTimeout(() => querySelectorAllLinks(), 50)
  } else
    if (oldSet.booleanJournalLInkDateFormat === false
      && newSet.booleanJournalLinkDateFormat === true) {
      querySelectorAllLinks()
    } else
      if (oldSet.booleanJournalLinkDateFormat === true
        && newSet.booleanJournalLinkDateFormat === false) {
        revertQuerySelectorAllLinks()
        if (newSet.booleanJournalLinkAddLocalizeDayOfWeek === true) querySelectorAllLinks()
      }
  if (oldSet.loadDateFormatDemo === false
    && newSet.loadDateFormatDemo === true) {
    openStartWindow()
    setTimeout(() => logseq.updateSettings({ loadDateFormatDemo: false }), 300)
  }
  if (oldSet.booleanJournalLinkAddLocalizeDayOfWeek !== newSet.booleanJournalLinkAddLocalizeDayOfWeek
    || oldSet.booleanJournalLinkLocalizeDayOfWeek !== newSet.booleanJournalLinkLocalizeDayOfWeek) {
    revertQuerySelectorAllLinks()
    setTimeout(() => querySelectorAllLinks(), 50)
  }
})


//querySelectorAll
let processingTitleQuery: boolean = false
const querySelectorAllLinks = async (): Promise<void> => {
  if (processingTitleQuery) return
  processingTitleQuery = true;

  (parent.document.body.querySelector("div#root>div>main") as HTMLElement | null)?.querySelectorAll(
    "div#main-content-container div:is(.journal,.is-journals) h1.title:not([data-localize]), div:is(#main-content-container,#right-sidebar) a[data-ref]:not([data-localize]), div#left-sidebar li span.page-title:not([data-localize]), div#right-sidebar div.sidebar-item div.page-title>span+span.text-ellipsis:not([data-localize])"
  )
    .forEach(async (titleElement) => await journalLink(titleElement as HTMLElement, userDateFormat))

  setTimeout(() => processingTitleQuery = false, 20)

}

//observer
const observer = new MutationObserver(async (): Promise<void> => {
  observer.disconnect()
  await querySelectorAllLinks()
  setTimeout(() => observerMainRight(), 800)
})

const observerMainRight = () => {
  observer.observe(
    parent.document.getElementById("main-content-container") as HTMLDivElement,
    {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    }
  )
  observer.observe(
    parent.document.getElementById("right-sidebar") as HTMLDivElement,
    {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    }
  )
}

//元に戻す
const revertQuerySelectorAllLinks = () => {
  (parent.document
    .querySelectorAll(
      "div#main-content-container div:is(.journal,.is-journals) h1.title[data-localize], div:is(#main-content-container,#right-sidebar) a[data-ref][data-localize]:not([data-checked]), div#left-sidebar li span.page-title[data-localize], div#right-sidebar div.sidebar-item div.page-title>span+span.text-ellipsis[data-localize]"
    ) as NodeListOf<HTMLElement>)
    .forEach(
      async (titleElement) => {
        titleElement.removeAttribute("data-localize")
        if (titleElement.dataset.ref) titleElement.textContent = titleElement.dataset.ref as string
      }
    )
}

logseq.ready(main).catch(console.error)