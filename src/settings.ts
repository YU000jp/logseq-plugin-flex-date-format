import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from 'logseq-l10n'

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
        title: t("Switch to style of the selected date format"),
        type: "heading",
        default: "",
        //グラフには影響を与えない
        description: t("⚠️ It cannot be used when creating links. Create it based on the user date format.") + " " + t("*This setting does not affect the graph or files*"),
    },
    {//date format
        key: "dateFormat",
        title: t("Select date format  (if the above option is enabled)") + " 🆙",
        type: "enum",
        //<option>E, MM/dd/yyyy</option><option>E, dd-MM-yyyy</option><option>E, dd.MM.yyyy</option><option>E, yyyy/MM/dd</option><option>EEE, MM/dd/yyyy</option><option>EEE, dd-MM-yyyy</option><option>EEE, dd.MM.yyyy</option><option>EEE, yyyy/MM/dd</option><option>EEEE, MM/dd/yyyy</option><option>EEEE, dd-MM-yyyy</option><option>EEEE, dd.MM.yyyy</option><option>EEEE, yyyy/MM/dd</option><option>MM-dd-yyyy</option><option>MM/dd/yyyy</option><option>MMM do, yyyy</option><option>MMMM do, yyyy</option><option>MM_dd_yyyy</option><option>dd-MM-yyyy</option><option>do MMM yyyy</option><option>do MMMM yyyy</option><option>yyyy-MM-dd</option><option>yyyy-MM-dd EEEE</option><option>yyyy/MM/dd</option><option>yyyyMMdd</option><option>yyyy_MM_dd</option><option>yyyy年MM月dd日</option><
        enumChoices: [
            "Unset",
            "Localize",
            "E, d MMMM yyyy",
            "E, MM/dd/yyyy",
            "E, dd-MM-yyyy",
            "E, dd.MM.yyyy",
            "E, yyyy/MM/dd",
            "EEE, MM/dd/yyyy",
            "EEE, dd-MM-yyyy",
            "EEE, dd.MM.yyyy",
            "EEE, yyyy/MM/dd",
            "EEEE, MM/dd/yyyy",
            "EEEE, dd-MM-yyyy",
            "EEEE, dd.MM.yyyy",
            "EEEE, yyyy/MM/dd",
            "MM-dd-yyyy",
            "MM/dd/yyyy",
            "dd-MM-yyyy",
            "dd.MM.yyyy",
            "yyyy/MM/dd",
            "MM-dd-yyyy",
            "MM/dd/yyyy",
            "MMM do, yyyy",
            "MMMM do, yyyy",
            "MM_dd_yyyy",
            "dd-MM-yyyy",
            "do MMM yyyy",
            "do MMMM yyyy",
            "yyyy-MM-dd",
            "yyyy-MM-dd EEEE",
            "yyyy/MM/dd",
            "yyyyMMdd",
            "yyyy_MM_dd",
            "yyyy年MM月dd日",
            "d MMMM yyyy",
            "dd MMMM yyyy",
        ],
        default: "Localize",
        description: "",
    },
    {//日付フォーマットのデモンストレーション
        key: "loadDateFormatDemo",
        title: t("All date format demo") + " 🆙",
        type: "boolean",
        default: false,
        description: t("Open the dialog on click"),
    },
    {//特殊なロケールを使用する
        key: "selectLocale",
        title: t("Advanced options > Select locale") + " 🆙",
        type: "enum",
        enumChoices: [
            "default",              // Gregorian calendar (default)
            "am-ET-u-ca-ethiopic",   // Amharic (Ethiopia) - Ethiopian calendar
            "ar-EG",   // Egypt
            "ar-SA",   // Arabic (Saudi Arabia) - Gregorian calendar (default)
            "ar-SA-u-ca-islamic-umalqura",   // Arabic (Saudi Arabia) - Islamic (Umm al-Qura) calendar
            "bn-BD",   // Bangladesh
            "de-DE",   // Germany
            "en-AU",   // Australia
            "en-CA",   // Canada (English)
            "en-GB",   // English (United Kingdom) - Gregorian calendar (default)
            "en-GB-u-ca-islamic",   // English (United Kingdom) - Islamic calendar
            "en-GB-u-ca-persian",   // English (United Kingdom) - Persian calendar
            "en-US",   // English (United States) - Gregorian calendar (default)
            "en-US-u-ca-islamic",   // English (United States) - Islamic calendar
            "en-US-u-ca-persian",   // English (United States) - Persian calendar
            "es-AR",   // Argentina
            "es-CL",   // Chile
            "es-CO",   // Colombia
            "es-CR",   // Costa Rica
            "es-DO",   // Dominican Republic
            "es-EC",   // Ecuador
            "es-ES",   // Spain
            "es-GT",   // Guatemala
            "es-HN",   // Honduras
            "es-MX",   // Mexico
            "es-NI",   // Nicaragua
            "es-PA",   // Panama
            "es-PE",   // Peru
            "es-PR",   // Puerto Rico
            "es-SV",   // El Salvador
            "es-UY",   // Uruguay
            "es-VE",   // Venezuela
            "fa-IR",   // Persian (Iran) - Gregorian calendar (default)
            "fa-IR-u-ca-persian",    // Persian (Iran) - Persian calendar (Jalali)
            "fr-CA",   // Canada (French)
            "fr-FR",   // France
            "he-IL-u-ca-hebrew",     // Hebrew (Israel) - Hebrew calendar
            "hi-IN",   // India
            "id-ID",   // Indonesia
            "it-IT",   // Italy
            "ja-JP",   // Japanese (Japan) - Gregorian calendar (default)
            "ja-JP-u-ca-japanese",   // Japanese (Japan) - Japanese calendar
            "ko-KR",   // Korean (Korea) - Gregorian calendar (default)
            "ko-KR-u-ca-korean",    // Korean (Korea) - Korean calendar
            "ms-MY",   // Malaysia
            "nl-NL",   // Netherlands
            "pl-PL",   // Poland
            "pt-BR",   // Brazil
            "pt-PT",   // Portugal
            "ru-RU",   // Russia
            "th-TH",   // Thailand
            "th-TH-u-ca-buddhist",   // Thai (Thailand) - Buddhist calendar
            "th-TH-u-nu-thai",       // Thai (Thailand) - Thai digits
            "tr-TR",   // Turkey
            "vi-VN",   // Vietnam
            "zh-CN",   // China
            "zh-CN-u-ca-chinese",    // Chinese (China) - Chinese calendar
            "zh-Hans-CN",            // Chinese (China) - Gregorian calendar (default)
            "zh-Hant-TW-u-ca-taiwan",// Chinese (Taiwan) - Gregorian calendar (default)
            "zh-TW",   // Taiwan
            "zh-TW-u-ca-roc",        // Chinese (Taiwan) - Minguo calendar (Republic of China era)
        ],
        default: "default",
        description: "",
    },
    {
        key: "booleanLocalizeDayOfWeek",
        title: t("Localize the day of the week"),
        type: "boolean",
        default: true,
        description: "default: `true`",
    },
    {
        // 曜日の呼び名の長さ
        key: "booleanShortOrLong",
        title: t("Shorten the day of the week") + " 🆕",
        type: "enum",
        enumChoices: [
            "unset", // 未設定
            "short", // 短い曜日名
            "long",  // 長い曜日名
        ],
        default: "unset",
        description: t("*This setting takes precedence over other settings.*"),//この設定が優先される
    },
    {//booleanRelativeTime
        key: "booleanRelativeTime",
        title: t("Display relative time on hover the journal link"),
        type: "boolean",
        default: true,
        description: "default: `true`",
    },

    {//日付に合わせて、アイコンをつける
        key: "booleanAddIcon",
        title: t("Icon > Add an icon to the date by the year pattern") + " 🆕🚧",
        type: "boolean",
        default: true,
        description: "default: `true`",
        //20240204
    },
    { // アイコンをつける日付のパターン (年の区切り)
        key: "booleanYearPattern",
        title: t("Icon > Year pattern") + " 🆕🚧",
        type: "enum",
        enumChoices: [
            "same year", // 同じ年かどうか
            "1 year period", // 1年区切り
            "2 year period", // 2年区切り
            "3 year period", // 3年区切り 
            "5 year period", // 5年区切り
            "10 year period", // 10年区切り

        ],
        default: "same year",
        description: "",
    },
    {//区切りより前の場合のアイコン
        key: "iconBeforeYear",
        title: t("Icon > Set icon for before the year") + " 🆕🚧",
        type: "string",
        default: "&#xea0b;",
        description: "default: `&#xea0b;` or `🕰️` / "+ t("Emoji icon: Win + . (Windows) or Cmd + Ctrl + Space (Mac) to open the emoji picker / Tabler Icons: https://tabler.io/icons (Copy HTML char code)"),
    },
    {//区切りより後の場合のアイコン
        key: "iconAfterYear",
        title: t("Icon > Set icon for after the year or same year") + " 🆕🚧",
        type: "string",
        default: "&#xea53;",
        description: "default: undefined / "+t("Emoji icon: Win + . (Windows) or Cmd + Ctrl + Space (Mac) to open the emoji picker / Tabler Icons: https://tabler.io/icons (Copy HTML char code)"),
    }

]
