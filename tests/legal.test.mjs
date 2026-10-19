import assert from 'node:assert/strict';
import { OWNER, legalDoc } from '../js/legal.js';

assert.ok(OWNER.name && OWNER.email.includes('@') && OWNER.addressLines.length >= 2, 'owner details are filled in');
assert.ok(!/philshirt18/i.test(JSON.stringify(OWNER)), 'private email is not used');

const shape = (kind, lang) => legalDoc(kind, lang).sections.map((s) => s.p.length);
for (const kind of ['privacy', 'legal']) {
  const en = shape(kind, 'en');
  for (const lang of ['de', 'es']) assert.deepEqual(shape(kind, lang), en, `${kind}/${lang} has the same structure as en`);
  for (const lang of ['en', 'de', 'es']) {
    const doc = legalDoc(kind, lang);
    assert.ok(doc.title && doc.sections.length >= 4);
    const text = JSON.stringify(doc);
    assert.ok(!/\{\w+\}/.test(text), `${kind}/${lang}: no unfilled placeholders`);
    assert.ok(text.includes(OWNER.name) && text.includes(OWNER.email), `${kind}/${lang}: names the owner and contact`);
  }
}
// privacy policy must tell the truth about hosting, rights and the Spanish authority
for (const lang of ['en', 'de', 'es']) {
  const t = JSON.stringify(legalDoc('privacy', lang));
  assert.ok(/Vercel/.test(t) && /aepd\.es/.test(t) && /IndexedDB/.test(t), `${lang}: hosting, authority and storage are named`);
}
console.log('legal.test.mjs: all checks passed');
