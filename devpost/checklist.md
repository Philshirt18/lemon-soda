---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Du richtest Lemon Soda ein und siehst deinen Startbildschirm**
  Becomes usable: Eine laufende App. Beim ersten Start wählst du die Sprache (Englisch, Deutsch, Spanisch) und siehst dann das Onboarding in dieser Sprache (Hinweis "Hilfsmittel, keine Garantie, anonym", Name optional, Foto, eigener Spruch). Danach siehst du dein Foto im Vollbild, den Spruch und 3 Buttons (der Zähler zeigt 0). Beim Neuladen bleibt alles erhalten.
  Why now: Der Kern der App ist dein Foto und dein Spruch im schwachen Moment. Der ganze Weg (Seite, Speicher, Foto) ist damit von Anfang an bewiesen, und jede spätere Funktion hat ein Zuhause.
  PRD ref: `prd.md > Onboarding`, `prd.md > Startbildschirm und die 3 Buttons`, `prd.md > The Core Journey` (Schritte 1-2), `prd.md > States and Boundaries` (Sprache)
  Spec ref: `spec.md > Onboarding`, `spec.md > Home Screen (Startbildschirm)`, `spec.md > Image Store`, `spec.md > Content`, `spec.md > Data Model`, `spec.md > File Structure`
  Build: Projekt nach der Dateistruktur der Spec anlegen (index.html, css, js/app.js, store.js, image.js, content.js und i18n.js mit allen Oberflächentexten in en, de, es, Vorauswahl nach Gerätesprache). Sprachauswahl als erster Schritt, Onboarding-Karten, Foto wählen und auf höchstens 1600 Pixel verkleinern, in IndexedDB speichern, Name und Spruch in localStorage. Startbildschirm mit Vollbild-Foto, Spruch über den Buttons, 3 Buttons (noch ohne Funktion außer Anzeige). Grundfarben aus der Spec.
  Verify (mechanical): Lokalen Server starten (`python3 -m http.server 8080`), Seite mit dem Browser öffnen, Onboarding in allen drei Sprachen durchlaufen (Texte erscheinen in der gewählten Sprache, Buttons brechen nicht), Startbildschirm prüfen, neu laden und bestätigen, dass Onboarding nicht wieder erscheint und Foto, Name und Spruch erhalten bleiben.
  Learner check: Öffne `http://localhost:8080`, wähle eine Sprache, richte die App mit deinem Foto und Spruch ein und sag, ob der Startbildschirm so aussieht, wie du ihn dir vorgestellt hast. Lade die Seite neu: Alles soll noch da sein.
  Commit: `Add onboarding and home screen with photo, motto and 3 buttons`

- [x] **2. Der Zähler zählt deine Tage und begrüßt dich beim Öffnen**
  Becomes usable: Tipp auf den Zähler-Button zählt einen Tag dazu (einmal pro Kalendertag). Beim erneuten Öffnen erscheint ein Splash ("Day 6 – you can do it today" bzw. "Already 5 days – keep going"). Bei doppeltem Tippen oder ausgelassenem Tag erscheint die Nachfrage mit Zahlenfeld.
  Why now: Der Tageszähler ist die zweite Hälfte des Kerns und braucht die genauesten Regeln (Datum, Korrektur). Je früher wir ihn prüfen, desto billiger sind Fehler.
  PRD ref: `prd.md > Startbildschirm und die 3 Buttons`, `prd.md > Splashscreen beim erneuten Öffnen`, `prd.md > Tage korrigieren`
  Spec ref: `spec.md > Day Counter Logic`, `spec.md > Splash`, `spec.md > Data Model`
  Build: js/days.js mit lokaler Datumslogik (YYYY-MM-DD), +1 pro Tag, Erkennung von doppeltem Tippen und ausgelassenen Tagen, manuelles Setzen der Tage mit Plausibilitätsprüfung. Splash-Ansicht mit Texten aus content.js in drei Sprachen. Nachfrage-Dialog mit Zahlenfeld. Zähler-Button zeigt die Zahl.
  Verify (mechanical): Die Datumslogik mit `node` gegen feste Datumsfälle prüfen (heute schon eingetragen, gestern eingetragen, vorgestern eingetragen, ungültige Eingabe). Splash-Texte in allen drei Sprachen prüfen. Im Browser Zähler tippen, neu laden und Splash und Nachfrage prüfen (Datum im Test per Speicherwert verschieben).
  Learner check: Tippe auf den Zähler und prüfe, dass die Zahl um 1 steigt. Tippe nochmal: Es soll eine Nachfrage mit Zahlenfeld kommen. Lade die Seite neu und lies den Splash.
  Commit: `Add day counter, splash and day correction`

