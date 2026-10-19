---
doc: spec
status: approved
---

# Lemon Soda — Technical Spec

## How This Works, In Plain Language
Lemon Soda ist eine einzelne Webseite, die sich wie eine App anfühlt. Es gibt keinen Server und keine Datenbank, sondern nur Dateien, die der Browser lädt: eine Seite (HTML), das Aussehen (CSS) und das Verhalten (JavaScript).

Alles, was du eingibst, speichert der Browser auf deinem Handy: Name, Spruch, Hintergrundbild, geschaffte Tage und Badges. Es verlässt das Gerät nie. Das ist die einzige Stelle, an der Daten liegen, und deshalb ist die App wirklich anonym. Vercel liefert nur die Dateien der Seite aus, so wie ein Regal, aus dem man ein Buch nimmt. Dein Stand ist nicht im Regal.

Weil jeder Browser nur seine eigenen Daten kennt, gibt es auf einem neuen Handy keinen Stand. Dort gibst du die Tage im Eingabefeld ein, und die Badges ergeben sich aus der Zahl. So ist es im PRD gewünscht.

Damit die Seite sich wie eine App verhält, kommt eine Beschreibungsdatei dazu (das "Manifest": Name, Icon, Farben). Damit lässt sie sich zum Home-Bildschirm hinzufügen und öffnet sich im Vollbild. Ein kleines Hilfsprogramm im Hintergrund (Service Worker) merkt sich die Dateien, damit die App auch ohne Netz startet.

Warum so einfach: Dein Proof of Concept soll den Kern zeigen, nicht eine Infrastruktur. Kein Framework, kein Build-Schritt, keine Konten, keine externen Dienste.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
1. **Erster Start.** Der Browser lädt die Seite von Vercel. Die App findet im Speicher keinen Eintrag `onboarded` und zeigt das Onboarding. Du wählst ein Bild. Es wird verkleinert und im Browser gespeichert. Name und Spruch kommen dazu, `onboarded` wird gesetzt.
2. **Startbildschirm.** Die App liest Bild, Spruch und Tage aus dem Speicher und zeichnet das Vollbild mit 3 Buttons.
3. **Abends, Tipp auf den Zähler.** Die App prüft das heutige Datum. Wurde heute noch kein Tag eingetragen, zählt sie +1, speichert das Datum und prüft, ob ein Meilenstein erreicht wurde. Dann zeigt sie den Badge-Effekt.
4. **Schwach geworden.** Die App zeigt zufällig einen aufmunternden Spruch, die Zahl bleibt gleich.
5. **Überzeugung.** Du wählst "negativ" oder "positiv" und blätterst durch die Gründe.
6. **Nächster Tag.** Beim Öffnen vergleicht die App das Datum mit dem letzten eingetragenen Tag und zeigt den Splash ("Tag 6 – du schaffst das heute"). Wurde ein Tag ausgelassen, fragt sie nach den Tagen.

