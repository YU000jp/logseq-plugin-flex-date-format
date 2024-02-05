import { PageEntity } from "@logseq/libs/dist/LSPlugin"
import { format, subYears } from "date-fns"
import { formatRelativeDate, getJournalDayDate, localizeDayOfWeek } from "./lib"

export const journalLink = async (journalLinkElement: HTMLElement, preferredDateFormat: string): Promise<void> => {

  if (!journalLinkElement.textContent // journalLinkElement.textContent === null
    || journalLinkElement.dataset.localize === "true") // 既にローカライズされている場合
    return

  const page = await logseq.Editor.getPage(journalLinkElement.textContent) as { journalDay: PageEntity["journalDay"] } | null
  if (page === null) return
  if (page.journalDay) replaceDateFormat(page, journalLinkElement, preferredDateFormat)

}


const replaceDateFormat = (page: { journalDay: PageEntity["journalDay"] }, journalLinkElement: HTMLElement, preferredDateFormat: string) => {

  const journalDate: Date = getJournalDayDate(String(page.journalDay)) // 日誌リンクから日付を取得
  journalLinkElement.dataset.ref = journalLinkElement.textContent as string | undefined // journalLinkElement.textContentを保存

  //保存に使われる日付フォーマットをツールチップに表示
  journalLinkElement.title = format(journalDate, preferredDateFormat)
  //相対時間をツールチップに表示
  if (logseq.settings!.booleanRelativeTime === true) // 相対時間を表示する設定の場合
    journalLinkElement.title += "\n" + formatRelativeDate(journalDate, logseq.settings!.selectLocale as string) //相対時間を追加

  switch (logseq.settings!.dateFormat as string) { // ユーザー指定の形式に変更
    case "Unset": //未設定の場合
      break
    case "Localize": //ローカライズされた形式の場合
      journalLinkElement.textContent = journalDate.toLocaleDateString(logseq.settings!.selectLocale as string, { weekday: shortOrLong("short"), year: "numeric", month: "short", day: "numeric" })
      break
    default: //ユーザー指定の形式の場合
      journalLinkElement.textContent = format(journalDate, logseq.settings!.dateFormat as string)
      if (logseq.settings!.booleanLocalizeDayOfWeek === true) { // 曜日をローカライズする設定の場合

        if ((logseq.settings!.dateFormat as string).includes("E")) // 曜日が含まれている場合
          titleElementReplaceDayOfWeek(journalDate, journalLinkElement)
        else  // 曜日が含まれていない場合
          journalLinkElement.textContent += ` (${localizeDayOfWeek(shortOrLong("short"), journalDate, logseq.settings!.selectLocale as string)})`

        // 「Montag」が「Montagtag」になってしまうバグの対処
        if (logseq.settings!.selectLocale as string === "de-DE")
          journalLinkElement.textContent = journalLinkElement.textContent!.replace("tagtag", "tag")
      }
  }

  if (logseq.settings!.booleanAddIcon === true) addIcon(journalDate, journalLinkElement)

  journalLinkElement.dataset.localize = "true" // フラグ
}

//titleElementの日付をローカライズする(Element書き換え)
const titleElementReplaceDayOfWeek = (journalDate: Date, titleElement: HTMLElement) => {
  switch (journalDate.getDay()) { //journalDateで曜日を取得する
    case 0:
      replace(titleElement, "Sunday", "Sun", journalDate)
      break
    case 1:
      replace(titleElement, "Monday", "Mon", journalDate)
      break
    case 2:
      replace(titleElement, "Tuesday", "Tue", journalDate)
      break
    case 3:
      replace(titleElement, "Wednesday", "Wed", journalDate)
      break
    case 4:
      replace(titleElement, "Thursday", "Thu", journalDate)
      break
    case 5:
      replace(titleElement, "Friday", "Fri", journalDate)
      break
    case 6:
      replace(titleElement, "Saturday", "Sat", journalDate)
      break
  }
}

const replace = (titleElement: HTMLElement, long: string, short: string, journalDate: Date) => {
  titleElement.textContent = titleElement.textContent!.replace(long, localizeDayOfWeek(shortOrLong("long"), journalDate, logseq.settings!.selectLocale as string))
  titleElement.textContent = titleElement.textContent!.replace(short, localizeDayOfWeek(shortOrLong("short"), journalDate, logseq.settings!.selectLocale as string))
}

const shortOrLong = (select: "short" | "long"): "short" | "long" => logseq.settings!.booleanShortOrLong === "unset" ? select : logseq.settings!.booleanShortOrLong as "short" | "long"

const addIcon = (journalDate: Date, journalLinkElement: HTMLElement) => {
  const element = document.createElement("span")
  element.className = "icon pr-2"
  const setIcon = checkYear(journalDate) ? logseq.settings!.iconAfterYear as string : logseq.settings!.iconBeforeYear as string
  if (setIcon === "") return
  element.innerHTML = setIcon
  journalLinkElement.prepend(element)
}

const checkYear = (journalDate: Date): boolean => {
  if (logseq.settings!.booleanYearPattern === "same year") return new Date().getFullYear() === journalDate.getFullYear() // journalDateの年が今年と同じ場合true
  else
    switch (logseq.settings!.booleanYearPattern) {// journalDateのほうが新しい日付の場合true
      case "1 year period":
        return journalDate > subYears(new Date(), 1)
      case "2 year period":
        return journalDate > subYears(new Date(), 2)
      case "3 year period":
        return journalDate > subYears(new Date(), 3)
      case "5 year period":
        return journalDate > subYears(new Date(), 5)
      case "10 year period":
        return journalDate > subYears(new Date(), 10)
      default:
        return false
    }
}