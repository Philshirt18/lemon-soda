import assert from 'node:assert/strict';
import { localDateStr, daysBetween, yesterdayOf, onOpen, onTap, parseDays, setDays } from '../js/days.js';

assert.equal(localDateStr(new Date(2026, 0, 5)), '2026-01-05');
assert.equal(daysBetween('2026-01-01', '2026-01-02'), 1);
assert.equal(daysBetween('2025-12-31', '2026-01-01'), 1);
assert.equal(daysBetween('2026-02-28', '2026-03-01'), 1);
assert.equal(daysBetween('2026-03-28', '2026-03-29'), 1); // clock change day in Europe
assert.equal(daysBetween('2026-10-24', '2026-10-25'), 1);
assert.equal(yesterdayOf('2026-03-01'), '2026-02-28');
assert.equal(yesterdayOf('2026-01-01'), '2025-12-31');

// opening the app
assert.deepEqual(onOpen({ days: 0, last: null }, '2026-05-01'), { kind: 'newDay', shown: 1 });
assert.deepEqual(onOpen({ days: 5, last: '2026-05-01' }, '2026-05-01'), { kind: 'doneToday', shown: 5 });
assert.deepEqual(onOpen({ days: 5, last: '2026-05-01' }, '2026-05-02'), { kind: 'newDay', shown: 6 });
assert.deepEqual(onOpen({ days: 5, last: '2026-05-01' }, '2026-05-03'), { kind: 'missed', shown: 5, gap: 2 });

// tapping the counter
assert.deepEqual(onTap({ days: 5, last: '2026-05-01' }, '2026-05-01'), { kind: 'duplicate' });
assert.deepEqual(onTap({ days: 5, last: '2026-05-01' }, '2026-05-02'), { kind: 'added', state: { days: 6, last: '2026-05-02' } });
assert.deepEqual(onTap({ days: 0, last: null }, '2026-05-02'), { kind: 'added', state: { days: 1, last: '2026-05-02' } });

// manual input
assert.equal(parseDays('10'), 10);
assert.equal(parseDays(' 7 '), 7);
assert.equal(parseDays('0'), 0);
for (const bad of ['', 'abc', '-3', '2.5', '36501', '1e3']) assert.equal(parseDays(bad), null, bad);
assert.deepEqual(setDays(10, '2026-05-03', false), { days: 10, last: '2026-05-02' });
assert.deepEqual(setDays(10, '2026-05-03', true), { days: 10, last: '2026-05-03' });
assert.deepEqual(setDays(0, '2026-05-03', true), { days: 0, last: null });

console.log('days.test.mjs: all checks passed');
