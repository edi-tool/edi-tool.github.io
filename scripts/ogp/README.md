# OGP 画像とファビコンの生成

ハブ（このリポジトリ）と8ツールの共有用画像（1200×630、Noto Sans JP）を
HTML テンプレートから生成するスクリプト。サイト本体には依存を持ち込まないよう、
このディレクトリだけで完結させ、`_config.yml` の `exclude` で公開対象から外している。

## 使い方

```sh
cd scripts/ogp
npm install
npx playwright install chromium   # 初回のみ（手元に Chromium があれば CHROMIUM_PATH で指定してもよい）
npm run gen                        # → out/ に OGP 9 枚
node favicon.js                    # → out/favicon/<リポジトリ名>/ にファビコン一式
```

| 出力 | 配置先 |
|---|---|
| `out/hub.png` | このリポジトリ直下の `ogp.png` |
| `out/<ツール名>.png` | 各ツールのリポジトリ直下の `ogp.png`（例: `kanji-checker.png` → `edi-tool/kanji-checker/ogp.png`） |

## ファビコン（`favicon.js`）

蛍光オレンジ（`--accent`）の角丸に、ハブのカードと同じ線のアイコンを墨で載せる。ハブは一覧を表す格子。

| 出力 | 用途 |
|---|---|
| `favicon.svg` | 主に使うファビコン |
| `favicon.ico` | 16・32・48px（古いブラウザ・ブックマーク用） |
| `favicon.png` | 192px（外部から PNG で参照されたとき用） |
| `apple-touch-icon.png` | 180px・角丸なし（iOS のホーム画面。角は iOS が丸める） |
| `icon-192.png`・`icon-512.png` | 黒板補正さんの `manifest.json` 用 |

`out/favicon/<リポジトリ名>/` の中身を、そのリポジトリの直下にそのまま上書きする。各ページの `<head>` は次の3行にそろえる。

```html
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

## 変更するとき

- ツール名・説明・タグは `gen.js` の `TOOLS`、ハブの文言は `hubHtml` を編集する。
- アイコンはハブ `index.html` のカードと同じ線画 SVG（`ICONS`）。ツールを増減したら両方をそろえる。
- `@fontsource/noto-sans-jp` が入っていなければ、実行環境の Noto Sans JP で描く（Windows に入っていればそれを使う）。
- 各ページの `<meta property="og:image">` は `ogp.png`（1200×630）を指している。ファイル名を変えるなら各ページも直す。
- SNS はプレビューをキャッシュするため、画像を差し替えても反映まで時間がかかることがある。
