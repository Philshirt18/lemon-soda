// Day counter rules. Pure functions: no screen, no storage, so they are easy to test.
export const MAX_DAYS = 36500;

function pad(n) { return String(n).padStart(2, '0'); }

// Local calendar date as YYYY-MM-DD (never UTC, so "today" matches the person's day).
export function localDateStr(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toDayNumber(str) {
  const [y, m, d] = str.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

// Whole calendar days from a to b (b later than a gives a positive number).
export function daysBetween(a, b) {
  return toDayNumber(b) - toDayNumber(a);
}

export function yesterdayOf(today) {
  const [y, m, d] = today.split('-').map(Number);
  const dt = new Date(y, m - 1, d - 1);
  return localDateStr(dt);
}

// What should happen when the app opens? state = { days, last } where last is YYYY-MM-DD or null.
//  'doneToday'  – today is already marked: "Already N days"
//  'newDay'     – last check-in was yesterday (or first ever): "Day N+1"
//  'missed'     – one or more days without a check-in: ask how many days
export function onOpen(state, today) {
  if (!state.last) return { kind: 'newDay', shown: state.days + 1 };
  const gap = daysBetween(state.last, today);
  if (gap <= 0) return { kind: 'doneToday', shown: state.days };
  if (gap === 1) return { kind: 'newDay', shown: state.days + 1 };
  return { kind: 'missed', shown: state.days, gap };
}

// What should happen when the counter button is tapped?
//  'duplicate' – today was already counted: ask if it was on purpose
//  'added'     – one day more
export function onTap(state, today) {
  if (state.last && daysBetween(state.last, today) <= 0) return { kind: 'duplicate' };
  return { kind: 'added', state: { days: state.days + 1, last: today } };
}

export function parseDays(input) {
  const text = String(input).trim();
  if (!/^\d+$/.test(text)) return null;
  const n = Number(text);
  return n >= 0 && n <= MAX_DAYS ? n : null;
}

// Manually set the days. includesToday: does the number already count today?
export function setDays(n, today, includesToday) {
  if (n === 0) return { days: 0, last: null };
  return { days: n, last: includesToday ? today : yesterdayOf(today) };
}
