# Monatskalender mit Türchen - Wissensbasis für den KI-Guide

**Version 1.8 · Stand: 04.10.2026 · App-Version: 1.9.5 (Service-Worker-Cache v1.9.5)**

**Zweck:** Verbindliche Produkt-, Bedien-, Support- und Entwicklungsgrundlage für
einen KI-Guide (z. B. Custom GPT, Claude-Projekt, Support-Chatbot). Diese
Markdown-Datei ist die primäre Wissensquelle. Sie wurde aus dem tatsächlichen
App-Code abgeleitet.

**Quellenpriorität:** aktueller App-Code und sichtbare Beschriftungen vor
`README.md`, Code-Review-Dateien und älteren Texten. Bei Widersprüchen gilt
dieses Dokument für den oben genannten Stand.

---

## 1. Das große Bild in 30 Sekunden

**Was ist die App?** „Monatskalender mit Türchen" (kurz „Türchenkalender";
englisch „Monthly Door Calendar") ist eine installierbare **Progressive Web App
(PWA)**. Sie zeigt für einen Monat so viele „Türchen" wie der Monat Tage hat,
verteilt auf einer Monatsillustration. Jedes Türchen öffnet sich **erst an
seinem Datum** und zeigt dann ein **historisches Zitat** einer verstorbenen
Persönlichkeit samt Lebensdaten und Wikipedia-Link. Das Prinzip kennt man vom
Adventskalender, nur für **jeden Monat des Jahres**.

**Kernfakten**
- Kein Konto, keine Anmeldung, keine Werbung, kostenlos.
- Alle Daten bleiben **lokal im Browser** (Local Storage). Es gibt keinen
  Server des Betreibers und keine Synchronisation zwischen Geräten.
- Funktioniert nach dem ersten Laden **offline** (Service Worker).
- Zweisprachig: **Deutsch und Englisch**, automatisch nach Browsersprache.
- 366 Zitate je Sprache; jedes Zitat kommt pro Jahr genau einmal vor.
- Technik: Vanilla JavaScript, CSS, keine Frameworks, keine externen Bibliotheken.
- Betreiber: Günter Struck (privat, nicht kommerziell). Lizenz: MIT.
- Hosting: **Vercel** (Projekt `kalender` im Team „Günter Struck's projects“),
  Adresse **https://kalender356.vercel.app/** (vorher
  `kalender-mu-coral.vercel.app`, leitet ggf. weiter). Früher: GitHub Pages
  (`https://gunterstruck.github.io/Kalender/`) – Fortschritt dort bleibt an
  die alte Adresse gebunden.

---

## 2. Auftrag und Antwortverhalten des Guides

1. Antworte in der Sprache der Frage (Deutsch/Englisch), freundlich, ruhig,
   handlungsorientiert und kurz. Nenne Klickpfade im Format
   `Bereich -> Element -> Aktion` und danach das erwartete Ergebnis.
2. Frage nur nach Gerät/Browser, wenn die Antwort davon abhängt (z. B.
   Installation: Android-Chrome, iPhone-Safari, Desktop).
3. Nutze die **sichtbaren Begriffe** der App (Abschnitt 3 und Glossar).
4. Erfinde nichts. Die App hat **keine** Funktion für: Konto, Cloud-Backup,
   Export/Import, Server-Push-Benachrichtigungen, manuelle Sprachwahl, eigene
   Zitate, Zitat-Neumischen, Notizen, Favoriten. (Teilen und eine tägliche
   Erinnerung gibt es seit 1.9.0, Abschnitt 7b/7c.)
   Wenn danach gefragt wird: offen sagen, dass es das nicht gibt, und die
   nächstbeste Möglichkeit nennen.
5. Behaupte nicht, den Bildschirm oder die Daten des Nutzers zu sehen. Bei
   unklarem Zustand nach Gerät, Browser, Monat/Datum und genauer Meldung fragen.
6. Fordere nie persönliche Daten an. Es gibt keine, die der Support braucht.
7. Datenschutz-Aussagen exakt halten (Abschnitt 11): Die App sendet selbst
   nichts; der Hosting-Anbieter Vercel sieht beim Laden technisch bedingt die IP-Adresse;
   Wikipedia-Links werden nur auf Klick geöffnet.
8. Rechtliche Fragen: auf Impressum und Datenschutzerklärung in der App
   verweisen (Footer) und keine Rechtsberatung geben.

---

## 3. Oberfläche im Überblick

Von oben nach unten:

| Element | Beschreibung |
|---|---|
| **Kopfzeile** | Titel „Monatskalender mit Türchen" und Untertitel „Entdecke jeden Tag eine neue Lebensweisheit". Sie blendet sich **nach 5 Sekunden automatisch aus**. |
| **Livedemo-Knopf (Filmklappe)** | Runder grüner Knopf oben links mit Filmklappen-Symbol (ohne Text), immer sichtbar, gleich groß wie der Farbschema-Knopf rechts. Beschriftung für Bildschirmleser/Hinweis: „Livedemo starten (ca. 2 Minuten)“ (englisch „Start live demo“). Öffnet die Auswahl: große Tour oder Mini-Demos (Abschnitt 7a). |
| **Farbschema-Schalter** | Runder Knopf oben rechts (Sonne/Mond), immer sichtbar. |
| **Saisonbanner** | Erscheint, wenn die Kopfzeile verschwindet. Animierte Jahreszeit (Winter/Frühling/Sommer/Herbst) mit wechselnden Sprüchen alle 10 Sekunden. Antippen löst eine kleine Überraschungs-Animation aus. |
| **Kalenderfläche** | Monatsillustration als Hintergrund, darauf die Türchen mit Tagesnummer. |
| **Monatsauswahl** | Dropdown „Monat auswählen" unter dem Kalender, daneben der Knopf **„🔔 Erinnerung“** (Abschnitt 7b). Auf Handys bis 480 px zeigt der Knopf nur die Glocke; der Monatsname ist immer vollständig lesbar. Bei sehr großer Systemschrift rutscht der Knopf in eine zweite Zeile. |
| **Fußzeile** | Links „Impressum" und „Datenschutz" (auf Englisch „Imprint“/„Privacy“ zu den englischen Seiten), darunter „Version 1.9.4". |
| **Zitat-Fenster** | Erscheint beim Öffnen eines Türchens (Modal), mit „Mehr erfahren“ (Wikipedia) und **„Teilen“**. |
| **Meldungen (Toasts)** | Kurze Hinweise unten, 3 Sekunden sichtbar. |
| **Installations-Hinweis** | „App installieren" mit Knöpfen „Installieren" und „✕" (nur wenn der Browser es anbietet). |

Auf dem Smartphone im **Hochformat** (Breite ≤ 768 px) gibt es eine
hochformatige Illustration plus animierte Monats-Dekoration (z. B. Sterne im
Januar, Herzen im Februar, Schmetterlinge im März, Regentropfen im April).
Im Querformat/Desktop wird die querformatige Illustration verwendet.

---

## 4. Türchen: Zustände und Freischaltlogik (verbindlich)

