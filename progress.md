# 進捗: edi-tool 組織ルートサイト

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

## 残タスク（手動）

- Google Search Console で `https://edi-tool.github.io/` を URLプレフィックスで登録・検証し、
  `sitemap.xml` を送信する。

## メモ

- `sitemap.xml` は手動管理。ツール増減時は `index.html` と併せて更新する。
- sku-to-qr は社内用(noindex)のため一覧・サイトマップに非掲載。
