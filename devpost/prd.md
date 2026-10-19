---
doc: prd
status: approved
---

# Lemon Soda — Product Requirements

Eine sehr einfache WebApp ohne Anmeldung, die beim Aufhören mit einer schlechten Gewohnheit hilft. Version 1 deckt nur Alkohol (Bier) ab und ist zuerst für den Learner selbst gedacht.
Source: `scope.md > The Core Loop`, `scope.md > The POC Boundary`.

## The Core Journey
1. **Erster Start:** Ein kurzes Onboarding. Als Erstes wählt man die Sprache (Englisch, Deutsch, Spanisch). Es erklärt, wofür die Angaben sind und dass man sie später in den Einstellungen ändern kann. Man gibt optional einen Namen ein, wählt ein Hintergrundbild als Motivation und schreibt einen eigenen Spruch.
2. **Startbildschirm:** Das Bild füllt den Bildschirm. Der Spruch steht dicht über den Buttons. Unten stehen 3 gut lesbare Buttons. Der erste zeigt als Zahl die geschafften Tage.
3. **Am Abend, im schwachen Moment:** Man tippt entweder auf den Zähler-Button (Tag geschafft), auf "Schwach geworden" oder auf "Überzeugung".
4. **Meilenstein erreicht:** Ein Effekt zeigt das neue Badge. Alle Badges stehen in der Hall of Fame.
5. **Nächster Tag, erneutes Öffnen:** Ein Splashscreen zeigt die Zahl und einen Spruch, danach folgt der Startbildschirm.
Erfolg heißt: Man öffnet die App, sieht sein Bild und seinen Fortschritt und bekommt im schwachen Moment Kraft.

## Screens and Layout
Source: `scope.md > What "Working" Looks Like`.
- **Onboarding** (nur beim ersten Start, kurz): Sprachauswahl, Erklärung, Hinweis zu Datenschutz und Erwartung, Name (optional), Hintergrundbild, eigener Spruch, Hinweis zum Hinzufügen zum Home-Bildschirm.
- **Splashscreen** (bei jedem erneuten Öffnen): Zahl und kurzer Spruch.
- **Startbildschirm:** Vollbild-Hintergrundbild. Der Spruch sitzt dicht über den Buttons, damit das Bild gut sichtbar bleibt. Unten stehen genau 3 Buttons. Oben rechts ist ein kleines Menü.
- **Menü (oben rechts):** führt zur Hall of Fame und zu den Einstellungen.
- **Hall of Fame:** Übersicht aller Badges, auch der noch nicht erreichten.
- **Einstellungen:** Sprache, Name, Hintergrundbild und Spruch ändern.
- **Überzeugung-Ansicht:** Zwei Auswahlmöglichkeiten, siehe unten.

## Look and Feel
Source: `scope.md > Inspiration & Identity`.
- Farbwelt vom Logo (Zitrone auf tiefem Smaragdgrün): dunkles Grün als Grundton, Zitronengelb als Akzent (Vorschlag, in der Spec bestätigt).
- App-Icon/Favicon: das vom Learner gewählte Zitronen-Icon (`assets-source/icon-source.webp`).
- Wirkt wie eine Premium-App und nicht wie ein Baukasten: nicht Standard, mit Effekten (weiche Übergänge, Glas-/Verlaufs-Optik, Badge-Effekt).
- Lesbarkeit hat Vorrang: Buttons und Spruch müssen auf jedem Foto gut lesbar sein.
- Tonfall: ermutigend, positiv, nie beschämend.

## Features and Behavior

### Onboarding
Kurz. Es erklärt, wofür Bild und Spruch sind (Motivation im schwachen Moment) und dass man sie später in den Einstellungen ändern kann.
- Das Onboarding sagt klar: Lemon Soda ist ein Hilfsmittel und keine Erfolgsgarantie. Die App ist komplett anonym (kein Konto, kein Tracking, keine Werbung), und was man eingibt, verlässt nie das Gerät. Ehrlicher Hinweis: Der Hosting-Anbieter sieht beim Laden der Seite technisch die IP-Adresse in seinen Server-Protokollen, das steht in der Datenschutzerklärung.
- Das Onboarding erklärt Schritt für Schritt (nummeriert, mit Symbolen) und getrennt für iPhone (Safari) und Android (Chrome), wie man die App zum Home-Bildschirm hinzufügt (PWA), damit sie sich wie eine App öffnet und die Daten nicht verloren gehen. Die Anleitung ist der letzte Onboarding-Schritt und steht zugeklappt hinter einem Knopf ("So geht's – Schritt für Schritt"), der sie aufklappt. Hinweis: Eine auf dem iPhone installierte App hat eigene Daten, deshalb steht im letzten Schritt der Anleitung, dass man sie dort noch einmal einrichtet (Tage lassen sich eintippen). Dieselbe Anleitung gibt es jederzeit im Menü ("Zum Home-Bildschirm hinzufügen"). In einer schon installierten App entfällt sie.
- [ ] Beim allerersten Öffnen erscheint das Onboarding, bei späteren Öffnungen nicht.
- [ ] Das Onboarding enthält den Hinweis "Hilfsmittel, keine Garantie" und "anonym, Eingaben verlassen nie das Gerät".
- [ ] Das Onboarding enthält eine nummerierte Schritt-für-Schritt-Anleitung zum Hinzufügen zum Home-Bildschirm, passend zum Gerät (iPhone, Android), und sie ist auch im Menü erreichbar.
- [ ] Name ist optional und kann übersprungen werden.
- [ ] Der erste Schritt ist die Sprachauswahl (Englisch, Deutsch, Spanisch). Alle Texte erscheinen danach in der gewählten Sprache.
- [ ] Nach dem Onboarding erscheint der Startbildschirm mit dem gewählten Bild und Spruch.