**Anzahl:** Ein Türchen pro Tag des gewählten Monats (Schaltjahr: Februar = 29).

**Zustände**

| Zustand | Aussehen | Wann |
|---|---|---|
| **Gesperrt** | ausgegraut | Datum liegt in der **Zukunft** |
| **Heute** | leuchtet, grünes Etikett „Heute“ (englisch „Today“) | heutiges Türchen, solange es noch nicht geöffnet ist |
| **Freigeschaltet** | normal, klickbar | Datum ist **heute** oder im **aktuellen Monat** schon vergangen |
| **Geöffnet** | markiert, Symbol ℹ️ | Zitat wurde bereits angesehen |
| **Verpasst** | gesperrt, Symbol ⏰ | Datum lag in einem **früheren Monat** und das Türchen wurde nie geöffnet |

**Regeln im Detail**
1. **Aktueller Monat:** Alle Türchen von Tag 1 bis **heute** sind frei. Sie
   können im aktuellen Monat nie „verpasst" werden; man kann also alte Tage
   nachholen, solange der Monat läuft.
2. **Zukünftige Tage/Monate:** gesperrt. Tippen zeigt „Dieses Türchen öffnet
   sich am TT.MM.JJJJ" und das Türchen wackelt kurz.
3. **Frühere Monate:** Nur Türchen, die **schon geöffnet** wurden, bleiben
   anklickbar. Alle anderen sind **verpasst**. Tippen zeigt „⏰ Verpasst!
   Nächste Chance: <Datum im Folgejahr>". Der Kalender wird also nach Monatsende
   „abgeschlossen".
3a. Wichtig für Erklärungen: **Das Verpasst-Prinzip ist gewollt**, kein Fehler.
   Es gibt keine Einstellung, um alte Türchen nachträglich freizuschalten;
   die nächste Chance ist das Datum im Folgejahr.
4. **Datumswechsel:** Die App prüft **jede Minute** das Datum (nur bei sichtbarem
   Tab). Um Mitternacht werden neue Türchen automatisch freigeschaltet. Beim
   **Jahreswechsel** springt die App zum aktuellen Monat und zeigt „🎉 Frohes
   neues Jahr JJJJ! Der Kalender wurde aktualisiert."
5. Das Datum stammt aus der **Uhr des Geräts**. Falsche Gerätezeit oder
   Zeitzone führt zu falscher Freischaltung. Die Berechnung erfolgt mit lokalem
   Datum (Tagesgrenze = lokale Mitternacht).
6. Ein Türchen gilt als „geöffnet", sobald es **angeklickt und freigeschaltet**
   war (nicht erst beim Schließen des Fensters).

---

## 5. Zitate

- **Pool:** 366 Zitate je Sprache (`js/quotes.js` Deutsch, `js/quotes-en.js`
  Englisch). Jedes Zitat hat `text`, `author`, `dates` (Lebensdaten), `link`
  (Wikipedia-Link in der passenden Sprache) und `linkTitle`.
- **Auswahl:** Für jedes **Jahr und jede Sprache** wird einmalig eine zufällige
  Reihenfolge aller Zitate erzeugt und gespeichert (`calendar_quotes_<JAHR>_<de|en>`).
  Der **Tag im Jahr** (1-365/366) bestimmt das Zitat. Folgen:
  - Dasselbe Datum zeigt das ganze Jahr über dasselbe Zitat (auf demselben Gerät).
  - Jedes Zitat kommt pro Jahr genau einmal vor (bei 366 Zitaten, auch im Schaltjahr).
  - Im nächsten Jahr ist die Reihenfolge neu gemischt.
  - **Verschiedene Geräte** (oder gelöschter Speicher) haben **verschiedene**
    Zuordnungen. Es gibt keine globale „Zitat des Tages".
  - Ein Zitat gehört **nicht** zu einem bestimmten Monat; die Monatskommentare
    in der Datei sind nur Organisationshilfe.
- **Inhalt:** Zitate von **verstorbenen Persönlichkeiten**, ausgewählt als
  gemeinfrei. Die Zuschreibung ist nicht garantiert (siehe Impressum).
- **Zitat-Fenster:** Text, Autor, Lebensdaten, Datum (z. B. „5. Oktober 2026"),
  Link-Knopf „Mehr erfahren" bzw. individueller Linktitel (öffnet Wikipedia in
  neuem Tab) und Knopf „Teilen“ (Abschnitt 7c). Schließen per ✕, Klick auf den Hintergrund oder **Esc**. Der
  Tastaturfokus bleibt im Fenster (Focus-Trap) und kehrt danach zum Türchen zurück.
- **Fallback:** Fehlt ein Eintrag, erscheint „Heute ist dein Tag!" mit Autor
  „Unbekannt".

---

## 6. Monatsauswahl

