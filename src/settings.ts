import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { t } from 'logseq-l10n';

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate: SettingSchemaDesc[] = [
    {
        key: "headingAddLocalizeDayOfWeek",
        title: t("Switch to display of the selected date format"),
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
        ],
        default: "Localize",
        description: "",
    },
    {//日付フォーマットのデモンストレーション
        key: "loadDateFormatDemo",
        title: t("All date format demo"),
        type: "boolean",
        default: false,
        description: "Open the dialog on click",
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
];
