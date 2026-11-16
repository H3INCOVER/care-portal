import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const { notFound } = require('next/navigation');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
process.chdir(root);
function load(file, overrides = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const compiledModule = { exports: {} };
  const localRequire = id => Object.hasOwn(overrides, id) ? overrides[id] : require(id);
  vm.runInNewContext(code, { module: compiledModule, exports: compiledModule.exports, require: localRequire,
    process, console, URLSearchParams }, { filename: file });
  return compiledModule.exports;
}

const real = load('lib/facilities.ts').getFacilities();
const afterImport = process.argv.includes('--after-import');
const styles = load('lib/service-types.ts');
const areaData = JSON.parse(fs.readFileSync('data/area-readings/itoshima.json', 'utf8'));
const areaHelpers = load('lib/area-readings.ts', { '@/data/area-readings/itoshima.json': areaData });
const cases = [
  ['訪問リハビリテーション', '訪問サービス', '🚶', 'sky'],
  ['短期入所療養介護（介護老人保健施設）', '短期入所', '🛌', 'rose'],
  ['特定施設入居者生活介護（有料老人ホーム）', '入居・施設', '🏨', 'rose'],
];
for (const [type, category, symbol, color] of cases) {
  assert.equal(styles.getServiceCategory(type), category);
  const style = styles.getServiceTypeStyle(type);
  assert.equal(style.symbol, symbol);
  assert.ok(style.icon.includes(`bg-${color}-100`));
  assert.ok(style.badge.includes(`bg-${color}-50`));
}
assert.equal(styles.getServiceCategory('未登録種別'), 'その他');
let fixtures = real;
const overrides = {
  '@/lib/area-readings': areaHelpers,
  '@/lib/facilities': { getFacilities: () => fixtures }, '@/lib/service-types': styles,
  'next/navigation': { notFound },
  'next/link': ({ children, href }) => React.createElement('a', { href }, children),
};
const detail = load('app/facilities/[slug]/page.tsx', overrides);
const listing = load('app/facilities/page.tsx', overrides);
assert.equal(detail.dynamicParams, false);
assert.equal((await detail.generateStaticParams()).length, afterImport ? 2878 : 2704);
assert.equal(real.filter(r => !r.serviceArea.trim()).length, afterImport ? 1099 : 925);
assert.equal(real.filter(r => r.serviceArea.trim()).length, 1779);
assert.equal(real.filter(r => r.type === cases[0][0]).length, afterImport ? 15 : 10);
assert.equal(real.filter(r => styles.getServiceCategory(r.type) === 'その他').length, 0);
for (const serviceArea of ['', ' ', '　', '\t\n', '福岡市、糸島市']) {
  fixtures = [{ ...real[0], slug: 'test-public', serviceArea, area: '所在地専用の地区', isPublished: true }];
  const html = renderToStaticMarkup(await detail.default({ params: Promise.resolve({ slug: 'test-public' }) }));
  assert.equal(html.includes('対応エリア'), Boolean(serviceArea.trim()));
  if (serviceArea.trim()) assert.ok(html.includes(serviceArea));
  assert.equal(JSON.stringify(await detail.generateMetadata({ params: Promise.resolve({ slug: 'test-public' }) })), '{}');
}
fixtures = [{ ...real[0], slug: 'test-public', isPublished: true },
  { ...real[0], slug: 'test-hidden', name: 'PRIVATE_TEST_FACILITY', isPublished: false }];
