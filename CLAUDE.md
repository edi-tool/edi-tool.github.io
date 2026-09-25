# edi-tool.github.io

組織 `edi-tool` のルートサイト（GitHub Pages のユーザー/組織サイト）。
公開URL: https://edi-tool.github.io/

編集実務向けの公開ツール群へのハブ（一覧）ページと、サブドメイン全体で共有される
`robots.txt`・`sitemap.xml`・Google Search Console 検証ファイルを配信する。

## 実行コマンド

- プレビュー: `python -m http.server 8000`
- 整形: `npx prettier --write .`
- テスト: `npm test`（掲載ツールの整合）/ HTML 静的チェック: `npm run check`

## プロジェクト方針

- 依存なしの Vanilla HTML/CSS。極限の軽量化を維持し、ライブラリを追加しない。
- デザインは全ツール共通のトークン（背景 #f8f6f2 / アクセント #f28c06 ほか）で統一。
- `sitemap.xml` は手動管理（各ツールを束ねた一覧）。jekyll-sitemap は使わない
  （導入すると sitemap.xml が上書きされるため）。ツールを増減したら手で更新する。
- `robots.txt` は github.io サブドメイン全体で共有され、このリポジトリからのみ配信できる。
- sku-to-qr は社内用（noindex）のためハブ・サイトマップに含めない。
- ツールを増減したら `index.html` のカード・`sitemap.xml`・`404.html` の一覧・OGP 画像（`scripts/ogp/`）をそろえて更新する。
- ハブには「ブラウザ完結・無料・登録不要」のような特長バッジや GitHub へのリンクを置かない（ユーザー判断: かえって胡散臭く見える）。
- 各ツールの SEO 規約（新規ツールも同じに）: `<title>`/`og:title` は「{機能名} | {ツール名}」、`og:site_name` は edi-tool。
  JSON-LD は `@graph` に WebApplication（`isPartOf` → `https://edi-tool.github.io/#website`、`publisher` → `#organization`）と BreadcrumbList（edi-tool > ツール名）。
  この `@id` はハブの `index.html` で定義しているので変更しない。
- 各ツールの見出し上の「edi-tool」リンクとフッターの「← edi-tool ツール一覧」でハブへ戻れる構成を保つ。
- 軽微な修正での push 禁止。ローカルサーバーで検証し、複数修正を1コミットに集約。
