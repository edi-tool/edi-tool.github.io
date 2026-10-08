# edi-tool.github.io

edi-tool のツール一覧（ハブ）ページと、サブドメイン共通の `robots.txt`・`sitemap.xml` を配信する。公開URL: https://edi-tool.github.io/
詳しい方針は CLAUDE.md、共通方針は [edi-tool 開発原則](https://github.com/edi-tool/.github/blob/main/PRINCIPLES.md)。

## 実行コマンド

- プレビュー: `python -m http.server 8000`
- テスト: `npm test`（Node.js 22 以上、依存なし。掲載ツールの整合を確認）
- HTML 静的チェック: `npm run check`

## 守ること

- 依存なしの Vanilla HTML/CSS を維持する。ライブラリを追加しない。
- ツールを増減したら `index.html` のカード・`sitemap.xml`・README の「掲載ツール」表・`404.html` の一覧・OGP 画像（`scripts/ogp/`）をそろえ、別リポジトリ edi-tool/.github の `profile/README.md` も更新する。
- `sitemap.xml` は手動管理。jekyll-sitemap を導入しない。社内用の sku-to-qr はハブ・サイトマップに載せない。
- `index.html` の JSON-LD の `@id`（`#website`・`#organization`）は各ツールから参照されるため変更しない。
- `scripts/check-static.mjs` は edi-tool/.github の templates からのコピー。直すときは原本も直す。
- 軽微な修正での push 禁止。複数修正をまとめてから push する。