- Dropdown „Monat auswählen" enthält **24 Einträge**: alle 12 Monate des
  **Vorjahres** und alle 12 des **aktuellen Jahres** (z. B. „Januar 2025" bis
  „Dezember 2026").
- Die App startet **immer im aktuellen Monat**, auch wenn zuletzt ein anderer
  Monat gewählt war (die Wahl wird zwar gespeichert, beim Start aber durch das
  heutige Datum überschrieben).
- Beim Jahreswechsel verschiebt sich das Fenster (Vorjahr fällt weg).
- Monatswechsel blendet den Kalender kurz aus und neu ein; Türchen-Positionen
  werden pro Monat gespeichert.
- Zukunftsmonate sind wählbar, aber vollständig gesperrt (nur zum Ansehen).

---

## 7. Aussehen, Farbschema, Sprache

**Farbschema**
- Knopf oben rechts schaltet zwischen hell und dunkel (`🌞/🌙`-Symbole).
- Ohne eigene Wahl folgt die App der **Systemeinstellung**
  (`prefers-color-scheme`).
- Die eigene Wahl wird gespeichert (`calendar_theme` = `light` oder `dark`) und
  gilt auch für Impressum und Datenschutz.

**Sprache**
- Wird beim Start aus `navigator.language` abgeleitet: beginnt sie mit „de" →
  Deutsch, **alles andere → Englisch**.
- Es gibt **keinen Sprachumschalter** in der App. Ändern geht nur über die
  Spracheinstellung des Browsers/Geräts und Neuladen.
- Die Sprache betrifft App-Texte, Monatsnamen, Datumsformate und die Zitate
  (eigene Zuordnung pro Sprache, siehe Abschnitt 5).
- Impressum und Datenschutzerklärung gibt es auf Deutsch (`impressum.html`,
  `datenschutz.html`) und Englisch (`imprint.html`, `privacy.html`). Die
  Fußzeile verlinkt passend zur App-Sprache; jede Seite hat oben einen Link zur
  anderen Sprache. Maßgeblich ist die deutsche Fassung.

**Saisonbanner (Easter Egg)**
- Winter = Dez-Feb, Frühling = Mär-Mai, Sommer = Jun-Aug, Herbst = Sep-Nov
  (richtet sich nach dem **gewählten** Monat, nicht nach dem Datum).
- Antippen löst aus: Winter Schneegestöber, Frühling Blumenwiese, Sommer
  aufsteigende Ballons, Herbst Blättersturm.

**Türchen-Anordnung**
- Positionen sind pro Monat **zufällig und überlappungsfrei**, werden gespeichert
  (`calendar_positions_v4_…`) und bleiben danach stabil.
- Bei Größenänderung des Fensters oder Wechsel zwischen kleinem Smartphone
  (≤ 480 px) und größeren Bildschirmen werden sie **neu gewürfelt**. Türchen-
  Größe: 7 % der Breite (Desktop/Tablet) bzw. 10 % (≤ 480 px), mindestens
  60 px bzw. 40 px.
- Höhe der Kalenderfläche: ab 769 px Breite passt sie sich der Fensterhöhe an
  (Fensterhöhe minus ca. 220 px, mindestens 560 px; bei sehr niedrigen Fenstern wird gescrollt), damit Kalender und
  Monatsauswahl auf Laptop, Desktop und Tablet quer ohne Scrollen sichtbar
  sind. Im Smartphone-Hochformat füllt sie den Platz zwischen Banner und
  Monatsauswahl.
- Die Platzierung misst die **tatsächliche Türchengröße** (auf kleinen Handys
  sind Türchen durch die Ziffer höher als breit, ca. 40×52 px).
- Findet die Zufallsverteilung keinen überlappungsfreien Platz (sehr kleine
  Handys, z. B. 320–375 px Breite), nutzt die App ein **verwackeltes Raster**:
  jedes Türchen eine eigene Zelle mit zufälligem Versatz und zufälliger
  Tageszuordnung. Es sieht weiterhin verstreut aus und überlappt nicht.
- Notfall-Anordnung: Ist die Kalenderfläche unsichtbar/0 px groß, nutzt die App
  ein Gitterraster.

---

## 7a. Livedemo

**Start:** runder grüner Knopf mit **Filmklappe** oben links → Auswahlfenster „Livedemos“:

| Eintrag | Dauer | Inhalt |
|---|---|---|
| 🎬 Große Tour | ca. 2 Min | alles im Überblick (Ablauf unten) |
| 🚪 Türchen-Regeln | ca. 30 s | heutiges Türchen, gesperrtes Türchen, verpasstes Türchen im Vorjahres-Januar, Nachholen im laufenden Monat |
| 💬 Zitat teilen | ca. 20 s | heutiges Türchen öffnen, Knopf „Teilen“ |
| 🔔 Erinnerung einrichten | ca. 30 s | Knopf „Erinnerung“, Uhrzeit, Kalendereintrag, App-Benachrichtigung |

Zusätzlich gibt es im Dialog „Erinnerung“ unten den Link „▶ So funktioniert’s
(Mini-Demo, 30 s)“. Ein Zeiger fährt durch die **echte App** und bedient sie
(kein Video); Texte erscheinen als Untertitel. Musik läuft leise im
Hintergrund. In den Mini-Demos wird nichts heruntergeladen und nichts geteilt.

**Ablauf der großen Tour (13 Schritte, Fortschrittsbalken ganz oben):**
1. Begrüßung.
2. Heutiges Türchen öffnen, Zitat-Fenster erklären, Hinweis auf „Teilen“, Symbol ℹ️ für geöffnet.
3. Morgiges Türchen antippen: gesperrt, wackelt (entfällt am letzten Tag des Monats).
4. „Monat auswählen“ → **Januar des Vorjahres (Winter)**, Tipp auf den Saisonbanner → Schneegestöber.
5. Bereits geöffnetes Türchen (ℹ️) lesen; verpasstes Türchen (⏰) antippen → „Verpasst! Nächste Chance …“.
6. Ansicht erklären: Smartphone-Ansicht → animierte Monats-Dekoration; Desktop-Ansicht → großformatige Illustration.
7. April (Frühling) → Blumenwiese. 8. Juli (Sommer) → Ballons. 9. Oktober (Herbst) → Blättersturm.
10. Farbschema hell/dunkel umschalten und zurück.
11. Zurück in den aktuellen Monat; lokal, ohne Konto, offline.
12. Hinweis auf „🔔 Erinnerung“ (Kalendereintrag oder Benachrichtigung).
13. Schluss: installieren, Verweis auf die Mini-Demos.

Die Jahreszeiten werden immer mit Monaten des **Vorjahres** gezeigt; dort sind
beispielhaft einige Türchen „geöffnet“ (Tage 1, 2, 3, 5, 8, 9, 13, 14, 21), der
Rest ist „verpasst“.

**Werbefilme:** `film/werbung-whatsapp-status-9x16.mp4` (28 s, Handyrahmen,
für WhatsApp-Status und Stories) und `film/werbung-desktop-16x9.mp4` (28 s,
Monitor). Sie zeigen eine versteckte Kurz-Vorführung (`liveDemo.start('promo',
{ clean: true })`, nicht im Menü) mit Werbetexten und der Adresse.

**Videos:** Die große Tour gibt es auch als MP4 mit Musik für Präsentationen
ohne App: `film/livedemo-desktop.mp4` (Monitor-Format 1920×1080) und
`film/livedemo-smartphone.mp4` (Hochformat 1080×1920). Nicht Teil der App
und nicht im Offline-Cache.

**Steuerleiste unten in der Mitte:**

| Knopf | Wirkung |
|---|---|
| ⏸ / ▶ | Pause / weiter (Musik pausiert mit) |
| ⏭ | aktuelle Erklärung überspringen, zur nächsten |
| 1,2× · 1,0× · 0,8× · 0,6× | Tempo durchschalten (Musik bleibt gleich) |
| 🔊 / 🔇 | Musik aus/ein |
| ✕ | Demo sofort beenden (Esc oder Tippen auf den Bildschirm fragen vorher nach) |

**Untertitel:** dunkle Sprechblase mit dem **App-Icon links** (Kalender mit
leuchtendem Türchen); bei jedem neuen Text wackelt das Icon ca. 1,5 s und
leuchtet kurz grün auf. Akzentfarbe der Livedemo (Knopf, Fortschrittsbalken,
„Weiter ansehen“) ist Smaragdgrün; das Etikett „Heute“ ebenfalls. Liegt das
gezeigte Element in der unteren Bildhälfte, steht der Untertitel oben.

**Ruhiges Bild:** Jede Vorführung beginnt im **aktuellen Monat**. Während der
Demo passt die App die Kalenderfläche so an, dass Saisonbanner, Kalender und
Monatsauswahl über der Steuerleiste auf **einen Bildschirm** passen. Die Seite
scrollt nicht, die Fußzeile ist ausgeblendet. Danach ist alles wieder normal.

**Antippen während der Demo:** Ein Tipp irgendwo auf den Bildschirm (oder
**Esc**) hält die Demo an und fragt „Livedemo beenden?“ mit „▶ Weiter
ansehen“ und „■ Beenden“. Die Musik läuft dabei leise weiter. „Weiter
ansehen“ setzt genau dort fort. „Beenden“ (ebenso ✕ in der Steuerleiste)
beendet die Demo, kehrt **zum aktuellen Monat** zurück und blendet die Musik
über 2,5 Sekunden langsam aus.

**Sicherheit/Daten:** Die Demo läuft in einem Sandbox-Zustand. Sie speichert
**nichts** (keine Türchen, kein Monat, kein Farbschema) und stellt danach den
vorherigen Zustand wieder her. Echte Klicks und Tasten sind während der Demo
gesperrt (Schutzschicht); nur die Steuerleiste reagiert – ein Tipp daneben
öffnet die Nachfrage. Wechselt der Tab in
den Hintergrund, pausiert die Demo.

**Geräte:** Desktop und Tablet quer zeigen die Desktop-Ansicht, Smartphone und
Tablet hochkant (Breite bis 768 px) die Smartphone-Ansicht. Die Demo erklärt
jeweils die Ansicht, die gerade sichtbar ist. Ein Tablet hochkant mit mehr als
768 px Breite (z. B. iPad Air/Pro) zeigt die Desktop-Ansicht.

**Musik:** „Tropical Island House 2024“ von Sascha Ende (ende.app), CC BY 4.0,
Nachweis im Impressum („Musik in der Livedemo“). Wird erst beim Start geladen,
vom selben Server wie die App, **nicht offline gecacht**. Offline oder bei
Browser-Sperre läuft die Demo ohne Musik (Symbol 🔇). „Bewegung reduzieren“
wird respektiert (kurze Zeigerwege, Lesezeiten bleiben).

**Häufige Fragen:** „Wie höre ich auf?“ Irgendwo tippen → „■ Beenden“, oder ✕.
„Hat die Demo meinen Kalender verändert?“ Nein. „Keine
Musik?“ Ton am Gerät, 🔇-Knopf, offline oder Browser blockiert Audio. „Zu
schnell?“ Tempo-Knopf oder ⏸. „Ich kann nichts anklicken“ – die Demo läuft;
ein Tipp fragt, ob sie beendet werden soll.

---

## 7b. Tägliche Erinnerung

**Öffnen:** Knopf „🔔 Erinnerung“ neben „Monat auswählen“ (englisch
„🔔 Reminder“). Dialog „Tägliche Erinnerung“; schließen per ✕, Esc oder Klick
daneben. Standard-Uhrzeit 08:00; die gewählte Uhrzeit wird gespeichert.

**Weg 1 – „📅 In meinen Kalender eintragen“ (funktioniert überall):**
- Lädt eine Datei `tuerchenkalender-erinnerung.ics` (englisch
  `door-calendar-reminder.ics`) herunter: täglicher Termin „🚪 Türchen öffnen“
  zur gewählten Uhrzeit, 5 Minuten, mit Alarm zur Startzeit und Link zur App.
- Liegt die Uhrzeit heute schon zurück, beginnt der Termin morgen.
- iPhone/iPad: Safari bietet „Zum Kalender hinzufügen“ an. Android: Datei mit
  der Kalender-App (z. B. Google Kalender) öffnen. Computer: Doppelklick
  (Outlook, Apple Kalender, Thunderbird).
- Ändern/Löschen: in der Kalender-App (Serie bearbeiten/löschen). Ein erneuter
  Download legt einen **zweiten** Termin an – vorher den alten löschen.
- Die Datei wird lokal erzeugt; was der Kalender damit macht (z. B. Google-/
  iCloud-Synchronisation), entscheidet die Kalender-App.

**Weg 2 – „🔔 Benachrichtigung einschalten“ (installierte App, Chrome/Edge):**
- Sichtbar nur, wenn der Browser „Periodic Background Sync“ kann (Chrome/Edge;
  vor allem Android). Sonst steht dort: „Dieser Browser unterstützt keine
  Erinnerungen der App. Nutze den Kalendereintrag.“ (z. B. Safari/iPhone,
  Firefox).
- Fragt die Benachrichtigungs-Berechtigung an. Funktioniert nur in der
  **installierten** App; sonst Hinweis „Bitte installiere die App zuerst …“.
- Der Browser weckt die App gelegentlich im Hintergrund (Häufigkeit bestimmt
  der Browser, abhängig von der Nutzung). Dann prüft die App lokal: Uhrzeit
  erreicht? Heutiges Türchen noch zu? Heute schon erinnert? Nur dann erscheint
  „🚪 Dein Türchen wartet“ – höchstens einmal pro Tag. Antippen öffnet die App.
- **Nicht minutengenau** – die Benachrichtigung kann später kommen oder an
  manchen Tagen ausbleiben (Akku-Sparmodus, selten genutzte App). Wer es
  zuverlässig will: Kalendereintrag.
- Status im Dialog: „Aktiv: täglich ab ca. HH:MM Uhr, wenn das Türchen noch zu
  ist.“ bzw. „Benachrichtigung ist aus.“ Ausschalten über denselben Knopf
  („Benachrichtigung ausschalten“) oder Berechtigung in den Einstellungen
  entziehen.
- Kein Server, kein Push-Dienst, keine Datenübertragung.

## 7c. Zitat teilen

- Im Zitat-Fenster Knopf **„Teilen“** (englisch „Share“).
- Mit Teilen-Menü des Geräts (Handy, viele Tablets, Safari, Edge): Auswahl der
  Ziel-App (WhatsApp, Mail, Notizen …).
- Ohne Teilen-Menü (z. B. Chrome/Firefox am Desktop): Text wird in die
  Zwischenablage kopiert, Meldung „📋 Zitat kopiert“.
- Inhalt: „Zitattext“ – Autor (Lebensdaten), Leerzeile, „Monatskalender mit
  Türchen: <App-Link>“. Englisch mit englischen Anführungszeichen und „Monthly
  Door Calendar“.
- Abbrechen im Teilen-Menü ist kein Fehler. Schlägt beides fehl: „⚠️ Teilen
  nicht möglich“ – Text dann manuell markieren und kopieren.

---

## 8. Installation als App (PWA)

Voraussetzung: HTTPS (Vercel erfüllt das) und ein moderner Browser.

| Gerät/Browser | Vorgehen |
|---|---|
| **Android (Chrome)** | Hinweis „App installieren" → „Installieren". Alternativ Menü ⋮ → „App installieren" / „Zum Startbildschirm hinzufügen". |
| **Desktop (Chrome/Edge)** | Symbol ⊕ in der Adressleiste oder Menü → „App installieren". |
| **iPhone/iPad (Safari)** | Teilen-Symbol → „Zum Home-Bildschirm" → „Hinzufügen". **Safari zeigt keinen automatischen Installationshinweis**, das ist kein Fehler. |
| **Firefox Desktop** | Kann PWAs nicht installieren; die Web-Version funktioniert trotzdem. |

**Verhalten des Hinweises**
- Die App fängt `beforeinstallprompt` ab und zeigt ein eigenes Banner
  (ca. 2 Sekunden nach dem Laden).
- „✕" blendet es **nur für diese Sitzung** aus; beim nächsten Laden erscheint
  es wieder, solange nicht installiert.
- Es erscheint nicht, wenn die App schon im Standalone-Modus läuft oder der
  Merker `pwa_installed` gesetzt ist.
- Manifest: Name „Monatskalender mit Türchen", Kurzname „Türchenkalender",
  Start-URL `./`, Anzeige `standalone`, Ausrichtung `portrait-primary`,
  Themenfarbe `#FFB84D`.

**Deinstallieren:** wie jede App (Android: lange drücken → Deinstallieren;
Desktop: App-Menü → Deinstallieren; iOS: Symbol entfernen). Gespeicherte
Fortschrittsdaten liegen im Browser-Speicher der Website und bleiben dort ggf.
bestehen, bis die Website-Daten gelöscht werden.

---

## 9. Offline-Funktion und Updates (Service Worker)

- Der Service Worker (`service-worker.js`, Cache `kalender-cache-v1.9.4`,
  Runtime-Cache `kalender-runtime-v1.9.4`) legt beim Installieren die App-Shell
  an: `index.html`, `impressum.html`, `datenschutz.html`, CSS, alle JS-Dateien
  inklusive beider Zitat-Dateien und der Livedemo, Manifest, Icons und alle 24 Monatsbilder.
- **Strategien:** JS und CSS = *Stale-While-Revalidate* (sofort aus dem Cache,
  im Hintergrund aktualisieren); alles andere = *Cache First*; Nur GET-Anfragen.
- **Folge für Updates:** Nach einer neuen Version zeigt der erste Aufruf
  oft noch die alte JS/CSS-Fassung, **der zweite Aufruf (oder ein Neustart der
  App) die neue**. Die HTML-Seiten werden bei Cache-Version-Erhöhung neu
  gecacht. Wer Dateien ändert, **muss** `CACHE_NAME` und `RUNTIME_CACHE` erhöhen.
- Der Service Worker aktiviert sich sofort (`skipWaiting`, `clients.claim`) und
  löscht alte Caches.
- Nachricht `CLEAR_CACHE` an den Service Worker löscht alle Caches (Entwickler-
  Hilfe, keine Bedienfunktion).
- **Offline-Fallbacks:** Nicht gecachte Seite → einfache Seite „📡 Offline";
  nicht verfügbare JS/CSS → 503-Platzhalter.
- Die englischen Rechtsseiten und `js/reminder.js` sind ebenfalls im Cache.
- Der Service Worker enthält außerdem die Logik der App-Erinnerung
  (`periodicsync`-Ereignis `daily-door`, `notificationclick`).
- Die Demo-Musik (`assets/audio/`) wird bewusst nicht gecacht und vom Service Worker direkt ans Netz durchgereicht.
- Erster Besuch **muss online** sein. Wikipedia-Links brauchen Internet.

---

## 10. Gespeicherte Daten (exakt)

Alle Schlüssel im Local Storage der Website. **Monat ist 0-basiert**
(Januar = 0, Dezember = 11).

| Schlüssel | Inhalt |
|---|---|
| `calendar_opened_v2_<JAHR>_<MONAT>` | JSON-Array der geöffneten Tagesnummern, z. B. `[1,2,5]` |
| `calendar_quotes_<JAHR>_<de\|en>` | Array mit 365/366 Zitat-Objekten (Jahreszuordnung) |
| `calendar_positions_v4_<JAHR>_<MONAT>` | Array `{day, x, y}` in Prozent |
| `calendar_selected_month_year_v2` | `{month, year}` (zuletzt gewählt; Jahr 2000-2100 gültig) |
| `calendar_theme` | `light` oder `dark` |
| `pwa_installed` | `"true"` nach Installation |
| `calendar_selected_month` | Altformat, wird beim Laden in das neue Format migriert |
| `calendar_reminder` | `{time: "08:00", notify: false}` – Uhrzeit und ob die App-Benachrichtigung an ist |

Zusätzlich, nur wenn die App-Benachrichtigung eingeschaltet wurde:
IndexedDB-Datenbank `kalender-reminder`, Speicher `kv`, mit `reminderTime`,
`lang`, `head`/`body` (Text der Benachrichtigung), `lastOpened` (Datum, an dem
das heutige Türchen geöffnet wurde) und `lastNotified` (Datum der letzten
Erinnerung). Der Service Worker liest diese Werte, weil er keinen Zugriff auf
den Local Storage hat.

**Wichtige Folgerungen**
- Fortschritt gilt **pro Gerät und Browser** (eigener Speicher je Browser; eine
  installierte PWA kann einen eigenen Speicher haben als der Browser-Tab).
- Browser-Daten löschen, Privatmodus, „Website-Daten entfernen" oder App-
  Daten löschen **setzt alles zurück**: Türchen gelten wieder als ungeöffnet,
  verpasste Türchen früherer Monate sind dann wieder „verpasst", die
  Zitat-Zuordnung wird neu gewürfelt.
- Der Speicherbedarf ist klein (wenige hundert KB; die Zitat-Zuordnung ist das
  Größte).
- **Speicher nicht verfügbar** (z. B. Safari privat): Es erscheint „⚠️ Speichern
  nicht möglich. Daten gehen beim Neuladen verloren." Die App läuft weiter,
  merkt sich aber nichts und nutzt temporäre Zitate.
- **Meldungen bei vollem Speicher:** „⚠️ Speicher voll - bitte Browser-Cache
  leeren", „… Zitate werden temporär verwendet", „… Positionen können nicht
  gespeichert werden".
- Ein Zurücksetzen ohne Löschen aller Browserdaten gibt es **nicht** in der
  App. Entwickler/Tüftler: Konsole → `localStorage.clear(); location.reload();`
  (löscht alles; nur auf ausdrücklichen Wunsch erwähnen).
- **Kein Backup, kein Geräteumzug:** Es gibt keinen Export. Auf einem neuen
  Gerät beginnt der Fortschritt neu.

---

## 11. Datenschutz und Datenflüsse (Kurzfassung für Antworten)

Maßgeblich ist die Seite `datenschutz.html` in der App. Kernaussagen:

- **Verantwortlicher:** Günter Struck, Lönsberg 6, 45136 Essen,
  caresms@online.de.
- Die App benötigt keine Berechtigungen (Standort, Kamera, Mikrofon, Kontakte).
  Die Benachrichtigungs-Berechtigung wird nur angefragt, wenn der Nutzer die
  App-Erinnerung selbst einschaltet. Sie setzt **keine Cookies**, kein personenbezogenes
  Tracking, keine Werbung, keine Drittanbieter-Schriften oder -Skripte
  (Content-Security-Policy: `default-src 'self'`, `media-src 'self'`).
- Lokal gespeichert werden nur die Einstellungen aus Abschnitt 10.
  Rechtsgrundlage: technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG),
  Art. 6 Abs. 1 lit. f DSGVO. Keine Einwilligungsabfrage nötig.
