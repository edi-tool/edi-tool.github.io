// ハブの掲載ツールが index.html・sitemap.xml・README の 3 か所で一致しているかを確認する。
// （4 か所目の Org プロフィール edi-tool/.github/profile/README.md は別リポジトリのため手で確認する）
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const read = (f) => readFileSync(join(__dirname, '..', f), 'utf8');
const ROOT = 'https://edi-tool.github.io/';
// 社内向け（noindex）のため、どこにも載せないツール
const PRIVATE_TOOLS = ['sku-to-qr'];

const toolUrls = (urls) => [...new Set(urls)].filter((u) => u !== ROOT && u.startsWith(ROOT)).sort();
const fromIndex = () => toolUrls([...read('index.html').matchAll(/<a[^>]+href="([^"]+)"/g)].map((m) => m[1]));
const fromSitemap = () => toolUrls([...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const fromReadme = () => toolUrls([...read('README.md').matchAll(/^\|[^\n]*\| (https:\/\/edi-tool\.github\.io\/[^ |]+) \|$/gm)].map((m) => m[1]));

test('index.html のカードと sitemap.xml のツールが一致する', () => {
  assert.ok(fromIndex().length > 0);
  assert.deepEqual(fromSitemap(), fromIndex());
});

test('README の掲載ツール表と index.html のカードが一致する', () => {
  assert.deepEqual(fromReadme(), fromIndex());
});

test('sitemap.xml にハブ自身が含まれている', () => {
  assert.match(read('sitemap.xml'), new RegExp(`<loc>${ROOT}</loc>`));
});

test('社内向けツールはハブ・サイトマップに載せない', () => {
  for (const name of PRIVATE_TOOLS) {
    assert.ok(!fromIndex().some((u) => u.includes(`/${name}/`)), `index.html に ${name}`);
    assert.ok(!fromSitemap().some((u) => u.includes(`/${name}/`)), `sitemap.xml に ${name}`);
  }
});

test('robots.txt がサイトマップを指している', () => {
  assert.match(read('robots.txt'), /^Sitemap: https:\/\/edi-tool\.github\.io\/sitemap\.xml$/m);
});
