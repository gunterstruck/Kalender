// ========================================
// Livedemo - geführte Vorführung der echten App
//
// Ein Zeiger fährt sichtbar durch die laufende App und bedient echte
// Elemente (kein Video). Die Vorführung läuft in einem Sandbox-Zustand
// (CalendarApp.beginDemo/endDemo): Es wird nichts im Local Storage
// gespeichert, der Fortschritt des Nutzers bleibt unberührt.
// Ein Schutz-Overlay fängt echte Klicks ab; Esc oder ✕ bricht ab.
// Musik: optional, nur Wiedergabe nach Klick auf "Livedemo", keine
// Verbindung zu Dritten (siehe Impressum, Abschnitt Musik).
// ========================================

(() => {
    'use strict';

    const MUSIC_URL = 'assets/audio/tropical-island-house-2024.mp3';
    const MUSIC_VOLUME = 0.18;

    const TEXT = {
        de: {
            start: 'Livedemo', startShort: 'Demo',
            startLabel: 'Livedemo starten (ca. 2 Minuten)',
            pause: 'Pause', play: 'Weiter abspielen', next: 'Nächste Erklärung',
            tempo: 'Tempo', musicOn: 'Musik ausschalten', musicOff: 'Musik einschalten',
            musicFailed: 'Musik nicht verfügbar - die Demo läuft ohne Musik weiter',
            close: 'Livedemo beenden',
            askTitle: 'Livedemo beenden?',
            askText: 'Die Vorführung ist angehalten.',
            askContinue: '▶ Weiter ansehen',
            askStop: '■ Beenden',
            intro: 'Willkommen im Monatskalender mit Türchen! Jeden Tag öffnet sich ein neues Türchen - mit einer Lebensweisheit dahinter.',
            today: 'Das Türchen von heute lässt sich öffnen.',
            quote: 'Hinter jedem Türchen steckt ein Zitat einer historischen Persönlichkeit - mit Lebensdaten und einem Wikipedia-Link zum Weiterlesen.',
            opened: 'Geöffnete Türchen tragen ein ℹ️. Das Zitat lässt sich jederzeit noch einmal lesen.',
            future: 'Türchen der Zukunft bleiben zu - sie öffnen sich erst an ihrem Datum.',
            pick: 'Über „Monat auswählen“ blätterst du durch das Vorjahr und das aktuelle Jahr.',
            winter: 'Winter: Schnee, Sterne und gemütliche Sprüche. Ein Tipp auf den Banner - und es schneit!',
            openedOld: 'Hier hat jemand schon Türchen geöffnet. Sie bleiben auch in alten Monaten lesbar.',
            missed: 'Verpasst! In vergangenen Monaten bleiben nur Türchen offen, die du schon geöffnet hast. Nächste Chance: dasselbe Datum im nächsten Jahr.',
            viewPhone: 'Im Hochformat zeigt jeder Monat zusätzlich kleine Animationen - hier Sterne und Schneeflocken.',
            viewDesktop: 'Im Querformat füllt die Monatsillustration den ganzen Hintergrund - jeder Monat hat sein eigenes Bild.',
            spring: 'Frühling: Blüten und Schmetterlinge. Ein Tipp auf den Banner lässt eine Blumenwiese wachsen.',
            summer: 'Sommer: Sonne und Leichtigkeit. Ein Tipp auf den Banner lässt Ballons aufsteigen.',
            autumn: 'Herbst: goldene Blätter. Ein Tipp auf den Banner löst einen Blättersturm aus.',
            theme: 'Mit dem Knopf oben rechts wechselst du zwischen hellem und dunklem Farbschema.',
            themeBack: 'Dunkel ist ideal für den Abend. Und wieder zurück.',
            outro1: 'Zurück im aktuellen Monat. Alles bleibt auf deinem Gerät - ohne Konto, ohne Werbung, auch offline.',
            outro2: 'Installiere die App auf deinem Startbildschirm und öffne jeden Tag ein Türchen. Mehr zeigen die Mini-Demos. Viel Freude!',
            tourShare: 'Gefällt dir ein Zitat? Mit „Teilen“ gibst du es weiter.',
            tourReminder: 'Damit du kein Türchen verpasst: „Erinnerung“ - als Kalendereintrag oder als Benachrichtigung der App.',
            menuTitle: 'Livedemos',
            menuIntro: 'Die App zeigt sich selbst - wähle eine Vorführung:',
            storyTour: '🎬 Große Tour', storyTourMeta: 'ca. 2 Min · alles im Überblick',
            storyRules: '🚪 Türchen-Regeln', storyRulesMeta: 'ca. 30 s · heute, gesperrt, verpasst',
            storyShare: '💬 Zitat teilen', storyShareMeta: 'ca. 20 s',
            storyReminder: '🔔 Erinnerung einrichten', storyReminderMeta: 'ca. 30 s',
            rulesIntro: 'Die Türchen-Regeln in 30 Sekunden.',
            rulesToday: 'Das leuchtende Türchen mit „Heute“ ist heute dran.',
            rulesCatchUp: 'Im laufenden Monat kannst du vergangene Tage nachholen - bis zum Monatsende.',
            shareIntro: 'Ein schönes Zitat weitergeben? So geht es.',
            shareButton: '„Teilen“ öffnet das Teilen-Menü deines Geräts - oder kopiert Zitat und Link in die Zwischenablage.',
            shareDone: 'Fertig! Teilen funktioniert bei jedem geöffneten Türchen.',
            reminderIntro: 'Damit du kein Türchen verpasst: die tägliche Erinnerung.',
            reminderOpen: 'Der Knopf „Erinnerung“ sitzt neben der Monatsauswahl.',
            reminderTime: 'Zuerst die Uhrzeit wählen, zum Beispiel 8:00 Uhr.',
            reminderIcs: 'Der Kalendereintrag funktioniert überall: iPhone, Android und Computer.',
            reminderNotify: 'In der installierten App (Chrome/Edge) gibt es zusätzlich eine Benachrichtigung - nur wenn das Türchen noch zu ist.',
            reminderDone: 'Alles bleibt auf deinem Gerät. Viel Freude mit deinen Türchen!'
        },
        en: {
            start: 'Live demo', startShort: 'Demo',
            startLabel: 'Start live demo (about 2 minutes)',
            pause: 'Pause', play: 'Resume', next: 'Next explanation',
            tempo: 'Speed', musicOn: 'Turn music off', musicOff: 'Turn music on',
            musicFailed: 'Music unavailable - the demo continues without music',
            close: 'End live demo',
            askTitle: 'End the live demo?',
            askText: 'The demo is paused.',
            askContinue: '▶ Keep watching',
            askStop: '■ End',
            intro: 'Welcome to the Monthly Door Calendar! A new door opens every day - with a piece of wisdom behind it.',
            today: "Today's door can be opened.",
            quote: 'Behind every door is a quote from a historical figure - with life dates and a Wikipedia link to read more.',
            opened: 'Opened doors show an ℹ️. You can read the quote again at any time.',
            future: 'Doors in the future stay closed - they open on their date.',
            pick: 'With "Select month" you browse last year and the current year.',
            winter: 'Winter: snow, stars and cozy quotes. Tap the banner - and it snows!',
            openedOld: 'Some doors were opened here already. They stay readable in past months.',
            missed: 'Missed! In past months only doors you already opened stay open. Next chance: the same date next year.',
            viewPhone: 'In portrait view every month also shows small animations - here stars and snowflakes.',
            viewDesktop: 'In landscape view the month illustration fills the whole background - every month has its own picture.',
            spring: 'Spring: blossoms and butterflies. Tap the banner and a flower meadow grows.',
            summer: 'Summer: sunshine and lightness. Tap the banner and balloons rise.',
            autumn: 'Autumn: golden leaves. Tap the banner for a storm of leaves.',
            theme: 'The button at the top right switches between light and dark color scheme.',
            themeBack: 'Dark is perfect for the evening. And back again.',
            outro1: 'Back in the current month. Everything stays on your device - no account, no ads, works offline.',
            outro2: 'Install the app on your home screen and open a door every day. The mini demos show more. Enjoy!',
            tourShare: 'Like a quote? Pass it on with "Share".',
            tourReminder: 'So you never miss a door: "Reminder" - as a calendar event or an app notification.',
            menuTitle: 'Live demos',
            menuIntro: 'The app shows itself - choose a demo:',
            storyTour: '🎬 Full tour', storyTourMeta: 'about 2 min · the big picture',
            storyRules: '🚪 Door rules', storyRulesMeta: 'about 30 s · today, locked, missed',
            storyShare: '💬 Share a quote', storyShareMeta: 'about 20 s',
            storyReminder: '🔔 Set up a reminder', storyReminderMeta: 'about 30 s',
            rulesIntro: 'The door rules in 30 seconds.',
            rulesToday: 'The glowing door marked "Today" is today\'s door.',
            rulesCatchUp: 'During the current month you can catch up on past days - until the month ends.',
            shareIntro: 'Want to pass on a nice quote? Here is how.',
            shareButton: '"Share" opens your device\'s share menu - or copies quote and link to the clipboard.',
            shareDone: 'Done! Sharing works for every opened door.',
            reminderIntro: 'So you never miss a door: the daily reminder.',
            reminderOpen: 'The "Reminder" button sits next to the month selector.',
            reminderTime: 'First choose a time, for example 8:00.',
            reminderIcs: 'The calendar event works everywhere: iPhone, Android and computers.',
            reminderNotify: 'In the installed app (Chrome/Edge) there is also a notification - only if the door is still closed.',
            reminderDone: 'Everything stays on your device. Enjoy your doors!'
        }
    };

    // Tempo-Stufen (wie bei den TourFuchs-Live-Demos); die Musik bleibt unberührt.
    const TEMPI = [1, 1 / 1.2, 1 / 1.5, 1 / 2];
    const TEMPO_LABELS = ['1,2×', '1,0×', '0,8×', '0,6×'];

    class AbortDemo extends Error {}

    // ----------------------------------------
    // Musik: eine Datei, Ein-/Ausblenden, Wiedergabe nur nach Nutzerklick
    // ----------------------------------------
    class Music {
        constructor(onChange) {
            this.onChange = onChange;
            this.audio = null;
            this.enabled = true;
            this.failed = false;
            this.timer = null;
        }

        fade(target, ms, done) {
            clearInterval(this.timer);
            if (!this.audio) { if (done) done(); return; }
            const from = this.audio.volume;
            const t0 = Date.now();
            this.timer = setInterval(() => {
                const f = Math.min(1, (Date.now() - t0) / ms);
                const eased = f * f * (3 - 2 * f);
                this.audio.volume = Math.max(0, Math.min(1, from + (target - from) * eased));
                if (f === 1) { clearInterval(this.timer); if (done) done(); }
            }, 25);
        }

        play() {
            if (!this.enabled) return;
            try {
                if (!this.audio) {
                    this.audio = new Audio(MUSIC_URL);
                    this.audio.preload = 'none';
                    this.audio.loop = true;
                    this.audio.addEventListener('error', () => { this.failed = true; this.onChange(); });
                }
                this.audio.volume = 0;
                const result = this.audio.play();
                if (result && result.then) {
                    result.then(() => { this.failed = false; this.fade(MUSIC_VOLUME, 800); this.onChange(); })
                        .catch(() => { this.failed = true; this.onChange(); });
                }
            } catch (e) {
                this.failed = true;
                this.onChange();
            }
        }

        silence() {
            clearInterval(this.timer);
            if (this.audio) { this.audio.volume = 0; this.audio.pause(); }
        }

        stop(ms) {
            this.fade(0, ms, () => {
                if (this.audio) { this.audio.pause(); this.audio.currentTime = 0; }
            });
        }

        toggle() {
            this.enabled = !this.enabled;
            this.failed = false;
            if (this.enabled) this.play(); else this.fade(0, 350, () => this.audio && this.audio.pause());
            this.onChange();
        }
    }

    // ----------------------------------------
    // Hilfsfunktionen
    // ----------------------------------------
    const lang = (typeof I18N !== 'undefined' && I18N.getLang() === 'en') ? 'en' : 'de';
    const T = TEXT[lang];
    const tempoLabel = (i) => (lang === 'en' ? TEMPO_LABELS[i].replace(',', '.') : TEMPO_LABELS[i]);
    const isPhoneView = () => window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches;
    const el = (tag, className, attrs) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, v));
        return node;
    };

    class LiveDemo {
        constructor(app) {
            this.app = app;
            this.running = false;
            this.paused = false;
            this.aborted = false;
            this.pending = null;
            this.tempo = 0;
            this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.music = new Music(() => this.syncBar());
            this.buildUi();
        }

        // ---------- UI ----------
        buildUi() {
            this.startButton = el('button', 'ld-start', { type: 'button', 'aria-label': T.startLabel });
            const long = el('span', 'ld-label-long');
            long.textContent = `▶ ${T.start}`;
            const short = el('span', 'ld-label-short');
            short.textContent = `▶ ${T.startShort}`;
            this.startButton.append(long, short);
            this.startButton.setAttribute('aria-haspopup', 'dialog');
            this.startButton.addEventListener('click', () => this.openMenu());
            document.body.appendChild(this.startButton);

            this.shield = el('div', 'ld-shield is-hidden', { 'aria-hidden': 'true' });
            this.ghost = el('div', 'ld-ghost is-hidden', { 'aria-hidden': 'true' });
            const svgNs = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(svgNs, 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('width', '34');
            svg.setAttribute('height', '34');
            const path = document.createElementNS(svgNs, 'path');
            path.setAttribute('d', 'M4 2l15 9-6.5 1.5L9.5 19z');
            path.setAttribute('fill', '#fff');
            path.setAttribute('stroke', '#1e293b');
            path.setAttribute('stroke-width', '1.6');
            path.setAttribute('stroke-linejoin', 'round');
            svg.appendChild(path);
            this.ghost.appendChild(svg);
            this.ring = el('span', 'ld-ring');
            this.ghost.appendChild(this.ring);

            this.caption = el('div', 'ld-caption is-hidden', { role: 'status', 'aria-live': 'polite' });
            this.bar = el('div', 'ld-bar is-hidden', { role: 'group', 'aria-label': 'Livedemo' });
            this.progress = el('div', 'ld-progress');
            this.progressFill = el('span', 'ld-progress-fill');
            this.progress.appendChild(this.progressFill);

            this.pauseBtn = this.barButton('⏸', () => this.togglePause());
            this.nextBtn = this.barButton('⏭', () => this.skip(), T.next);
            this.tempoBtn = this.barButton('', () => this.cycleTempo(), T.tempo);
            this.tempoBtn.classList.add('ld-tempo');
            this.musicBtn = this.barButton('🔊', () => this.music.toggle());
            this.closeBtn = this.barButton('✕', () => this.abort(), T.close);
            [this.pauseBtn, this.nextBtn, this.tempoBtn, this.musicBtn, this.closeBtn].forEach((b) => this.bar.appendChild(b));

            // Nachfrage beim Tippen auf den Bildschirm: weiter oder beenden?
            this.ask = el('div', 'ld-ask is-hidden', { role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': 'ld-ask-title' });
            const askTitle = el('p', 'ld-ask-title', { id: 'ld-ask-title' });
            askTitle.textContent = T.askTitle;
            const askText = el('p', 'ld-ask-text');
            askText.textContent = T.askText;
            const askButtons = el('div', 'ld-ask-buttons');
            this.askContinue = el('button', 'ld-ask-continue', { type: 'button' });
            this.askContinue.textContent = T.askContinue;
            this.askContinue.addEventListener('click', () => this.closeAsk(false));
            this.askStop = el('button', 'ld-ask-stop', { type: 'button' });
            this.askStop.textContent = T.askStop;
            this.askStop.addEventListener('click', () => this.closeAsk(true));
            askButtons.append(this.askContinue, this.askStop);
            this.ask.append(askTitle, askText, askButtons);
            this.shield.addEventListener('click', () => this.openAsk());

            document.body.append(this.shield, this.ghost, this.caption, this.bar, this.progress, this.ask);
            this.progress.classList.add('is-hidden');
            this.syncBar();
        }

        // Auswahl der Vorführungen (große Tour + Mini-Demos)
        openMenu() {
            if (this.running) return;
            if (!this.menu) {
                this.menu = el('dialog', 'ld-menu', { 'aria-labelledby': 'ld-menu-title' });
                const title = el('h2', 'ld-menu-title', { id: 'ld-menu-title' });
                title.textContent = T.menuTitle;
                const intro = el('p', 'ld-menu-intro');
                intro.textContent = T.menuIntro;
                const list = el('div', 'ld-menu-list');
                [['tour', T.storyTour, T.storyTourMeta], ['rules', T.storyRules, T.storyRulesMeta],
                    ['share', T.storyShare, T.storyShareMeta], ['reminder', T.storyReminder, T.storyReminderMeta]]
                    .forEach(([id, label, meta]) => {
                        const b = el('button', 'ld-menu-item', { type: 'button', 'data-story': id });
                        const l = el('span', 'ld-menu-label');
                        l.textContent = label;
                        const m = el('span', 'ld-menu-meta');
                        m.textContent = meta;
                        b.append(l, m);
                        b.addEventListener('click', () => { if (this.menu.open) this.menu.close(); this.start(id); });
                        list.appendChild(b);
                    });
                const close = el('button', 'ld-menu-close', { type: 'button', 'aria-label': T.close });
                close.textContent = '✕';
                close.addEventListener('click', () => this.menu.close());
                this.menu.addEventListener('click', (e) => { if (e.target === this.menu) this.menu.close(); });
                this.menu.append(close, title, intro, list);
                document.body.appendChild(this.menu);
            }
            if (typeof this.menu.showModal === 'function') {
                this.menu.showModal();
            } else {
                // Sehr alte Browser ohne <dialog>: direkt die große Tour starten
                this.start('tour');
            }
        }

        barButton(text, handler, label) {
            const b = el('button', 'ld-btn', { type: 'button' });
            b.textContent = text;
            if (label) b.setAttribute('aria-label', label);
            b.addEventListener('click', handler);
            return b;
        }

        syncBar() {
            this.pauseBtn.textContent = this.paused ? '▶' : '⏸';
            this.pauseBtn.setAttribute('aria-label', this.paused ? T.play : T.pause);
            this.tempoBtn.textContent = tempoLabel(this.tempo);
            this.tempoBtn.setAttribute('aria-label', `${T.tempo}: ${tempoLabel(this.tempo)}`);
            const muted = !this.music.enabled || this.music.failed;
            this.musicBtn.textContent = muted ? '🔇' : '🔊';
            this.musicBtn.setAttribute('aria-label', this.music.failed ? T.musicFailed : (this.music.enabled ? T.musicOn : T.musicOff));
            this.musicBtn.title = this.musicBtn.getAttribute('aria-label');
        }

        // ---------- Nachfrage: weiter oder beenden? ----------
        openAsk() {
            if (!this.running || !this.ask.classList.contains('is-hidden')) return;
            this.wasPaused = this.paused;
            this.paused = true;
            // Musik nur leiser stellen (wie bei TourFuchs) – beim Beenden klingt sie dann langsam aus
            if (!this.wasPaused) this.music.fade(MUSIC_VOLUME * 0.4, 600);
            this.syncBar();
            this.ask.classList.remove('is-hidden');
            this.askContinue.focus({ preventScroll: true });
        }

        closeAsk(stop) {
            if (this.ask.classList.contains('is-hidden')) return;
            this.ask.classList.add('is-hidden');
            if (stop) {
                this.abort();
                return;
            }
            this.paused = Boolean(this.wasPaused);
            if (!this.paused) this.music.fade(MUSIC_VOLUME, 600);
            this.syncBar();
            this.bar.querySelector('button').focus({ preventScroll: true });
        }

        // ---------- Ein ruhiges Bild: alles ohne Scrollen sichtbar ----------
        // Während der Demo passt die Kalenderfläche so in den Bildschirm, dass
        // Banner, Kalender und Monatsauswahl über der Steuerleiste Platz haben.
        // Die Seite scrollt dann nicht mehr – auch nicht in den Videos.
        fitLayout() {
            const wrapper = document.querySelector('.calendar-wrapper');
            const selector = document.querySelector('.month-selector');
            const container = document.querySelector('.container');
            if (!wrapper || !selector) return;
            const wrapperH = wrapper.getBoundingClientRect().height;
            const selectorBottom = selector.getBoundingClientRect().bottom + window.scrollY;
            const padBottom = container ? parseFloat(getComputedStyle(container).paddingBottom) || 0 : 0;
            const other = selectorBottom + padBottom - wrapperH;
            const barSpace = this.bar.getBoundingClientRect().height + 16;
            const height = Math.max(240, Math.floor(window.innerHeight - other - barSpace));
            document.documentElement.style.setProperty('--ld-cal-height', `${height}px`);
        }

        async lockLayout() {
            const app = this.app;
            document.documentElement.classList.add('ld-lock');
            window.scrollTo(0, 0);
            if (app.appHeader) app.appHeader.classList.add('hidden');
            if (app.seasonalBanner) app.seasonalBanner.classList.add('visible');
            // Übergänge von Kopfzeile und Banner abwarten, dann messen
            await new Promise((resolve) => setTimeout(resolve, this.reduced ? 50 : 900));
            this.fitLayout();
            this.fitLayout(); // zweiter Durchgang mit der neuen Höhe
            window.scrollTo(0, 0);
            // Jede Vorführung beginnt im aktuellen Monat (auch wenn vorher ein anderer gewählt war)
            const now = new Date();
            app.demoGoto(now.getMonth(), now.getFullYear());
            this.resizeHandler = () => {
                this.fitLayout();
                window.scrollTo(0, 0);
            };
            window.addEventListener('resize', this.resizeHandler);
        }

        unlockLayout() {
            window.removeEventListener('resize', this.resizeHandler);
            document.documentElement.classList.remove('ld-lock');
            document.documentElement.style.removeProperty('--ld-cal-height');
        }

        // ---------- Steuerung ----------
        togglePause() {
            this.paused = !this.paused;
            if (this.paused) this.music.silence(); else this.music.play();
            this.syncBar();
        }

        skip() {
            if (this.pending && this.pending.reading) {
                this.paused = false;
                this.pending.finish();
                this.syncBar();
            }
        }

        cycleTempo() {
            this.tempo = (this.tempo + 1) % TEMPI.length;
            this.syncBar();
        }

        get rate() {
            return TEMPI[this.tempo];
        }

        wait(ms, { reading = false } = {}) {
            if (this.aborted) return Promise.reject(new AbortDemo());
            const duration = (reading || !this.reduced) ? ms : Math.min(ms, 250);
            return new Promise((resolve, reject) => {
                let remaining = duration;
                let last = Date.now();
                const finish = (error) => {
                    clearInterval(timer);
                    this.pending = null;
                    if (error) reject(error); else resolve();
                };
                const timer = setInterval(() => {
                    const now = Date.now();
                    if (!this.paused) remaining -= (now - last) * this.rate;
                    last = now;
                    if (!this.paused && remaining <= 0) finish();
                }, 20);
                this.pending = { reading, finish };
            });
        }

        abort() {
            if (!this.running) return;
            this.aborted = true;
            if (this.pending) this.pending.finish(new AbortDemo());
        }

        // ---------- Bausteine ----------
        async say(text, { target = null, extra = 0 } = {}) {
            let top = false;
            if (target) {
                await this.ensureVisible(target);
                const r = target.getBoundingClientRect();
                top = (r.top + r.height / 2) > window.innerHeight * 0.5;
            }
            this.caption.classList.toggle('ld-top', top);
            this.caption.textContent = text;
            this.caption.classList.remove('is-hidden');
            await this.wait(1300 + text.length * 35 + extra, { reading: true });
        }

        hideCaption() {
            this.caption.classList.add('is-hidden');
        }

        // Ziel in den sichtbaren Bereich holen (Steuerleiste unten freihalten)
        async ensureVisible(target) {
            if (document.documentElement.classList.contains('ld-lock')) return;
            const r = target.getBoundingClientRect();
            const bottomLimit = window.innerHeight - 90;
            if (r.top >= 8 && r.bottom <= bottomLimit) return;
            const delta = r.top + r.height / 2 - window.innerHeight * 0.45;
            window.scrollBy({ top: delta, behavior: this.reduced ? 'auto' : 'smooth' });
            await this.wait(this.reduced ? 50 : 650);
        }

        async moveTo(target) {
            if (!target) return;
            await this.ensureVisible(target);
            const r = target.getBoundingClientRect();
            const x = r.left + r.width / 2 - 6;
            const y = r.top + r.height / 2 - 4;
            const ms = this.reduced ? 0 : 800;
            this.ghost.style.transitionDuration = `${ms / this.rate}ms`;
            this.ghost.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
            await this.wait(ms + 150);
        }

        async tap(action) {
            this.ghost.classList.remove('ld-tap');
            void this.ghost.offsetWidth;
            this.ghost.classList.add('ld-tap');
            await this.wait(250);
            if (action) action();
        }

        async chooseMonth(month, year) {
            const select = this.app.monthSelect;
            await this.moveTo(select);
            await this.tap(() => {
                select.value = `${year}-${month}`;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await this.wait(1100);
        }

        async easterEgg() {
            await this.moveTo(this.app.seasonalBanner);
            await this.tap(() => this.app.seasonalBanner.click());
            await this.wait(2400);
        }

        door(day) {
            return this.app.doorElements.get(day);
        }

        // ---------- Ablauf ----------
        async start(storyId = 'tour') {
            if (this.running || !this.app) return;
            this.storyId = storyId;
            if (typeof KalenderReminder !== 'undefined') KalenderReminder.close();
            this.running = true;
            this.aborted = false;
            this.paused = false;
            this.keyHandler = (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.ask.classList.contains('is-hidden')) this.openAsk(); else this.closeAsk(false);
                    return;
                }
                if (e.target && e.target.closest && e.target.closest('.ld-bar, .ld-ask')) return;
                if (e.key !== 'Tab') { e.preventDefault(); e.stopPropagation(); }
            };
            this.visHandler = () => {
                if (document.hidden && !this.paused) this.togglePause();
            };
            window.addEventListener('keydown', this.keyHandler, true);
            document.addEventListener('visibilitychange', this.visHandler);

            document.body.classList.add('ld-active');
            this.startButton.classList.add('is-hidden');
            [this.shield, this.ghost, this.bar, this.progress].forEach((n) => n.classList.remove('is-hidden'));
            this.ghost.style.transitionDuration = '0ms';
            this.ghost.style.transform = `translate(${Math.round(window.innerWidth * 0.5)}px, ${Math.round(window.innerHeight * 0.6)}px)`;
            this.syncBar();
            this.progressFill.style.width = '0%';
            this.bar.querySelector('button').focus({ preventScroll: true });

            this.music.play();
            this.app.beginDemo(this.seed());
            await this.lockLayout();
            try {
                const stories = { tour: () => this.script(), rules: () => this.storyRules(),
                    share: () => this.storyShare(), reminder: () => this.storyReminder() };
                await (stories[storyId] || stories.tour)();
            } catch (error) {
                if (!(error instanceof AbortDemo)) console.error('[Livedemo]', error);
            }
            await this.finish();
        }

        seed() {
            const prev = new Date().getFullYear() - 1;
            const days = [1, 2, 3, 5, 8, 9, 13, 14, 21];
            const seed = {};
            [0, 3, 6, 9].forEach((m) => { seed[`calendar_opened_v2_${prev}_${m}`] = days; });
            return seed;
        }

        async finish() {
            this.music.stop(2500); // langsam ausblenden
            this.ask.classList.add('is-hidden');
            if (typeof KalenderReminder !== 'undefined') KalenderReminder.close();
            this.pending = null;
            this.hideCaption();
            this.app.closeModal();
            this.app.toast.classList.remove('show');
            this.unlockLayout();
            this.app.endDemo({ today: true }); // zurück zum aktuellen Datum
            window.scrollTo(0, 0);
            window.removeEventListener('keydown', this.keyHandler, true);
            document.removeEventListener('visibilitychange', this.visHandler);
            [this.shield, this.ghost, this.bar, this.progress].forEach((n) => n.classList.add('is-hidden'));
            document.body.classList.remove('ld-active');
            this.startButton.classList.remove('is-hidden');
            this.running = false;
            this.startButton.focus({ preventScroll: true });
        }

        progressTo(step, total) {
            this.progressFill.style.width = `${Math.round((step / total) * 100)}%`;
        }

        // ---------- Mini-Demos ----------
        async storyRules() {
            const app = this.app;
            const now = new Date();
            const today = now.getDate();
            const daysInMonth = app.getDaysInMonth(now.getMonth(), now.getFullYear());
            const prevY = now.getFullYear() - 1;
            const TOTAL = 5;
            let n = 0;
            const mark = () => this.progressTo(++n, TOTAL);

            await this.say(T.rulesIntro);
            mark();
            await this.moveTo(this.door(today));
            await this.say(T.rulesToday, { target: this.door(today) });
            await this.tap(() => app.handleDoorClick(today));
            await this.wait(1600);
            app.closeModal();
            mark();
            if (today < daysInMonth) {
                const next = this.door(today + 1);
                await this.moveTo(next);
                await this.tap(() => app.handleDoorClick(today + 1));
                await this.say(T.future, { target: next });
                app.toast.classList.remove('show');
            }
            mark();
            await this.chooseMonth(0, prevY);
            await this.moveTo(this.door(6));
            await this.tap(() => app.handleDoorClick(6));
            await this.say(T.missed, { target: this.door(6) });
            app.toast.classList.remove('show');
            mark();
            await this.chooseMonth(now.getMonth(), now.getFullYear());
            window.scrollTo({ top: 0, behavior: this.reduced ? 'auto' : 'smooth' });
            await this.say(T.rulesCatchUp);
            mark();
        }

        async storyShare() {
            const app = this.app;
            const today = new Date().getDate();
            const TOTAL = 3;
            let n = 0;
            const mark = () => this.progressTo(++n, TOTAL);

            await this.say(T.shareIntro);
            mark();
            await this.moveTo(this.door(today));
            await this.tap(() => app.handleDoorClick(today));
            await this.wait(900);
            const share = document.getElementById('quote-share');
            await this.moveTo(share);
            await this.tap();
            app.showToast(I18N.t('quoteCopied'));
            await this.say(T.shareButton, { target: share });
            mark();
            app.closeModal();
            await this.say(T.shareDone);
            mark();
        }

        async storyReminder() {
            const TOTAL = 5;
            let n = 0;
            const mark = () => this.progressTo(++n, TOTAL);
            const button = document.getElementById('reminder-button');

            await this.say(T.reminderIntro);
            mark();
            if (!button || typeof KalenderReminder === 'undefined') return;
            await this.moveTo(button);
            await this.say(T.reminderOpen, { target: button });
            await this.tap(() => KalenderReminder.open({ demo: true }));
            await this.wait(500);
            mark();
            const time = document.getElementById('reminder-time');
            await this.moveTo(time);
            await this.say(T.reminderTime, { target: time });
            mark();
            const ics = document.getElementById('reminder-ics');
            await this.moveTo(ics);
            await this.tap();
            await this.say(T.reminderIcs, { target: ics });
            mark();
            const notify = document.getElementById('reminder-notify');
            if (notify && !notify.hidden) await this.moveTo(notify);
            await this.say(T.reminderNotify, { target: notify && !notify.hidden ? notify : null });
            KalenderReminder.close();
            await this.wait(400);
            await this.say(T.reminderDone);
            mark();
        }

        async script() {
            const app = this.app;
            const now = new Date();
            const curM = now.getMonth();
            const curY = now.getFullYear();
            const today = now.getDate();
            const prevY = curY - 1;
            const daysInMonth = app.getDaysInMonth(curM, curY);
            const TOTAL = 13;
            let n = 0;
            const mark = () => this.progressTo(++n, TOTAL);

            // 1 Begrüßung
            await this.say(T.intro);
            mark();

            // 2 Heutiges Türchen öffnen
            await this.say(T.today, { target: this.door(today) });
            await this.moveTo(this.door(today));
            await this.tap(() => app.handleDoorClick(today));
            await this.wait(600);
            await this.say(T.quote);
            const share = document.getElementById('quote-share');
            if (share) {
                await this.moveTo(share);
                await this.say(T.tourShare, { target: share });
            }
            app.closeModal();
            await this.wait(500);
            await this.say(T.opened, { target: this.door(today) });
            window.scrollTo({ top: 0, behavior: this.reduced ? 'auto' : 'smooth' });
            mark();

            // 3 Zukünftiges Türchen
            if (today < daysInMonth) {
                const next = this.door(today + 1);
                await this.moveTo(next);
                await this.tap(() => app.handleDoorClick(today + 1));
                await this.say(T.future, { target: next });
                app.toast.classList.remove('show');
            }
            mark();

            // 4 Monatsauswahl, Winter
            await this.say(T.pick, { target: app.monthSelect });
            await this.chooseMonth(0, prevY);
            await this.say(T.winter, { target: app.seasonalBanner });
            await this.easterEgg();
            mark();

            // 5 Geöffnete und verpasste Türchen im Winter
            await this.moveTo(this.door(5));
            await this.tap(() => app.handleDoorClick(5));
            await this.say(T.openedOld);
            app.closeModal();
            await this.wait(500);
            await this.moveTo(this.door(6));
            await this.tap(() => app.handleDoorClick(6));
            await this.say(T.missed, { target: this.door(6) });
            app.toast.classList.remove('show');
            mark();

            // 6 Hoch- bzw. Querformat
            await this.say(isPhoneView() ? T.viewPhone : T.viewDesktop);
            mark();

            // 7 Frühling
            await this.chooseMonth(3, prevY);
            await this.say(T.spring, { target: app.seasonalBanner });
            await this.easterEgg();
            mark();

            // 8 Sommer
            await this.chooseMonth(6, prevY);
            await this.say(T.summer, { target: app.seasonalBanner });
            await this.easterEgg();
            mark();

            // 9 Herbst
            await this.chooseMonth(9, prevY);
            await this.say(T.autumn, { target: app.seasonalBanner });
            await this.easterEgg();
            mark();

            // 10 Farbschema
            await this.say(T.theme, { target: app.themeToggle });
            await this.moveTo(app.themeToggle);
            await this.tap(() => app.toggleTheme());
            await this.say(T.themeBack);
            await this.tap(() => app.toggleTheme());
            await this.wait(600);
            mark();

            // 11 Zurück in den aktuellen Monat
            await this.chooseMonth(curM, curY);
            window.scrollTo({ top: 0, behavior: this.reduced ? 'auto' : 'smooth' });
            await this.say(T.outro1);
            mark();

            // 12 Erinnerung
            const reminderButton = document.getElementById('reminder-button');
            if (reminderButton) {
                await this.moveTo(reminderButton);
                await this.say(T.tourReminder, { target: reminderButton });
            }
            mark();

            // 13 Schluss
            await this.say(T.outro2);
            mark();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (window.calendarApp) window.liveDemo = new LiveDemo(window.calendarApp);
    });
})();
