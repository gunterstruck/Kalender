# Monatskalender mit Türchen - Wissensbasis für den KI-Guide

**Version 1.2 · Stand: 02.10.2026 · App-Version: 1.8.1 (Service-Worker-Cache v1.8.1)**

**Zweck:** Verbindliche Produkt-, Bedien-, Support- und Entwicklungsgrundlage für
einen KI-Guide (z. B. Custom GPT, Claude-Projekt, Support-Chatbot). Diese
Markdown-Datei ist die primäre Wissensquelle. Sie wurde aus dem tatsächlichen
App-Code abgeleitet.

**Quellenpriorität:** aktueller App-Code und sichtbare Beschriftungen vor
`README.md`, Code-Review-Dateien und älteren Texten. Das `README.md` ist in
Teilen veraltet (siehe Abschnitt 17) und darf nicht als Faktenquelle für
Speicherschlüssel, Freischaltlogik oder Zitat-Anzahl dienen.

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
- Adresse: `https://gunterstruck.github.io/Kalender/` (GitHub Pages).

---

## 2. Auftrag und Antwortverhalten des Guides

1. Antworte in der Sprache der Frage (Deutsch/Englisch), freundlich, ruhig,
   handlungsorientiert und kurz. Nenne Klickpfade im Format
   `Bereich -> Element -> Aktion` und danach das erwartete Ergebnis.
2. Frage nur nach Gerät/Browser, wenn die Antwort davon abhängt (z. B.
   Installation: Android-Chrome, iPhone-Safari, Desktop).
3. Nutze die **sichtbaren Begriffe** der App (Abschnitt 3 und Glossar).
4. Erfinde nichts. Die App hat **keine** Funktion für: Konto, Cloud-Backup,
   Export/Import, Erinnerungen/Push-Benachrichtigungen, manuelle
   Sprachwahl, eigene Zitate, Teilen, Zitat-Neumischen, Notizen, Favoriten.
   Wenn danach gefragt wird: offen sagen, dass es das nicht gibt, und die
   nächstbeste Möglichkeit nennen.
5. Behaupte nicht, den Bildschirm oder die Daten des Nutzers zu sehen. Bei
   unklarem Zustand nach Gerät, Browser, Monat/Datum und genauer Meldung fragen.
6. Fordere nie persönliche Daten an. Es gibt keine, die der Support braucht.
7. Datenschutz-Aussagen exakt halten (Abschnitt 11): Die App sendet selbst
   nichts; GitHub Pages sieht beim Laden technisch bedingt die IP-Adresse;
   Wikipedia-Links werden nur auf Klick geöffnet.
8. Rechtliche Fragen: auf Impressum und Datenschutzerklärung in der App
   verweisen (Footer) und keine Rechtsberatung geben.

---

## 3. Oberfläche im Überblick

Von oben nach unten:

| Element | Beschreibung |
|---|---|
| **Kopfzeile** | Titel „Monatskalender mit Türchen" und Untertitel „Entdecke jeden Tag eine neue Lebensweisheit". Sie blendet sich **nach 5 Sekunden automatisch aus**. |
| **„▶ Livedemo“** | Knopf oben links, immer sichtbar (englisch „▶ Live demo“). Startet die geführte Vorführung (Abschnitt 7a). |
| **Farbschema-Schalter** | Runder Knopf oben rechts (Sonne/Mond), immer sichtbar. |
| **Saisonbanner** | Erscheint, wenn die Kopfzeile verschwindet. Animierte Jahreszeit (Winter/Frühling/Sommer/Herbst) mit wechselnden Sprüchen alle 10 Sekunden. Antippen löst eine kleine Überraschungs-Animation aus. |
| **Kalenderfläche** | Monatsillustration als Hintergrund, darauf die Türchen mit Tagesnummer. |
| **Monatsauswahl** | Dropdown „Monat auswählen" unter dem Kalender. |
| **Fußzeile** | Links „Impressum" und „Datenschutz", darunter „Version 1.8.1". |
| **Zitat-Fenster** | Erscheint beim Öffnen eines Türchens (Modal). |
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
| **Heute** | leuchtet, Etikett „Heute“ (englisch „Today“) | heutiges Türchen, solange es noch nicht geöffnet ist |
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
  neuem Tab). Schließen per ✕, Klick auf den Hintergrund oder **Esc**. Der
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
- Impressum und Datenschutzerklärung sind **nur auf Deutsch**.

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
- Notfall-Anordnung: Ist die Kalenderfläche unsichtbar/0 px groß, nutzt die App
  ein Gitterraster.

---

## 7a. Livedemo

**Start:** Knopf „▶ Livedemo“ oben links. Dauer ca. 2 Minuten bei Tempo 1,2×.
Ein Zeiger fährt durch die **echte App** und bedient sie (kein Video); Texte
erscheinen als Untertitel. Musik läuft leise im Hintergrund.

