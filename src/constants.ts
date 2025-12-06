// Centralized constants and helper functions for flexible-date-format plugin

export const CSS_KEY = 'relative-date-display-style'

export const CSS_STYLE = `
  /* Dynalist-inspired design for relative dates */
  a[data-ref].relative-date-display {
    display: inline-flex !important;
    align-items: center;
    padding: 3px 8px !important;
    border: 1px solid var(--ls-border-color, #d3d3d3) !important;
    border-radius: 4px !important;
    background-color: var(--ls-secondary-background-color, #f8f9fa) !important;
    color: var(--ls-primary-text-color, #333) !important;
    font-size: 13px !important;
    line-height: 1.4 !important;
    text-decoration: none !important;
    transition: all 0.15s ease !important;
    white-space: nowrap !important;
  }
  
  a[data-ref].relative-date-display:hover {
    background-color: var(--ls-tertiary-background-color, #e9ecef) !important;
    border-color: var(--ls-active-primary-color, #999) !important;
  }
  
  /* For sidebar items that are spans */
  span.relative-date-display {
    display: inline-flex !important;
    align-items: center;
    padding: 3px 8px !important;
    border: 1px solid var(--ls-border-color, #d3d3d3) !important;
    border-radius: 4px !important;
    background-color: var(--ls-secondary-background-color, #f8f9fa) !important;
    color: var(--ls-primary-text-color, #333) !important;
    font-size: 13px !important;
    line-height: 1.4 !important;
    white-space: nowrap !important;
  }
`

export const MESSAGE_ID = '20240204-01'

export const ROOT_QUERY = 'div#root>div>main'
export const SELECTOR_BLOCK_TAGS = 'div.block-tags'
export const ID_MAIN_CONTENT_CONTAINER = 'main-content-container'
export const ID_RIGHT_SIDEBAR = 'right-sidebar'

export const CLASS_RELATIVE_DATE = 'relative-date-display'
export const ICON_CALENDAR = '📅'

export const DEFAULT_ICON_BEFORE = '🕰️'
export const DEFAULT_ICON_AFTER = ''

export const WEEK_FORMAT_ISO = 'ISO(EU) format'

/** Build selector string used to find title / link nodes for localization. */
export const buildTitleSelector = (dbGraph: boolean, versionMd: boolean) =>
  dbGraph === true
    ? "#main-content-container div:is(#journals,.is-journals) div.ls-page-title span.block-title-wrap:not([data-localize]), :is(#main-content-container,#right-sidebar) a[data-ref]:not([data-localize]), #left-sidebar li span.page-title:not([data-localize]), #right-sidebar div.sidebar-item div.page-title>div+span.text-ellipsis:not([data-localize]) "
    : "#main-content-container div:is(.journal,.is-journals) h1.title:not([data-localize]), :is(#main-content-container,#right-sidebar) a[data-ref]:not([data-localize]), #left-sidebar li span.page-title:not([data-localize]), #right-sidebar div.sidebar-item " +
        (versionMd === true
          ? 'div.page-title>span+span.text-ellipsis:not([data-localize])'
          : 'div.page-title>div+span.text-ellipsis:not([data-localize])')

export const buildTitleSelectorLocalized = (dbGraph: boolean, versionMd: boolean) =>
  dbGraph === true
    ? "#main-content-container div:is(#journals,.is-journals) div.ls-page-title span.block-title-wrap[data-localize], :is(#main-content-container,#right-sidebar) a[data-ref][data-localize], #left-sidebar li span.page-title[data-localize], #right-sidebar div.sidebar-item div.page-title>div+span.text-ellipsis[data-localize]"
    : "#main-content-container div:is(.journal,.is-journals) h1.title[data-localize], :is(#main-content-container,#right-sidebar) a[data-ref][data-localize], #left-sidebar li span.page-title[data-localize], #right-sidebar div.sidebar-item " +
        (versionMd === true
          ? 'div.page-title>span+span.text-ellipsis[data-localize]'
          : 'div.page-title>div+span.text-ellipsis[data-localize]')

