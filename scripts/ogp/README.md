# OGP 画像の生成

ハブ（このリポジトリ）と5ツールの共有用画像（1200×630、Noto Sans JP）を
HTML テンプレートから生成するスクリプト。サイト本体には依存を持ち込まないよう、
このディレクトリだけで完結させ、`_config.yml` の `exclude` で公開対象から外している。

## 使い方

```sh
cd scripts/ogp
npm install
npx playwright install chromium   # 初回のみ（手元に Chromium があれば CHROMIUM_PATH で指定してもよい）
npm run gen                        # → out/ に 6 枚出力
```

| 出力 | 配置先 |
|---|---|
| `out/hub.png` | このリポジトリ直下の `ogp.png` |
| `out/<ツール名>.png` | 各ツールのリポジトリ直下の `ogp.png`（例: `kanji-checker.png` → `edi-tool/kanji-checker/ogp.png`） |

## 変更するとき

- ツール名・説明・タグは `gen.js` の `TOOLS`、ハブの文言は `hubHtml` を編集する。
- アイコンはハブ `index.html` のカードと同じ線画 SVG（`ICONS`）。ツールを増減したら両方をそろえる。
- 各ページの `<meta property="og:image">` は `ogp.png`（1200×630）を指している。ファイル名を変えるなら各ページも直す。
- SNS はプレビューをキャッシュするため、画像を差し替えても反映まで時間がかかることがある。