- **Hosting:** Vercel (Vercel Inc., USA) als Auftragsverarbeiter (Art. 28
  DSGVO). Beim Laden/Aktualisieren verarbeitet Vercel technisch bedingt
  IP-Adresse u. ä. in kurzzeitig gespeicherten Logfiles; der Entwickler wertet
  sie nicht aus (allenfalls Fehlersuche). Keine Speed Insights.
- **Anonyme Nutzungszählung (Abschnitt 9a):** Nur unter `kalender356.vercel.app`
  zählt Vercel Web Analytics die **Seitenaufrufe** – ohne Cookies, ohne Kennung
  auf dem Gerät, Adresse ohne Suchteil/Fragment, keine Ereignisse (welche
  Türchen, welche Zitate). Nicht bei „Do Not Track"/Global Privacy Control,
  nicht offline, nicht in Vorschauen. Code: `js/usage-count.js`. Der Quellcode liegt auf GitHub; beim Benutzen der App gibt es
  keine Verbindung zu GitHub.
- **Erinnerung:** .ics-Datei wird lokal erzeugt; App-Benachrichtigung rein
  lokal (Periodic Background Sync, kein Push-Server). Rechtsgrundlage:
  ausdrücklicher Wunsch (§ 25 Abs. 2 Nr. 2 TDDDG) bzw. Einwilligung durch
  Einschalten (Art. 6 Abs. 1 lit. a DSGVO), jederzeit abschaltbar.