- [x] **3. Schwach geworden und Überzeugung geben dir Kraft**
  Becomes usable: Button 2 zeigt einen aufmunternden Spruch, die Zahl bleibt gleich. Button 3 öffnet die Überzeugung mit den zwei Arten (negative Einflüsse, positive Gründe), und ein Tipp zeigt den nächsten Grund.
  Why now: Das ist der Moment, für den die App gebaut wird. Die Inhalte sind der Teil, den du prüfst, und je früher du sie liest, desto mehr Zeit hast du zum Anpassen.
  PRD ref: `prd.md > Startbildschirm und die 3 Buttons`, `prd.md > Überzeugung`
  Spec ref: `spec.md > Slip Message (Schwach geworden)`, `spec.md > Convictions (Überzeugung)`, `spec.md > Content`
  Build: In js/content.js Rückfall-Sprüche und viele Überzeugungsgründe in zwei Gruppen auf Englisch, Deutsch und Spanisch schreiben (motivierend, nie beschämend). Rückfall-Ansicht und Überzeugungs-Ansicht mit Auswahl und Weiter-Tipp ohne direkte Wiederholung.
  Verify (mechanical): Per Skript prüfen, dass jede Gruppe in jeder Sprache gleich viele eindeutige Texte hat und kein Text doppelt vorkommt. Im Browser Button 2 und Button 3 bedienen, Zahl bleibt bei Button 2 unverändert, Weiter-Tipp zeigt nie zweimal denselben Grund hintereinander.
  Learner check: Drücke "Schwach geworden" und lies den Spruch. Öffne die Überzeugung, wähle beide Arten und lies mehrere Gründe. Lies sie auf Deutsch und sag, welche Texte du ändern möchtest. Die spanischen Texte sollte vor der Veröffentlichung jemand mit Muttersprache lesen.
  Commit: `Add slip message and conviction reasons`

- [x] **4. Menü oben rechts mit Einstellungen**
  Becomes usable: Ein kleines Menü oben rechts führt zu Einstellungen. Dort änderst du Sprache, Name, Foto und Spruch, und der Startbildschirm zeigt die Änderung sofort.
  Why now: Das Onboarding verspricht, dass man alles später ändern kann. Das muss stimmen, bevor weitere Ansichten dazukommen.
  PRD ref: `prd.md > Einstellungen`
  Spec ref: `spec.md > Settings and Menu`, `spec.md > Image Store`, `spec.md > Content`
  Build: Menü-Button mit Auswahl (Hall of Fame als Platzhalter-Eintrag, Einstellungen), Einstellungs-Ansicht mit Sprachwahl (alle Texte wechseln sofort), Änderungen speichern und Startbildschirm neu zeichnen.
  Verify (mechanical): Im Browser Sprache, Name, Spruch und Foto ändern, ohne Neuladen und nach Neuladen prüfen, dass die neuen Werte angezeigt werden.
  Learner check: Öffne das Menü, wechsle die Sprache, ändere Spruch und Foto und prüfe, dass der Startbildschirm sich sofort ändert.
  Commit: `Add menu and settings`

- [x] **5. Meilensteine, Badge-Effekt und Hall of Fame**
  Becomes usable: Beim Erreichen von 1, 7, 30, 60, 90, 180 oder 365 Tagen erscheint ein Badge-Effekt. Die Hall of Fame zeigt alle Badges (erreichte hervorgehoben). Gibst du Tage von Hand ein, erscheinen die passenden Badges still.
  Why now: Belohnung und Gerätewechsel hängen an derselben Regel (Badges folgen aus der Tage-Zahl). Wenn die Regel stimmt, funktioniert beides.
  PRD ref: `prd.md > Meilensteine, Badges und Hall of Fame`, `prd.md > Gerätewechsel ohne Anmeldung`
  Spec ref: `spec.md > Milestones, Badges and Hall of Fame`, `spec.md > Data Model`
  Build: js/milestones.js mit Meilenstein-Liste (Namen in drei Sprachen) und Badge-Regel, Speicherung der erreichten Badges, Effekt beim normalen Erreichen (Leuchten und Konfetti ohne Bibliothek), Hall of Fame-Ansicht, stilles Setzen bei manueller Eingabe.
  Verify (mechanical): Regel per `node` prüfen (zum Beispiel 10 Tage ergeben 1 Tag und 1 Woche, 7 ergibt Effekt nur beim Wechsel von 6 auf 7). Im Browser den Effekt auslösen und die Hall of Fame öffnen.
  Learner check: Gib 6 Tage ein, tippe auf den Zähler und sieh den Effekt bei Tag 7. Öffne die Hall of Fame. Gib 10 Tage auf einem frischen Browser ein und prüfe, dass die Badges von selbst da sind.
  Commit: `Add milestones, badge effect and hall of fame`