**Ablauf (12 Schritte, Fortschrittsbalken ganz oben):**
1. Begrüßung.
2. Heutiges Türchen öffnen, Zitat-Fenster erklären, Symbol ℹ️ für geöffnet.
3. Morgiges Türchen antippen: gesperrt, wackelt (entfällt am letzten Tag des Monats).
4. „Monat auswählen“ → **Januar des Vorjahres (Winter)**, Tipp auf den Saisonbanner → Schneegestöber.
5. Bereits geöffnetes Türchen (ℹ️) lesen; verpasstes Türchen (⏰) antippen → „Verpasst! Nächste Chance …“.
6. Ansicht erklären: Smartphone-Ansicht → animierte Monats-Dekoration; Desktop-Ansicht → großformatige Illustration.
7. April (Frühling) → Blumenwiese. 8. Juli (Sommer) → Ballons. 9. Oktober (Herbst) → Blättersturm.
10. Farbschema hell/dunkel umschalten und zurück.
11. Zurück in den aktuellen Monat. 12. Schluss: lokal, ohne Konto, offline, installieren.

Die Jahreszeiten werden immer mit Monaten des **Vorjahres** gezeigt; dort sind
beispielhaft einige Türchen „geöffnet“ (Tage 1, 2, 3, 5, 8, 9, 13, 14, 21), der
Rest ist „verpasst“.

**Steuerleiste oben in der Mitte:**

| Knopf | Wirkung |
|---|---|
| ⏸ / ▶ | Pause / weiter (Musik pausiert mit) |
| ⏭ | aktuelle Erklärung überspringen, zur nächsten |
| 1,2× · 1,0× · 0,8× · 0,6× | Tempo durchschalten (Musik bleibt gleich) |
| 🔊 / 🔇 | Musik aus/ein |
| ✕ | Demo beenden (auch **Esc**) |

**Sicherheit/Daten:** Die Demo läuft in einem Sandbox-Zustand. Sie speichert
**nichts** (keine Türchen, kein Monat, kein Farbschema) und stellt danach den
vorherigen Zustand wieder her. Echte Klicks und Tasten sind während der Demo
gesperrt (Schutzschicht); nur die Steuerleiste reagiert. Wechselt der Tab in
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

**Häufige Fragen:** „Hat die Demo meinen Kalender verändert?“ Nein. „Keine
Musik?“ Ton am Gerät, 🔇-Knopf, offline oder Browser blockiert Audio. „Zu
schnell?“ Tempo-Knopf oder ⏸. „Ich kann nichts anklicken“ – die Demo läuft;
✕ oder Esc beendet sie.

---

## 8. Installation als App (PWA)

Voraussetzung: HTTPS (GitHub Pages erfüllt das) und ein moderner Browser.

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

- Der Service Worker (`service-worker.js`, Cache `kalender-cache-v1.8.1`,
  Runtime-Cache `kalender-runtime-v1.8.1`) legt beim Installieren die App-Shell
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
- Die App benötigt keine Berechtigungen (Standort, Kamera, Mikrofon, Kontakte,
  Benachrichtigungen) und setzt **keine Cookies**, kein Tracking, keine Werbung,
  keine Analyse, keine Drittanbieter-Schriften oder -Skripte
  (Content-Security-Policy: `default-src 'self'`, `media-src 'self'`).
- Lokal gespeichert werden nur die Einstellungen aus Abschnitt 10.
  Rechtsgrundlage: technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG),
  Art. 6 Abs. 1 lit. f DSGVO. Keine Einwilligungsabfrage nötig.
- **Hosting:** GitHub Pages (GitHub Inc., USA). Beim Laden/Aktualisieren kann
  GitHub technisch bedingt IP-Adresse u. ä. in Logfiles verarbeiten. Der
  Entwickler erhält diese Daten nicht.
- **Livedemo:** speichert nichts; Musik wird erst beim Start vom selben Server (GitHub Pages) geladen, keine Verbindung zum Musikanbieter.
- **Wikipedia:** Verbindung zu Wikimedia erst, wenn der Nutzer den Link
  „Mehr erfahren" antippt.
- Rechte (Auskunft, Löschung …) laufen faktisch ins Leere, weil der Entwickler
  keine Daten hält; Löschung durch den Nutzer selbst über Browser-/App-Daten.
  Beschwerde: LDI NRW.
- **Gesagt werden darf:** „Die App sendet selbst keine Nutzungsdaten."
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
Bei extrem kleinen Flächen kann es eng werden; Gerät drehen oder Fenster
vergrößern.

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

**Kann ich Zitate teilen/kopieren?** Es gibt keinen Teilen-Knopf. Text kann
über die normale Browser-Auswahl markiert und kopiert werden (je nach Gerät).