### Startbildschirm und die 3 Buttons
- **Button 1 (Zähler):** zeigt nur die Zahl der geschafften Tage. Ein Tipp zählt einen Tag dazu ("Tag geschafft").
- **Button 2 "Ich bin schwach geworden":** zeigt sofort einen aufmunternden Spruch (etwa "Kann passieren, kein Ding, morgen schaffst du es, nur Mut"). Die Zahl bleibt unverändert.
- **Button 3 "Remind me why" (Deutsch "Erinnere mich, warum", Spanisch "Recuérdame por qué"):** öffnet die Überzeugung-Ansicht. Der Learner wollte kein Wort, das sich schwach anfühlt (vorher "I need convincing"). Auch das spanische "I slipped" ist jetzt "He tropezado".
- [ ] Es gibt genau 3 Buttons auf dem Startbildschirm.
- [ ] Der Tipp auf Button 1 erhöht die Zahl um 1.
- [ ] Nach "Schwach geworden" bleibt die Zahl gleich und ein ermutigender Spruch erscheint.

### Überzeugung
Zwei Auswahlmöglichkeiten:
1. **Negative Einflüsse:** konkrete Beispiele, was und wie Alkohol mit einem macht (z. B. Leberschäden, Familie vernachlässigen, Vorbildfunktion). Es soll viele solche Gründe geben.
2. **Positive Gründe:** z. B. "Du hast schon schwierigere Situationen geschafft", "Wenn du heute nichts trinkst, hast du morgen mehr Energie".
- [ ] Beide Auswahlmöglichkeiten sind sichtbar und führen zu eigenen Inhalten.
- [ ] Es gibt in jeder Gruppe mehrere verschiedene Gründe.
- [ ] Auch die negativen Gründe sind motivierend formuliert, nicht beschämend.

### Splashscreen beim erneuten Öffnen
- Zeigt die Zahl und einen kurzen Spruch.
- Hat man heute schon einen Tag eingetragen: z. B. "Schon 5 Tage – weiter so".
- Hat man gestern Tag 5 geschafft und öffnet heute zum ersten Mal: z. B. "Tag 6 – du schaffst das heute".
- [ ] Der Splash erscheint bei jedem erneuten Öffnen und führt danach zum Startbildschirm.

### Tage korrigieren
- Tippt man am selben Tag nochmal auf den Zähler-Button, fragt die App freundlich, ob das Absicht war, und bietet ein Feld zum Eingeben der Tage.
- Hat man einen Tag ausgelassen und öffnet später, gibt es dieselbe Nachfrage mit Eingabefeld.
- [ ] Beide Fälle zeigen die Nachfrage mit Eingabefeld.
- [ ] Nach der Eingabe zeigt der Zähler die neue Zahl.

### Rechtliche Texte (Datenschutz und Impressum)
Die App steht öffentlich im Netz, der Learner lebt in Spanien. Deshalb gibt es im Menü zwei Texte in allen drei Sprachen: Datenschutzerklärung und Impressum/Aviso legal. Sie nennen den Verantwortlichen mit Kontakt, erklären ehrlich was gespeichert wird (nur auf dem Gerät), dass der Hosting-Anbieter Vercel technisch die IP-Adresse protokolliert, dass kein Cookie-Banner nötig ist, die Rechte nach DSGVO und die spanische Datenschutzbehörde AEPD, und enthalten den Hinweis "keine medizinische Beratung". Das ist ein Entwurf und keine Rechtsberatung.
- [ ] Im Menü gibt es "Datenschutz" und "Impressum" in der gewählten Sprache.
- [ ] Beide Texte nennen den Verantwortlichen mit Name, Anschrift und E-Mail.
- [ ] Der Datenschutztext nennt den Hosting-Anbieter und die Server-Protokolle ehrlich.

### Meilensteine, Badges und Hall of Fame
Source: `scope.md > What "Working" Looks Like`.
- Meilensteine: 1 Tag, 1 Woche, 1 Monat, 2 Monate, 3 Monate, 6 Monate, 1 Jahr.
- Beim Erreichen erscheint ein Effekt mit dem neuen Badge.
- Die Hall of Fame zeigt alle Badges, auch die noch nicht erreichten.
- Badges ergeben sich aus der Zahl der Tage. Gibt man die Tage neu ein, erscheinen die passenden Badges von selbst.
- [ ] Bei Erreichen eines Meilensteins erscheint ein Effekt mit dem Badge.
- [ ] Die Hall of Fame zeigt erreichte und noch offene Badges.
- [ ] Nach manueller Eingabe von z. B. 10 Tagen sind die Badges für 1 Tag und 1 Woche vorhanden.