export const YEAR_PATTERN_SAME = 'same year'

export const YEAR_PATTERN_MAP: Record<string, number> = {
  '1 year period': 1,
  '2 year period': 2,
  '3 year period': 3,
  '5 year period': 5,
  '10 year period': 10,
}

export const ICON_ELEMENT_CLASS = 'icon pr-2'

// Settings-related constant lists so UI choices live in one place
export const DATE_FORMAT_CHOICES = [
  'Unset',
  'Localize',
  'E, d MMMM yyyy',
  'E, MM/dd/yyyy',
  'E, dd-MM-yyyy',
  'E, dd.MM.yyyy',
  'E, yyyy/MM/dd',
  'EEE, MM/dd/yyyy',
  'EEE, dd-MM-yyyy',
  'EEE, dd.MM.yyyy',
  'EEE, yyyy/MM/dd',
  'EEEE, MM/dd/yyyy',
  'EEEE, dd-MM-yyyy',
  'EEEE, dd.MM.yyyy',
  'EEEE, yyyy/MM/dd',
  'MM-dd-yyyy',
  'MM/dd/yyyy',
  'dd-MM-yyyy',
  'dd.MM.yyyy',
  'yyyy/MM/dd',
  'MM-dd-yyyy',
  'MM/dd/yyyy',
  'MMM do, yyyy',
  'MMMM do, yyyy',
  'MM_dd_yyyy',
  'dd-MM-yyyy',
  'do MMM yyyy',
  'do MMMM yyyy',
  'yyyy-MM-dd',
  'yyyy-MM-dd EEEE',
  'yyyy/MM/dd',
  'yyyyMMdd',
  'yyyy_MM_dd',
  'yyyy年MM月dd日',
  'd MMMM yyyy',
  'dd MMMM yyyy',
]

export const SELECT_LOCALE_CHOICES = [
  'default',
  'am-ET-u-ca-ethiopic',
  'ar-EG',
  'ar-SA',
  'ar-SA-u-ca-islamic-umalqura',
  'bn-BD',
  'de-DE',
  'en-AU',
  'en-CA',
  'en-GB',
  'en-GB-u-ca-islamic',
  'en-GB-u-ca-persian',
  'en-US',
  'en-US-u-ca-islamic',
  'en-US-u-ca-persian',
  'es-AR',
  'es-CL',
  'es-CO',
  'es-CR',
  'es-DO',
  'es-EC',
  'es-ES',
  'es-GT',
  'es-HN',
  'es-MX',
  'es-NI',
  'es-PA',
  'es-PE',
  'es-PR',
  'es-SV',
  'es-UY',
  'es-VE',
  'fa-IR',
  'fa-IR-u-ca-persian',
  'fr-CA',
  'fr-FR',
  'he-IL-u-ca-hebrew',
  'hi-IN',
  'id-ID',
  'it-IT',
  'ja-JP',
  'ja-JP-u-ca-japanese',
  'ko-KR',
  'ko-KR-u-ca-korean',
  'ms-MY',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ru-RU',
  'th-TH',
  'th-TH-u-ca-buddhist',
  'th-TH-u-nu-thai',
  'tr-TR',
  'vi-VN',
  'zh-CN',
  'zh-CN-u-ca-chinese',
  'zh-Hans-CN',
  'zh-Hant-TW-u-ca-taiwan',
  'zh-TW',
  'zh-TW-u-ca-roc',
]

export const SHORT_OR_LONG_CHOICES = ['unset', 'short', 'long']

export const YEAR_PATTERN_CHOICES = [
  YEAR_PATTERN_SAME,
  '1 year period',
  '2 year period',
  '3 year period',
  '5 year period',
  '10 year period',
]

export const DEFAULT_DATE_FORMAT = 'Localize'