- **Teilen:** nur auf Tipp; Zitat, Autor und App-Link gehen an die vom Nutzer
  gewählte App bzw. die Zwischenablage. Der Entwickler erhält nichts.
- **Englische Fassungen:** `privacy.html`, `imprint.html`; maßgeblich ist Deutsch.
- **Livedemo:** speichert nichts; Musik wird erst beim Start vom selben Server (Vercel) geladen, keine Verbindung zum Musikanbieter.
- **Wikipedia:** Verbindung zu Wikimedia erst, wenn der Nutzer den Link
  „Mehr erfahren" antippt.
- Rechte (Auskunft, Löschung …) laufen faktisch ins Leere, weil der Entwickler
  keine Daten hält; Löschung durch den Nutzer selbst über Browser-/App-Daten.
  Beschwerde: LDI NRW.
- **Gesagt werden darf:** „Die App sendet keine Inhalte und keine Einstellungen;
  sie zählt nur cookielos, wie oft sie aufgerufen wird."
  **Nicht gesagt werden darf:** „Es werden niemals Daten übertragen" oder „völlig
  anonym", denn GitHub-Hosting und Wikipedia-Klicks existieren.

---

## 12. Barrierefreiheit

- Türchen sind `role="button"`, per **Tab** erreichbar, per **Enter/Leertaste**
  bedienbar. Gesperrte/verpasste Türchen haben `aria-disabled` und sprechende
  Labels („Tag 12 - Gesperrt", „Tag 3 - Verpasst - Nächste Chance: 2027",
  „Tag 5 - Geöffnet - Klicken für Spruch").
- Zitat-Fenster: `role="dialog"`, `aria-modal`, Fokus-Falle, **Esc** schließt,
  Fokus kehrt zurück.
- Meldungen und Hinweise nutzen `aria-live="polite"`.
- Dekorative Elemente (Illustration, Dekoration) sind `aria-hidden`.
- `noscript`-Hinweis in beiden Sprachen, wenn JavaScript fehlt.
- Seitenlogik pausiert Zeitgeber, wenn der Tab im Hintergrund ist.

---

## 13. Diagnosebäume und häufige Probleme

**„Ein Türchen lässt sich nicht öffnen."**
1. Welches Datum hat das Türchen, welcher Monat ist gewählt?
2. Zukunft → gewollt gesperrt. Frühere Monate und nie geöffnet → „verpasst".
3. Aktueller Monat, Tag ≤ heute und trotzdem gesperrt → **Gerätedatum/Zeitzone
   prüfen**; Seite neu laden (Datum wird jede Minute geprüft, nur bei sichtbarem Tab).
4. Hilft nichts: Konsole auf Fehler prüfen (Entwickler), Cache leeren, Neustart.

**„Alles ist weg / Türchen wieder zu."**
Browser-/App-Daten wurden gelöscht, Privatmodus, anderer Browser oder andere
Installation (PWA vs. Browser-Tab haben getrennten Speicher), oder Speicher
wurde vom Browser bereinigt. Nicht wiederherstellbar.

**„Auf dem zweiten Gerät ist nichts geöffnet / anderes Zitat."**
Keine Synchronisation, Zitat-Zuordnung ist pro Gerät zufällig. Erwartetes
Verhalten.

**„Ich sehe englische Texte/Zitate."**
Browser-/Gerätesprache ist nicht Deutsch. Spracheinstellung ändern, Seite neu
laden. Es gibt keinen Schalter in der App. Zitate pro Sprache getrennt.

**„Das Zitat von gestern hat sich geändert."**
Normalerweise nicht. Ursachen: Speicher gelöscht, Sprache gewechselt, Jahr
gewechselt, anderes Gerät, ungültige Daten wurden automatisch neu erzeugt.

**„App lässt sich nicht installieren."**
Safari/iOS: manuell über Teilen → Zum Home-Bildschirm. Chrome/Edge: Muss über
HTTPS laufen, nicht im Privatmodus, Service Worker muss registriert sein,
bereits installiert? (Hinweis erscheint dann nicht.) Firefox Desktop:
nicht möglich.

**„Neue Version kommt nicht an."**
Wegen Stale-While-Revalidate: App einmal vollständig schließen und erneut
öffnen, ggf. hart neu laden (Strg+Shift+R). Entwickler: Cache-Version erhöhen.

**„Offline zeigt Fehler."**
Erster Aufruf muss online erfolgt sein. Danach funktionieren Kalender,
Zitate, Impressum, Datenschutz offline. Wikipedia-Links nicht.

**„Ich sehe ‚⚠️ Speichern nicht möglich'."**
Browser blockiert Local Storage (Privatmodus, Einstellungen, Cookies/Website-
Daten gesperrt). Normalen Modus nutzen, Speicher freigeben.

**„Türchen liegen übereinander / sehen anders aus als gestern."**
Fenstergröße oder Ausrichtung hat sich geändert (Positionen werden neu erzeugt).
Seit 1.9.0 verhindert ein Ersatz-Raster Überlappungen auch auf kleinen Handys.
Treten trotzdem welche auf: Seite neu laden; Gerät, Browser und Bildschirmgröße
an den Betreiber melden.

**„Die Erinnerung kommt nicht.“**
1. Welcher Weg? Kalendereintrag → in der Kalender-App prüfen, ob der Termin
   „🚪 Türchen öffnen“ täglich wiederholt wird und Benachrichtigungen der
   Kalender-App erlaubt sind.
2. App-Benachrichtigung → nur installierte App, Chrome/Edge. Status im Dialog
   „Aktiv …“? Berechtigung für Benachrichtigungen erteilt? Akku-Sparmodus aus?
3. Nicht minutengenau: Der Browser entscheidet, wann er die App weckt; selten
   genutzte Apps werden seltener geweckt. Kommt keine, wenn das Türchen heute
   schon geöffnet war – das ist gewollt.
4. Zuverlässig: Kalendereintrag nutzen.

**„Den Knopf ‚Benachrichtigung einschalten‘ gibt es bei mir nicht.“**
Browser unterstützt es nicht (z. B. iPhone/Safari, Firefox). Kalendereintrag
nutzen.

**„Teilen geht nicht / nichts passiert.“**
Ohne Teilen-Menü wird kopiert (Meldung „📋 Zitat kopiert“) – dann in der
gewünschten App einfügen. Bei „⚠️ Teilen nicht möglich“ Text manuell markieren.

**„Kopfzeile ist weg."**
Gewollt: Sie verschwindet nach 5 Sekunden, dann erscheint der Saisonbanner.

**„Es erscheint ein Fehler-Hinweis ‚Ein Fehler ist aufgetreten'."**
Globaler Fehler-Handler. Seite neu laden; wiederholt er sich, Browser und
Version nennen lassen und an den Betreiber verweisen.

---

## 14. Häufige Fragen mit Musterantworten

**Kostet die App etwas? Gibt es Werbung?** Nein, kostenlos, werbefrei,
ohne Konto.

**Kann ich die App offline nutzen?** Ja, nach dem ersten Laden. Nur die
Wikipedia-Links brauchen Internet.

**Warum kann ich Türchen nicht im Voraus öffnen?** Das ist das Spielprinzip:
Jedes Türchen öffnet sich an seinem Datum.

**Kann ich verpasste Türchen nachholen?** Innerhalb des laufenden Monats
ja. Nach Monatsende gelten ungeöffnete Türchen als verpasst; die nächste Chance
ist das gleiche Datum im Folgejahr.

**Wie viele Zitate gibt es? Wiederholen sie sich?** 366 pro Sprache; pro Jahr
kommt jedes genau einmal vor, im nächsten Jahr in neuer Reihenfolge.

**Kann ich Zitate teilen/kopieren?** Ja: im Zitat-Fenster „Teilen“ – öffnet
das Teilen-Menü des Geräts oder kopiert Zitat und App-Link (Abschnitt 7c).

**Kann mich die App täglich erinnern?** Ja: „🔔 Erinnerung“ neben der
Monatsauswahl. Überall per Kalendereintrag (.ics); in der installierten App
mit Chrome/Edge zusätzlich als Benachrichtigung (nicht minutengenau,
Abschnitt 7b).

**Gibt es Datenschutz/Impressum auf Englisch?** Ja, `privacy.html` und
`imprint.html`; bei englischer App-Sprache verlinkt die Fußzeile dorthin.

**Wer sucht die Zitate aus?** Der Entwickler; es sind historische Zitate
verstorbener Persönlichkeiten. Echtheit der Zuschreibung wird nicht garantiert.

**Kann ich ältere/andere Monate ansehen?** Ja, über „Monat auswählen" (Vorjahr
und aktuelles Jahr). Zukunftsmonate sind gesperrt.

