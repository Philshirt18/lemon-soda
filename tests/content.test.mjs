import assert from 'node:assert/strict';
import { STRINGS, LANGS } from '../js/content.js';
import { pickNext } from '../js/pick.js';

const langs = LANGS.map((l) => l.code);
const listKeys = ['slipMessages', 'convNegReasons', 'convPosReasons'];

// every language has every key, and the lists are equally long, unique and non-empty
const enKeys = Object.keys(STRINGS.en);
for (const l of langs) {
  assert.deepEqual(Object.keys(STRINGS[l]).sort(), enKeys.slice().sort(), `${l}: same keys as en`);
  for (const k of listKeys) {
    const list = STRINGS[l][k];
    assert.ok(list.length >= 8, `${l}.${k} has several entries`);
    assert.equal(list.length, STRINGS.en[k].length, `${l}.${k} same length as en`);
    assert.equal(new Set(list).size, list.length, `${l}.${k} has no duplicates`);
    list.forEach((x) => assert.ok(x.trim().length > 10, `${l}.${k} entry is not empty`));
  }
  assert.ok(STRINGS[l].convNegReasons.length >= 10 && STRINGS[l].convPosReasons.length >= 10, `${l}: many reasons`);
}

// every {placeholder} used in en is used in the other languages too
const ph = (v) => (Array.isArray(v) ? v.join(' ') : String(v)).match(/\{\w+\}/g)?.sort().join(',') ?? '';
for (const k of enKeys) {
  if (listKeys.includes(k)) continue;
  for (const l of langs) {
    if (Array.isArray(STRINGS.en[k])) {
      STRINGS.en[k].forEach((_, i) => assert.equal(ph(STRINGS[l][k][i]), ph(STRINGS.en[k][i]), `${l}.${k}[${i}] placeholders`));
    } else {
      assert.equal(ph(STRINGS[l][k]), ph(STRINGS.en[k]), `${l}.${k} placeholders`);
    }
  }
}

// next-reason pick never repeats the last one, across many random draws
let last = -1;
for (let i = 0; i < 5000; i++) {
  const n = pickNext(14, last);
  assert.ok(n >= 0 && n < 14);
  assert.notEqual(n, last, 'no immediate repeat');
  last = n;
}
assert.equal(pickNext(1, 0), 0);

console.log('content.test.mjs: all checks passed');
