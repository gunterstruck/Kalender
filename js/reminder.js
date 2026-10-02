// ========================================
// Tägliche Erinnerung
//
// Zwei Wege, beide ohne Server und ohne Datenübertragung:
// 1. Kalendereintrag (.ics) mit täglicher Wiederholung - funktioniert überall
//    (iPhone, Android, Desktop); die Datei wird lokal erzeugt.
// 2. Benachrichtigung der installierten App über Periodic Background Sync
//    (Chrome/Edge, v. a. Android). Der Browser bestimmt, wann die App im
//    Hintergrund geweckt wird; daher ist der Zeitpunkt nicht minutengenau.
//    Der Service Worker liest Uhrzeit und "heute schon geöffnet" aus IndexedDB.
// ========================================

const KalenderReminder = (() => {
    'use strict';

    const SETTINGS_KEY = 'calendar_reminder';
    const DB_NAME = 'kalender-reminder';
    const STORE = 'kv';
    const SYNC_TAG = 'daily-door';
    const DAY_MS = 24 * 60 * 60 * 1000;

    const TEXT = {
        de: {
            button: '🔔 Erinnerung',
            buttonLabel: 'Tägliche Erinnerung einrichten',
            title: 'Tägliche Erinnerung',
            intro: 'Lass dich jeden Tag an dein Türchen erinnern. Alles bleibt auf deinem Gerät.',
            time: 'Uhrzeit',
            icsTitle: '📅 In meinen Kalender eintragen',
            icsHint: 'Lädt einen täglichen Termin (.ics) herunter. Funktioniert auf iPhone, Android und am Computer - einfach mit der Kalender-App öffnen.',
            notifyTitle: '🔔 Benachrichtigung der App',
            notifyOn: 'Benachrichtigung einschalten',
            notifyOff: 'Benachrichtigung ausschalten',
            notifyHint: 'Nur in der installierten App (Chrome/Edge, v. a. Android). Der Browser bestimmt den genauen Zeitpunkt - es kann später als die gewählte Uhrzeit werden.',
            notifyUnsupported: 'Dieser Browser unterstützt keine Erinnerungen der App. Nutze den Kalendereintrag.',
            notifyNeedsInstall: 'Bitte installiere die App zuerst (z. B. „App installieren“), dann klappt die Benachrichtigung.',
            statusOn: (t) => `Aktiv: täglich ab ca. ${t} Uhr, wenn das Türchen noch zu ist.`,
            statusOff: 'Benachrichtigung ist aus.',
            denied: '⚠️ Benachrichtigungen sind blockiert - bitte in den Einstellungen erlauben.',
            enabled: '🔔 Erinnerung eingeschaltet',
            disabled: '🔕 Erinnerung ausgeschaltet',
            icsDone: '📅 Kalendereintrag erstellt - bitte in der Kalender-App öffnen',
            close: 'Schließen',
            howTo: '▶ So funktioniert’s (Mini-Demo, 30 s)',
            icsSummary: '🚪 Türchen öffnen',
            icsBody: 'Heute wartet ein neues Türchen mit einer Lebensweisheit auf dich.',
            notifyBody: 'Heute wartet ein neues Türchen mit einer Lebensweisheit auf dich.',
            notifyHead: '🚪 Dein Türchen wartet',
            fileName: 'tuerchenkalender-erinnerung.ics'
        },
        en: {
            button: '🔔 Reminder',
            buttonLabel: 'Set up daily reminder',
            title: 'Daily reminder',
            intro: 'Get reminded of your door every day. Everything stays on your device.',
            time: 'Time',
            icsTitle: '📅 Add to my calendar',
            icsHint: 'Downloads a daily event (.ics). Works on iPhone, Android and computers - just open it with your calendar app.',
            notifyTitle: '🔔 App notification',
            notifyOn: 'Turn on notification',
            notifyOff: 'Turn off notification',
            notifyHint: 'Only in the installed app (Chrome/Edge, mainly Android). The browser decides the exact time - it may be later than the chosen time.',
            notifyUnsupported: 'This browser does not support app reminders. Use the calendar event instead.',
            notifyNeedsInstall: 'Please install the app first (e.g. "Install app"), then notifications will work.',
            statusOn: (t) => `On: daily from about ${t} if the door is still closed.`,
            statusOff: 'Notification is off.',
            denied: '⚠️ Notifications are blocked - please allow them in the settings.',
            enabled: '🔔 Reminder turned on',
            disabled: '🔕 Reminder turned off',
            icsDone: '📅 Calendar event created - please open it with your calendar app',
            close: 'Close',
            howTo: '▶ How it works (mini demo, 30 s)',
            icsSummary: '🚪 Open your door',
            icsBody: 'A new door with a piece of wisdom is waiting for you today.',
            notifyBody: 'A new door with a piece of wisdom is waiting for you today.',
            notifyHead: '🚪 Your door is waiting',
            fileName: 'door-calendar-reminder.ics'
        }
    };

    const lang = (typeof I18N !== 'undefined' && I18N.getLang() === 'en') ? 'en' : 'de';
    const T = TEXT[lang];

    // ---------- Einstellungen (Local Storage) ----------
    function loadSettings() {
        try {
            const data = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
            if (data && /^\d{2}:\d{2}$/.test(data.time)) return { time: data.time, notify: Boolean(data.notify) };
        } catch (e) { /* Speicher nicht verfügbar */ }
        return { time: '08:00', notify: false };
    }

    function saveSettings(settings) {
        try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { /* ignorieren */ }
    }

    // ---------- IndexedDB (gemeinsam mit dem Service Worker) ----------
    function openDb() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) { reject(new Error('no indexedDB')); return; }
            const req = indexedDB.open(DB_NAME, 1);
            req.onupgradeneeded = () => req.result.createObjectStore(STORE);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function kvSet(entries) {
        try {
            const db = await openDb();
            await new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, 'readwrite');
                Object.entries(entries).forEach(([k, v]) => {
                    if (v === null) tx.objectStore(STORE).delete(k); else tx.objectStore(STORE).put(v, k);
                });
                tx.oncomplete = resolve;
                tx.onerror = () => reject(tx.error);
            });
            db.close();
        } catch (e) { /* ohne IndexedDB keine App-Benachrichtigung */ }
    }

    function ymd(date) {
        const p = (n) => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
    }

    // Wird von der App aufgerufen, wenn das heutige Türchen geöffnet wurde
    function markOpenedToday() {
        if (!loadSettings().notify) return;
        kvSet({ lastOpened: ymd(new Date()) });
    }

    // ---------- Kalendereintrag (.ics) ----------
    function icsEscape(text) {
        return String(text).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    }

    function buildIcs(time) {
        const [h, m] = time.split(':');
        const now = new Date();
        const p = (n) => String(n).padStart(2, '0');
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // Liegt die Uhrzeit heute schon hinter uns, ab morgen beginnen
        if (now.getHours() * 60 + now.getMinutes() >= Number(h) * 60 + Number(m)) {
            start.setTime(start.getTime() + DAY_MS);
        }
        const dtStart = `${start.getFullYear()}${p(start.getMonth() + 1)}${p(start.getDate())}T${h}${m}00`;
        const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const url = new URL('./', window.location.href).href;
        const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@tuerchenkalender`;
        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Monatskalender mit Tuerchen//Erinnerung//DE',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${stamp}`,
            `DTSTART:${dtStart}`,
            'DURATION:PT5M',
            'RRULE:FREQ=DAILY',
            `SUMMARY:${icsEscape(T.icsSummary)}`,
            `DESCRIPTION:${icsEscape(`${T.icsBody}\n${url}`)}`,
            `URL:${url}`,
            'TRANSP:TRANSPARENT',
            'BEGIN:VALARM',
            'ACTION:DISPLAY',
            `DESCRIPTION:${icsEscape(T.icsSummary)}`,
            'TRIGGER:PT0M',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ];
        return lines.join('\r\n') + '\r\n';
    }

    function downloadIcs(time) {
        const blob = new Blob([buildIcs(time)], { type: 'text/calendar;charset=utf-8' });
        const href = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = href;
        a.download = T.fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(href), 10000);
    }

    // ---------- Benachrichtigung (Periodic Background Sync) ----------
    function notifySupported() {
        return 'serviceWorker' in navigator && 'Notification' in window &&
            typeof ServiceWorkerRegistration !== 'undefined' &&
            'periodicSync' in ServiceWorkerRegistration.prototype;
    }

    async function enableNotify(time) {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return { ok: false, reason: 'denied' };
        const registration = await navigator.serviceWorker.ready;
        try {
            const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
            if (status.state !== 'granted') return { ok: false, reason: 'install' };
        } catch (e) { /* Abfrage nicht unterstützt - Registrierung versuchen */ }
        try {
            await registration.periodicSync.register(SYNC_TAG, { minInterval: 6 * 60 * 60 * 1000 });
        } catch (e) {
            return { ok: false, reason: 'install' };
        }
        const openedToday = window.calendarApp && window.calendarApp.isDoorOpenedToday();
        await kvSet({
            reminderTime: time, lang, head: T.notifyHead, body: T.notifyBody,
            lastOpened: openedToday ? ymd(new Date()) : null
        });
        return { ok: true };
    }

    async function disableNotify() {
        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.periodicSync.unregister(SYNC_TAG);
        } catch (e) { /* ignorieren */ }
        await kvSet({ reminderTime: null });
    }

    // ---------- Dialog ----------
    let dialog = null;
    let els = {};

    function toast(message) {
        if (window.calendarApp) window.calendarApp.showToast(message);
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function buildDialog() {
        dialog = el('dialog', 'reminder-dialog');
        dialog.setAttribute('aria-labelledby', 'reminder-title');

        const close = el('button', 'reminder-close', '✕');
        close.type = 'button';
        close.setAttribute('aria-label', T.close);
        close.addEventListener('click', () => dialog.close());

        const title = el('h2', 'reminder-title', T.title);
        title.id = 'reminder-title';
        const intro = el('p', 'reminder-intro', T.intro);

        const timeLabel = el('label', 'reminder-time-label', T.time);
        const time = el('input', 'reminder-time');
        time.type = 'time';
        time.id = 'reminder-time';
        timeLabel.htmlFor = 'reminder-time';
        const timeRow = el('div', 'reminder-time-row');
        timeRow.append(timeLabel, time);

        const icsBox = el('section', 'reminder-option');
        const icsBtn = el('button', 'reminder-primary', T.icsTitle);
        icsBtn.type = 'button';
        icsBtn.id = 'reminder-ics';
        icsBox.append(icsBtn, el('p', 'reminder-hint', T.icsHint));

        const notifyBox = el('section', 'reminder-option');
        const notifyBtn = el('button', 'reminder-secondary', T.notifyOn);
        notifyBtn.type = 'button';
        notifyBtn.id = 'reminder-notify';
        const status = el('p', 'reminder-status');
        status.setAttribute('role', 'status');
        notifyBox.append(el('h3', 'reminder-subtitle', T.notifyTitle), notifyBtn, status, el('p', 'reminder-hint', T.notifyHint));

        const howTo = el('button', 'reminder-howto', T.howTo);
        howTo.type = 'button';
        howTo.addEventListener('click', () => {
            dialog.close();
            if (window.liveDemo) window.liveDemo.start('reminder');
        });

        dialog.append(close, title, intro, timeRow, icsBox, notifyBox, howTo);
        document.body.appendChild(dialog);
        els = { time, icsBtn, notifyBtn, status, notifyBox };

        // Klick auf den Hintergrund schließt
        dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

        time.addEventListener('change', async () => {
            const settings = loadSettings();
            if (!/^\d{2}:\d{2}$/.test(time.value)) return;
            settings.time = time.value;
            saveSettings(settings);
            if (settings.notify) await kvSet({ reminderTime: settings.time });
            render();
        });

        icsBtn.addEventListener('click', () => {
            if (window.calendarApp && window.calendarApp.demo) return;
            const settings = loadSettings();
            settings.time = time.value || settings.time;
            saveSettings(settings);
            downloadIcs(settings.time);
            toast(T.icsDone);
        });

        notifyBtn.addEventListener('click', async () => {
            if (window.calendarApp && window.calendarApp.demo) return;
            const settings = loadSettings();
            settings.time = time.value || settings.time;
            if (settings.notify) {
                await disableNotify();
                settings.notify = false;
                saveSettings(settings);
                toast(T.disabled);
            } else {
                const result = await enableNotify(settings.time);
                if (result.ok) {
                    settings.notify = true;
                    saveSettings(settings);
                    toast(T.enabled);
                } else {
                    els.status.textContent = result.reason === 'denied' ? T.denied : T.notifyNeedsInstall;
                    return;
                }
            }
            render();
        });
    }

    function render() {
        const settings = loadSettings();
        els.time.value = settings.time;
        if (!notifySupported()) {
            els.notifyBtn.hidden = true;
            els.status.textContent = T.notifyUnsupported;
            return;
        }
        els.notifyBtn.hidden = false;
        els.notifyBtn.textContent = settings.notify ? T.notifyOff : T.notifyOn;
        els.status.textContent = settings.notify ? T.statusOn(settings.time) : T.statusOff;
    }

    // demo: nicht-modal öffnen, damit Untertitel und Steuerleiste der
    // Livedemo darüber sichtbar bleiben (modal läge im Top-Layer)
    function open({ demo = false } = {}) {
        if (!dialog) buildDialog();
        render();
        if (dialog.open) return;
        dialog.classList.toggle('reminder-demo', demo);
        if (demo) dialog.show(); else dialog.showModal();
    }

    function close() {
        if (dialog && dialog.open) dialog.close();
        if (dialog) dialog.classList.remove('reminder-demo');
    }

    function init() {
        const host = document.querySelector('.month-selector');
        if (!host) return;
        const button = el('button', 'reminder-button', T.button);
        button.type = 'button';
        button.id = 'reminder-button';
        button.setAttribute('aria-label', T.buttonLabel);
        button.addEventListener('click', open);
        host.appendChild(button);
    }

    document.addEventListener('DOMContentLoaded', init);

    return { open, close, markOpenedToday, buildIcs, get dialog() { return dialog; } };
})();
