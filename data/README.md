# facilities.csv 管理ルール

このファイルは、介護事業所ポータルの掲載データです。

## 編集方法

1. facilities.csv をExcelで開く
2. 内容を編集する
3. CSV UTF-8形式で保存する
4. サイトを再読み込みして反映を確認する

## 列の説明

| 列名 | 内容 |
|---|---|
| name | 事業所名 |
| slug | URL用ID。英数字とハイフンのみ |
| area | エリア |
| type | サービス種別 |
| icon | 表示アイコン |
| color | 表示色。green / blue / amber / purple |
| desc | 事業所説明文 |
| tags | タグ。複数ある場合は `|` で区切る |
| address | 所在地 |
| tel | 電話番号 |
| hours | 営業時間 |
| company | 運営法人 |
| officeNumber | 事業所番号 |
| serviceArea | 対応エリア |

## 注意点

- 文章内にカンマ `,` は使わない
- タグは `|` で区切る
- slugは重複させない
- slugを変更すると詳細ページのURLも変わる
- CSVは UTF-8 形式で保存する