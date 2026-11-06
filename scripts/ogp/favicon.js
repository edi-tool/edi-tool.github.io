// ハブと8ツールのファビコンを生成する。蛍光オレンジの角丸に、ハブのカードと同じ線のアイコンを墨で載せる。
// 使い方は scripts/ogp/README.md を参照。出力先: scripts/ogp/out/favicon/<リポジトリ名>/
//   favicon.svg（主）・favicon.ico（16/32/48）・favicon.png（192）・apple-touch-icon.png（180、角丸なし）
//   黒板補正さんだけ icon-192.png・icon-512.png（manifest.json 用）も出す。
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'out', 'favicon');
const ACCENT = '#ff6a00'; // edi-tool/.github DESIGN.md の --accent
const INK = '#0a0a0a';    // --on-accent

// ハブ index.html のカードと同じ線画（24×24）。ハブは一覧を表す格子
const ICONS = {
  'edi-tool.github.io': '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  'edu-kanji-checker': '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  'kanji-checker': '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'hyoki-checker': '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  'moji-counter': '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  'color-palette': '<circle cx="13.5" cy="6.5" r="1.2" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1.2" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1.2" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  'kokuban-adjust': '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m7 13 3-3 2 2 4-4"/>',
  'page-count': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  'zukei-drafter': '<path d="M12 2 22 9.5 18 21H6L2 9.5Z"/>',
};

// 64×64 の格子。rx=0 は apple-touch-icon 用（iOS が自分で角を丸める）
const svg = (body, rx = 14) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`
  + `<rect width="64" height="64" rx="${rx}" fill="${ACCENT}"/>`
  + `<g transform="translate(11 11) scale(1.75)" fill="none" stroke="${INK}" color="${INK}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>\n`;

// PNG を並べた ICO（Vista 以降・主要ブラウザが対応）
function ico(pngs) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(({ size, buf }, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(size >= 256 ? 0 : size, e); head.writeUInt8(size >= 256 ? 0 : size, e + 1);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(buf.length, e + 8); head.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p.buf)]);
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const pg = await b.newPage({ deviceScaleFactor: 1 });
  const shot = async (markup, size) => {
    await pg.setViewportSize({ width: size, height: size });
    await pg.setContent(`<html><body style="margin:0;background:transparent">${markup.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    return pg.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  };
  for (const [repo, body] of Object.entries(ICONS)) {
    const dir = path.join(OUT, repo);
    fs.mkdirSync(dir, { recursive: true });
    const main = svg(body);
    fs.writeFileSync(path.join(dir, 'favicon.svg'), main);
    fs.writeFileSync(path.join(dir, 'favicon.png'), await shot(main, 192));
    fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), await shot(svg(body, 0), 180));
    const small = [];
    for (const size of [16, 32, 48]) small.push({ size, buf: await shot(main, size) });
    fs.writeFileSync(path.join(dir, 'favicon.ico'), ico(small));
    if (repo === 'kokuban-adjust') {
      fs.writeFileSync(path.join(dir, 'icon-192.png'), await shot(main, 192));
      fs.writeFileSync(path.join(dir, 'icon-512.png'), await shot(main, 512));
    }
    console.log(dir);
  }
  await b.close();
})();
