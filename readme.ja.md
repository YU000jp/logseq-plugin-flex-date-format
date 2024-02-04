# Logseq Plugin: Flexible date format

[English](https://github.com/YU000jp/logseq-plugin-flex-date-format) | [日本語](https://github.com/YU000jp/logseq-plugin-flex-date-format/blob/main/readme.ja.md)

1. 選択した日付形式のスタイルを適用します。
   - ファイルに記録された日付形式を、表示される形式から分離します。     
1. 日付表示形式をローカライズします。
> *このプラグインはグラフやファイルに影響を与えません*

[![最新リリースバージョン](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-flex-date-format)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
[![ライセンス](https://img.shields.io/github/license/YU000jp/logseq-plugin-flex-date-format?color=blue)](https://github.com/YU000jp/logseq-plugin-flex-date-format/LICENSE)
[![ダウンロード](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-flex-date-format/total.svg)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
 公開日: 2023/08/23

## 概要

- 日付リンクまたは日付タイトルが対象です。
  1. メイン: **選択した日付形式のスタイルを適用する** 🆕
  1. オプション: 日付リンクの曜日をローカライズ 🆙
    - 2023/07/22 => 2023/07/22 (土)
  1. オプション: 年パターンで日付にアイコンを追加

---

## はじめに

1. Logseq マーケットプレースからプラグインをインストールしてください。
   - 右上のツールバーで [`---`] を押して [`プラグイン`] を開きます。 [`マーケットプレイス`] を選択します。検索フィールドに `Flex` と入力し、検索結果から選択してインストールします。
1. プラグイン設定で、設定をおこなってください。

---

## ショーケース / 質問 / アイデア / ヘルプ

> 質問やこのような情報を探すには、[ディスカッション](https://github.com/YU000jp/logseq-plugin-flex-date-format/discussions) タブに移動してください。

1. Tablerアイコンを指定しても正しく表示されない場合、ほかのアイコンを指定してください。HTML charではないか、Logseqがそのアイコンに対応していない可能性があります。Logseqに適用されるTabler-iconのバージョンに依存します。
1. **⚠️「曜日と週番号を表示」プラグインを使用している場合、「曜日」が重複する可能性があります。**
   > どちらかのプラグインの設定で無効にしてください。
1. このプラグインは、Logseq の DOM 構造に依存しています。Logseq のバージョン更新により DOM 構造が変更された場合、スタイルが適用されない場合があります。CSSを調整して対応します。何か気づいたら、issueを提起してください。

- おすすめ
  1. 日付入力の解析 > [日付 NLP プラグイン](https://github.com/hkgnp/logseq-datenlp-plugin)
  1. ユーザーの日付形式を変更した場合 > [変更以前の日付形式を置換するプラグイン](https://github.com/YU000jp/logseq-plugin-legacy-date-format)
  1. 週番号が必要な場合 > [曜日と週番号を表示するプラグイン](https://github.com/YU000jp/logseq-plugin-show-weekday-and-week-number/)

## クレジット

1. 製作者 > [@YU000jp](https://github.com/YU000jp)

<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
