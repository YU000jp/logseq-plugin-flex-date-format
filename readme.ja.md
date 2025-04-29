# 📅 Logseq プラグイン：Flexible date format (日付表示カスタマイズ)

> ファイルを変更せずに、日付の表示方法をカスタマイズできます！

- ユーザー日付形式に対する視覚的な表示をローカライズする
  1. 選択した日付形式のスタイルを適用します。
     > ファイルに記録された日付形式を、表示される形式から分離します
> *このプラグインはグラフやファイルに影響を与えません*

> [!WARNING]
>現在、このプラグインはLogseq dbバージョンでは動作しません。

<div align="right">

[English](https://github.com/YU000jp/logseq-plugin-flex-date-format) | [日本語](https://github.com/YU000jp/logseq-plugin-flex-date-format/blob/main/readme.ja.md) [![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-flex-date-format)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
[![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-flex-date-format?color=blue)](https://github.com/YU000jp/logseq-plugin-flex-date-format/LICENSE)
[![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-flex-date-format/total.svg)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
 Published 2023/08/23 <a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
 </div>

## ✨ 主な機能

1. **日付表示のカスタマイズ**
   - 好みの日付形式で表示
   - ファイルの内容はそのまま保持
   
2. **スマートなローカライズ**
   - 日本語での日付表示
   - 曜日の追加表示（例：2023/07/22 → 2023/07/22 (土)）

## 🚀 かんたん始め方

1. **インストール**: 
   > プラグイン → マーケットプレース → 「Flex」で検索

2. **設定**:
   > プラグイン設定を開いて好みの表示形式を選択

3. **完了！**
   > 選択した形式で日付が表示されます

## 概要

- 日付リンクまたは日付タイトルが対象です。
  1. メイン: **選択した日付形式のスタイルを適用する** 🆕
  1. オプション: 日付リンクの曜日をローカライズ 🆙
     - 2023/07/22 => 2023/07/22 (土)
  1. オプション: 年の区切りに一致する日付にアイコンを追加 🆕20240204

---

## はじめに

1. Logseq マーケットプレースからプラグインをインストールしてください。
   - 右上のツールバーで [`---`] を押して [`プラグイン`] を開きます。 [`マーケットプレイス`] を選択します。検索フィールドに `Flex` と入力し、検索結果から選択してインストールします。
1. プラグイン設定で、設定をおこなってください。
1. もし、Tabler-iconのアイコンを使う場合は、 [`Tabler picker` プラグイン](https://github.com/yoyurec/logseq-tabler-picker)をインストールし、有効にしてください。
1. ロケール指定

    | ロケール                | 説明                                                 |
    |-----------------------|------------------------------------------------------|
    | default               | グレゴリオ暦（デフォルト）                              |
    | am-ET-u-ca-ethiopic   | アムハラ語（エチオピア） - エチオピア暦                  |
    | ar-EG                 | エジプト                                              |
    | ar-SA                 | アラビア語（サウジアラビア） - グレゴリオ暦（デフォルト）  |
    | ar-SA-u-ca-islamic-umalqura | アラビア語（サウジアラビア） - イスラム（ウム・アルクラ）暦 |
    | bn-BD                 | バングラデシュ                                          |
    | de-DE                 | ドイツ                                                |
    | en-AU                 | オーストラリア                                          |
    | en-CA                 | カナダ（英語）                                        |
    | en-GB                 | イギリス（英語） - グレゴリオ暦（デフォルト）              |
    | en-GB-u-ca-islamic   | イギリス（英語） - イスラム暦                           |
    | en-GB-u-ca-persian   | イギリス（英語） - ペルシャ暦                           |
    | en-US                 | アメリカ合衆国（英語） - グレゴリオ暦（デフォルト）        |
    | en-US-u-ca-islamic   | アメリカ合衆国（英語） - イスラム暦                     |
    | en-US-u-ca-persian   | アメリカ合衆国（英語） - ペルシャ暦                     |
    | es-AR                 | アルゼンチン                                           |
    | es-CL                 | チリ                                                 |
    | es-CO                 | コロンビア                                             |
    | es-CR                 | コスタリカ                                             |
    | es-DO                 | ドミニカ共和国                                         |
    | es-EC                 | エクアドル                                             |
    | es-ES                 | スペイン                                               |
    | es-GT                 | グアテマラ                                             |
    | es-HN                 | ホンジュラス                                             |
    | es-MX                 | メキシコ                                               |
    | es-NI                 | ニカラグア                                             |
    | es-PA                 | パナマ                                                 |
    | es-PE                 | ペルー                                                 |
    | es-PR                 | プエルトリコ                                             |
    | es-SV                 | エルサルバドル                                           |
    | es-UY                 | ウルグアイ                                             |
    | es-VE                 | ベネズエラ                                             |
    | fa-IR                 | ペルシャ語（イラン） - グレゴリオ暦（デフォルト）          |
    | fa-IR-u-ca-persian   | ペルシャ語（イラン） - ペルシャ暦（ジャラリ）               |
    | fr-CA                 | カナダ（フランス語）                                     |
    | fr-FR                 | フランス                                               |
    | he-IL-u-ca-hebrew    | ヘブライ語（イスラエル） - ヘブライ暦                      |
    | hi-IN                 | インド                                                 |
    | id-ID                 | インドネシア                                             |
    | it-IT                 | イタリア                                               |
    | ja-JP                 | 日本語（日本） - グレゴリオ暦（デフォルト）                |
    | ja-JP-u-ca-japanese   | 日本語（日本） - 和暦                                      |
    | ko-KR                 | 韓国語（韓国） - グレゴリオ暦（デフォルト）                |
    | ko-KR-u-ca-korean     | 韓国語（韓国） - 朝鮮暦                                    |
    | ms-MY                 | マレーシア                                               |
    | nl-NL                 | オランダ                                               |
    | pl-PL                 | ポーランド                                               |
    | pt-BR                 | ブラジル                                               |
    | pt-PT                 | ポルトガル                                               |
    | ru-RU                 | ロシア                                                 |
    | th-TH                 | タイ                                                   |
    | th-TH-u-ca-buddhist  | タイ語（タイ） - 仏教暦                                    |
    | th-TH-u-nu-thai      | タイ語（タイ） - タイ数字                                  |
    | tr-TR                 | トルコ                                                 |
    | vi-VN                 | ベトナム                                               |
    | zh-CN                 | 中国語（中国）                                           |
    | zh-CN-u-ca-chinese   | 中国語（中国） - 中国暦                                    |
    | zh-Hans-CN           | 中国語（中国） - グレゴリオ暦（デフォルト）                |
    | zh-Hant-TW-u-ca-taiwan| 中国語（台湾） - グレゴリオ暦（デフォルト）                |
    | zh-TW                 | 台湾                                                   |
    | zh-TW-u-ca-roc       | 中国語（台湾） - 中華民国暦                               |

   > 不足しているロケールがある場合は、教えてください。
---

## ショーケース / 質問 / アイデア / ヘルプ

> 質問やこのような情報を探すには、[ディスカッション](https://github.com/YU000jp/logseq-plugin-flex-date-format/discussions) タブに移動してください。

1. Tablerアイコンを指定する場合は、[Tabler Picker プラグイン](https://github.com/yoyurec/logseq-tabler-picker)をインストールしてください。アイコンが正しく表示されない場合、ほかのアイコンを指定してください。HTML charではないか、Logseqがそのアイコンに対応していない可能性があります。Logseqに適用されるTabler-iconのバージョンに依存します。
1. **⚠️「曜日と週番号を表示」プラグインを使用している場合、「曜日」が重複する可能性があります。**
   > どちらかのプラグインの設定で無効にしてください。
1. このプラグインは、Logseq の DOM 構造に依存しています。Logseq のバージョン更新により DOM 構造が変更された場合、スタイルが適用されない場合があります。CSSを調整して対応します。何か気づいたら、issueを提起してください。

- おすすめ
  1. 日付入力の解析 > [日付 NLP プラグイン](https://github.com/hkgnp/logseq-datenlp-plugin)
  1. ユーザーの日付形式を変更した場合 > [変更以前の日付形式を置換するプラグイン](https://github.com/YU000jp/logseq-plugin-legacy-date-format)
  1. 週番号が必要な場合 > [曜日と週番号を表示するプラグイン](https://github.com/YU000jp/logseq-plugin-show-weekday-and-week-number/)

## クレジット

- 製作者 > [@YU000jp](https://github.com/YU000jp)
