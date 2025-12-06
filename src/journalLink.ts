import { PageEntity } from "@logseq/libs/dist/LSPlugin"
import { format } from "date-fns"
import { getJournalDayDate, isWithinRelativeDateRange, localizeDayOfWeek } from "./lib"
import { doesPageExistAsJournal } from "./query/advancedQuery"
import { getSettingsSnapshot } from './settingsManager'
import { replaceDayOfWeek, shortOrLongFromSettings, addIcon as addIconUtil, checkYear as checkYearUtil, formatRelative as formatRelativeUtil } from './utils'
import { ICON_CALENDAR, CLASS_RELATIVE_DATE } from './constants'

export const journalLink = async (journalLinkElement: HTMLElement, preferredDateFormat: string, logseqVerMd: boolean): Promise<void> => {

  if (!journalLinkElement.textContent || journalLinkElement.dataset.localize === 'true') return

  const journalDay = await doesPageExistAsJournal(journalLinkElement.textContent, logseqVerMd) as PageEntity["journalDay"] | null
  if (journalDay === null) return

  const settings = getSettingsSnapshot()
  if (journalDay) replaceDateFormat(journalDay, journalLinkElement, preferredDateFormat, settings)

}


const replaceDateFormat = (journalDay: PageEntity["journalDay"], journalLinkElement: HTMLElement, preferredDateFormat: string, settings: ReturnType<typeof getSettingsSnapshot>) => {

  const journalDate: Date = getJournalDayDate(String(journalDay)) // 日誌リンクから日付を取得
  journalLinkElement.dataset.ref = journalLinkElement.textContent as string | undefined // journalLinkElement.textContentを保存

  // Check if we should display relative date as main text
  // Note: Relative dates should NOT be applied to journal page titles (h1.title or div.ls-page-title span.block-title-wrap)
  // Only apply to journal links (a[data-ref]) and sidebar items
  const isJournalPageTitle = journalLinkElement.tagName === 'H1' || (journalLinkElement.tagName === 'SPAN' && journalLinkElement.closest('.ls-page-title'))
  const shouldShowRelativeInText = settings.booleanRelativeDateInText === true && !isJournalPageTitle
  const daysBefore = settings.relativeDateDaysBefore || 7
  const daysAfter = settings.relativeDateDaysAfter || 7
  const isInRelativeRange = isWithinRelativeDateRange(journalDate, daysBefore, daysAfter)

  let formattedDate = ""
  
  // Generate the formatted date based on settings
  switch (settings.dateFormat as string) { // ユーザー指定の形式に変更
    case "Unset": //未設定の場合
      formattedDate = format(journalDate, preferredDateFormat)
      break
    case 'Localize': //ローカライズされた形式の場合
      formattedDate = journalDate.toLocaleDateString(settings.selectLocale as string, { weekday: shortOrLongFromSettings(settings, 'short'), year: 'numeric', month: 'short', day: 'numeric' })
      break
    default: //ユーザー指定の形式の場合
      formattedDate = format(journalDate, settings.dateFormat as string)
      if (settings.booleanLocalizeDayOfWeek === true) { // 曜日をローカライズする設定の場合

        if ((settings.dateFormat as string).includes('E')) // 曜日が含まれている場合
          formattedDate = replaceDayOfWeek(formattedDate, journalDate, settings.selectLocale as string, shortOrLongFromSettings(settings, 'long'))
        else // 曜日が含まれていない場合
          formattedDate += ` (${localizeDayOfWeek(shortOrLongFromSettings(settings, 'short'), journalDate, settings.selectLocale as string)})`

        // 「Montag」が「Montagtag」になってしまうバグの対処
        if (settings.selectLocale === 'de-DE')
          formattedDate = formattedDate.replace('tagtag', 'tag').replace('Motag', 'Montag')
      }
  }

  // Decide what to display as main text
  if (shouldShowRelativeInText && isInRelativeRange) {
    // Display relative date as main text, formatted date in tooltip
    // Add calendar icon and capitalize first letter for better design
    const relativeText = formatRelativeUtil(journalDate, settings.selectLocale as string, true)
    journalLinkElement.textContent = `${ICON_CALENDAR} ${relativeText}`
    journalLinkElement.title = formattedDate
    // Add custom class for styling relative dates with border (Dynalist-like design)
    journalLinkElement.classList.add(CLASS_RELATIVE_DATE)
  } else {
    // Display formatted date as main text
    journalLinkElement.textContent = formattedDate
    //保存に使われる日付フォーマットをツールチップに表示
    journalLinkElement.title = format(journalDate, preferredDateFormat)
    // Remove custom class if it was previously added
    journalLinkElement.classList.remove(CLASS_RELATIVE_DATE)
  }
  
  //相対時間をツールチップに表示
  if (settings.booleanRelativeTime === true) { // 相対時間を表示する設定の場合
    if (shouldShowRelativeInText && isInRelativeRange) {
      // If showing relative in text, add the user date format to tooltip instead
      journalLinkElement.title += "\n" + format(journalDate, preferredDateFormat)
    } else {
      // If showing formatted date, add relative time to tooltip
      journalLinkElement.title += "\n" + formatRelativeUtil(journalDate, settings.selectLocale as string)
    }

  }

  if (settings.booleanAddIcon === true) addIconUtil(journalDate, journalLinkElement, settings)

  journalLinkElement.dataset.localize = "true" // フラグ
}

// NOTE: helpers moved to src/utils.ts to improve reusability
