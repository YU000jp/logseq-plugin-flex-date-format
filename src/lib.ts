import { getISOWeekYear, getISOWeek, getWeekYear, getWeek } from "date-fns"
import { WEEK_FORMAT_ISO } from './constants'

export const getJournalDayDate = (str: string): Date => new Date(
  Number(str.slice(0, 4)), //year
  Number(str.slice(4, 6)) - 1, //month 0-11
  Number(str.slice(6)) //day
)

//日付から週番号を求める
/**
 * Calculate a week number and year for a date.
 *
 * @param journalDate date to evaluate
 * @param weekStartsOn 0 (Sunday) or 1 (Monday)
 * @param weekNumberFormat optional string; if 'ISO(EU) format' is supplied then ISO week/year are used
 */
export const getWeeklyNumberFromDate = (journalDate: Date, weekStartsOn: 0 | 1, weekNumberFormat?: string): { year: number, weekString: string } => {
  let year: number
  let week: number
  if (weekNumberFormat === WEEK_FORMAT_ISO) {
    year = getISOWeekYear(journalDate)
    week = getISOWeek(journalDate)
  } else {
    //NOTE: getWeekYear関数は1月1日がその年の第1週の始まりとなる(デフォルト)
    //weekStartsOnは先に指定済み
    year = getWeekYear(journalDate, { weekStartsOn })
    week = getWeek(journalDate, { weekStartsOn })
  }
  const weekString: string = (week < 10) ? String("0" + week) : String(week) //weekを2文字にする
  return { year, weekString }//weekを2文字にする
}

//日付からローカライズされた曜日を求める
export const localizeDayOfWeek = (weekday: "short" | "long", journalDate: Date, locales: string) => new Intl.DateTimeFormat(locales, { weekday }).format(journalDate)

//相対時間表示
export const formatRelativeDate = (targetDate: Date, locales: string, capitalize: boolean = false): string => {
  const currentDate = new Date()
  // 比較した結果、同じ日付だった場合は空文字を返す
  // if (targetDateOnly.getTime() === currentDateOnly.getTime()) {
  //   return '';
  // }
  let relativeDate = new Intl.RelativeTimeFormat(locales, { numeric: 'auto' }).format(// 相対的な日付差をローカライズした文字列に変換
    (Math.floor(((new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())).getTime() - (new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())).getTime()) / (1000 * 60 * 60 * 24)) as number)  // 日付を比較するために年月日の部分だけを取得し、ミリ秒単位に変換
    , 'day') as string
  
  // Capitalize first letter if requested
  if (capitalize && relativeDate.length > 0) {
    relativeDate = relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)
  }
  
  return relativeDate
}

//日付が相対日付の範囲内かどうかをチェック
export const isWithinRelativeDateRange = (targetDate: Date, daysBefore: number, daysAfter: number): boolean => {
  const currentDate = new Date()
  const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())
  
  const daysDiff = Math.floor((targetDateOnly.getTime() - currentDateOnly.getTime()) / (1000 * 60 * 60 * 24))
  
  return daysDiff >= -daysBefore && daysDiff <= daysAfter
}