## Stack
- **HTML, CSS und JavaScript** (Vanilla JS mit ES-Modulen), ohne Framework und ohne Build-Schritt. [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- **localStorage** für kleine Daten (Name, Spruch, Tage, Datum, Badges). [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- **IndexedDB** für das Hintergrundbild, weil ein Foto zu groß für localStorage ist. [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- **PWA:** Web-App-Manifest und Service Worker. [MDN: Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- **Vercel** für das Hosting der statischen Dateien. [Vercel Docs](https://vercel.com/docs)
- **GitHub** für das öffentliche Repository (Pflicht der Abgabe).

Begründung (Empfehlung, vom Learner angenommen): Die einfachste Technik, die alle PRD-Punkte erfüllt. Nachteil: Bei viel späterem Wachstum wäre ein Framework übersichtlicher, für diesen Proof of Concept ist das nicht nötig.
Noch nicht geprüft (früh im Build prüfen): aktuelle Vercel-Oberfläche und -Schritte, Verhalten des Home-Bildschirm-Hinweises auf iOS und Android.

## Where It Runs and How Someone Tries It
- **Läuft im Browser** des Handys (oder Computers), ausgeliefert von Vercel.
- **Lokal starten** (für Entwicklung und Demovideo): im Projektordner `python3 -m http.server 8080` (oder `npx serve`), dann `http://localhost:8080` öffnen. Der Service Worker funktioniert nur auf `localhost` oder `https`, nicht beim Öffnen der Datei per Doppelklick.
- **Demovideo:** Bildschirmaufnahme von der lokalen oder der Vercel-Version. Zeigen: Onboarding, Startbildschirm, Tag +1, Überzeugung, Rückfall-Spruch, Badge-Effekt, Hall of Fame.
- **Veröffentlichen (Wunsch des Learners):** Repository auf GitHub, dann auf Vercel importieren (Framework "Other", kein Build-Befehl, Ausgabeordner = Projektordner). Der Deploy-Link kommt in die Abgabe, ersetzt aber nicht das Video und das öffentliche Repository.
- **Keine API-Schlüssel, keine Konten, keine Kosten** (Vercel Hobby-Tarif genügt, Preise vor dem Deploy prüfen).

## Look and Feel
Source: `prd.md > Look and Feel`, `scope.md > Inspiration & Identity`.
- **Farben:** Tiefes Smaragdgrün (vom Icon, etwa `#0b3d2c` bis `#126b4a` als Verlauf) als Grundton, Zitronengelb (etwa `#ffd93b`) als Akzent für Zähler, Badges und Hervorhebungen. Weiß für Text auf dunklen Glasflächen.
- **Premium statt Baukasten:** Glas-Optik (halbtransparent mit Unschärfe, `backdrop-filter`), weiche Verläufe, feine Schatten, große ruhige Schrift, weiche animierte Übergänge, Badge-Effekt mit Konfetti-Partikeln und Leuchten.
- **Lesbarkeit hat Vorrang:** Buttons und Spruch sitzen auf dunkler Glasfläche, dazu ein dunkler Verlauf von unten über das Foto, damit sie auf jedem Bild lesbar sind.
- **Schrift:** Eine moderne, weiche Sans-Serif, die im Projekt mitgeliefert wird, damit die App offline gleich aussieht. Vorschlag: Manrope (Open Font License). Vor dem Bau Lizenz und Dateigröße prüfen.
- **Ton:** ermutigend, positiv, nie beschämend. Alle Texte gibt es auf Englisch, Deutsch und Spanisch. Die Oberfläche muss längere Wörter aushalten (Buttons dürfen umbrechen oder skalieren).
- **Icon:** Das Zitronen-Icon des Learners (`assets-source/icon-source.webp`).
- **Grenze:** CSS ohne Bibliothek kann all das. Ein Premium-Eindruck hängt am sauberen Feinschliff, den wir im Build mit dem Browser prüfen.

## Components

### Onboarding
Zeigt der Reihe nach kurze Karten: Sprachauswahl (Englisch, Deutsch, Spanisch, vorausgewählt nach Gerätesprache), Willkommen und Zweck, Hinweis "Hilfsmittel, keine Garantie, komplett anonym, keine Datenweitergabe", Name (optional), Bild und Spruch wählen, Hinweis zum Hinzufügen zum Home-Bildschirm. Setzt am Ende `onboarded`.
PRD ref: `prd.md > Onboarding`.

### Home Screen (Startbildschirm)
Vollbild-Hintergrund, Spruch dicht über den Buttons, 3 Buttons unten (Zähler, "Schwach geworden", "Überzeugung"), kleines Menü oben rechts.
PRD ref: `prd.md > Startbildschirm und die 3 Buttons`.

### Splash
Kurze Vollbild-Anzeige beim erneuten Öffnen mit Zahl und Spruch, blendet dann zum Startbildschirm über. Die Textwahl folgt dem Datum (heute schon eingetragen oder neuer Tag).
PRD ref: `prd.md > Splashscreen beim erneuten Öffnen`.

### Day Counter Logic
Hält die Regeln: +1 nur einmal pro Kalendertag, Nachfrage bei doppeltem Tippen oder bei ausgelassenen Tagen mit Zahlenfeld, manuelle Eingabe setzt die Tage. Arbeitet mit lokalem Datum (`YYYY-MM-DD`), nicht mit UTC.
PRD ref: `prd.md > Tage korrigieren`, `prd.md > Gerätewechsel ohne Anmeldung`.

### Convictions (Überzeugung)
Auswahl "negativ" oder "positiv", dann einzelne Gründe, Tippen zeigt den nächsten (ohne direkte Wiederholung).
PRD ref: `prd.md > Überzeugung`.

### Slip Message (Schwach geworden)
Zeigt einen zufälligen aufmunternden Spruch. Ändert die Zahl nicht.
PRD ref: `prd.md > Startbildschirm und die 3 Buttons`.

### Milestones, Badges and Hall of Fame
Meilensteine: 1 Tag, 1 Woche, 1 Monat, 2, 3, 6 Monate, 1 Jahr (gezählt in Tagen: 1, 7, 30, 60, 90, 180, 365). Beim Erreichen durch normales +1 läuft der Effekt einmal. Bei manueller Eingabe werden die passenden Badges ohne Effekt gesetzt. Die Hall of Fame zeigt alle Badges, erreichte hervorgehoben.
PRD ref: `prd.md > Meilensteine, Badges und Hall of Fame`.

### Legal Texts (Datenschutz und Impressum)
`js/legal.js` enthält die Texte in en, de, es und die Angaben des Verantwortlichen an genau einer Stelle (`OWNER`). Das Menü öffnet sie in einer Ansicht über dem Startbildschirm. Geschrieben für ein privates, nichtkommerzielles Projekt aus Spanien (DSGVO, ePrivacy/LSSI). Entwurf, keine Rechtsberatung.
PRD ref: `prd.md > Rechtliche Texte (Datenschutz und Impressum)`.

### Settings and Menu
Menü oben rechts mit Hall of Fame und Einstellungen. Einstellungen ändern Sprache, Name, Bild und Spruch. Änderungen wirken sofort, auch der Sprachwechsel.
PRD ref: `prd.md > Einstellungen`.

### Image Store
Verkleinert das gewählte Foto (längste Seite höchstens 1600 Pixel, JPEG) und legt es in IndexedDB ab. Liefert es beim Start zurück.
PRD ref: `prd.md > Onboarding`.

### PWA Layer
Manifest (Name "Lemon Soda", Farben, Icons), Service Worker (speichert die Dateien für Offline-Start), Schritt-für-Schritt-Anleitung (nummeriert, mit Symbolen) für iPhone/Safari und Android/Chrome, im Onboarding als letzter Schritt (zugeklappt hinter einem Knopf, das Auf- und Zuklappen übernimmt das HTML-Element `<details>`) und jederzeit im Menü. Auf dem iPhone hat die installierte App eigene Daten, deshalb steht im letzten Schritt der Anleitung, dass man sie dort noch einmal einrichtet und seine Tage eintippen kann. Auf Android-Chrome gibt es zusätzlich einen "Jetzt installieren"-Knopf, sobald der Browser die Installation anbietet.
PRD ref: `prd.md > Onboarding`.

### Content
Eine Datei mit allen Texten in drei Sprachen (`en`, `de`, `es`): Überzeugungsgründe (negativ und positiv), Rückfall-Sprüche, Splash-Sprüche, Onboarding- und Oberflächentexte. Ein kleiner Helfer (`js/i18n.js`) liefert den Text zur gewählten Sprache und aktualisiert die Ansichten beim Wechsel. Die KI schreibt die Texte als Vorschlag, der Learner prüft sie. Das gilt auch für die Meilenstein-Namen. Jede Gruppe hat in jeder Sprache gleich viele Einträge.
PRD ref: `prd.md > Onboarding`, `prd.md > Einstellungen`.
PRD ref: `prd.md > Überzeugung`.

## Data Model
Alles lokal im Browser des Geräts.

| Daten | Wo | Aktualisiert durch | Beim Zurückkommen |
|---|---|---|---|
| `name` (optional) | localStorage | Onboarding, Einstellungen | bleibt |
| `motto` (Spruch) | localStorage | Onboarding, Einstellungen | bleibt |
| `days` (geschaffte Tage) | localStorage | Tipp auf Zähler, Korrekturfeld | bleibt |
| `lastCompletedDate` | localStorage | Tipp auf Zähler, Korrekturfeld | bleibt, steuert Splash und Nachfragen |
| `badges` (erreichte Meilensteine) | localStorage | Zähler-Logik | bleibt |
| `lang` (`en`, `de`, `es`) | localStorage | Onboarding (erster Schritt), Einstellungen | bleibt |
| `onboarded` | localStorage | Ende des Onboardings | bleibt |
| Hintergrundbild | IndexedDB | Onboarding, Einstellungen | bleibt |

Hinweis: Safari kann Daten nicht installierter Seiten nach längerer Nichtnutzung löschen. Deshalb gibt es die PWA mit Home-Bildschirm-Hinweis, und das Tage-Eingabefeld fängt den Fall ab.

## File Structure
```
lemon-soda/
├── index.html            # Einstiegsseite, enthält alle Bildschirme
├── manifest.webmanifest  # PWA: Name, Farben, Icons
├── sw.js                 # Service Worker (Offline-Start)
├── css/
│   └── styles.css        # Aussehen, Glas-Optik, Animationen
├── js/
│   ├── app.js            # Start, Bildschirmwechsel, Buttons
│   ├── store.js          # localStorage und IndexedDB
│   ├── days.js           # Zähler-Regeln, Datum, Korrektur
│   ├── milestones.js     # Meilensteine, Badges, Effekt
│   ├── content.js        # Alle Texte in en, de, es
│   ├── i18n.js           # Sprache wählen, Text liefern, Ansichten aktualisieren
│   ├── legal.js          # Datenschutz und Impressum in en, de, es
│   └── image.js          # Foto wählen und verkleinern
├── assets/
│   ├── icons/            # Favicon, App-Icons aus dem Zitronen-Icon
│   └── fonts/            # mitgelieferte Schrift
├── assets-source/
│   └── icon-source.webp  # Original des Learners
├── devpost/              # Devpost-Lernordner
└── README.md             # Start, Deploy, Hinweise
```

## External Services and Dependencies
- **Vercel** (nur Hosting statischer Dateien): kein API-Aufruf, kein Schlüssel. [Vercel Docs](https://vercel.com/docs). Kosten und Grenzen des Hobby-Tarifs vor dem Deploy prüfen. Vercel Analytics bleibt aus (Datenschutz).
- **GitHub:** öffentliches Repository für die Abgabe. [GitHub Docs](https://docs.github.com)
- **Keine** Bibliotheken zur Laufzeit, keine Schriften von Google (alles liegt im Projekt), keine Analyse- oder Werbedienste. Die App stellt keine Netzwerkanfragen mit Nutzerdaten.

## Important Failure Modes
- **Browser löscht lokale Daten (z. B. Safari)** → Die App startet im Onboarding, bzw. fragt nach den Tagen. Das Eingabefeld stellt die Zahl wieder her, Badges ergeben sich daraus.
- **Foto zu groß oder nicht lesbar** → Die App verkleinert es, bei Fehler zeigt sie eine freundliche Meldung und einen grünen Verlauf als Standard-Hintergrund.
- **Datum, Zeitzone oder Datumswechsel um Mitternacht** → Die App nutzt das lokale Datum. Bei unplausibler Eingabe (negativ, riesig) zeigt das Feld eine kurze Meldung.
- **Service Worker liefert alte Dateien** → Die Cache-Version wird bei jeder Änderung hochgezählt.

## What Was Simplified and Why
- **Eine Seite aus HTML, CSS und JS** statt Framework — weniger Setup, kein Build. Ein Framework würde bei einem so kleinen Umfang nur Komplexität bringen.
- **Tage von Hand eingeben** statt Export/Import oder Konto — im PRD entschieden. Ein Export bräuchte eigenes Format und eigene Oberfläche.
- **Drei Sprachen von Anfang an** — Wunsch des Learners (ersetzt "nur Englisch zuerst"). Der Mehraufwand liegt bei den Texten und beim Prüfen der Layouts. Keine Bibliothek, nur eine eigene kleine Textstruktur.
- **Kein Server und keine Datenbank** — passt zum Datenschutz-Ziel und spart Aufwand.
- **Textinhalte als KI-Vorschlag** — der Learner prüft Deutsch selbst. Spanisch sollte vor der Veröffentlichung eine Person mit Muttersprache gegenlesen.

## Decisions and Open Issues
**Entschieden vom Learner:**
- Name **Lemon Soda**. **Drei Sprachen (Englisch, Deutsch, Spanisch) von Anfang an**, Auswahl im Onboarding. Hosting auf **Vercel**. Daten nur lokal, komplett anonym. **PWA** mit Hinweis im Onboarding. Eigenes Zitronen-Icon. Farbwelt Smaragdgrün mit Zitronengelb (Vorschlag aus dem Gespräch, mit der Freigabe der Spec bestätigt). Onboarding-Hinweis "Hilfsmittel, keine Garantie, anonym".

**Abgeleitet (Umsetzungsdetails aus den Entscheidungen):**
- Vanilla HTML, CSS, JS. Foto in IndexedDB, Rest in localStorage. Meilensteine in Tagen (1, 7, 30, 60, 90, 180, 365). Schrift Manrope (vorzuschlagen und zu prüfen).

**Eine echte Unklarheit, die besprochen wurde:** Wo die Daten liegen und warum ein neues Handy nichts übernimmt. Geklärt durch die Erklärung "Browser-Speicher gehört einem Browser auf einem Gerät" und den Verlust-Fall bei Safari. Im Build prüfen wir es praktisch: App schließen und wieder öffnen (Daten bleiben), anderer Browser (leer), Eingabefeld (Badges erscheinen).

**Offen:**
- Manrope-Lizenz und Dateigröße prüfen (kann im Build geklärt werden).
- Aktuelle Vercel-Schritte prüfen (vor dem Deploy).
- Wie der Hinweis zum Home-Bildschirm auf dem Gerät des Learners aussieht (im Build testen).
- Spanische Texte von einer Person mit Muttersprache gegenlesen lassen (vor der Veröffentlichung, nicht blockierend für den Bau).
- Bild für das Icon liegt als WebP mit weißen Ecken vor und wird im Build bereinigt und in PNG-Größen umgewandelt.
