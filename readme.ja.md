# Logseq Plugin: Flexible date format

[English](https://github.com/YU000jp/logseq-plugin-flex-date-format) | [日本語](https://github.com/YU000jp/logseq-plugin-flex-date-format/blob/main/readme.ja.md)

- 日付表示形式をローカライズします。または選択した形式のスタイルに切り替えます。
- ファイルに記録された日付形式を、表示される形式から分離します。
   > *このプラグインはグラフやファイルに影響を与えません*

[![最新リリースバージョン](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-flex-date-format)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
[![ライセンス](https://img.shields.io/github/license/YU000jp/logseq-plugin-flex-date-format?color=blue)](https://github.com/YU000jp/logseq-plugin-flex-date-format/LICENSE)
[![ダウンロード](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-flex-date-format/total.svg)](https://github.com/YU000jp/logseq-plugin-flex-date-format/releases)
 公開日: 2023/08/23

## オプション

1. **選択した日付形式のスタイルに切り替える** 🆕
   - 日付リンクまたは日付タイトル
   - "ローカライズ" モードまたは別の日付形式を選択

1. 日付リンクの曜日をローカライズ 🆙
   - "ローカライズ" モード以外
   - ユーザーの日付形式に曜日が含まれていない場合、日付リンクにローカライズされた曜日を追加
   - その形式にそれが含まれている場合、日付リンク内の曜日をローカライズ
   - 2023/07/22 => 2023/07/22 (土)

---

## はじめに

Logseq マーケットプレースからインストールしてください

  - 右上のツールバーで [`---`] を押して [`プラグイン`] を開きます。 [`マーケットプレイス`] を選択します。検索フィールドに `Flex` と入力し、検索結果から選択してインストールします。

**⚠️「曜日と週番号を表示」プラグインを使用している場合、「曜日」が重複する可能性があります。**

  > プラグイン設定で無効にしてください。

### プラグイン設定

選択した日付形式に切り替える
  - 選択した日付形式を有効にする: トグル
    - `true` デフォルト
    - `false`
  - 上記のオプションが有効な場合、日付形式を選択: 選択
    > ⚠️ リンクを作成する際には使用できません。ユーザーの日付形式に基づいて作成してください。
    - `ローカライズ` default
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
  - 日付リンクをホバーした際に相対的な時間を表示する: トグル
    - `true` デフォルト
    - `false`

ローカライズされた曜日（`ローカライズ`モードを除く）
  - 曜日がユーザーの日付形式に含まれている場合、日付リンクの曜日をローカライズする: トグル
    - `true` デフォルト
    - `false`
  - 曜日がユーザーの日付形式に含まれていない場合、日付リンクにローカライズされた曜日を追加する: トグル
    - `true` デフォルト
    - `false`

`ローカライズ`モードの高度なオプション
  - ロケールを選択: 選択
    > ⚠️ リンクを作成する際には使用できません。ユーザーの日付形式に基づいて作成してください。
    - `デフォルト`              // グレゴリオ暦（デフォルト）
    - `en-US`                // 英語（アメリカ合衆国） - グレゴリオ暦（デフォルト）
    - `en-GB-u-ca-islamic`   // 英語（イギリス） - イスラム暦
    - `ja-JP-u-ca-japanese`   // 日本語（日本） - 和暦
    - `zh-Hans-CN`            // 中国語（中国） - グレゴリオ暦（デフォルト）
    - `zh-TW-u-ca-roc`        // 中国語（台湾） - 民国暦
    - `zh-Hant-TW-u-ca-taiwan`// 中国語（台湾） - グレゴリオ暦（デフォルト）
    - `zh-CN-u-ca-chinese`    // 中国語（中国） - 中国暦
    - `th-TH-u-nu-thai`       // タイ語（タイ） - タイ数字
    - `ar-SA-u-ca-islamic-umalqura`   // アラビア語（サウジアラビア） - イスラム（ウム・アルクラ）暦
    - `fa-IR-u-ca-persian`    // ペルシャ語（イラン） - ペルシャ暦（ジャラリ暦）
    - `he-IL-u-ca-hebrew`     // ヘブライ語（イスラエル） - ヘブライ暦
    - `th-TH-u-ca-buddhist`   // タイ語（タイ） - 仏教暦
    - `am-ET-u-ca-ethiopic`   // アムハラ語（エチオピア） - エチオピア暦

---

### おすすめ

日付入力の解析 > [日付 NLP プラグイン](https://github.com/hkgnp/logseq-datenlp-plugin)

ユーザーの日付形式を変更した場合 > [変更以前の日付形式を置換するプラグイン](https://github.com/YU000jp/logseq-plugin-legacy-date-format)

週番号が必要な場合 > [曜日と週番号を表示するプラグイン](https://github.com/YU000jp/logseq-plugin-show-weekday-and-week-number/)

## ショーケース / 質問 / アイデア / ヘルプ

> 質問やこのような情報を探すには、[ディスカッション](https://github.com/YU000jp/logseq-plugin-flex-date-format/discussions) タブに移動してください。

1. このプラグインは、Logseq の DOM 構造に依存しています。Logseq のバージョン更新により DOM 構造が変更された場合、スタイルが適用されない場合があります。CSSを調整して対応します。何か気づいたら、issueを提起してください。

製作者 > [@YU000jp](https://github.com/YU000jp)

<a href="https://www.buymeacoffee.com/yu000japan" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="🍌コーヒーを買ってください" style="height: 42px;width: 152px" ></a>
