import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from 'logseq-l10n'
import { DATE_FORMAT_CHOICES, SELECT_LOCALE_CHOICES, SHORT_OR_LONG_CHOICES, YEAR_PATTERN_CHOICES, ALTERNATIVE_DATE_FORMAT_CHOICES, DEFAULT_DATE_FORMAT, DEFAULT_ICON_BEFORE, DEFAULT_ICON_AFTER, YEAR_PATTERN_SAME } from './constants'

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    // {
    //     key: "headingCommon",
    //     title: t("Common settings"),
    //     type: "heading",
    //     default: "",
    //     description: ""
    // },
    {
        key: "headingAddLocalizeDayOfWeek",
        title: t("Apply date format style"),
        type: "heading",
        default: "",
        //グラフには影響を与えない
        description: t("Apply the visual style (weekday/format) of the selected date format in the UI only. Does not change page names or files."),
    },
    {//date format
        key: "dateFormat",
        title: t("Date format"),
        type: "enum",
        //<option>E, MM/dd/yyyy</option><option>E, dd-MM-yyyy</option><option>E, dd.MM.yyyy</option><option>E, yyyy/MM/dd</option><option>EEE, MM/dd/yyyy</option><option>EEE, dd-MM-yyyy</option><option>EEE, dd.MM.yyyy</option><option>EEE, yyyy/MM/dd</option><option>EEEE, MM/dd/yyyy</option><option>EEEE, dd-MM-yyyy</option><option>EEEE, dd.MM.yyyy</option><option>EEEE, yyyy/MM/dd</option><option>MM-dd-yyyy</option><option>MM/dd/yyyy</option><option>MMM do, yyyy</option><option>MMMM do, yyyy</option><option>MM_dd_yyyy</option><option>dd-MM-yyyy</option><option>do MMM yyyy</option><option>do MMMM yyyy</option><option>yyyy-MM-dd</option><option>yyyy-MM-dd EEEE</option><option>yyyy/MM/dd</option><option>yyyyMMdd</option><option>yyyy_MM_dd</option><option>yyyy年MM月dd日</option><
        enumChoices: DATE_FORMAT_CHOICES,
        default: DEFAULT_DATE_FORMAT,
        description: t("Choose how dates are formatted for display in the UI."),
    },
    {//日付フォーマットのデモンストレーション
        key: "loadDateFormatDemo",
        title: t("Show date format examples"),
        type: "boolean",
        default: false,
        description: t("Open a dialog that shows examples of each date format."),
    },
    {//特殊なロケールを使用する
        key: "selectLocale",
        title: t("Locale (advanced)"),
        type: "enum",
        enumChoices: SELECT_LOCALE_CHOICES,
        default: 'default',
        description: t("Override the locale used for localized dates and weekday names."),
    },
    {
        // 曜日の呼び名の長さ
        key: "booleanShortOrLong",
        title: t("Weekday length"),
        type: "enum",
        enumChoices: SHORT_OR_LONG_CHOICES,
        default: "unset",
        description: t("Force short or long weekday names (this overrides other options)."),//この設定が優先される
    },
    {//booleanRelativeDateInText
        key: "booleanRelativeDateInText",
        title: t("Use relative date as main text"),
        type: "boolean",
        default: false,
        description: t("Show relative labels (e.g. 'Today', 'Tomorrow') as the main text in eligible elements."),
    },
    {//relativeDateDaysBefore
        key: "relativeDateDaysBefore",
        title: t("Relative days — past"),
        type: "number",
        default: 7,
        description: t("How many past days should be shown as relative labels (e.g., 'Yesterday')."),
    },
    {//relativeDateDaysAfter
        key: "relativeDateDaysAfter",
        title: t("Relative days — future"),
        type: "number",
        default: 7,
        description: t("How many future days should be shown as relative labels (e.g., 'Tomorrow')."),
    },

    {//日付に合わせて、アイコンをつける
        key: "booleanAddIcon",
        title: t("Display icon for dates"),
        type: "boolean",
        default: false,
        description: "default: `false`",
        //20240204
    },
    { // アイコンをつける日付のパターン (年の区切り)
        key: "booleanYearPattern",
        title: t("Year range for icons"),
        type: "enum",
        enumChoices: YEAR_PATTERN_CHOICES,
        default: YEAR_PATTERN_SAME,
        description: "",
    },
    {//区切りより前の場合のアイコン
        key: "iconBeforeYear",
        title: t("Icon for older dates" ),
        type: "string",
        default: DEFAULT_ICON_BEFORE,
        description: "default: `🕰️` or `&#xea0b;` / "+ t("Emoji icon: Win + . (Windows) or Cmd + Ctrl + Space (Mac) to open the emoji picker / Tabler Icons: https://tabler.io/icons (Copy HTML char code)"),
    },
    {//区切りより後の場合のアイコン
        key: "iconAfterYear",
        title: t("Icon for newer dates"),
        type: "string",
        default: DEFAULT_ICON_AFTER,
        description: "default: ` ` or `&#xea53;` / "+t("Emoji icon: Win + . (Windows) or Cmd + Ctrl + Space (Mac) to open the emoji picker / Tabler Icons: https://tabler.io/icons (Copy HTML char code)"),
    },
    {
        key: "headingAlternativeDateFormats",
        title: t("Alternative Date Formats"),
        type: "heading",
        default: "",
        description: t("Specify additional date formats to recognize for non-journal pages that contain date-like strings."),
    },
    {
        key: "alternativeDateFormat1",
        title: t("Alternative Date Format 1"),
        type: "enum",
        enumChoices: ALTERNATIVE_DATE_FORMAT_CHOICES,
        default: "Unset",
        description: t("First alternative date format to try parsing."),
    },
    {
        key: "alternativeDateFormat2",
        title: t("Alternative Date Format 2"),
        type: "enum",
        enumChoices: ALTERNATIVE_DATE_FORMAT_CHOICES,
        default: "Unset",
        description: t("Second alternative date format to try parsing."),
    },
    {
        key: "alternativeDateFormat3",
        title: t("Alternative Date Format 3"),
        type: "enum",
        enumChoices: ALTERNATIVE_DATE_FORMAT_CHOICES,
        default: "Unset",
        description: t("Third alternative date format to try parsing."),
    }

]
