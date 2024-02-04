import { PageEntity } from "@logseq/libs/dist/LSPlugin"
import { format } from "date-fns"
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
  if (logseq.settings!.booleanRelativeTime === true)
    journalLinkElement.title += "\n" + formatRelativeDate(journalDate, logseq.settings!.selectLocale as string)

  if (logseq.settings!.dateFormat as string === "Localize") //ローカライズされた形式の場合
    journalLinkElement.textContent = journalDate.toLocaleDateString(logseq.settings!.selectLocale as string, { weekday: shortOrLong("short"), year: "numeric", month: "short", day: "numeric" }) //ローカライズされた形式に変更
  else {
    const dateFormat = format(journalDate, logseq.settings!.dateFormat as string) //ユーザー指定の形式に変更
    journalLinkElement.textContent = dateFormat

    if (logseq.settings!.booleanLocalizeDayOfWeek === true // 曜日をローカライズする設定の場合
      && (logseq.settings!.dateFormat as string).includes("E")) // ユーザー指定の形式に曜日が含まれている場合
      titleElementReplaceDayOfWeek(journalDate, journalLinkElement) //曜日を置換
    else // 曜日が含まれていない場合
      journalLinkElement.textContent = `${dateFormat} (${localizeDayOfWeek(shortOrLong("short"), journalDate, logseq.settings!.selectLocale as string)})` //曜日を追加
  }
  
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
