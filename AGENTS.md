# edi-tool.github.io

組織 `edi-tool` のルートサイト（GitHub Pages の組織サイト）。公開URL: https://edi-tool.github.io/
編集実務向けの公開ツール群へのハブ（一覧）ページと、サブドメイン全体で共有される `robots.txt`・`sitemap.xml`・Google Search Console 検証ファイルを配信する。
共通方針は [edi-tool 開発原則](https://github.com/edi-tool/.github/blob/main/PRINCIPLES.md)。`CLAUDE.md` はこのファイルを取り込むだけなので、エージェント共通の規則はここに書く。

## 実行コマンド

- プレビュー: `python -m http.server 8000`
- 整形: `npx prettier --write .`
- テスト: `npm test`（Node.js 22 以上、依存なし。掲載ツールの整合を確認）
- HTML 静的チェック: `npm run check`

## 守ること

- 依存なしの Vanilla HTML/CSS。極限の軽量化を維持し、ライブラリを追加しない。
- デザインは全ツール共通のトークン（背景 #f8f6f2 / アクセント #f28c06 ほか）で統一。
- ツールを増減したら `index.html` のカード・`sitemap.xml`・README の「掲載ツール」表・`404.html` の一覧・OGP 画像（`scripts/ogp/`）をそろえ、別リポジトリ edi-tool/.github の `profile/README.md` も更新する。
- `sitemap.xml` は手動管理（各ツールを束ねた一覧）。jekyll-sitemap を導入しない（sitemap.xml が上書きされるため）。
- `robots.txt` は github.io サブドメイン全体で共有され、このリポジトリからのみ配信できる。
- 社内用の sku-to-qr（noindex）はハブ・サイトマップに載せない。
- ハブには「ブラウザ完結・無料・登録不要」のような特長バッジや GitHub へのリンクを置かない（ユーザー判断: かえって胡散臭く見える）。
- 各ツールの SEO 規約（新規ツールも同じに）: `<title>`/`og:title` は「{機能名} | {ツール名}」、`og:site_name` は edi-tool。JSON-LD は `@graph` に WebApplication（`isPartOf` → `https://edi-tool.github.io/#website`、`publisher` → `#organization`）と BreadcrumbList（edi-tool > ツール名）。
- `index.html` の JSON-LD の `@id`（`#website`・`#organization`）は各ツールから参照されるため変更しない。
- 各ツールの見出し上の「edi-tool」リンクとフッターの「← edi-tool ツール一覧」でハブへ戻れる構成を保つ。
- `scripts/check-static.mjs` は edi-tool/.github の templates からのコピー。直すときは原本も直す。
- 軽微な修正での push 禁止。ローカルサーバーで検証し、複数修正を1コミットに集約する。
