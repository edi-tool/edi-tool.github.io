# 進捗: edi-tool 組織ルートサイト

## 2026-09-24 セッション（SEO）

- `og:site_name`（edi-tool）を追加
- 構造化データを `@graph` 化し、WebSite に `@id`（`#website`）と publisher、Organization（`#organization`）を追加。各ツールの WebApplication から参照される

## 2026-07-14 新規作成

- 組織 `edi-tool` のルートサイト `edi-tool.github.io` を新規作成し公開。
- `index.html`（公開4ツールのハブ）、`robots.txt`、`sitemap.xml`（5URL）、
  Search Console 検証ファイル、`_config.yml`、favicon、LICENSE を配置。
- GitHub Pages を `master` ルートから有効化しビルド完了。HTTPS強制が有効。
- 稼働確認済み: `/`・`/sitemap.xml`・`/robots.txt`・検証ファイルすべて200で配信。

## 2026-09-24 セッション（ハブのデザイン改善）

- 各カードにアイコン（インライン SVG）・対応形式チップ・右上の矢印を追加。ホバーで枠をアクセント色に。
- リード文の下に「ブラウザ完結・無料・登録不要」のバッジ。説明文の `word-break` を normal に（英字の途中折れ防止）。
- フッターに GitHub 組織へのリンク。`--text-sub` を #6b6b6b に（コントラスト改善）。
- 同日、5ツール側にも「edi-tool」リンク・ツール一覧への導線・コントラスト調整を入れた（各リポジトリの progress.md 参照）。

## 2026-09-24 セッション（第2弾: 404・OGP・改行）

- **404.html** を追加（組織サイト直下の存在しない URL で表示。ハブと同じトークン、ツール一覧へのリンク、noindex、アセットは絶対 URL）。
- **OGP**: 共有カード用の `ogp.png`（1200×630、Noto Sans JP で生成）を追加し、`og:image` をファビコンから差し替え、`twitter:card` を `summary_large_image` に。
- **改行**: body の `word-break: break-all` を `normal` + `overflow-wrap: anywhere` に変更。和文は従来どおり1字単位で折り返し、英単語（License、Word 等）は途中で割らない。

## 2026-09-24 セッション（ハブの簡素化）

- ヘッダー下の「ブラウザ完結・無料・登録不要」バッジを削除（かえって胡散臭く見えるため）。共有用 `ogp.png` のバッジも同様に削除して再生成。
- フッターの GitHub リンクを削除。

## 2026-09-24 セッションのまとめ（5ツール横断の UI/デザイン改善）

同日に各リポジトリで PR を出し、すべてマージ済み。詳細は各リポジトリの progress.md。

| リポジトリ | 主な変更 |
|---|---|
| edi-tool.github.io | カードのアイコン・対応形式・矢印、404.html、OGP 画像、特長バッジと GitHub リンクの削除 |
| edu-kanji-checker | ドロップゾーン、学年別分布バー、出現回数、タブの ARIA／キーボード操作、全学年印刷 |
| kanji-checker | ドロップゾーン、集計とコピー、文脈の折りたたみ、PDF 進行表示、印刷 |
| hyoki-checker | スマホで崩れていたレイアウトの修正、PC の作業領域を画面高に、絵文字→SVG、Render ビルド修正 |
| kokuban-adjust | PC でのドラッグ＆ドロップ・貼り付け |
| page-count | 全角数字入力、案ごとの背幅と「近い」表示 |

全ツール共通: 見出し上の「edi-tool」リンクとフッターのツール一覧リンク、`--text-sub` を #6b6b6b に、
文字用アクセント `--accent-text: #b35f00`（WCAG AA）、カードの上寄せ、`word-break: normal` + `overflow-wrap: anywhere`、
1200×630 の OGP 画像（生成スクリプトは `scripts/ogp/`）。

### 未対応（ユーザー判断待ち）

- オレンジ（#f28c06）のボタン上の白文字はコントラスト 2.4:1 で WCAG AA 未達。直すにはボタン色を濃くする必要があり、ブランドの見た目が変わる。
- ダークモード。手書き CSS の4ツールは容易だが、表記統一さんは Tailwind クラスに色が直書きのため改修量が大きい。
- Render の hyoki-checker-api（未接続のバックエンド）は、ビルド修正後にダッシュボードの Start Command
  （`uvicorn backend.main:app --host 0.0.0.0 --port $PORT`）の確認が必要。使わないなら停止してよい。

## 残タスク（手動）

- Google Search Console で `https://edi-tool.github.io/` を URLプレフィックスで登録・検証し、
  `sitemap.xml` を送信する。

## メモ

- `sitemap.xml` は手動管理。ツール増減時は `index.html` と併せて更新する。
- sku-to-qr は社内用(noindex)のため一覧・サイトマップに非掲載。
