# Logseq Plugin: Flex date format

- Localize date format. Or switch to style of the selected format.

- Development stage 👷🚧

- *This plugin does not affect the graph or files*

[![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-flex-date-format)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
[![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-flex-date-format?color=blue)](https://github.com/YU000jp/logseq-plugin-flex-date-format/LICENSE)
[![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-flex-date-format/total.svg)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
<!-- Published 2023 -->

---

## Features

### Switch to style of the selected date format 🆕

- journal links or journal title
- Select "localize" mode or another date format

### (Option) Localize day of the week in journal links 🆙

- Except "Localize" mode
- If the day of the week is not included in user date format, add the localized day of the week to the journal link
- If it is included in the format, localize the day of the week in the journal link
- 2023/07/22 => 2023/07/22 (Sat)
  > `(Sat)` is the localized day of the week.

---

## Getting Started

### Install from Logseq Marketplace (Coming👷🚧)

- Press [`---`] on the top right toolbar to open [`Plugins`]
- Select `Marketplace`
- Type `Flex` in the search field, select it from the search results and install

#### ⚠️If using `Show Weekday and Week-number` plugin, overlapping "days of the week".

  > Turn it off in the plugin settings.

### Plugin settings

#### Switch to style of the selected date format

- Enable selected date format: toggle
  - `true` default
  - `false`
- Select date format  (if the above option is enabled): select
  - `Localize`
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
-  Display relative time on hover the journal link: toggle
  - `true` default
  - `false`

#### Localized day of the week (except `Localize` mode)

- If the day of the week is included in user date format, localize the day of the week in the date link
  - `true` default
  - `false`
- If the day of the week is not included in user date format, add the localized day of the week to the date link
  - `true` default
  - `false`

---

### Recommend

#### If changed user date format

- [Legacy date format plugin](https://github.com/YU000jp/logseq-plugin-legacy-date-format)

#### Need to week number

- [Show Weekday and Week-number plugin](https://github.com/YU000jp/logseq-plugin-show-weekday-and-week-number/)

## Showcase / Questions / Ideas / Help

> Go to the [discussion](https://github.com/YU000jp/logseq-plugin-flex-date-format/discussions) tab to ask and find this kind of things.

## Author

- GitHub: [YU000jp](https://github.com/YU000jp)

---

<a href="https://www.buymeacoffee.com/yu000japan" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="🍌Buy Me A Coffee" style="height: 42px;width: 152px" ></a>
