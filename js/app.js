import { LANGS, STRINGS } from './content.js';
import { initLang, getLang, setLang, t, tPick, tList, applyTranslations } from './i18n.js';
import { pickNext } from './pick.js';
import { legalDoc } from './legal.js';
import { MILESTONES, applyDays, parseBadges, daysOf, renderMedal, playConfetti } from './milestones.js';
import { getItem, setItem, removeItem, saveImage, loadImage } from './store.js';
import { shrinkImage } from './image.js';
import { localDateStr, onOpen, onTap, parseDays, setDays } from './days.js';

const $ = (id) => document.getElementById(id);

let stepEls = []; // the onboarding steps in use (the install step is skipped when already installed)
let step = 0;
let draftPhoto = null; // shrunk photo chosen during onboarding, not saved until the end
let bgUrl = null;

function setBackground(blob) {
  if (bgUrl) URL.revokeObjectURL(bgUrl);
  bgUrl = blob ? URL.createObjectURL(blob) : null;
  $('bg').style.backgroundImage = bgUrl ? `url("${bgUrl}")` : '';
}

/* ---------- Onboarding ---------- */

function renderLangButtons(list = $('lang-list')) {
  list.innerHTML = '';
  LANGS.forEach(({ code, label }) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'lang-btn';
    b.textContent = label;
    b.setAttribute('aria-pressed', String(code === getLang()));
    b.addEventListener('click', () => {
      setLang(code);
      renderLangButtons(list);
      renderPhotoButton();
    });
    list.appendChild(b);
  });
}

function renderPhotoButton() {
  $('ob-photo-btn').textContent = t(draftPhoto ? 'photoChange' : 'photoChoose');
}

function renderStep() {
  document.querySelectorAll('.step').forEach((el) => el.classList.remove('active'));
  stepEls[step].classList.add('active');
  $('ob-back').style.visibility = step === 0 ? 'hidden' : 'visible';
  const last = step === stepEls.length - 1;
  $('ob-next').dataset.i18n = last ? 'start' : 'next';
  $('ob-next').textContent = t(last ? 'start' : 'next');
  const dots = $('ob-dots');
  dots.innerHTML = '';
  for (let i = 0; i < stepEls.length; i++) {
    const d = document.createElement('i');
    if (i === step) d.className = 'on';
    dots.appendChild(d);
  }
}

async function finishOnboarding() {
  setItem('name', $('ob-name').value.trim());
  setItem('motto', $('ob-motto').value.trim());
  if (draftPhoto) await saveImage(draftPhoto);
  setItem('onboarded', '1');
  showHome();
}

function startOnboarding() {
  $('view-home').hidden = true;
  $('view-onboarding').hidden = false;
  step = 0;
  stepEls = [...document.querySelectorAll('.step')].filter((el) => !el.hidden);
  renderLangButtons();
  renderPhotoButton();
  renderStep();

  $('ob-next').addEventListener('click', () => {
    if (step === stepEls.length - 1) finishOnboarding();
    else { step += 1; renderStep(); }
  });
  $('ob-back').addEventListener('click', () => {
    if (step > 0) { step -= 1; renderStep(); }
  });
  $('ob-photo-btn').addEventListener('click', () => $('ob-photo').click());
  $('ob-photo').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    $('ob-photo-error').hidden = true;
    try {
      draftPhoto = await shrinkImage(file);
      setBackground(draftPhoto);
      renderPhotoButton();
    } catch {
      $('ob-photo-error').hidden = false;
    }
  });
}

/* ---------- Install guide (PWA) ---------- */

let installPrompt = null; // Android Chrome offers a one-tap install through this event

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

const SHARE_ICON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M12 3l-4 4M12 3l4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const DOTS_ICON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>';

function guideSection(title, prefix, icons) {
  const sec = document.createElement('div');
  sec.className = 'howto';
  const h = document.createElement('h3');
  h.dataset.i18n = title;
  const ol = document.createElement('ol');
  for (let i = 1; i <= 5; i++) {
    if (!(`${prefix}${i}` in STRINGS.en)) break;
    const li = document.createElement('li');
    const text = document.createElement('span');
    text.dataset.i18n = `${prefix}${i}`;
    li.append(text);
    if (icons[i]) li.insertAdjacentHTML('beforeend', icons[i]);
    ol.appendChild(li);
  }
  sec.append(h, ol);
  return sec;
}

