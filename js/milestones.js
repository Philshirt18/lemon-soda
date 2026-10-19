// Milestones and badges. The rules are pure (easy to test); the drawing helpers touch the screen only when called.
export const MILESTONES = [
  { id: 'd1', days: 1 },
  { id: 'w1', days: 7 },
  { id: 'm1', days: 30 },
  { id: 'm2', days: 60 },
  { id: 'm3', days: 90 },
  { id: 'm6', days: 180 },
  { id: 'y1', days: 365 },
];

// Every badge a number of days has earned.
export function earnedFor(days) {
  return MILESTONES.filter((m) => days >= m.days).map((m) => m.id);
}

// stored: badge ids already kept. Returns all badges to keep, and the ones that are brand new.
export function applyDays(stored, days) {
  const earned = earnedFor(days);
  const fresh = earned.filter((id) => !stored.includes(id));
  const all = MILESTONES.map((m) => m.id).filter((id) => stored.includes(id) || earned.includes(id));
  return { all, fresh };
}

export function parseBadges(text) {
  const known = MILESTONES.map((m) => m.id);
  return String(text || '').split(',').filter((id) => known.includes(id));
}

export function daysOf(id) {
  return MILESTONES.find((m) => m.id === id).days;
}

/* ---------- Drawing ---------- */

const NS = 'http://www.w3.org/2000/svg';

// A round medal with the day count in it. Locked medals are grey.
export function renderMedal(id, earned) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.setAttribute('class', 'medal' + (earned ? ' earned' : ' locked'));
  svg.setAttribute('aria-hidden', 'true');
  const n = String(daysOf(id));
  svg.innerHTML = `
    <circle cx="60" cy="60" r="56" class="medal-ring"/>
    <circle cx="60" cy="60" r="46" class="medal-face"/>
    <ellipse cx="46" cy="38" rx="26" ry="14" class="medal-shine"/>
    <text x="60" y="${n.length > 2 ? 72 : 74}" text-anchor="middle" class="medal-num" font-size="${n.length > 2 ? 34 : 42}">${n}</text>`;
  return svg;
}

// Falling confetti for a couple of seconds. Skipped for people who prefer less motion.
export function playConfetti(canvas, ms = 3200) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const ratio = window.devicePixelRatio || 1;
  const w = (canvas.width = canvas.clientWidth * ratio);
  const h = (canvas.height = canvas.clientHeight * ratio);
  const ctx = canvas.getContext('2d');
  const colors = ['#ffd93b', '#fff2a8', '#3ddc97', '#126b4a', '#ffffff'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * w,
    y: -Math.random() * h * 0.5,
    r: (4 + Math.random() * 6) * ratio,
    vx: (Math.random() - 0.5) * 3 * ratio,
    vy: (2 + Math.random() * 4) * ratio,
    spin: Math.random() * Math.PI,
    vs: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  const start = performance.now();
  let raf = 0;
  const frame = (now) => {
    const t = now - start;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = Math.max(0, Math.min(1, (ms - t) / 800));
    for (const p of pieces) {
      p.x += p.vx; p.y += p.vy; p.spin += p.vs;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      ctx.restore();
    }
    if (t < ms) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, w, h);
  };
  raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, w, h); };
}
