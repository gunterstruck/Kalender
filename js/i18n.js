// ========================================
// Internationalisierung (i18n)
// Spracherkennung und Übersetzungen
// ========================================

const I18N = (() => {
    // Erkenne Browsersprache
    const browserLang = (navigator.language || navigator.userLanguage || 'de').toLowerCase();
    const currentLang = browserLang.startsWith('de') ? 'de' : 'en';

    const translations = {
        de: {
            // Locale für Datumsformatierung
            locale: 'de-DE',

            // Monatsnamen
            monthNames: [
                'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
            ],

            // Header
            appTitle: 'Monatskalender mit Türchen',
            appSubtitle: 'Entdecke jeden Tag eine neue Lebensweisheit',

            // Loading & Errors
            loading: 'Lade Kalender...',
            jsRequired: 'JavaScript erforderlich',
            jsMessage: 'Diese App benötigt JavaScript. Bitte aktiviere JavaScript in deinen Browser-Einstellungen.',
            errorOccurred: '⚠️ Ein Fehler ist aufgetreten. Bitte lade die Seite neu.',

            // Theme
            themeToggle: 'Farbschema umschalten',

            // Calendar
            calendarGrid: 'Kalender-Türchen',
            selectMonth: 'Monat auswählen',

            // Modal
            modalTitle: 'Historische Lebensweisheit',
            learnMore: 'Mehr erfahren',
            close: 'Schließen',
            unknownAuthor: 'Unbekannt',

            // Doors
            doorMissed: (day, nextYear) => `Tag ${day} - Verpasst - Nächste Chance: ${nextYear}`,
            doorLocked: (day) => `Tag ${day} - Gesperrt`,
            doorOpened: (day) => `Tag ${day} - Geöffnet - Klicken für Spruch`,
            doorClickToOpen: (day) => `Tag ${day} - Klicken zum Öffnen`,
            missedLabel: 'Verpasst',
            alreadyOpened: 'Bereits geöffnet',

            // Toasts
            happyNewYear: (year) => `🎉 Frohes neues Jahr ${year}! Der Kalender wurde aktualisiert.`,
            storageUnavailable: '⚠️ Speichern nicht möglich. Daten gehen beim Neuladen verloren.',
            storageFull: '⚠️ Speicher voll - bitte Browser-Cache leeren',
            saveFailed: '⚠️ Speichern fehlgeschlagen',
            storageFullQuotes: '⚠️ Speicher voll - Zitate werden temporär verwendet',
            storageFullPositions: '⚠️ Speicher voll - Positionen können nicht gespeichert werden',
            invalidMonth: '⚠️ Ungültiger Monat ausgewählt',
            calendarLoadFailed: '⚠️ Kalender konnte nicht geladen werden',
            doorMissedToast: (date) => `⏰ Verpasst! Nächste Chance: ${date}`,
            doorLockedToast: (date) => `Dieses Türchen öffnet sich am ${date}`,
            fallbackQuote: 'Heute ist dein Tag!',

            // Date format: "1. Januar 2024"
            formatModalDate: (day, monthName, year) => `${day}. ${monthName} ${year}`,

            // Seasonal messages
            winterMessages: [
                '❄️ Winterzeit - Zeit für Besinnlichkeit',
                '⛄ Gemütliche Wintertage',
                '🌨️ Lass es schneien!'
            ],
            springMessages: [
                '🌸 Frühling erwacht - Neue Kraft',
                '🌷 Blütezeit beginnt',
                '🌺 Frühlingsgefühle erwachen',
                '🌸 Lass es blühen!'
            ],
            summerMessages: [
                '☀️ Sommerzeit - Genieße den Tag',
                '🌻 Sonnige Aussichten',
                '🏖️ Sommerliche Leichtigkeit',
                '🎈 Lass sie steigen!'
            ],
            autumnMessages: [
                '🍂 Herbstzeit - Zeit der Ernte',
                '🍁 Goldener Herbst',
                '🎃 Herbstzauber',
                '🍂 Lass es stürmen!'
            ],

            // PWA Install
            installTitle: 'App installieren',
            installMessage: 'Installiere den Türchenkalender für schnellen Zugriff!',
            installButton: 'Installieren',

            // Footer
            imprint: 'Impressum',
            privacy: 'Datenschutz'
        },

        en: {
            locale: 'en-US',

            monthNames: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],

            appTitle: 'Monthly Door Calendar',
            appSubtitle: 'Discover a new piece of wisdom every day',

            loading: 'Loading calendar...',
            jsRequired: 'JavaScript Required',
            jsMessage: 'This app requires JavaScript. Please enable JavaScript in your browser settings.',
            errorOccurred: '⚠️ An error occurred. Please reload the page.',

            themeToggle: 'Toggle color scheme',

            calendarGrid: 'Calendar doors',
            selectMonth: 'Select month',

            modalTitle: 'Historical Wisdom',
            learnMore: 'Learn more',
            close: 'Close',
            unknownAuthor: 'Unknown',

            doorMissed: (day, nextYear) => `Day ${day} - Missed - Next chance: ${nextYear}`,
            doorLocked: (day) => `Day ${day} - Locked`,
            doorOpened: (day) => `Day ${day} - Opened - Click to read quote`,
            doorClickToOpen: (day) => `Day ${day} - Click to open`,
            missedLabel: 'Missed',
            alreadyOpened: 'Already opened',

            happyNewYear: (year) => `🎉 Happy New Year ${year}! The calendar has been updated.`,
            storageUnavailable: '⚠️ Storage unavailable. Data will be lost on reload.',
            storageFull: '⚠️ Storage full - please clear browser cache',
            saveFailed: '⚠️ Save failed',
            storageFullQuotes: '⚠️ Storage full - quotes are used temporarily',
            storageFullPositions: '⚠️ Storage full - positions cannot be saved',
            invalidMonth: '⚠️ Invalid month selected',
            calendarLoadFailed: '⚠️ Calendar could not be loaded',
            doorMissedToast: (date) => `⏰ Missed! Next chance: ${date}`,
            doorLockedToast: (date) => `This door opens on ${date}`,
            fallbackQuote: 'Today is your day!',

            formatModalDate: (day, monthName, year) => `${monthName} ${day}, ${year}`,

            winterMessages: [
                '❄️ Winter time - A season for reflection',
                '⛄ Cozy winter days ahead',
                '🌨️ Let it snow!'
            ],
            springMessages: [
                '🌸 Spring awakens - New beginnings',
                '🌷 Blossoms are blooming',
                '🌺 Spring is in the air',
                '🌸 Let it bloom!'
            ],
            summerMessages: [
                '☀️ Summertime - Enjoy the day',
                '🌻 Sunny days ahead',
                '🏖️ Summer vibes',
                '🎈 Let them fly!'
            ],
            autumnMessages: [
                '🍂 Autumn - Season of harvest',
                '🍁 Golden fall colors',
                '🎃 Autumn magic',
                '🍂 Let the winds blow!'
            ],

            installTitle: 'Install App',
            installMessage: 'Install the Door Calendar for quick access!',
            installButton: 'Install',

            imprint: 'Imprint',
            privacy: 'Privacy'
        }
    };

    /**
     * Gibt die Übersetzung für den gegebenen Schlüssel zurück
     * @param {string} key - Übersetzungs-Schlüssel
     * @param {...any} args - Optionale Argumente für Funktions-Übersetzungen
     * @returns {*} Übersetzter String oder Funktion-Ergebnis
     */
    function t(key, ...args) {
        const value = translations[currentLang][key];
        if (typeof value === 'function') {
            return value(...args);
        }
        return value;
    }

    /**
     * Gibt die aktuelle Sprache zurück ('de' oder 'en')
     */
    function getLang() {
        return currentLang;
    }

    /**
     * Gibt die aktuelle Locale zurück ('de-DE' oder 'en-US')
     */
    function getLocale() {
        return translations[currentLang].locale;
    }

    /**
     * Gibt die richtige Zitate-Datenbank zurück
     */
    function getQuotes() {
        if (currentLang === 'en' && typeof QUOTES_EN !== 'undefined') {
            return QUOTES_EN;
        }
        return QUOTES;
    }

    return { t, getLang, getLocale, getQuotes };
})();
