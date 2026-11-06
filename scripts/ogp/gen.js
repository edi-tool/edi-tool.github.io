// ハブと8ツールの共有用 OGP 画像（1200×630）を HTML テンプレートから生成する。
// 使い方は scripts/ogp/README.md を参照。出力先: scripts/ogp/out/<名前>.png
// → 各リポジトリ直下の ogp.png として配置する（ハブは hub.png → このリポジトリの ogp.png）。
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
// @fontsource/noto-sans-jp があれば同梱して描く。なければ実行環境の Noto Sans JP を使う
let F = null;
try { F = path.join(path.dirname(require.resolve('@fontsource/noto-sans-jp/package.json')), 'files'); } catch { /* システムフォントで描く */ }
const font = (f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(F, f)).toString('base64')})`;
const OUT = path.join(__dirname, 'out');
const I = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICONS = {
  edu: I('<path d="M22 10 12 5 2 10l10 5 10-5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>'),
  kanji: I('<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>'),
  hyoki: I('<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>'),
  kokuban: I('<rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="m7 13 3-3 2 2 4-4"></path>'),
  page: I('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'),
  moji: I('<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>'),
  qr: I('<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><path d=\"M14 14h3v3h-3z\"/><path d=\"M20 14v.01\"/><path d=\"M14 20h.01\"/><path d=\"M17 20h4v-3\"/>'),
  zukei: I('<path d="M12 2 22 9.5 18 21H6L2 9.5Z"></path>'),
  palette: I('<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>'),
};
const TOOLS = [
  { out: 'edu-kanji-checker.png', icon: 'edu', name: '教育漢字さん', tag: '漢字を小学校の学習学年別に分類', chips: ['PDF・Word', '学年別の分布', 'ブラウザ完結'] },
  { out: 'kanji-checker.png', icon: 'kanji', name: '常用漢字さん', tag: '表外漢字を文脈つきで検出', chips: ['PDF・Word', '人名用漢字も判別', 'ブラウザ完結'] },
  { out: 'hyoki-checker.png', icon: 'hyoki', name: '表記統一さん', tag: '文章中の表記ゆれを検出・統一', chips: ['テキスト・Word・PDF', '辞書・形態素解析', 'ブラウザ完結'] },
  { out: 'kokuban-adjust.png', icon: 'kokuban', name: '黒板補正さん', tag: '斜めに撮った黒板を、まっすぐに', chips: ['写真', '高解像度のまま保存', 'ブラウザ完結'] },
  { out: 'page-count.png', icon: 'page', name: 'ページ調整さん', tag: '台割りに合うページ数と背幅を概算', chips: ['ページ数', '背幅', 'ブラウザ完結'] },
  { out: 'zukei-drafter.png', icon: 'zukei', name: '図形作成さん', tag: '数値入力から2D/3D図形を生成', chips: ['PNG・SVG', '教材・プリント向け', 'ブラウザ完結'] },
  { out: 'sku-to-qr.png', icon: 'qr', name: 'QRコードさん', tag: 'SKUから書籍のQRコードを作成', chips: ['東洋館EC用', '印刷用 1600px', 'ブラウザ完結'], hub: false },
  { out: 'moji-counter.png', icon: 'moji', name: '文字数集計さん', tag: '貼るだけで文字数がすぐ分かる', chips: ['改行・空白を除く', '上限までの残り', 'ブラウザ完結'] },
  { out: 'color-palette.png', icon: 'palette', name: '配色提案さん', tag: '印象語から配色を探して、AIに渡す', chips: ['24案を比較', 'AI向け指示文', 'ブラウザ完結'] },
];
const css = (F ? `
@font-face { font-family: N; font-weight: 400; src: ${font('noto-sans-jp-latin-400-normal.woff2')}; }
@font-face { font-family: N; font-weight: 700; src: ${font('noto-sans-jp-latin-700-normal.woff2')}; }
@font-face { font-family: NJ; font-weight: 400; src: ${font('noto-sans-jp-japanese-400-normal.woff2')}; }
@font-face { font-family: NJ; font-weight: 700; src: ${font('noto-sans-jp-japanese-700-normal.woff2')}; }` : '') + `
* { box-sizing: border-box; }
/* 配色は edi-tool/.github の DESIGN.md（2026-11-06 版） */
body { margin: 0; width: 1200px; height: 630px; background: #f5f5f7; font-family: N, NJ, 'Noto Sans JP', sans-serif; color: #0a0a0a; letter-spacing: -0.5px; }
.card { position: absolute; inset: 48px; background: #fff; border: 2px solid #e5e5ea; border-radius: 32px; padding: 64px 72px; overflow: hidden; }
.brand { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 800; color: #0a0a0a; letter-spacing: 0; }
.mark { width: 26px; height: 26px; border-radius: 7px; background: #ff6a00; flex: none; }
.row { display: flex; align-items: center; gap: 36px; margin-top: 40px; }
.icon { width: 132px; height: 132px; border-radius: 32px; background: #ff6a00; color: #0a0a0a; display: flex; align-items: center; justify-content: center; flex: none; }
.icon svg { width: 76px; height: 76px; }
.name { font-size: 84px; font-weight: 800; line-height: 1.15; letter-spacing: -2px; }
.tag { font-size: 38px; color: #52525b; margin-top: 12px; }
.chips { position: absolute; left: 72px; bottom: 60px; display: flex; gap: 16px; }
.chip { font-size: 26px; font-weight: 700; color: #3f3f46; background: #f0f0f3; border: 2px solid #e5e5ea; border-radius: 999px; padding: 8px 24px; }
.hub-title { font-size: 96px; font-weight: 800; letter-spacing: -2px; line-height: 1.1; margin-top: 20px; }
.hub-lead { font-size: 36px; color: #52525b; margin-top: 16px; line-height: 1.45; }
.hub-icons { position: absolute; right: 72px; bottom: 58px; display: flex; gap: 12px; }
.hub-icons .icon { width: 72px; height: 72px; border-radius: 18px; }
.hub-icons svg { width: 40px; height: 40px; }
`;
const toolHtml = (t) => `<div class="card">
  <div class="brand"><span class="mark"></span>edi-tool</div>
  <div class="row"><div class="icon">${ICONS[t.icon]}</div>
    <div><div class="name">${t.name}</div><div class="tag">${t.tag}</div></div></div>
  <div class="chips">${t.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>`;
const hubHtml = `<div class="card">
  <div class="brand"><span class="mark"></span>edi-tool.github.io</div>
  <div class="hub-title">edi-tool</div>
  <div class="hub-lead">執筆・編集の実務に役立つ<br>ブラウザ完結の無料ツール集</div>
  <div class="hub-icons" style="left:72px;right:auto">${TOOLS.filter(t => t.hub !== false).map(t => `<div class="icon">${ICONS[t.icon]}</div>`).join('')}</div></div>`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  // CHROMIUM_PATH があればそのブラウザを使う（未指定なら Playwright 同梱のもの）
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const jobs = [...TOOLS.map(t => [t.out, toolHtml(t)]), ['hub.png', hubHtml]];
  for (const [out, html] of jobs) {
    await pg.setContent(`<html><head><style>${css}</style></head><body>${html}</body></html>`);
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(300);
    await pg.screenshot({ path: path.join(OUT, out), type: 'png' });
    console.log(path.join(OUT, out));
  }
  await b.close();
})();
