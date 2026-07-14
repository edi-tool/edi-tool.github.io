# 進捗: edi-tool 組織ルートサイト

## 2026-07-14 新規作成

- 組織 `edi-tool` のルートサイト `edi-tool.github.io` を新規作成し公開。
- `index.html`（公開4ツールのハブ）、`robots.txt`、`sitemap.xml`（5URL）、
  Search Console 検証ファイル、`_config.yml`、favicon、LICENSE を配置。
- GitHub Pages を `master` ルートから有効化しビルド完了。HTTPS強制が有効。
- 稼働確認済み: `/`・`/sitemap.xml`・`/robots.txt`・検証ファイルすべて200で配信。

## 残タスク（手動）

- Google Search Console で `https://edi-tool.github.io/` を URLプレフィックスで登録・検証し、
  `sitemap.xml` を送信する。

## メモ

- `sitemap.xml` は手動管理。ツール増減時は `index.html` と併せて更新する。
- sku-to-qr は社内用(noindex)のため一覧・サイトマップに非掲載。
