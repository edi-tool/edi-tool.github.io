# edi-tool.github.io

組織 [`edi-tool`](https://github.com/edi-tool) のルートサイト（GitHub Pages 組織サイト）。
公開URL: **https://edi-tool.github.io/**

教育書・出版の編集実務向けツール群へのハブ（一覧）ページと、`edi-tool.github.io`
サブドメイン全体で共有される `robots.txt` / `sitemap.xml` / Google Search Console
検証ファイルを配信する。

## 掲載ツール

| ツール | 内容 | URL |
|---|---|---|
| 教育漢字さん | 漢字を小学校の学習学年別に表示 | https://edi-tool.github.io/edu-kanji-checker/ |
| 常用漢字さん | 常用漢字外（表外漢字）を検出 | https://edi-tool.github.io/kanji-checker/ |
| 表記統一さん | 表記ゆれを検出・統一 | https://edi-tool.github.io/hyoki-checker/ |
| ページ調整さん | ページ数提案・背幅概算 | https://edi-tool.github.io/page-count/ |

※ 社内用の `sku-to-qr` は `noindex` のため一覧・サイトマップに含めない。

## 構成

- `index.html` — ハブページ（依存なしの Vanilla HTML/CSS、共通デザイントークン）
- `robots.txt` — サブドメイン全体のクロール設定（ルートからのみ配信可能）
- `sitemap.xml` — 公開ツールを束ねた一覧サイトマップ（手動管理）
- `googled180bd734463e748.html` — Search Console 検証ファイル

## メンテナンス

- ツールを増減したら `index.html` のカードと `sitemap.xml` を手動で更新する。
- `sitemap.xml` は手動管理のため `jekyll-sitemap` は使わない。

## ライセンス

MIT License © 2026 ISHIKAWA, Natsuki