// Numbered steps for this kind of device. On a computer both phone guides are shown.
function buildInstallGuide(container) {
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/.test(ua);
  container.replaceChildren();
  if (ios || !android) container.appendChild(guideSection('installIosTitle', 'installIos', { 2: SHARE_ICON }));
  if (android || !ios) container.appendChild(guideSection('installAndroidTitle', 'installAndroid', { 2: DOTS_ICON }));
  if (!ios && !android) {
    const note = document.createElement('p');
    note.className = 'note';
    note.dataset.i18n = 'installOther';
    container.appendChild(note);
  }
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-ghost install-now';
  btn.dataset.i18n = 'installButton';
  btn.hidden = !installPrompt;
  btn.addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    document.querySelectorAll('.install-now').forEach((b) => { b.hidden = true; });
  });
  container.appendChild(btn);
}

function setupInstallGuide() {
  if (isStandalone()) {
    $('step-install').hidden = true; // already installed: nothing to explain
    $('menu-install').hidden = true;
    return;
  }
  buildInstallGuide($('guide-onboarding'));
  buildInstallGuide($('guide-dialog'));
  applyTranslations($('guide-onboarding'));
  applyTranslations($('guide-dialog'));
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    document.querySelectorAll('.install-now').forEach((b) => { b.hidden = false; });
  });
  $('menu-install').addEventListener('click', () => {
    closeMenu();
    $('install-dlg').showModal();
  });
  $('install-dlg-close').addEventListener('click', () => $('install-dlg').close());
}

/* ---------- Home ---------- */

function loadState() {
  const n = parseInt(getItem('days') || '0', 10);
  return { days: Number.isFinite(n) && n > 0 ? n : 0, last: getItem('last') || null };
}

function saveState(state) {
  setItem('days', state.days);
  if (state.last) setItem('last', state.last);
  else removeItem('last');
}

function getDays() {
  return loadState().days;
}

/* ---------- Badges ---------- */

function loadBadges() {
  return parseBadges(getItem('badges'));
}

function saveBadges(ids) {
  setItem('badges', ids.join(','));
}

// Keep every badge the number of days has earned. Returns the brand-new ones.
function updateBadges(days) {
  const { all, fresh } = applyDays(loadBadges(), days);
  saveBadges(all);
  return fresh;
}

let stopConfetti = () => {};

function showBadge(id) {
  const days = daysOf(id);
  $('badge-medal').replaceChildren(renderMedal(id, true));
  $('badge-name').textContent = t('ms_' + id);
  $('badge-days').textContent = days === 1 ? t('badgeDaysOne') : t('badgeDaysMany', { n: days });
  $('view-badge').hidden = false;
  stopConfetti();
  stopConfetti = playConfetti($('confetti'));
}

function setupBadges() {
  $('badge-ok').addEventListener('click', () => {
    stopConfetti();
    $('view-badge').hidden = true;
  });
  $('menu-hof').addEventListener('click', openHallOfFame);
  $('hof-close').addEventListener('click', () => { $('view-hof').hidden = true; });
}

function openHallOfFame() {
  closeMenu();
  renderHallOfFame();
  $('view-hof').hidden = false;
}

function renderHallOfFame() {
  const earned = loadBadges();
  const grid = $('hof-grid');
  grid.replaceChildren();
  MILESTONES.forEach(({ id, days }) => {
    const got = earned.includes(id);
    const item = document.createElement('div');
    item.className = 'hof-item' + (got ? '' : ' is-locked');
    const name = document.createElement('strong');
    name.textContent = t('ms_' + id);
    const sub = document.createElement('small');
    sub.textContent = got ? (days === 1 ? t('badgeDaysOne') : t('badgeDaysMany', { n: days })) : t('hofLocked');
    item.append(renderMedal(id, got), name, sub);
    grid.appendChild(item);
  });
}

async function showHome() {
  $('view-onboarding').hidden = true;
  $('view-home').hidden = false;
  setBackground(await loadImage());
  renderHome();
}