**Werden meine Daten gesammelt?** Die App sendet keine Nutzungsdaten. Nur
Einstellungen im Browser; das Hosting bei Vercel verarbeitet technisch die IP-Adresse
verarbeiten (Details Abschnitt 11).

**Wie setze ich den Kalender zurück?** Browser-/App-Daten der Website löschen
(Android: App-Info → Speicher → Daten löschen; Chrome: Website-Einstellungen →
Daten löschen). Achtung: Das löscht alle Fortschritte.

**Gibt es eine iPhone-App im App Store?** Nicht dokumentiert. Nutzung als PWA
über Safari → Zum Home-Bildschirm.

**Gibt es eine Android-App im Play Store?** Im Repository existieren
Vorbereitungen für eine Trusted Web Activity (`.well-known/assetlinks.json`,
Paketname `io.github.gunterstruck.kalender`). Ob und wo sie veröffentlicht ist,
steht nicht im Repository; nicht behaupten, sondern auf die Web-Adresse
verweisen.

**Wie melde ich einen Fehler / wen kontaktiere ich?** GitHub-Issue im
Repository `gunterstruck/Kalender` oder E-Mail an caresms@online.de (siehe
Impressum).

---

## 15. Mini-Schulungen (auf Wunsch anbieten)

**0. Schnellster Einstieg:** grüner Filmklappen-Knopf oben links → „🎬 Große Tour“
(ca. 2 Minuten) oder eine Mini-Demo (20–30 s) zum passenden Thema.

