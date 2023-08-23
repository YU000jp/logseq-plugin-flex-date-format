import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import { format } from "date-fns";
import { getJournalDayDate, localizeDayOfWeek, titleElementReplaceLocalizeDayOfWeek } from "./lib";
import { formatRelativeDate } from "./lib";

export const journalLink = async (journalLinkElement: HTMLElement, preferredDateFormat: string): Promise<void> => {
  if (!journalLinkElement.textContent
    || journalLinkElement.dataset.localize === "true"
    || (logseq.settings!.booleanJournalLinkLocalizeDayOfWeek === false
      && logseq.settings!.booleanJournalLinkAddLocalizeDayOfWeek === false
      && logseq.settings!.booleanJournalLinkDateFormat === false)
  ) return;
  const page = await logseq.Editor.getPage(journalLinkElement.textContent!) as PageEntity | null;
  if (page && page.journalDay) {
    const journalDate: Date = getJournalDayDate(String(page.journalDay));

    //日付フォーマット変更
    if (logseq.settings!.booleanJournalLinkDateFormat === true) {
      journalLinkElement.dataset.ref = journalLinkElement.textContent;
      if (logseq.settings!.dateFormat === "Localize") {
        journalLinkElement.textContent = journalDate.toLocaleDateString(logseq.settings!.selectLocale || "default", { weekday: "short", year: "numeric", month: "short", day: "numeric" }).replace(/,/g, "");//ローカライズ
      }
      else journalLinkElement.textContent = format(journalDate, logseq.settings!.dateFormat);
      journalLinkElement.dataset.localize = "true";
    }

    if (logseq.settings!.booleanJournalLinkAddLocalizeDayOfWeek as boolean === true && !(logseq.settings!.booleanJournalLinkDateFormat === true && logseq.settings!.dateFormat === "Localize")) {
      journalLinkElement.dataset.ref = journalLinkElement.textContent;
      //日付フォーマットに曜日が含まれている場合、ジャーナルリンクから日付を取得し、曜日を置換する
      if (preferredDateFormat.includes("E") === true
        || (logseq.settings!.booleanJournalLinkDateFormat === true && logseq.settings!.dateFormat.includes("E"))
      ) titleElementReplaceLocalizeDayOfWeek(journalDate, journalLinkElement);
      //日付フォーマットに曜日が含まれていない場合、ジャーナルリンクから日付を取得し、曜日を追加する
      else if (journalLinkElement.classList.contains("title") === false) {//ジャーナルページのタイトル以外の場合のみ
        journalLinkElement.textContent = `${journalLinkElement.textContent} (${localizeDayOfWeek("short", journalDate, logseq.settings?.localizeOrEnglish)})`;//曜日を追加  
      }
      journalLinkElement.dataset.localize = "true";
    }
    if (logseq.settings!.booleanRelativeTime === true) journalLinkElement.title = formatRelativeDate(journalDate);//相対時間表示

  }
};//journalLink end

