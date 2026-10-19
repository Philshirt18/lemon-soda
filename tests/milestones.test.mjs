import assert from 'node:assert/strict';
import { MILESTONES, earnedFor, applyDays, parseBadges, daysOf } from '../js/milestones.js';
import { STRINGS, LANGS } from '../js/content.js';

assert.deepEqual(MILESTONES.map((m) => m.days), [1, 7, 30, 60, 90, 180, 365]);
assert.deepEqual(earnedFor(0), []);
assert.deepEqual(earnedFor(1), ['d1']);
assert.deepEqual(earnedFor(6), ['d1']);
assert.deepEqual(earnedFor(10), ['d1', 'w1']);
assert.equal(earnedFor(365).length, 7);

// normal +1: the effect plays only when a milestone is crossed, and only once
assert.deepEqual(applyDays([], 1).fresh, ['d1']);
assert.deepEqual(applyDays(['d1'], 6).fresh, []);
assert.deepEqual(applyDays(['d1'], 7).fresh, ['w1']);
assert.deepEqual(applyDays(['d1', 'w1'], 8).fresh, []);

// manual entry: all matching badges are kept (silently by the caller); 10 days gives 1 day and 1 week
assert.deepEqual(applyDays([], 10).all, ['d1', 'w1']);
// lowering the number never takes a badge away
assert.deepEqual(applyDays(['d1', 'w1', 'm1'], 3).all, ['d1', 'w1', 'm1']);
// after a manual entry of 10, the next tap (11) is not a new milestone
assert.deepEqual(applyDays(applyDays([], 10).all, 11).fresh, []);
// after a manual entry of 6, the next tap (7) is the week milestone
assert.deepEqual(applyDays(applyDays([], 6).all, 7).fresh, ['w1']);

assert.deepEqual(parseBadges('d1,w1,bogus'), ['d1', 'w1']);
assert.deepEqual(parseBadges(null), []);
assert.equal(daysOf('m3'), 90);

// every milestone has a name in every language
for (const l of LANGS.map((x) => x.code)) {
  for (const m of MILESTONES) assert.ok(STRINGS[l]['ms_' + m.id], `${l} name for ${m.id}`);
}
console.log('milestones.test.mjs: all checks passed');
