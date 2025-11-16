import { PageEntity } from "@logseq/libs/dist/LSPlugin"
import { format, subYears } from "date-fns"
import { formatRelativeDate, getJournalDayDate, isWithinRelativeDateRange, localizeDayOfWeek } from "./lib"
import { doesPageExistAsJournal } from "./query/advancedQuery"

export const journalLink = async (journalLinkElement: HTMLElement, preferredDateFormat: string, logseqVerMd: boolean): Promise<void> => {

  if (!journalLinkElement.textContent // journalLinkElement.textContent === null
    || journalLinkElement.dataset.localize === "true") // 既にローカライズされている場合
    return

  const journalDay = await doesPageExistAsJournal(journalLinkElement.textContent, logseqVerMd) as PageEntity["journalDay"] | null
  if (journalDay === null) return
  if (journalDay) replaceDateFormat(journalDay, journalLinkElement, preferredDateFormat)

}


const replaceDateFormat = (journalDay: PageEntity["journalDay"], journalLinkElement: HTMLElement, preferredDateFormat: string) => {

  const journalDate: Date = getJournalDayDate(String(journalDay)) // 日誌リンクから日付を取得
  journalLinkElement.dataset.ref = journalLinkElement.textContent as string | undefined // journalLinkElement.textContentを保存

  // Check if we should display relative date as main text
  const shouldShowRelativeInText = logseq.settings!.booleanRelativeDateInText === true
  const daysBefore = (logseq.settings!.relativeDateDaysBefore as number) || 7
  const daysAfter = (logseq.settings!.relativeDateDaysAfter as number) || 7
  const isInRelativeRange = isWithinRelativeDateRange(journalDate, daysBefore, daysAfter)

  let formattedDate = ""
  
  // Generate the formatted date based on settings
  switch (logseq.settings!.dateFormat as string) { // ユーザー指定の形式に変更
    case "Unset": //未設定の場合
      formattedDate = format(journalDate, preferredDateFormat)
      break
    case "Localize": //ローカライズされた形式の場合
      formattedDate = journalDate.toLocaleDateString(logseq.settings!.selectLocale as string, { weekday: shortOrLong("short"), year: "numeric", month: "short", day: "numeric" })
      break
    default: //ユーザー指定の形式の場合
      formattedDate = format(journalDate, logseq.settings!.dateFormat as string)
      if (logseq.settings!.booleanLocalizeDayOfWeek === true) { // 曜日をローカライズする設定の場合

        if ((logseq.settings!.dateFormat as string).includes("E")) // 曜日が含まれている場合
          formattedDate = replaceDayOfWeek(formattedDate, journalDate)
        else  // 曜日が含まれていない場合
          formattedDate += ` (${localizeDayOfWeek(shortOrLong("short"), journalDate, logseq.settings!.selectLocale as string)})`

        // 「Montag」が「Montagtag」になってしまうバグの対処
        if (logseq.settings!.selectLocale as string === "de-DE")
          formattedDate = formattedDate.replace("tagtag", "tag").replace("Motag", "Montag")
      }
  }

  // Decide what to display as main text
  if (shouldShowRelativeInText && isInRelativeRange) {
    // Display relative date as main text, formatted date in tooltip
    journalLinkElement.textContent = formatRelativeDate(journalDate, logseq.settings!.selectLocale as string)
    journalLinkElement.title = formattedDate
  } else {
    // Display formatted date as main text
    journalLinkElement.textContent = formattedDate
    //保存に使われる日付フォーマットをツールチップに表示
    journalLinkElement.title = format(journalDate, preferredDateFormat)
  }
  
  //相対時間をツールチップに表示
  if (logseq.settings!.booleanRelativeTime === true) { // 相対時間を表示する設定の場合
    if (shouldShowRelativeInText && isInRelativeRange) {
      // If showing relative in text, add the user date format to tooltip instead
      journalLinkElement.title += "\n" + format(journalDate, preferredDateFormat)
    } else {
      // If showing formatted date, add relative time to tooltip
      journalLinkElement.title += "\n" + formatRelativeDate(journalDate, logseq.settings!.selectLocale as string)
    }
  }

  if (logseq.settings!.booleanAddIcon === true) addIcon(journalDate, journalLinkElement)

  journalLinkElement.dataset.localize = "true" // フラグ
}

const replaceDayOfWeek = (text: string, journalDate: Date): string => {
  const locale = logseq.settings!.selectLocale as string
  const longFormat = localizeDayOfWeek(shortOrLong("long"), journalDate, locale)
  const shortFormat = localizeDayOfWeek(shortOrLong("short"), journalDate, locale)

  return text.replace(/(?:Sunday|Sun|Monday|Mon|Tuesday|Tue|Wednesday|Wed|Thursday|Thu|Friday|Fri|Saturday|Sat)/g,
    match => match.length > 3 ? longFormat : shortFormat)
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
  const currentDate = new Date()
  if (logseq.settings!.booleanYearPattern === "same year") {
    return currentDate.getFullYear() === journalDate.getFullYear()
  }

  const yearPatternMap: Record<string, number> = {
    "1 year period": 1,
    "2 year period": 2,
    "3 year period": 3,
    "5 year period": 5,
    "10 year period": 10
  }

  const years = yearPatternMap[logseq.settings!.booleanYearPattern as string]
  return years ? journalDate > subYears(currentDate, years) : false
}