function renderHome() {
  $('motto').textContent = getItem('motto') || t('defaultMotto');
  const days = getDays();
  const value = $('counter-value');
  // Before the first day there is nothing to count yet, so say what the button is for.
  value.textContent = days === 0 ? t('counterStart') : String(days);
  value.classList.toggle('hint', days === 0);
  // From day 1 on: remind that today still needs a tap, until today has been counted.
  $('counter-sub').hidden = days === 0 || loadState().last === localDateStr();
}

/* ---------- Counter ---------- */

function pulseCounter() {
  const el = $('btn-counter');
  el.classList.remove('pulse');
  void el.offsetWidth; // restart the animation
  el.classList.add('pulse');
}

function onCounterTap() {
  const result = onTap(loadState(), localDateStr());
  if (result.kind === 'duplicate') {
    askDays('dupTitle', 'dupText', { includesToday: true });
    return;
  }
  saveState(result.state);
  const fresh = updateBadges(result.state.days);
  renderHome();
  pulseCounter();
  if (fresh.length) showBadge(fresh[fresh.length - 1]); // the biggest milestone just reached
}

/* ---------- Question dialog (same day twice, or days missed) ---------- */

function askDays(titleKey, textKey, { includesToday }) {
  const dlg = $('dlg');
  $('dlg-title').textContent = t(titleKey);
  $('dlg-text').textContent = t(textKey);
  $('dlg-days').value = String(getDays());
  $('dlg-error').hidden = true;
  dlg.dataset.includesToday = includesToday ? '1' : '';
  if (!dlg.open) dlg.showModal();
  $('dlg-days').select();
}

function setupDialog() {
  const dlg = $('dlg');
  $('dlg-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const n = parseDays($('dlg-days').value);
    if (n === null) {
      $('dlg-error').hidden = false;
      return;
    }
    saveState(setDays(n, localDateStr(), dlg.dataset.includesToday === '1'));
    updateBadges(n); // a typed-in number earns its badges quietly, without the effect
    dlg.close();
    renderHome();
    pulseCounter();
  });
  $('dlg-keep').addEventListener('click', () => dlg.close());
}

/* ---------- Menu and settings ---------- */

function closeMenu() {
  $('menu').hidden = true;
  $('menu-btn').setAttribute('aria-expanded', 'false');
}

function openSettings() {
  closeMenu();
  renderLangButtons($('set-lang-list'));
  $('set-name').value = getItem('name') || '';
  $('set-motto').value = getItem('motto') || '';
  $('set-photo-error').hidden = true;
  $('view-settings').hidden = false;
}

function setupSettings() {
  $('menu-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const open = $('menu').hidden;
    $('menu').hidden = !open;
    $('menu-btn').setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!$('menu').hidden && !$('menu').contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  $('menu-settings').addEventListener('click', openSettings);
  $('set-name').addEventListener('input', () => setItem('name', $('set-name').value.trim()));
  $('set-motto').addEventListener('input', () => {
    setItem('motto', $('set-motto').value.trim());
    renderHome();
  });
  $('set-photo-btn').addEventListener('click', () => $('set-photo').click());
  $('set-photo').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    $('set-photo-error').hidden = true;
    try {
      const blob = await shrinkImage(file);
      await saveImage(blob);
      setBackground(blob);
    } catch {
      $('set-photo-error').hidden = false;
    }
    e.target.value = '';
  });
  $('set-close').addEventListener('click', () => { $('view-settings').hidden = true; });
}

/* ---------- Privacy policy and legal notice ---------- */

let legalKind = null;

function renderLegal() {
  const doc = legalDoc(legalKind, getLang());
  $('legal-title').textContent = doc.title;
  const body = $('legal-body');
  body.replaceChildren();
  doc.sections.forEach((s) => {
    const h = document.createElement('h2');
    h.textContent = s.h;
    body.appendChild(h);
    s.p.forEach((parts) => {
      const p = document.createElement('p');
      parts.forEach((part) => {
        if (typeof part === 'string') p.append(part);
        else {
          const a = document.createElement('a');
          a.href = `mailto:${part.email}`;
          a.textContent = part.email;
          p.appendChild(a);
        }
      });
      body.appendChild(p);
    });
  });
}

