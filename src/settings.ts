import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from 'logseq-l10n'

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "headingAddLocalizeDayOfWeek",
        title: t("Switch to style of the selected date format"),
        type: "heading",
        default: "",
        //グラフには影響を与えない
        description: t("*This setting does not affect the graph or files*"),
    },
    {//Journal links date format
        key: "booleanJournalLinkDateFormat",
        title: t("Enable selected date format"),
        type: "boolean",
        default: true,
        //グラフには影響を与えない
        description: "default: `true`",
    },
    {//date format
        key: "dateFormat",
        title: t("Select date format  (if the above option is enabled)"),
        type: "enum",
        //<option>E, MM/dd/yyyy</option><option>E, dd-MM-yyyy</option><option>E, dd.MM.yyyy</option><option>E, yyyy/MM/dd</option><option>EEE, MM/dd/yyyy</option><option>EEE, dd-MM-yyyy</option><option>EEE, dd.MM.yyyy</option><option>EEE, yyyy/MM/dd</option><option>EEEE, MM/dd/yyyy</option><option>EEEE, dd-MM-yyyy</option><option>EEEE, dd.MM.yyyy</option><option>EEEE, yyyy/MM/dd</option><option>MM-dd-yyyy</option><option>MM/dd/yyyy</option><option>MMM do, yyyy</option><option>MMMM do, yyyy</option><option>MM_dd_yyyy</option><option>dd-MM-yyyy</option><option>do MMM yyyy</option><option>do MMMM yyyy</option><option>yyyy-MM-dd</option><option>yyyy-MM-dd EEEE</option><option>yyyy/MM/dd</option><option>yyyyMMdd</option><option>yyyy_MM_dd</option><option>yyyy年MM月dd日</option><
        enumChoices: [
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
        description: t("⚠️ It cannot be used when creating links. Create it based on the user date format."),
    },
    {//日付フォーマットのデモンストレーション
        key: "loadDateFormatDemo",
        title: t("All date format demo"),
        type: "boolean",
        default: false,
        description: t("Open the dialog on click"),
    },
    {//booleanRelativeTime
        key: "booleanRelativeTime",
        title: t("Display relative time on hover the journal link"),
        type: "boolean",
        default: true,
        description: "default: `true`",
    },

    {
        key: "headingAddLocalizeDayOfWeek",
        title: t("Localized day of the week (except `Localize` mode)"),
        type: "heading",
        default: "",
        //グラフには影響を与えない
        description: t("*This setting does not affect the graph or files*"),
    },
    {//Localizeを除く
        key: "booleanJournalLinkLocalizeDayOfWeek",
        title: t("If the day of the week is included in user date format, localize the day of the week in the date link"),
        type: "boolean",
        default: true,
        description: "default: `true`",
    },
    {//Localizeを除く
        key: "booleanJournalLinkAddLocalizeDayOfWeek",
        title: t("If the day of the week is not included in user date format, add the localized day of the week to the date link"),
        type: "boolean",
        default: true,
        description: "default: `true`",
    },
    {//header Advanced options for "Localize" mode
        key: "headingAdvancedOptionsForLocalizeMode",
        title: t("Advanced options for `Localize` mode"),
        type: "heading",
        default: "",
        description: t(""),
    },
    {//特殊なロケールを使用する
        key: "selectLocale",
        title: t("Select locale"),
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
        description: t("⚠️ It cannot be used when creating links. Create it based on the user date format."),
    },
]