**Wer sucht die Zitate aus?** Der Entwickler; es sind historische Zitate
verstorbener Persönlichkeiten. Echtheit der Zuschreibung wird nicht garantiert.

**Kann ich ältere/andere Monate ansehen?** Ja, über „Monat auswählen" (Vorjahr
und aktuelles Jahr). Zukunftsmonate sind gesperrt.

**Werden meine Daten gesammelt?** Die App sendet keine Nutzungsdaten. Nur
Einstellungen im Browser; Hosting bei GitHub Pages kann technisch die IP-Adresse
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

**0. Schnellster Einstieg:** „▶ Livedemo“ oben links ansehen (ca. 2 Minuten).

**A. Erste Schritte (2 Minuten)**
1. App öffnen; Kopfzeile verschwindet nach 5 Sekunden.
2. Das Türchen mit der heutigen Nummer antippen → Zitat lesen → ✕.
3. Merksatz: *Nur Türchen bis heute sind offen; vergangene Monate nur, wenn man sie
   geöffnet hat.*
4. Abschlussfrage: „Was passiert, wenn du ein Türchen von morgen antippst?"
   (Es wackelt und zeigt das Freischaltdatum.)

**B. Als App installieren (3 Minuten)** → Abschnitt 8, passend zum Gerät.

**C. Andere Monate und Dunkelmodus (2 Minuten)**
„Monat auswählen" → Monat wählen; Sonne/Mond-Knopf oben rechts.

**D. Probleme lösen (3 Minuten)** → Abschnitt 13, die drei häufigsten Fälle:
Zeit/Datum, Daten gelöscht, Sprache.

---

## 16. Technik und Betrieb (für Entwickler- und Betreiberfragen)

**Dateistruktur**
```
/ index.html · impressum.html · datenschutz.html · manifest.json · service-worker.js
/css/styles.css                 Alle Styles (CSS-Variablen, Dark Mode via body.dark-mode / body.light-mode)
/js/i18n.js                     Spracherkennung + Übersetzungen (de, en)
/js/i18n-dom.js                 Übersetzt statische HTML-Teile beim DOMContentLoaded
/js/quotes.js, quotes-en.js     366 Zitate je Sprache (Konstanten QUOTES, QUOTES_EN)
/js/app.js                      Klasse CalendarApp (komplette App-Logik)
/js/pwa-install.js              Service-Worker-Registrierung, Install-Banner, globale Fehler-Handler
/js/livedemo.js, css/livedemo.css  Livedemo (Zeiger, Untertitel, Steuerleiste, Musik)
/assets/audio                   Demo-Musik (CC BY 4.0, Nachweis in docs/licenses/)
/assets/icons, /months, /months-portrait, /screenshots
/.well-known/assetlinks.json    Android-TWA-Verknüpfung
/docs, /custom-gpt-upload       Diese Dokumentation und der KI-Guide-Export
```

**Ladereihenfolge der Skripte** (wichtig!): `quotes.js` → `quotes-en.js` →
`i18n.js` → `i18n-dom.js` → `app.js` → `pwa-install.js` → `livedemo.js`.

**Livedemo-Schnittstelle in `CalendarApp`:** `beginDemo(seed)` legt einen
Sandbox-Zustand `this.demo` an (geöffnete Türchen und Zitate nur im Speicher;
alle `save…`-Methoden schreiben dann nicht), `demoGoto(month, year)`,
`endDemo()` stellt Monat/Jahr und Farbschema wieder her. Das Drehbuch steht in
`LiveDemo.script()`, die Texte (de/en) im Objekt `TEXT` in `js/livedemo.js`.

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

**Deployment:** GitHub Pages, Branch `main`, Verzeichnis `/` (Datei `.nojekyll`
liegt bei). Projektseite unter `/Kalender/` (Groß-/Kleinschreibung beachten, siehe
`TWA_NOTES.md`, `TWA_PATH_NOTES.md`).

**Release-Checkliste**
1. Version in `index.html` (Fußzeile), `manifest.json`, `service-worker.js`
   (Kommentar, `CACHE_NAME`, `RUNTIME_CACHE`) und dieser Doku angleichen.
2. Neue Dateien in `CACHE_URLS` des Service Workers aufnehmen.
3. Bei Änderung der Datenverarbeitung `datenschutz.html` und Abschnitt 11 anpassen.
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

- `README.md` nennt veraltete Speicherschlüssel (`calendar_opened_…`),
  „320+ Sprüche", „Shuffle-Funktion", „Vergangene Monate: alle freigeschaltet"
  und Version 1.6.6. **Der Code gilt**: siehe Abschnitte 4, 5 und 10.
- `manifest.json` trug bis 1.7.0 die Version 1.6.7; jetzt angeglichen.
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
| Livedemo | Geführte Vorführung der echten App mit Zeiger, Untertiteln und Musik |