assert.equal(JSON.stringify(await detail.generateStaticParams()), JSON.stringify([{ slug: 'test-public' }]));
for (const slug of ['test-hidden', 'test-absent']) {
  for (const fn of [detail.default, detail.generateMetadata]) {
    await assert.rejects(() => fn({ params: Promise.resolve({ slug }) }),
      e => e.digest === 'NEXT_HTTP_ERROR_FALLBACK;404');
  }
}
fixtures = real;
const areaNames = html => {
  const group = html.match(/エリア<\/p><div class="flex flex-wrap gap-3">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(group, 'area selector exists');
  return [...group.matchAll(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(match => ({
    area: new URLSearchParams(match[1].replaceAll('&amp;', '&').split('?')[1]).get('area') || 'すべて',
    body: match[2],
  }));
};
const expectedTowns = '有田 有田中央 池田 井田 伊都の杜 浦志 潤 荻浦 加布里 神在西 神在東 志登 篠原西 篠原東 志摩井田原 志摩稲留 志摩久家 志摩小富士 志摩初 志摩師吉 高上 高田 富 二丈武 二丈田中 二丈浜窪 二丈深江 二丈福井 二丈松末西 波多江 波多江駅北 波多江駅南 福吉 前原 前原駅南 前原北 前原中央 前原西 前原東 南風台'.split(' ');
if (afterImport) {
  const areaHtml = renderToStaticMarkup(await listing.default({ searchParams: Promise.resolve({ city: '糸島市' }) }));
  const buttons = areaNames(areaHtml);
  assert.equal(buttons.length, 41);
  assert.equal(buttons[0].area, 'すべて');
  assert.ok(!buttons[0].body.includes('<span'));
  assert.deepEqual(buttons.slice(1).map(b => b.area), expectedTowns.map(t => '糸島市' + t));
  for (const button of buttons.slice(1)) assert.ok(button.body.includes(areaData.readings[button.area]));
  for (const city of new Set(real.map(r => r.city))) {
    if (city === '糸島市') continue;
    const rendered = renderToStaticMarkup(await listing.default({ searchParams: Promise.resolve({ city }) }));
    const buttons = areaNames(rendered);
    assert.deepEqual(buttons.slice(1).map(b => b.area), [...new Set(real.filter(r => r.city === city && r.isPublished).map(r => r.area).filter(Boolean))]);
    assert.ok(buttons.every(b => !b.body.includes('<span')));
  }
  const tied = { '同音乙': 'おなじ', '同音甲': 'おなじ' };
  assert.equal(JSON.stringify(areaHelpers.sortAreasByReading(Object.keys(tied), tied)), JSON.stringify(areaHelpers.sortAreasByReading(Object.keys(tied).reverse(), tied)));
  assert.equal(JSON.stringify(areaHelpers.sortAreasByReading(['未登録B', '未登録A'], {})), '["未登録B","未登録A"]');
  console.log('PASS: 40 official readings, exact kana order, All first, deterministic ties, all other municipalities unchanged');
}
const query = { type: '訪問リハビリテーション', city: '朝倉市' };
const html = renderToStaticMarkup(await listing.default({ searchParams: Promise.resolve(query) }));
assert.ok(html.includes('訪問サービス') && html.includes('朝倉市') && html.includes('facility-2639'));
const sample = real.find(r => r.slug === 'facility-2639');
const combined = renderToStaticMarkup(await listing.default({ searchParams: Promise.resolve({
  type: '訪問サービス', city: sample.city, area: sample.area, keyword: sample.name,
}) }));
assert.ok(combined.includes(sample.slug));
// Remote main: grouped labels preserve formal type aliases, strict pagination and SEO.
for (const [category, groups] of Object.entries(styles.serviceCategoryMapping)) {
  for (const group of groups) {
    fixtures = group.types.map((type, i) => ({ ...real[0], type, slug: `group-member-${i}` }));
    for (const type of [category, group.label, ...group.types]) {
      const result = renderToStaticMarkup(await listing.default({ searchParams: Promise.resolve({ type }) }));
      const expected = type === category || type === group.label ? fixtures : fixtures.filter(r => r.type === type);
      for (const row of expected) assert.ok(result.includes(`/facilities/${row.slug}`), `${type}: ${row.slug}`);
    }
  }
}
fixtures = real;
for (const page of ['0', '-1', '1.5', 'abc', '01', '999999']) {
  await assert.rejects(() => listing.default({ searchParams: Promise.resolve({ page }) }),
    e => e.digest === 'NEXT_HTTP_ERROR_FALLBACK;404');
}
const secondPage = renderToStaticMarkup(await listing.default({ searchParams: Promise.resolve({ page: '2' }) }));
assert.ok(secondPage.includes('21〜40'));
const plainMeta = await listing.generateMetadata({ searchParams: Promise.resolve({}) });
assert.equal(plainMeta.alternates.canonical, 'https://portal.h3incover.com/facilities');
assert.equal(plainMeta.robots, undefined);
for (const params of [{city:'糸島市'}, {page:'2'}, {type:'訪問サービス'}, {keyword:'れんと'}]) {
  const meta = await listing.generateMetadata({ searchParams: Promise.resolve(params) });
  assert.equal(meta.robots.index, false);
  assert.equal(meta.robots.follow, true);
  assert.equal(meta.alternates.canonical, plainMeta.alternates.canonical);
}
const sitemap = load('app/sitemap.ts', overrides).default;
assert.equal((await sitemap()).length, real.length + 3);
if (afterImport) {
  const added = real.filter(r => r.city === '糸島市');
  assert.equal(added.length,174);
  const queries = [{city:'糸島市'}, ...[...new Set(added.map(r=>r.area))].map(area=>({city:'糸島市',area})),
    ...[...new Set(added.map(r=>r.type))].map(type=>({city:'糸島市',type})),
    {city:'糸島市', keyword:'れんと'}, {city:'糸島市', keyword:'こりん神在'}];
  for (const query of queries) {
    const expected = added.filter(r=>(!query.area || r.area===query.area) && (!query.type || r.type===query.type) && (!query.keyword || r.name.includes(query.keyword)));
    const result = renderToStaticMarkup(await listing.default({searchParams:Promise.resolve(query)}));
    assert.ok(result.includes(`全 ${expected.length} 件中`), JSON.stringify(query));
  }
  for (const row of added) {
    const result=renderToStaticMarkup(await detail.default({params:Promise.resolve({slug:row.slug})}));
    assert.ok(result.includes(row.name) && result.includes(row.address));
    assert.ok(!result.includes('対応エリア'));
    assert.ok((await sitemap()).some(item=>item.url.endsWith('/'+row.slug)));
  }
  console.log('PASS: Itoshima 174 details/sitemap entries, 40 areas, 20 formal types, keyword search');
}
console.log('PASS: grouped aliases, strict pagination, canonical/noindex metadata, sitemap');
console.log('PASS: 3 styles/categories, 5 serviceArea cases, 4 page/metadata 404 cases, public pages, search/breadcrumbs, real counts');

if (process.argv.includes('--http')) {
  const port = process.env.CARE_UI_TEST_PORT || '3197';
  const child = spawn(process.execPath, ['--require', path.join(root, 'scratch/facility-ui-tests/hidden-fixture.cjs'),
    path.join(root, 'node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', port],
  { cwd: root, env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  let logs = '';
  child.stdout.on('data', b => { logs += b; });
  child.stderr.on('data', b => { logs += b; });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      if (child.exitCode !== null) throw new Error(logs);
      if (logs.includes('Ready in')) { ready = true; break; }
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    assert.ok(ready, logs);
    for (const [slug, status] of [['facility-0001', 200], ['facility-1860', 200],
      ...(afterImport ? [['facility-2742',200],['facility-2858',200]] : []),
      ['ui-test-hidden', 404], ['ui-test-does-not-exist', 404]]) {
      const response = await fetch(`http://127.0.0.1:${port}/facilities/${slug}`, { signal: AbortSignal.timeout(30000) });
      const body = await response.text();
      assert.equal(response.status, status, slug);
      assert.ok(!body.includes('PRIVATE_TEST_FACILITY'));
      if (slug === 'facility-0001') assert.ok(body.includes('対応エリア'));
      if (slug === 'facility-1860') assert.ok(!body.includes('対応エリア'));
      console.log(`HTTP ${status}: ${slug}`);
    }
    if (afterImport) {
      for (const query of [{city:'糸島市'}, {city:'糸島市',area:'糸島市志摩師吉'},
        {city:'糸島市',type:'短期入所療養介護'}, {city:'糸島市',keyword:'れんと'},
        {city:'糸島市',page:'2'}]) {
        const response = await fetch(`http://127.0.0.1:${port}/facilities?${new URLSearchParams(query)}`);
        const body = await response.text();
        assert.equal(response.status,200);
        assert.ok(body.includes('糸島市') && body.includes('noindex') && body.includes('canonical'));
        if (query.keyword) assert.ok(body.includes('訪問看護ステーションれんと'));
        console.log('HTTP 200: search',JSON.stringify(query));
      }
      const response = await fetch(`http://127.0.0.1:${port}/sitemap.xml`);
      const body = await response.text();
      assert.equal(response.status,200);
      assert.equal((body.match(/<loc>/g)||[]).length,2881);
      assert.ok(body.includes('/facility-2742') && body.includes('/facility-2858'));
      assert.ok(!body.includes('ui-test-hidden'));
      console.log('HTTP 200: sitemap 2881 URLs');
    }
  } finally {
    child.kill();
    await new Promise(resolve => child.exitCode !== null ? resolve() : child.once('exit', resolve));
  }
}