function openLegal(kind) {
  closeMenu();
  legalKind = kind;
  renderLegal();
  $('legal-body').scrollTop = 0;
  $('view-legal').hidden = false;
}

function setupLegal() {
  $('menu-privacy').addEventListener('click', () => openLegal('privacy'));
  $('menu-legal').addEventListener('click', () => openLegal('legal'));
  $('legal-close').addEventListener('click', () => { $('view-legal').hidden = true; });
}

/* ---------- Slip message ---------- */

let lastSlip = -1;

function onSlip() {
  const list = tList('slipMessages');
  lastSlip = pickNext(list.length, lastSlip);
  $('slip-text').textContent = list[lastSlip];
  $('slip-dlg').showModal(); // days stay exactly as they are
}

/* ---------- Convictions ---------- */

let convKind = null; // 'neg' or 'pos'
let lastReason = -1;

function showReason() {
  const list = tList(convKind === 'neg' ? 'convNegReasons' : 'convPosReasons');
  lastReason = pickNext(list.length, lastReason);
  $('conv-text').textContent = list[lastReason];
  $('conv-text').style.animation = 'none';
  void $('conv-text').offsetWidth;
  $('conv-text').style.animation = '';
}

function showConvChoice() {
  convKind = null;
  $('conv-choose').hidden = false;
  $('conv-reason').hidden = true;
  $('conv-next').hidden = true;
  $('conv-back').style.visibility = 'hidden';
  $('conv-close').hidden = false;
}

function openConviction() {
  showConvChoice();
  $('view-conviction').hidden = false;
}

function startReasons(kind) {
  convKind = kind;
  lastReason = -1;
  $('conv-kind').textContent = t(kind === 'neg' ? 'convNeg' : 'convPos');
  $('conv-choose').hidden = true;
  $('conv-reason').hidden = false;
  $('conv-next').hidden = false;
  $('conv-back').style.visibility = 'visible';
  showReason();
}

function setupConviction() {
  $('btn-conviction').addEventListener('click', openConviction);
  $('conv-neg').addEventListener('click', () => startReasons('neg'));
  $('conv-pos').addEventListener('click', () => startReasons('pos'));
  $('conv-next').addEventListener('click', showReason);
  $('conv-back').addEventListener('click', showConvChoice);
  $('conv-close').addEventListener('click', () => { $('view-conviction').hidden = true; });
}

/* ---------- Splash ---------- */

let splashTimer = null;

function showSplash(info, done) {
  const view = $('view-splash');
  let text;
  if (info.kind === 'newDay') text = tPick('splashNew', { n: info.shown });
  else if (info.kind === 'doneToday') text = tPick(info.shown === 1 ? 'splashDoneOne' : 'splashDoneMany', { n: info.shown });
  else text = t('splashBack');
  const name = getItem('name');
  $('splash-hi').hidden = !name;
  if (name) $('splash-hi').textContent = t('hi', { name });
  $('splash-number').textContent = String(info.shown);
  $('splash-text').textContent = text;
  view.classList.remove('leaving');
  view.hidden = false;

  const close = () => {
    clearTimeout(splashTimer);
    view.removeEventListener('click', close);
    view.classList.add('leaving');
    setTimeout(() => { view.hidden = true; done(); }, 450);
  };
  view.addEventListener('click', close);
  splashTimer = setTimeout(close, 2800);
}

function openApp() {
  showHome().then(() => {
    const info = onOpen(loadState(), localDateStr());
    showSplash(info, () => {
      if (info.kind === 'missed') askDays('missedTitle', 'missedText', { includesToday: false });
    });
  });
}

document.addEventListener('langchange', () => {
  if (!$('view-home').hidden) renderHome();
  if (!$('view-hof').hidden) renderHallOfFame();
  if (!$('view-legal').hidden) renderLegal();
});

/* ---------- Start ---------- */

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {}); // the app works without it, just not offline
}

initLang();
applyTranslations();
setupDialog();
$('btn-counter').addEventListener('click', onCounterTap);
$('btn-slip').addEventListener('click', onSlip);
$('slip-ok').addEventListener('click', () => $('slip-dlg').close());
setupConviction();
setupSettings();
setupBadges();
setupLegal();
setupInstallGuide();
if (getItem('onboarded') === '1') openApp();
else startOnboarding();
