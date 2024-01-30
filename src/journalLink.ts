import { PageEntity } from "@logseq/libs/dist/LSPlugin"
import { format } from "date-fns"
import { formatRelativeDate, getJournalDayDate, localizeDayOfWeek, titleElementReplaceLocalizeDayOfWeek } from "./lib"

export const journalLink = async (journalLinkElement: HTMLElement, preferredDateFormat: string): Promise<void> => {
  if (!journalLinkElement.textContent
    || journalLinkElement.dataset.localize === "true"
    || (logseq.settings!.booleanJournalLinkLocalizeDayOfWeek === false
      && logseq.settings!.booleanJournalLinkAddLocalizeDayOfWeek === false
      && logseq.settings!.booleanJournalLinkDateFormat === false)
  ) return
  const page = await logseq.Editor.getPage(journalLinkElement.textContent!) as { journalDay: PageEntity["journalDay"] } | null
  if (page && page.journalDay) {
    const journalDate: Date = getJournalDayDate(String(page.journalDay))

    //日付フォーマット変更
    if (logseq.settings!.booleanJournalLinkDateFormat === true) {
      journalLinkElement.dataset.ref = journalLinkElement.textContent

      journalLinkElement.textContent = logseq.settings!.dateFormat === "Localize" ?
        journalDate.toLocaleDateString(logseq.settings!.selectLocale as string || "default", { weekday: "short", year: "numeric", month: "short", day: "numeric" }).replace(/,/g, "")//ローカライズ
        : format(journalDate, logseq.settings!.dateFormat as string)
      journalLinkElement.dataset.localize = "true"
    }

    if (logseq.settings!.booleanJournalLinkAddLocalizeDayOfWeek as boolean === true && !(logseq.settings!.booleanJournalLinkDateFormat === true && logseq.settings!.dateFormat === "Localize")) {
      journalLinkElement.dataset.ref = journalLinkElement.textContent
      //日付フォーマットに曜日が含まれている場合、日誌リンクから日付を取得し、曜日を置換する
      if (preferredDateFormat.includes("E") === true
        || (logseq.settings!.booleanJournalLinkDateFormat === true
          && (logseq.settings!.dateFormat as string).includes("E"))
      ) titleElementReplaceLocalizeDayOfWeek(journalDate, journalLinkElement)
      //日付フォーマットに曜日が含まれていない場合、日誌リンクから日付を取得し、曜日を追加する
      else
        if (journalLinkElement.classList.contains("title") === false) {//日誌ページのタイトル以外の場合のみ
          journalLinkElement.textContent = `${journalLinkElement.textContent} (${localizeDayOfWeek("short", journalDate, logseq.settings!.localizeOrEnglish as string)})`//曜日を追加  
        }
      journalLinkElement.dataset.localize = "true"
    }

    //保存に使われる日付フォーマットを表示
    journalLinkElement.title += format(journalDate, preferredDateFormat)

    //相対時間表示
    if (logseq.settings!.booleanRelativeTime === true) journalLinkElement.title += "\n" + formatRelativeDate(journalDate)

  }
}//journalLink end

