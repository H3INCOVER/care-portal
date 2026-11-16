/* eslint-disable @typescript-eslint/no-require-imports */
// Test-process-only fixture. Never writes to the master CSV.
const fs = require('node:fs');
const path = require('node:path');
const originalRead = fs.readFileSync;
const target = path.resolve(__dirname, '../../data/facilities.csv');
fs.readFileSync = function (file) {
  const result = originalRead.apply(this, arguments);
  if (typeof file !== 'string' || path.resolve(file) !== target) return result;
  const content = Buffer.isBuffer(result) ? result.toString('utf8') : result;
  const headers = content.split(/\r?\n/, 1)[0].split(',');
  const values = {
    facilityId: 'test-hidden', slug: 'ui-test-hidden', name: 'PRIVATE_TEST_FACILITY',
    prefecture: '福岡県', city: 'テスト市', area: 'テスト地区',
    type: '訪問介護', isPublished: 'false',
  };
  const augmented = content.trimEnd() + '\n' + headers.map(h => values[h] || '').join(',') + '\n';
  return Buffer.isBuffer(result) ? Buffer.from(augmented, 'utf8') : augmented;
};
