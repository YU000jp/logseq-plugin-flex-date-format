# Logseq Plugin: Flexible date format

[English](https://github.com/YU000jp/logseq-plugin-flex-date-format) | [日本語](https://github.com/YU000jp/logseq-plugin-flex-date-format/blob/main/readme.ja.md)

1. Localize date format
1. Switch to style of the selected format
   - Separate the date format recorded in files from the format displayed.
> *This plugin does not affect the graph or files*

[![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-flex-date-format)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
[![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-flex-date-format?color=blue)](https://github.com/YU000jp/logseq-plugin-flex-date-format/LICENSE)
[![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-flex-date-format/total.svg)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
 Published 2023/08/23

## Overview

1. Main: **Switch to style of the selected date format**
   > Select "localize" mode or another date format
   - targets are journal links or journal titles

1. Option: Localize day of the week in journal links
   > Except "Localize" mode
   - If the day of the week is not included in user date format, add the localized day of the week to the journal link
   - If it is included in the format, localize the day of the week in the journal link
   - 2023/07/22 => 2023/07/22 (Sat)
      > `(Sat)` is the localized day of the week.

---

## Getting Started

> **Only markdown format supported**

Install from Logseq Marketplace

  - Press [`---`] on the top right toolbar to open [`Plugins`]. Select `Marketplace`. Type `Flex` in the search field, select it from the search results and install.

### Plugin settings

Switch to style of the selected date format
  - Enable selected date format: toggle
    - `true` default
    - `false`
  - Select date format  (if the above option is enabled): select
    > ⚠️ It cannot be used when creating links. Create it based on the user date format.
    - `Localize` default
    - `MM/dd/yyyy`
    - `dd-MM-yyyy`
    - `dd.MM.yyyy`
    - `yyyy/MM/dd`
    - `MM-dd-yyyy`
    - `MM/dd/yyyy`
    - `MMM do, yyyy`
    - `MMMM do, yyyy`
    - `MM_dd_yyyy`
    - `dd-MM-yyyy`
    - `do MMM yyyy`
    - `do MMMM yyyy`
    - `yyyy-MM-dd`
    - `yyyy-MM-dd EEEE`
    - `yyyy/MM/dd`
    - `yyyyMMdd`
    - `yyyy_MM_dd`
    - `yyyy年MM月dd日`
    - `d MMMM yyyy`
    - `dd MMMM yyyy`
  - Display relative time on hover the journal link: toggle
    - `true` default
    - `false`

Localized day of the week (except `Localize` mode)
  - If the day of the week is included in user date format, localize the day of the week in the date link: toggle
    - `true` default
    - `false`
  - If the day of the week is not included in user date format, add the localized day of the week to the date link: toggle
    - `true` default
    - `false`

Advanced options for `Localize` mode
  - Select locale: select
    > ⚠️ It cannot be used when creating links. Create it based on the user date format.
    - `default`              // Gregorian calendar (default)  
    - `en-US`                // English (United States) - Gregorian calendar (default)  
    - `en-GB-u-ca-islamic`   // English (United Kingdom) - Islamic calendar  
    - `ja-JP-u-ca-japanese`   // Japanese (Japan) - Japanese calendar  
    - `zh-Hans-CN`            // Chinese (China) - Gregorian calendar (default)  
    - `zh-TW-u-ca-roc`        // Chinese (Taiwan) - Minguo calendar (Republic of China era)  
    - `zh-Hant-TW-u-ca-taiwan`// Chinese (Taiwan) - Gregorian calendar (default)  
    - `zh-CN-u-ca-chinese`    // Chinese (China) - Chinese calendar  
    - `th-TH-u-nu-thai`       // Thai (Thailand) - Thai digits  
    - `ar-SA-u-ca-islamic-umalqura`   // Arabic (Saudi Arabia) - Islamic (Umm al-Qura) calendar  
    - `fa-IR-u-ca-persian`    // Persian (Iran) - Persian calendar (Jalali)  
    - `he-IL-u-ca-hebrew`     // Hebrew (Israel) - Hebrew calendar  
    - `th-TH-u-ca-buddhist`   // Thai (Thailand) - Buddhist calendar  
    - `am-ET-u-ca-ethiopic`   // Amharic (Ethiopia) - Ethiopian calendar

---

## Showcase / Questions / Ideas / Help

> Go to the [discussion](https://github.com/YU000jp/logseq-plugin-flex-date-format/discussions) tab to ask and find this kind of things.

1. **⚠️If using "Show Weekday and Week-number" plugin, overlapping days of the week.**
   > Turn it off in the plugin settings.
1. This plugin relies on Logseq's DOM (Document Object Model) structure. If the DOM structure changes due to a Logseq version update, styles may not be applied. We will adjust the CSS to deal with it. If you notice something, please raise an issue.

- Recommend
  1. Parsing for date input > [date nlp plugin](https://github.com/hkgnp/logseq-datenlp-plugin)
  1. If changed user date format > [Old date format plugin](https://github.com/YU000jp/logseq-plugin-legacy-date-format)
  1. Need to week number > [Show Weekday and Week-number plugin](https://github.com/YU000jp/logseq-plugin-show-weekday-and-week-number/)

## Credit

1. Author > [@YU000jp](https://github.com/YU000jp)

<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
