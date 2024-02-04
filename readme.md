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
- targets are journal links or journal titles
  1. Main: **Switch to style of the selected date format** 🆙
     > Select "localize" mode or another date format
  1. Option: Localize day of the week in journal links 🆙
     - 2023/07/22 => 2023/07/22 (Sat)
       > `(Sat)` is the localized day of the week.
   1. Option: Add an icon to the date by the year patter 🆕20240204

---

## Getting Started

> **Only markdown format supported**

1. Install from Logseq Marketplace
   - Press [`---`] on the top right toolbar to open [`Plugins`]. Select `Marketplace`. Type `Flex` in the search field, select it from the search results and install.

1. Please specify the settings in the plugin settings.

---

## Showcase / Questions / Ideas / Help

> Go to the [discussion](https://github.com/YU000jp/logseq-plugin-flex-date-format/discussions) tab to ask and find this kind of things.

1. If the Tabler icon is not displayed correctly even if you specify it, please specify another icon. It may not be an HTML char or Logseq may not support that icon. It depends on the version of Tabler-icon applied to Logseq.
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
