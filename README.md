# Lemon Soda

A simple, private companion that helps you quit a bad habit. This first version is built around cutting back on alcohol (the name comes from soda with lemon, the best alternative to a beer).

- **Your photo, your words, your days.** Pick a photo that gives you strength, write a sentence that shows up above your buttons, and count your days.
- **Three buttons:** tap the number when today is done, tap "I slipped" for encouragement (your days stay), or tap "I need convincing" for honest facts and reasons to stay strong.
- **Milestones and badges** from your first day to one year, with a Hall of Fame.
- **Three languages:** English, Deutsch and Español. Choose in the first onboarding step, change any time in the settings.
- **Completely anonymous.** No account, no tracking, no ads. Everything you enter is stored in your own browser on your own device and never leaves it. The hosting provider technically sees your IP address when the page loads, which the in-app privacy policy explains.
- **Privacy policy and legal notice** (menu, three languages), written as a draft for a private non-commercial project offered from Spain. It is not legal advice. The owner's details are in `js/legal.js`.

Lemon Soda is a tool, not a promise. It cannot guarantee success. If you drink heavily every day, please talk to a doctor before stopping suddenly.

## Run it

You need Python 3 (already on most computers) or Node.

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080> in your browser. On a computer, use the browser's phone view (developer tools) to see it the way it looks on a phone. Opening `index.html` by double-click will not work, because the offline feature (service worker) needs `localhost` or `https`.

## Use it on a new phone

Your days are stored on the device, so a new phone starts empty. Open the app, then tap the number, or use the question that appears, and type how many days you have made it. Your badges appear automatically.

## Add it to your home screen

Add Lemon Soda to your home screen so it opens like a real app, works without internet and is much safer from being cleared by the browser.

- iPhone or iPad (Safari): Share button, then "Add to Home Screen".
- Android (Chrome): browser menu, then "Install app" or "Add to Home screen".

## Publish it (Vercel)

It is a static site: no build step, no server, no keys.

1. Put this project in a GitHub repository.
2. On [Vercel](https://vercel.com), import the repository. Framework preset: **Other**. Leave the build command empty. The output directory is the project folder.
3. Keep Vercel Analytics off, so no visits are measured.

## Tests

Small checks for the rules that matter most (day counting, milestones, texts in all languages):

```bash
node tests/days.test.mjs
node tests/milestones.test.mjs
node tests/content.test.mjs
node tests/legal.test.mjs
```

## Files

```
index.html            all screens
manifest.webmanifest  app name, colors, icons (install on the home screen)
sw.js                 keeps the app files for offline use
css/styles.css        look and feel
js/app.js             start-up, screens and buttons
js/store.js           saving on the device (localStorage, IndexedDB for the photo)
js/days.js            day counting rules
js/milestones.js      milestones, badges, confetti
js/content.js         all texts in English, German and Spanish
js/i18n.js            language choice and text lookup
js/legal.js           privacy policy and legal notice (owner details at the top)
js/image.js           shrinks the chosen photo
js/pick.js            picks the next reason without repeating
assets/icons/         app icons made from assets-source/icon-source.webp
```