**A. Erste Schritte (2 Minuten)**
1. App öffnen; Kopfzeile verschwindet nach 5 Sekunden.
2. Das leuchtende Türchen mit dem Etikett „Heute“ antippen → Zitat lesen → ✕.
3. Merksatz: *Nur Türchen bis heute sind offen; vergangene Monate nur, wenn man sie
   geöffnet hat.*
4. Abschlussfrage: „Was passiert, wenn du ein Türchen von morgen antippst?"
   (Es wackelt und zeigt das Freischaltdatum.)

**B. Als App installieren (3 Minuten)** → Abschnitt 8, passend zum Gerät.

**C. Andere Monate und Dunkelmodus (2 Minuten)**
„Monat auswählen" → Monat wählen; Sonne/Mond-Knopf oben rechts.

**E. Nie wieder ein Türchen verpassen (2 Minuten)**
„🔔 Erinnerung“ → Uhrzeit wählen → „📅 In meinen Kalender eintragen“ → Datei
mit der Kalender-App öffnen. Merksatz: *Kalendereintrag = zuverlässig,
App-Benachrichtigung = bequem, aber nicht minutengenau.*

**D. Probleme lösen (3 Minuten)** → Abschnitt 13, die drei häufigsten Fälle:
Zeit/Datum, Daten gelöscht, Sprache.

---

## 16. Technik und Betrieb (für Entwickler- und Betreiberfragen)

**Dateistruktur**
```
/ index.html · impressum.html · datenschutz.html · imprint.html · privacy.html · manifest.json · service-worker.js
/css/styles.css                 Alle Styles (CSS-Variablen, Dark Mode via body.dark-mode / body.light-mode)
/js/i18n.js                     Spracherkennung + Übersetzungen (de, en)
/js/i18n-dom.js                 Übersetzt statische HTML-Teile beim DOMContentLoaded
/js/quotes.js, quotes-en.js     366 Zitate je Sprache (Konstanten QUOTES, QUOTES_EN)
/js/app.js                      Klasse CalendarApp (komplette App-Logik)
/js/pwa-install.js              Service-Worker-Registrierung, Install-Banner, globale Fehler-Handler
/js/livedemo.js, css/livedemo.css  Livedemo: Auswahl, große Tour, Mini-Demos (Zeiger, Untertitel, Steuerleiste, Musik)
/js/reminder.js                 Tägliche Erinnerung (Dialog, .ics, Periodic Background Sync, IndexedDB)
/film                           Demo-Videos (MP4) und Aufnahme-Skript (nicht Teil der App)
/assets/audio                   Demo-Musik (CC BY 4.0, Nachweis in docs/licenses/)
/assets/icons, /months, /months-portrait, /screenshots
/.well-known/assetlinks.json    Android-TWA-Verknüpfung
/docs, /custom-gpt-upload       Diese Dokumentation und der KI-Guide-Export
```