### Einstellungen
- [ ] Sprache, Name, Hintergrundbild und Spruch lassen sich ändern.
- [ ] Nach einem Sprachwechsel erscheinen alle Texte der App sofort in der neuen Sprache.
- [ ] Die Änderungen sind sofort auf dem Startbildschirm sichtbar.

### Gerätewechsel ohne Anmeldung
Auf dem neuen Gerät gibt man die Anzahl der Tage im Eingabefeld ein, die Badges kommen von selbst. Es gibt keinen Export und keine Anmeldung.
- [ ] Auf einem neuen Gerät lässt sich die Tage-Zahl eingeben, und die Badges erscheinen passend.

## States and Boundaries
- **Erster Start:** Onboarding statt Startbildschirm.
- **Zähler bei 0:** Statt der Zahl 0 steht ein kurzer Hinweis auf dem Zähler-Button ("Tap when day 1 is done"), damit klar ist, dass man tippt, wenn der erste Tag geschafft ist. Noch kein Badge. Ab Tag 1 zeigt der Button die Zahl; solange der heutige Tag noch nicht eingetragen ist, steht darunter klein "Tap when today is done".
- **Nach "Schwach geworden":** Zahl bleibt, Ermutigung statt Strafe.
- **Gleicher Tag zweimal / Tag ausgelassen:** Nachfrage mit Eingabefeld.
- **Was bleibt beim Schließen:** Tage, Badges, Name, Bild und Spruch bleiben auf dem Gerät erhalten.
- **Sprache:** Die gewählte Sprache bleibt auf dem Gerät gespeichert. Vorausgewählt ist die Sprache des Geräts, falls es Englisch, Deutsch oder Spanisch ist, sonst Englisch.
- **Keine Konten:** Alles bleibt auf dem Gerät, nichts wird an andere gesendet.

## Product Decisions
- Nur Alkohol in Version 1 — damit es in 2–4 Stunden machbar bleibt.
- Der Zähler ist Button 1, es bleibt bei 3 Buttons — damit die App sehr einfach bleibt.
- Rückfall setzt die Zahl nicht zurück — die bereits geschafften Tage sollen bleiben.
- Gerätewechsel nur über das Eingabefeld — "das reicht erstmal".
- Zwei Überzeugung-Arten (negativ, positiv) — damit man im schwachen Moment wählen kann, was einem hilft.
- Premium-Optik mit Effekten — soll nicht nach Baukasten aussehen. Farbwelt vom Logo (Smaragdgrün, Zitronengelb).
- Name der App ist **Lemon Soda** (Soda mit Zitrone, die Alternative zum Bier) — positiv und anonym.
- Veröffentlichung auf Vercel, Daten nur lokal im Browser — das Thema ist sehr sensibel.
- Als PWA installierbar, mit Hinweis im Onboarding — damit die lokal gespeicherten Daten nicht gelöscht werden und sich die App wie eine App anfühlt.
- App in drei Sprachen von Anfang an (Englisch, Deutsch, Spanisch), Auswahl im Onboarding — der Learner will die App direkt für mehr Menschen nutzbar machen. Das ersetzt die frühere Annahme "nur Englisch zuerst". Die Übersetzung schreibt die KI als Vorschlag, der Learner prüft sie.
- Stimmungsabfrage ("Wie geht's dir heute?") nur später.

## What We're Building
Alle Punkte oben unter "Features and Behavior" für Alkohol, in drei Sprachen: Onboarding mit Sprachauswahl, Startbildschirm mit 3 Buttons, Splashscreen, Überzeugung mit zwei Arten, Tage-Korrektur, Meilensteine mit Badge-Effekt und Hall of Fame, Menü mit Einstellungen, Gerätewechsel über Eingabefeld.

## Deferred From the POC
- Weitere Gewohnheiten (Spielen, Drogen) — brauchen eigene Inhalte.
- Stimmungsabfrage mit Smileys beim Öffnen — ein eigener Verlauf mit eigenem Aufwand.

## Possible Later Enhancements
- Export/Import des Standes (Code oder Datei) für den Gerätewechsel.
- Mehr Meilensteine über ein Jahr hinaus.

## Non-Goals
- Anmeldung oder Konten — bewusst nicht gewollt.
- Daten an einen Server schicken.

## Open Questions
- Spanische Texte sollten vor der Veröffentlichung von einer Person mit Muttersprache gegengelesen werden (nicht blockierend für den Bau).
- **Annahme, vor Freigabe bestätigen:** Die Überzeugungsgründe erscheinen einzeln, mit Tippen zum nächsten Grund. Die Inhalte schreibt die KI als Vorschlag, der Learner prüft sie.
- Akzentfarbe: Zitronengelb auf Smaragdgrün passend zum Logo (in der Spec vorgeschlagen).