- [x] **6. Lemon Soda wird eine installierbare App mit deinem Icon**
  Becomes usable: Die Seite lässt sich zum Home-Bildschirm hinzufügen, öffnet sich im Vollbild mit deinem Zitronen-Icon und startet auch ohne Netz. Das Onboarding erklärt, wie man sie hinzufügt (iPhone und Android).
  Why now: Der lokale Speicher ist nur sicher, wenn die App installiert ist, und das Icon gehört zum Premium-Eindruck. Das Risiko "Daten gehen verloren" sollte früh abgesichert sein.
  PRD ref: `prd.md > Onboarding`
  Spec ref: `spec.md > PWA Layer`, `spec.md > Look and Feel` (Icon), `spec.md > Important Failure Modes`
  Build: Zitronen-Icon aus assets-source/icon-source.webp in PNG-Größen umwandeln (Ecken bereinigen, Favicon, 192, 512, Apple-Touch-Icon), manifest.webmanifest, sw.js mit versioniertem Cache, Hinweiskarte im Onboarding mit Anleitung für iPhone und Android.
  Verify (mechanical): Icon-Dateien existieren mit den richtigen Größen, Manifest ist gültiges JSON, Service Worker registriert sich auf localhost und die Seite lädt bei beendetem Server aus dem Cache.
  Learner check: Öffne die App auf deinem Handy (über den lokalen Rechner oder später Vercel), folge der Anleitung zum Hinzufügen und sag, ob das Icon und der Vollbildstart so aussehen, wie du es willst.
  Commit: `Add PWA manifest, service worker, icons and install hint`

- [x] **7. Premium-Feinschliff und README**
  Becomes usable: Lemon Soda sieht aus wie eine Premium-App: mitgelieferte Schrift, Glas-Optik, weiche Übergänge, sicher lesbar auf hellen und dunklen Fotos. Ein README erklärt Start und Veröffentlichung.
  Why now: Der Feinschliff kommt zuletzt, weil er alle Ansichten berührt. Dann wissen wir, was wirklich da ist, und die Abgabe kann vorbereitet werden.
  PRD ref: `prd.md > Look and Feel`
  Spec ref: `spec.md > Look and Feel`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Schrift (Manrope, Lizenz und Größe prüfen) lokal einbinden, Glas-Flächen und Verläufe über dem Foto, Übergänge zwischen Ansichten, Zähler-Typografie, Badge-Optik. Lesbarkeit mit einem hellen und einem dunklen Testfoto prüfen. README mit Start, Datenschutz-Hinweis und Vercel-Schritten.
  Verify (mechanical): Alle Ansichten in allen drei Sprachen im Browser mit einem hellen und einem dunklen Foto durchgehen, Text bleibt lesbar und Buttons brechen nicht. Kein Verweis auf externe Server in den Dateien (Suche nach `http`-Adressen im Code). Schriftdatei und Lizenz liegen im Projekt.
  Learner check: Gehe die ganze App durch und sag, ob sie wie eine Premium-App wirkt und was dich noch an einen Baukasten erinnert.
  Commit: `Polish look and feel and add README`

## Hands-on Checkpoints

- [x] Early usable behavior explored — nach Slice 3 (Foto, Zähler, Rückfall und Überzeugung sind benutzbar)
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

Final review outcome: the learner explored the app over several rounds (welcome text, first-day hint, install guide as a collapsible last step, button wording, legal texts); every request was implemented, verified and committed, and the learner confirmed the app is ready. The learner confirmed the name in the legal notice and chose to publish it without a postal code (`js/legal.js`). Before publishing, personal sentences in the planning documents were neutralized.

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
- Install guide became numbered steps per device, the last onboarding step behind a collapsible "step-by-step guide" button, and also in the menu — the learner said almost nobody knows how to add a web app to the home screen, and chose the last position and the collapsible layout. Tradeoff recorded: an app added to the iPhone home screen keeps its own data separate from Safari, so people who finish setup in Safari first set it up once more there (the guide says so).
- Button 3 renamed from "I need convincing" to "Remind me why" (and Spanish "He fallado" to "He tropezado") — the learner said the old wording felt weak.
- Manrope font added with its OFL license (24.8 KB, from the fontsource npm package via jsDelivr) — approved by the learner on condition that it is freely usable.
- Menu and top shade darkened — a very bright photo made the menu unreadable.
- Privacy policy and legal notice added to the menu in three languages (js/legal.js) — the learner lives in Spain and the app is public, so the EU rules apply. The onboarding line "zero data sharing" became "what you enter never leaves this device", because the hosting provider technically sees the IP address when the page loads. Owner details (name assumed from the contact email, no postal code given) are in one place and need the learner's confirmation. The texts are a draft, not legal advice.