**Ladereihenfolge der Skripte** (wichtig!): `quotes.js` → `quotes-en.js` →
`i18n.js` → `i18n-dom.js` → `app.js` → `pwa-install.js` → `reminder.js` → `livedemo.js`.

**Livedemo-Schnittstelle in `CalendarApp`:** `beginDemo(seed)` legt einen
Sandbox-Zustand `this.demo` an (geöffnete Türchen und Zitate nur im Speicher;
alle `save…`-Methoden schreiben dann nicht), `demoGoto(month, year)`,
`endDemo()` stellt Monat/Jahr und Farbschema wieder her. Drehbücher:
`LiveDemo.script()` (große Tour), `storyRules()`, `storyShare()`,
`storyReminder()`; Start per `window.liveDemo.start('tour'|'rules'|'share'|'reminder')`.
Texte (de/en) im Objekt `TEXT` in `js/livedemo.js`. Teilen und Downloads sind
im Demo-Modus gesperrt; der Erinnerungsdialog öffnet sich in der Demo
nicht-modal (`KalenderReminder.open({ demo: true })`), damit Untertitel und
Steuerleiste sichtbar bleiben.

**Erinnerung (`KalenderReminder`)**: `open()`, `close()`, `markOpenedToday()`
(von `CalendarApp.saveOpenedDoor` aufgerufen, wenn das heutige Türchen geöffnet
wird), `buildIcs(time)`. Periodic-Sync-Tag `daily-door`, `minInterval` 6 h.

**Videos neu aufnehmen:** `film/README.md` (Playwright-Screencast + ffmpeg).

**Architektur `CalendarApp`**: Konstruktor sammelt DOM-Elemente → `init()`
registriert Events (Event-Delegation für Türchen-Klicks), prüft Speicher,
setzt Theme, Dropdown, rendert, startet Datumswächter (60 s), Seitensichtbarkeit,
Saisonbanner (10 s), Resize-/Orientierungs-Handler (250 ms / 100 ms entprellt).
Render-Wiederholungen mit exponentiellem Backoff (max. 10), falls die
Kalenderfläche noch keine Größe hat. `destroy()` räumt Intervalle auf.

**Sicherheit:** Meta-CSP in `index.html`: `default-src 'self'; media-src 'self'; style-src 'self';
script-src 'self'; img-src 'self' data:; connect-src 'self'`. Keine Inline-Skripte
in `index.html` (die Seiten Impressum/Datenschutz haben ein kleines Inline-Skript
fürs Farbschema und keine CSP). Zitate werden per `textContent` eingesetzt
(kein HTML-Einschleusen).

**Konstanten (`CONFIG`)**: Datumsprüfung 60 000 ms; Toast 3000 ms; Shake 300 ms;
Fade 150 ms; max. 500 Positionierungsversuche je Türchen.

**Lokal testen:** `python -m http.server 8000` oder `npx http-server -p 8000`,
dann `http://localhost:8000`. Service Worker benötigt `localhost` oder HTTPS.

**Deployment:** Vercel, statisch ohne Build (Framework „Other“, Build-/Install-
Command und Output Directory leer, Root `./`). Push auf `main` → Produktion,
Pull Request → Vorschau-URL. `vercel.json` setzt Sicherheits-Header (CSP für
`/` und `/index.html`, `X-Frame-Options: DENY`, `nosniff`, HSTS,
`Permissions-Policy`), `service-worker.js` und `manifest.json` ohne
Zwischenspeicherung, `assets/` einen Tag. `.vercelignore` schließt `docs/`,
`custom-gpt-upload/`, `film/`, `tools/` und Markdown-Dateien aus. Alle Pfade in
der App sind relativ – sie läuft unter jeder Adresse. Umzug von GitHub Pages:
dort abschalten; Android-TWA für die neue Adresse neu bauen (`TWA_NOTES.md`).

**Release-Checkliste**
1. Version in `index.html` (Fußzeile), `manifest.json`, `service-worker.js`
   (Kommentar, `CACHE_NAME`, `RUNTIME_CACHE`) und dieser Doku angleichen.
2. Neue Dateien in `CACHE_URLS` des Service Workers aufnehmen.
3. Bei Änderung der Datenverarbeitung `datenschutz.html` **und** `privacy.html`
   sowie Abschnitt 11 anpassen.
4. `CHANGELOG.md` ergänzen, testen (Online, Offline, Hell/Dunkel, DE/EN,
   Monatswechsel, Mobil hoch/quer).

**Neue Zitate/Bilder:** Zitate als Objekt in beide Sprachdateien eintragen und
**genau 366 Stück je Sprache** halten (sonst wird die Jahreszuordnung
wiederholt; Zuordnungen mit abweichender Größe werden automatisch neu erzeugt).
Monatsbilder liegen als `<month>.svg` im Querformat (`assets/months`) und
Hochformat (`assets/months-portrait`).

**Neue Sprache:** Eintrag in `translations` (`i18n.js`), eigene Zitatdatei,
Erweiterung von `getQuotes()` und der Spracherkennung, Texte in `i18n-dom.js`.

---

## 17. Bekannte Abweichungen und Wissensgrenzen

- Die App-Benachrichtigung hängt vom Browser ab (nur Chrome/Edge, installierte
  App, Zeitpunkt nicht garantiert). Auf iPhone/iPad gibt es nur den
  Kalendereintrag.
- Eine Shuffle-/„Neu mischen"-Funktion für Zitate existiert **nicht**
  (nur das Banner-Nachrichtenmischen, intern).
- Die gewählte Monatsauswahl wird gespeichert, beim Start aber nicht
  wiederhergestellt.
- Der Guide kennt keine Download-Zahlen, keine Store-Einträge und keine
  Nutzerdaten.
- Rechtstexte sind keine Rechtsberatung.

---

## 18. Glossar

| Begriff | Bedeutung |
|---|---|
| Türchen | Klickbares Feld pro Tag |
| Geöffnet | Zitat wurde angesehen (ℹ️) |
| Gesperrt | Datum in der Zukunft |
| Verpasst | Früherer Monat, nie geöffnet (⏰) |
| Zitat / Lebensweisheit | Historischer Spruch mit Autor, Lebensdaten, Link |
| Saisonbanner | Animierter Streifen mit Jahreszeitspruch |
| Toast | Kurze Einblendung unten |
| PWA | Installierbare Web-App |
| Service Worker | Hintergrundskript für Offline-Cache |
| Local Storage | Browser-Speicher, in dem der Fortschritt liegt |
| TWA | Trusted Web Activity: Android-Hülle für die Web-App |
| Livedemo | Geführte Vorführung der echten App mit Zeiger, Untertiteln und Musik; Start über den grünen Filmklappen-Knopf oben links |
| Mini-Demo | Kurze Livedemo (20–30 s) zu einem Thema: Türchen-Regeln, Teilen, Erinnerung |
| Erinnerung | Täglicher Hinweis aufs Türchen: Kalendereintrag (.ics) oder App-Benachrichtigung |
| .ics | Kalenderdatei, die jede Kalender-App importieren kann |
