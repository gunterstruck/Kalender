// ========================================
// Monatskalender mit Türchen - Haupt-App
// ========================================

class CalendarApp {
    constructor() {
        this.selectedMonth = new Date().getMonth();
        this.selectedYear = new Date().getFullYear();

        // Konfigurationskonstanten
        this.CONFIG = {
            DATE_CHECK_INTERVAL: 60000,        // 1 Minute in ms
            DOOR_SIZE_PERCENT: 8,              // Türchengröße in %
            MIN_SPACING_PERCENT: 3,            // Mindestabstand in %
            PADDING_PERCENT: 3,                // Rand-Padding in %
            MAX_POSITION_ATTEMPTS: 150,        // Maximale Positionierungsversuche
            ANIMATION_DURATION: 150,           // Fade-Animation in ms
            SHUFFLE_ANIMATION_DURATION: 300,   // Shuffle-Animation in ms
            TOAST_DURATION: 3000,              // Toast-Anzeigedauer in ms
            SHAKE_DURATION: 300,               // Shake-Animation in ms
            LOCALE: 'de-DE'                    // Sprach-Locale für Datumsformatierung
        };

        // Monatsnamen
        this.monthNames = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];

        // Monats-Illustrationen (Querformat/Landscape)
        this.monthIllustrations = [
            'january.svg', 'february.svg', 'march.svg', 'april.svg',
            'may.svg', 'june.svg', 'july.svg', 'august.svg',
            'september.svg', 'october.svg', 'november.svg', 'december.svg'
        ];

        // Monats-Illustrationen (Hochformat/Portrait für Mobile)
        this.monthIllustrationsPortrait = [
            'january.svg', 'february.svg', 'march.svg', 'april.svg',
            'may.svg', 'june.svg', 'july.svg', 'august.svg',
            'september.svg', 'october.svg', 'november.svg', 'december.svg'
        ];

        // DOM-Elemente Cache für Performance
        this.doorElements = new Map();

        // DOM-Elemente
        this.monthSelect = document.getElementById('month-select');
        this.calendarGrid = document.getElementById('calendar-grid');
        this.monthIllustration = document.getElementById('month-illustration');
        this.modal = document.getElementById('quote-modal');
        this.modalBackdrop = document.getElementById('modal-backdrop');
        this.modalClose = document.getElementById('modal-close');
        this.quoteText = document.getElementById('quote-text');
        this.quoteAuthor = document.getElementById('quote-author');
        this.quoteDates = document.getElementById('quote-dates');
        this.quoteLink = document.getElementById('quote-link');
        this.quoteLinkTitle = document.getElementById('quote-link-title');
        this.modalDay = document.getElementById('modal-day');
        this.toast = document.getElementById('toast');
        this.infoBanner = document.getElementById('info-banner');
        this.infoBannerText = document.getElementById('info-banner-text');
        this.themeToggle = document.getElementById('theme-toggle');
        this.appHeader = document.querySelector('.app-header');
        this.seasonalBanner = document.getElementById('seasonal-banner');
        this.seasonAnimation = document.getElementById('season-animation');
        this.seasonMessage = document.getElementById('season-message');
        this.mobileMonthDecoration = document.getElementById('mobile-month-decoration');

        this.init();
    }

    // ========================================
    // Aktuelles Datum (dynamisch)
    // ========================================

    get currentYear() {
        return new Date().getFullYear();
    }

    get currentMonth() {
        return new Date().getMonth();
    }

    get currentDay() {
        return new Date().getDate();
    }

    // ========================================
    // Initialisierung
    // ========================================

    init() {
        // Event Listener
        this.monthSelect.addEventListener('change', (e) => this.handleMonthChange(e));
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalBackdrop.addEventListener('click', () => this.closeModal());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Event Delegation für Türchen-Clicks (verhindert Memory Leaks)
        this.calendarGrid.addEventListener('click', (e) => {
            const door = e.target.closest('.door');
            if (door) {
                const day = parseInt(door.getAttribute('data-day'), 10);
                if (!isNaN(day)) {
                    this.handleDoorClick(day);
                }
            }
        });

        // Event Delegation für Tastatur-Navigation (Enter/Space auf Türchen)
        this.calendarGrid.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const door = e.target.closest('.door');
                if (door) {
                    e.preventDefault();
                    const day = parseInt(door.getAttribute('data-day'), 10);
                    if (!isNaN(day)) {
                        this.handleDoorClick(day);
                    }
                }
            }
        });

        // ESC-Taste zum Schließen des Modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Focus Trap für Modal (einmal registrieren)
        this.modalFocusTrap = this.handleModalFocusTrap.bind(this);
        this.lastFocusedElement = null;
        document.addEventListener('keydown', this.modalFocusTrap);

        // Intervall-IDs für Cleanup speichern
        this.dateCheckInterval = null;

        // Lade gespeicherten Monat oder setze auf aktuellen Monat
        const savedMonth = this.loadSelectedMonth();
        if (savedMonth !== null) {
            this.selectedMonth = savedMonth;
            this.monthSelect.value = savedMonth;
        } else {
            this.monthSelect.value = this.currentMonth;
        }

        // LocalStorage verfügbar? (Prüfe NACH Toast-Initialisierung)
        this.storageAvailable = this.checkStorageAvailability();

        // Lade gespeichertes Theme
        this.initTheme();

        // Initiales Rendering
        this.renderCalendar();

        // Prüfe täglich um Mitternacht, ob ein neuer Tag/Jahr begonnen hat
        this.startDateChangeDetection();

        // Page Visibility API: Pausiere Interval wenn Tab inaktiv ist
        this.setupPageVisibility();

        // Entferne Ladeanimation nach erfolgreicher Initialisierung
        this.removeLoadingSpinner();

        // Blende Header nach 5 Sekunden aus und zeige Saisonbanner
        this.hideHeaderAfterDelay();

        // Initialisiere Saisonbanner
        this.initSeasonalBanner();
    }

    // ========================================
    // Ladeanimation entfernen
    // ========================================

    removeLoadingSpinner() {
        // Verwende requestAnimationFrame für sanften Übergang
        requestAnimationFrame(() => {
            const spinner = document.getElementById('loading-spinner');
            if (spinner) {
                spinner.style.opacity = '0';
                // Entferne Element nach Fade-Animation
                setTimeout(() => {
                    spinner.remove();
                    console.log('[CalendarApp] Ladeanimation entfernt - App bereit');
                }, 300);
            }
        });
    }

    // ========================================
    // Header nach 5 Sekunden ausblenden
    // ========================================

    hideHeaderAfterDelay() {
        // Warte 5 Sekunden, dann blende Header aus und zeige Banner
        setTimeout(() => {
            if (this.appHeader) {
                this.appHeader.classList.add('hidden');
                console.log('[CalendarApp] Header ausgeblendet');
            }
            // Zeige Saisonbanner nach Header-Ausblendung
            if (this.seasonalBanner) {
                this.seasonalBanner.classList.add('visible');
                console.log('[CalendarApp] Saisonbanner angezeigt');
            }
        }, 5000);
    }

    // ========================================
    // Saisonbanner initialisieren
    // ========================================

    initSeasonalBanner() {
        this.updateSeasonalBanner();
    }

    updateSeasonalBanner() {
        const month = this.selectedMonth;

        // Bestimme Jahreszeit basierend auf Monat
        let season, seasonEmoji, seasonText;

        if (month === 11 || month === 0 || month === 1) {
            // Winter: Dezember, Januar, Februar
            season = 'winter';
            seasonEmoji = ['❄️', '⛄', '🌨️'];
            seasonText = this.getWinterMessage();
        } else if (month >= 2 && month <= 4) {
            // Frühling: März, April, Mai
            season = 'spring';
            seasonEmoji = ['🌸', '🌷', '🌺', '🌼'];
            seasonText = this.getSpringMessage();
        } else if (month >= 5 && month <= 7) {
            // Sommer: Juni, Juli, August
            season = 'summer';
            seasonEmoji = ['☀️', '🌻', '🏖️'];
            seasonText = this.getSummerMessage();
        } else {
            // Herbst: September, Oktober, November
            season = 'autumn';
            seasonEmoji = ['🍂', '🍁', '🎃'];
            seasonText = this.getAutumnMessage();
        }

        // Prüfe ob bereits die richtige Saison angezeigt wird
        if (this.seasonalBanner.classList.contains(season)) {
            // Keine Animation nötig, bereits die richtige Saison
            return;
        }

        // Sanfte Crossfade-Animation
        this.seasonalBanner.classList.add('transitioning');

        setTimeout(() => {
            // Entferne alte Saison-Klassen
            this.seasonalBanner.classList.remove('winter', 'spring', 'summer', 'autumn');
            // Füge neue Saison-Klasse hinzu
            this.seasonalBanner.classList.add(season);

            // Setze Nachricht
            this.seasonMessage.textContent = seasonText;

            // Erstelle neue animierte Elemente
            if (month === 11 || month === 0 || month === 1) {
                this.createSnowflakes();
            } else if (month >= 2 && month <= 4) {
                this.createFlowers();
            } else if (month >= 5 && month <= 7) {
                this.createSunshine();
            } else {
                this.createLeaves();
            }

            // Entferne transitioning-Klasse nach kurzer Verzögerung
            setTimeout(() => {
                this.seasonalBanner.classList.remove('transitioning');
            }, 50);
        }, 300);
    }

    // ========================================
    // Saisonale Nachrichten
    // ========================================

    getWinterMessage() {
        const messages = [
            '❄️ Winterzeit - Zeit für Besinnlichkeit',
            '⛄ Gemütliche Wintertage',
            '🌨️ Lass es schneien!'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    getSpringMessage() {
        const messages = [
            '🌸 Frühling erwacht - Neue Kraft',
            '🌷 Blütezeit beginnt',
            '🌺 Frühlingsgefühle erwachen'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    getSummerMessage() {
        const messages = [
            '☀️ Sommerzeit - Genieße den Tag',
            '🌻 Sonnige Aussichten',
            '🏖️ Sommerliche Leichtigkeit'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    getAutumnMessage() {
        const messages = [
            '🍂 Herbstzeit - Zeit der Ernte',
            '🍁 Goldener Herbst',
            '🎃 Herbstzauber'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // ========================================
    // Animierte Elemente erstellen
    // ========================================

    createSnowflakes() {
        this.seasonAnimation.innerHTML = '';
        const snowflakes = ['❄', '❅', '❆'];

        for (let i = 0; i < 15; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.top = `${Math.random() * 100}%`;
            flake.style.setProperty('--fall-duration', `${16 + Math.random() * 10}s`);
            flake.style.setProperty('--fall-delay', `${-Math.random() * 10}s`);
            this.seasonAnimation.appendChild(flake);
        }
    }

    createFlowers() {
        this.seasonAnimation.innerHTML = '';
        const flowers = ['🌸', '🌷', '🌺', '🌼', '🌻'];

        for (let i = 0; i < 8; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = `${10 + (i * 12)}%`;
            // Blumen am Boden (untere 30%)
            flower.style.top = `${70 + Math.random() * 30}%`;
            flower.style.setProperty('--fall-duration', `${18 + Math.random() * 12}s`);
            flower.style.setProperty('--fall-delay', `${-Math.random() * 8}s`);
            this.seasonAnimation.appendChild(flower);
        }
    }

    createSunshine() {
        this.seasonAnimation.innerHTML = '';

        const sun = document.createElement('div');
        sun.className = 'sun';
        sun.textContent = '☀️';
        sun.style.right = '5%';
        sun.style.top = '10%';
        this.seasonAnimation.appendChild(sun);
    }

    createLeaves() {
        this.seasonAnimation.innerHTML = '';
        const leaves = ['🍂', '🍁'];

        for (let i = 0; i < 12; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
            leaf.style.left = `${Math.random() * 100}%`;
            // Blätter verteilt (mehr am Boden)
            const isOnGround = Math.random() > 0.3; // 70% am Boden
            if (isOnGround) {
                leaf.style.top = `${70 + Math.random() * 30}%`;
            } else {
                leaf.style.top = `${Math.random() * 70}%`;
            }
            leaf.style.setProperty('--fall-duration', `${20 + Math.random() * 12}s`);
            leaf.style.setProperty('--fall-delay', `${-Math.random() * 10}s`);
            this.seasonAnimation.appendChild(leaf);
        }
    }

    // ========================================
    // Mobile Monat-Dekoration (für Hochformat)
    // ========================================

    updateMobileMonthDecoration() {
        if (!this.mobileMonthDecoration) return;

        const isPortraitMobile = window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches;
        if (isPortraitMobile) {
            this.mobileMonthDecoration.innerHTML = '';
            return;
        }

        const month = this.selectedMonth;
        this.mobileMonthDecoration.innerHTML = '';

        // Bestimme Icons basierend auf Monat
        let icons = [];
        let sizes = [];

        switch (month) {
            case 0: // Januar
                icons = ['❄️', '⛄', '🌨️', '❄', '❅', '🎿', '⛷️'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 1: // Februar
                icons = ['❤️', '💝', '🌹', '❄️', '💕', '🎈'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 2: // März
                icons = ['🌸', '🌷', '🌼', '🦋', '🐝', '🌺'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 3: // April
                icons = ['🌧️', '☂️', '🌈', '🌸', '🐣', '🌷'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 4: // Mai
                icons = ['🌺', '🌻', '🦋', '🐝', '🌼', '🌷'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 5: // Juni
                icons = ['☀️', '🌻', '🍓', '🦋', '🌈', '🏖️'];
                sizes = ['2.5rem', '3rem', '3.5rem', '2rem'];
                break;
            case 6: // Juli
                icons = ['☀️', '🌊', '🏖️', '🍉', '🌻', '⛱️'];
                sizes = ['2.5rem', '3rem', '3.5rem', '2rem'];
                break;
            case 7: // August
                icons = ['☀️', '🌻', '🌾', '🦋', '🍇', '🏖️'];
                sizes = ['2.5rem', '3rem', '3.5rem', '2rem'];
                break;
            case 8: // September
                icons = ['🍂', '🍁', '🍄', '🌾', '🦊', '🎒'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 9: // Oktober
                icons = ['🎃', '🍂', '🍁', '🦇', '👻', '🌙'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 10: // November
                icons = ['🍂', '🍁', '🦃', '🌰', '☕', '🕯️'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
            case 11: // Dezember
                icons = ['🎄', '⭐', '🎅', '❄️', '🎁', '⛄', '🔔'];
                sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];
                break;
        }

        // Definiere Icons die im Himmel erscheinen sollen (Vögel, Schmetterlinge, Sonne, Wolken, etc.)
        const skyIcons = ['🦋', '🐝', '🐦', '🕊️', '☀️', '⭐', '🌙', '🦇', '☁️', '🌈'];

        // Erstelle 20-25 Icons verteilt über den gesamten Bereich
        const iconCount = 20 + Math.floor(Math.random() * 6);

        for (let i = 0; i < iconCount; i++) {
            const icon = document.createElement('div');
            icon.className = 'mobile-month-icon';
            const selectedIcon = icons[Math.floor(Math.random() * icons.length)];
            icon.textContent = selectedIcon;

            // Zufällige horizontale Position
            icon.style.left = `${Math.random() * 95}%`;

            // Positioniere Icons sinnvoll: Himmel-Icons oben, andere unten oder verteilt
            const isSkyIcon = skyIcons.includes(selectedIcon);
            if (isSkyIcon) {
                // Himmel-Icons in der oberen Hälfte
                icon.style.top = `${Math.random() * 50}%`;
            } else {
                // Andere Icons in der unteren Hälfte (z.B. Blumen, Kürbisse)
                icon.style.top = `${50 + Math.random() * 45}%`;
            }

            // Zufällige Größe
            icon.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];

            // Zufällige Opazität (zwischen 0.2 und 0.4)
            icon.style.opacity = (0.2 + Math.random() * 0.2).toString();

            this.mobileMonthDecoration.appendChild(icon);
        }
    }

    // ========================================
    // Page Visibility API Setup (Battery-Optimierung)
    // ========================================

    setupPageVisibility() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Tab ist inaktiv - stoppe Interval
                if (this.dateCheckInterval) {
                    clearInterval(this.dateCheckInterval);
                    this.dateCheckInterval = null;
                }
            } else {
                // Tab ist wieder aktiv - starte Interval neu
                this.startDateChangeDetection();
                // Prüfe sofort ob sich das Datum geändert hat
                this.checkDateChange();
            }
        });
    }

    // ========================================
    // Datumswechsel-Erkennung
    // ========================================

    checkDateChange() {
        const newYear = this.currentYear;
        const newDay = this.currentDay;

        // Wenn sich das Jahr geändert hat
        if (newYear !== this.lastKnownYear) {
            console.log(`Jahr gewechselt von ${this.lastKnownYear} zu ${newYear}`);
            this.lastKnownYear = newYear;

            // Aktualisiere auf den aktuellen Monat und Jahr
            this.selectedMonth = this.currentMonth;
            this.selectedYear = newYear;
            this.monthSelect.value = this.currentMonth;
            this.saveSelectedMonth(this.selectedMonth);

            // Rendere Kalender neu
            this.renderCalendar();

            // Zeige Benachrichtigung
            this.showToast(`🎉 Frohes neues Jahr ${newYear}! Der Kalender wurde aktualisiert.`);
        }
        // Wenn sich nur der Tag geändert hat (neuer Tag)
        else if (newDay !== this.lastKnownDay) {
            this.lastKnownDay = newDay;
            // Rendere Kalender neu, um neue Türchen freizuschalten
            this.renderCalendar();
        }
    }

    startDateChangeDetection() {
        // Verhindere mehrfache Intervals
        if (this.dateCheckInterval) {
            return;
        }

        // Speichere das aktuelle Jahr beim Start
        this.lastKnownYear = this.currentYear;
        this.lastKnownDay = this.currentDay;

        // Prüfe jede Minute, ob sich das Datum geändert hat
        this.dateCheckInterval = setInterval(() => {
            this.checkDateChange();
        }, this.CONFIG.DATE_CHECK_INTERVAL);
    }

    // ========================================
    // Cleanup-Methode (Memory Leak Prevention)
    // ========================================

    destroy() {
        // Stoppe Datum-Check Interval
        if (this.dateCheckInterval) {
            clearInterval(this.dateCheckInterval);
            this.dateCheckInterval = null;
        }

        // Entferne Event Listeners
        document.removeEventListener('keydown', this.modalFocusTrap);

        // Leere Door Elements Cache
        this.doorElements.clear();

        console.log('[CalendarApp] Cleanup abgeschlossen');
    }

    // ========================================
    // LocalStorage Verfügbarkeit prüfen
    // ========================================

    checkStorageAvailability() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            console.warn('LocalStorage nicht verfügbar:', error);
            // Toast nur zeigen wenn Element existiert
            if (this.toast) {
                this.showToast('⚠️ Speichern nicht möglich. Daten gehen beim Neuladen verloren.');
            }
            return false;
        }
    }

    // ========================================
    // Theme Management
    // ========================================

    initTheme() {
        const savedTheme = this.loadTheme();

        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            // Kein gespeichertes Theme - verwende Systemeinstellung
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // System ist Dark Mode, aber keine explizite Auswahl
                document.body.classList.remove('light-mode');
                document.body.classList.remove('dark-mode');
            }
        }
    }

    loadTheme() {
        if (!this.storageAvailable) return null;

        try {
            return localStorage.getItem('calendar_theme');
        } catch (error) {
            console.error('Fehler beim Laden des Themes:', error);
            return null;
        }
    }

    saveTheme(theme) {
        if (!this.storageAvailable) return;

        try {
            localStorage.setItem('calendar_theme', theme);
        } catch (error) {
            console.error('Fehler beim Speichern des Themes:', error);
        }
    }

    toggleTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            // Wechsel zu Light Mode
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            this.saveTheme('light');
        } else {
            // Wechsel zu Dark Mode
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            this.saveTheme('dark');
        }

        // Animation für den Toggle Button
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }

    // ========================================
    // Tage im Monat berechnen
    // Native Date-Methode nutzt automatisch Schaltjahr-Logik
    // ========================================

    getDaysInMonth(month, year) {
        // Tag 0 des nächsten Monats = letzter Tag des aktuellen Monats
        return new Date(year, month + 1, 0).getDate();
    }

    // ========================================
    // Tag des Jahres berechnen (1-365/366)
    // ========================================

    getDayOfYear(day, month, year) {
        // Erstelle ein Datum für den spezifischen Tag
        const date = new Date(year, month, day);
        // Erstelle ein Datum für den 1. Januar des gleichen Jahres
        const startOfYear = new Date(year, 0, 1);
        // Berechne die Differenz in Millisekunden
        const diff = date - startOfYear;
        // Konvertiere in Tage (1-basiert)
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        return dayOfYear;
    }

    // ========================================
    // Türchen-Status prüfen
    // ========================================

    isDoorUnlocked(day) {
        // Verwende selectedYear für korrektes Freischalten bei älteren Monaten
        const selectedMonthDate = new Date(this.selectedYear, this.selectedMonth, day);
        selectedMonthDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Türchen ist freigeschaltet, wenn das Datum <= heute ist
        return selectedMonthDate <= today;
    }

    // ========================================
    // LocalStorage - Schlüssel generieren
    // ========================================

    getStorageKey(prefix) {
        // Verwende selectedYear statt currentYear für korrekten Storage-Zugriff
        return `calendar_${prefix}_${this.selectedYear}_${this.selectedMonth}`;
    }

    // ========================================
    // Geöffnete Türchen laden/speichern
    // ========================================

    loadOpenedDoors() {
        if (!this.storageAvailable) return [];

        try {
            const key = this.getStorageKey('opened');
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Fehler beim Laden der geöffneten Türchen:', error);
            return [];
        }
    }

    saveOpenedDoor(day) {
        if (!this.storageAvailable) return;

        try {
            const opened = this.loadOpenedDoors();
            if (!opened.includes(day)) {
                opened.push(day);
                const key = this.getStorageKey('opened');
                localStorage.setItem(key, JSON.stringify(opened));
            }
        } catch (error) {
            console.error('Fehler beim Speichern des Türchens:', error);
            this.showToast('⚠️ Speichern fehlgeschlagen');
        }
    }

    isDoorOpened(day) {
        const opened = this.loadOpenedDoors();
        return opened.includes(day);
    }

    // ========================================
    // Jahresweite Spruch-Zuordnung laden/speichern
    // Stellt sicher, dass jeder Spruch nur einmal pro Jahr verwendet wird
    // ========================================

    loadYearlyQuoteMapping() {
        if (!this.storageAvailable) {
            // Fallback: Generiere temporäres Jahres-Mapping
            return generateYearlyQuoteMapping(this.selectedYear);
        }

        try {
            // Verwende nur Jahr, nicht Monat, für jahresweite Eindeutigkeit
            const key = `calendar_quotes_${this.selectedYear}`;
            const data = localStorage.getItem(key);

            if (data) {
                return JSON.parse(data);
            }

            // Erstelle neue jahresweite Zuordnung, falls keine existiert
            const mapping = generateYearlyQuoteMapping(this.selectedYear);
            this.saveYearlyQuoteMapping(mapping);
            return mapping;
        } catch (error) {
            console.error('Fehler beim Laden der Zitate:', error);
            return generateYearlyQuoteMapping(this.selectedYear);
        }
    }

    saveYearlyQuoteMapping(mapping) {
        if (!this.storageAvailable) return;

        try {
            // Verwende nur Jahr, nicht Monat
            const key = `calendar_quotes_${this.selectedYear}`;
            localStorage.setItem(key, JSON.stringify(mapping));
        } catch (error) {
            console.error('Fehler beim Speichern der Zitate:', error);
        }
    }

    getQuoteForDay(day) {
        // Lade das jahresweite Mapping
        const yearlyMapping = this.loadYearlyQuoteMapping();

        // Berechne den Tag im Jahr (1-365/366)
        const dayOfYear = this.getDayOfYear(day, this.selectedMonth, this.selectedYear);

        // Hole den Spruch für diesen Tag im Jahr
        const quote = yearlyMapping[dayOfYear - 1];

        // Fallback für alte String-Daten oder fehlende Einträge
        if (!quote) {
            return {
                text: "Heute ist dein Tag!",
                author: "Unbekannt",
                dates: "",
                link: "",
                linkTitle: ""
            };
        }

        // Falls es ein String ist (alte Daten), konvertiere zu Objekt
        if (typeof quote === 'string') {
            return {
                text: quote,
                author: "Unbekannt",
                dates: "",
                link: "",
                linkTitle: ""
            };
        }

        return quote;
    }

    // ========================================
    // Türchen-Positionen laden/speichern
    // ========================================

    loadDoorPositions() {
        if (!this.storageAvailable) {
            const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
            return this.generateDoorPositions(daysInMonth);
        }

        try {
            const key = this.getStorageKey('positions');
            const data = localStorage.getItem(key);

            if (data) {
                return JSON.parse(data);
            }

            // Erstelle neue Positionen, falls keine existieren
            const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
            const positions = this.generateDoorPositions(daysInMonth);
            this.saveDoorPositions(positions);
            return positions;
        } catch (error) {
            console.error('Fehler beim Laden der Positionen:', error);
            const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
            return this.generateDoorPositions(daysInMonth);
        }
    }

    saveDoorPositions(positions) {
        if (!this.storageAvailable) return;

        try {
            const key = this.getStorageKey('positions');
            localStorage.setItem(key, JSON.stringify(positions));
        } catch (error) {
            console.error('Fehler beim Speichern der Positionen:', error);
        }
    }

    // ========================================
    // Zufällige Türchen-Positionen generieren
    // ========================================

    generateDoorPositions(daysInMonth) {
        const positions = [];
        const doorSize = this.CONFIG.DOOR_SIZE_PERCENT;
        const minSpacing = this.CONFIG.MIN_SPACING_PERCENT;
        const padding = this.CONFIG.PADDING_PERCENT;
        const maxAttempts = this.CONFIG.MAX_POSITION_ATTEMPTS;

        for (let day = 1; day <= daysInMonth; day++) {
            let validPosition = false;
            let attempts = 0;
            let x, y;

            while (!validPosition && attempts < maxAttempts) {
                // Zufällige Position generieren (in Prozent)
                x = padding + Math.random() * (100 - doorSize - 2 * padding);
                y = padding + Math.random() * (100 - doorSize - 2 * padding);

                // Prüfen ob Position gültig ist (keine Überlappung)
                validPosition = true;
                for (const pos of positions) {
                    const dx = Math.abs(x - pos.x);
                    const dy = Math.abs(y - pos.y);

                    // Prüfe ob die Türchen sich überlappen würden
                    if (dx < doorSize + minSpacing && dy < doorSize + minSpacing) {
                        validPosition = false;
                        break;
                    }
                }

                attempts++;
            }

            // Fallback: Wenn keine gültige Position gefunden wurde, verwende Grid-Layout
            if (!validPosition) {
                console.warn(`Keine valide Position für Tag ${day} nach ${attempts} Versuchen. Verwende Grid-Fallback.`);
                const gridX = ((day - 1) % 6) * 15 + padding;
                const gridY = Math.floor((day - 1) / 6) * 15 + padding;
                x = gridX;
                y = gridY;
            }

            // Speichere Position
            positions.push({ day, x, y });
        }

        return positions;
    }

    getDoorPosition(day) {
        const positions = this.loadDoorPositions();
        const position = positions.find(pos => pos.day === day);
        return position || { day, x: 50, y: 50 };
    }

    // ========================================
    // Ausgewählten Monat laden/speichern
    // ========================================

    loadSelectedMonth() {
        if (!this.storageAvailable) return null;

        try {
            const data = localStorage.getItem('calendar_selected_month');
            if (!data) return null;

            const month = parseInt(data, 10);

            // Validiere das Ergebnis
            if (isNaN(month) || month < 0 || month > 11) {
                console.warn('Ungültiger gespeicherter Monat:', data);
                localStorage.removeItem('calendar_selected_month');
                return null;
            }

            return month;
        } catch (error) {
            console.error('Fehler beim Laden des Monats:', error);
            return null;
        }
    }

    saveSelectedMonth(month) {
        if (!this.storageAvailable) return;

        try {
            localStorage.setItem('calendar_selected_month', month.toString());
        } catch (error) {
            console.error('Fehler beim Speichern des Monats:', error);
        }
    }

    // ========================================
    // Monatswechsel-Handler
    // ========================================

    handleMonthChange(e) {
        const month = parseInt(e.target.value, 10);

        // Input-Validierung
        if (isNaN(month) || month < 0 || month > 11) {
            console.error('Ungültiger Monat:', e.target.value);
            this.showToast('⚠️ Ungültiger Monat ausgewählt');
            return;
        }

        this.selectedMonth = month;
        this.saveSelectedMonth(this.selectedMonth);
        this.renderCalendar();

        // Sanfte Animation
        this.calendarGrid.style.opacity = '0';
        setTimeout(() => {
            this.calendarGrid.style.opacity = '1';
        }, this.CONFIG.ANIMATION_DURATION);
    }


    // ========================================
    // Toast-Nachricht anzeigen
    // ========================================

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, this.CONFIG.TOAST_DURATION);
    }

    // ========================================
    // Türchen-Click-Handler
    // ========================================

    handleDoorClick(day) {
        if (!this.isDoorUnlocked(day)) {
            // Gesperrtes Türchen
            const unlockDate = new Date(this.selectedYear, this.selectedMonth, day);
            const formattedDate = unlockDate.toLocaleDateString(this.CONFIG.LOCALE, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            this.showToast(`Dieses Türchen öffnet sich am ${formattedDate}`);

            // Shake-Animation (aus Cache holen)
            const doorElement = this.doorElements.get(day);
            if (doorElement) {
                doorElement.classList.add('shake');
                setTimeout(() => {
                    doorElement.classList.remove('shake');
                }, this.CONFIG.SHAKE_DURATION);
            }

            return;
        }

        // Türchen öffnen (falls noch nicht geöffnet)
        if (!this.isDoorOpened(day)) {
            this.saveOpenedDoor(day);
            this.renderCalendar();
        }

        // Modal mit Spruch anzeigen
        this.showQuoteModal(day);
    }

    // ========================================
    // Modal Focus Trap Handler
    // ========================================

    handleModalFocusTrap(e) {
        // Nur aktiv wenn Modal offen ist UND Tab gedrückt wurde
        if (e.key !== 'Tab' || !this.modal.classList.contains('active')) {
            return;
        }

        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusableElements);
        const firstElement = focusableArray[0];
        const lastElement = focusableArray[focusableArray.length - 1];

        // Shift + Tab auf erstem Element -> springe zum letzten
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
        // Tab auf letztem Element -> springe zum ersten
        else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // ========================================
    // Modal mit Spruch anzeigen
    // ========================================

    showQuoteModal(day) {
        const quote = this.getQuoteForDay(day);
        const monthName = this.monthNames[this.selectedMonth];

        // Setze Zitat-Text
        this.quoteText.textContent = quote.text;

        // Setze Autor und Lebensdaten
        this.quoteAuthor.textContent = quote.author || "Unbekannt";
        this.quoteDates.textContent = quote.dates || "";

        // Setze Datum
        this.modalDay.textContent = `${day}. ${monthName} ${this.selectedYear}`;

        // Zeige/Verstecke Link-Button
        if (quote.link) {
            this.quoteLink.href = quote.link;
            this.quoteLinkTitle.textContent = quote.linkTitle || "Mehr erfahren";
            this.quoteLink.style.display = 'inline-flex';
        } else {
            this.quoteLink.style.display = 'none';
        }

        // Speichere aktuell fokussiertes Element
        this.lastFocusedElement = document.activeElement;

        this.modal.classList.add('active');

        // Accessibility: Focus auf Modal setzen
        this.modalClose.focus();
    }

    // ========================================
    // Modal schließen
    // ========================================

    closeModal() {
        this.modal.classList.remove('active');

        // Stelle vorherigen Fokus wieder her
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
            this.lastFocusedElement = null;
        }
    }

    // ========================================
    // Info-Banner aktualisieren
    // ========================================

    updateInfoBanner() {
        const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
        let unlockedCount = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            if (this.isDoorUnlocked(day)) {
                unlockedCount++;
            }
        }

        const lockedCount = daysInMonth - unlockedCount;

        // Zeige Banner nur, wenn mehr als 50% der Türchen gesperrt sind
        if (lockedCount > daysInMonth / 2) {
            const nextUnlockDay = unlockedCount + 1;
            const nextUnlockDate = new Date(this.selectedYear, this.selectedMonth, nextUnlockDay);
            const tomorrow = new Date(this.currentYear, this.currentMonth, this.currentDay + 1);

            if (nextUnlockDate <= tomorrow && nextUnlockDay <= daysInMonth) {
                this.infoBannerText.textContent = `Komm morgen wieder für das nächste Türchen! 🎁`;
            } else {
                this.infoBannerText.textContent = `${lockedCount} von ${daysInMonth} Türchen warten noch darauf, geöffnet zu werden. Schau täglich vorbei! ✨`;
            }
            this.infoBanner.style.display = 'flex';
        } else {
            this.infoBanner.style.display = 'none';
        }
    }

    // ========================================
    // Kalender rendern
    // ========================================

    renderCalendar() {
        // Hintergrund-Illustration aktualisieren (wähle basierend auf Geräteorientierung)
        const isPortrait = window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches;
        const illustrationFolder = isPortrait ? 'months-portrait' : 'months';
        const illustrationFile = isPortrait ? this.monthIllustrationsPortrait[this.selectedMonth] : this.monthIllustrations[this.selectedMonth];
        const illustrationPath = `assets/${illustrationFolder}/${illustrationFile}`;
        this.monthIllustration.style.backgroundImage = `url('${illustrationPath}')`;

        // Anzahl Tage im ausgewählten Monat
        const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);

        // Grid leeren (replaceChildren ist performanter als innerHTML = '')
        this.calendarGrid.replaceChildren();
        this.doorElements.clear();

        // Türchen erstellen
        for (let day = 1; day <= daysInMonth; day++) {
            const door = this.createDoorElement(day);
            this.calendarGrid.appendChild(door);
        }

        // Info-Banner aktualisieren
        this.updateInfoBanner();

        // Saisonbanner aktualisieren
        this.updateSeasonalBanner();

        // Mobile Monat-Dekoration aktualisieren
        this.updateMobileMonthDecoration();
    }

    // ========================================
    // Türchen-Element erstellen
    // ========================================

    createDoorElement(day) {
        const door = document.createElement('div');
        door.className = 'door';
        door.setAttribute('data-day', day);
        door.setAttribute('role', 'button');
        door.setAttribute('tabindex', '0');

        // Position setzen (in Prozent)
        const position = this.getDoorPosition(day);
        door.style.left = `${position.x}%`;
        door.style.top = `${position.y}%`;

        const isUnlocked = this.isDoorUnlocked(day);
        const isOpened = this.isDoorOpened(day);

        // Status-Klassen
        if (!isUnlocked) {
            door.classList.add('locked');
            door.setAttribute('aria-label', `Tag ${day} - Gesperrt`);
            door.setAttribute('aria-disabled', 'true');
        } else if (isOpened) {
            door.classList.add('opened');
            door.setAttribute('aria-label', `Tag ${day} - Geöffnet - Klicken für Spruch`);

            // Info-Icon für geöffnete Türchen
            const infoIcon = document.createElement('div');
            infoIcon.className = 'info-icon';
            infoIcon.setAttribute('aria-label', 'Bereits geöffnet');
            infoIcon.setAttribute('role', 'img');
            infoIcon.innerHTML = 'ℹ️';
            door.appendChild(infoIcon);
        } else {
            door.setAttribute('aria-label', `Tag ${day} - Klicken zum Öffnen`);
        }

        // Tagesnummer
        const numberSpan = document.createElement('span');
        numberSpan.className = 'door-number';
        numberSpan.textContent = day;
        door.appendChild(numberSpan);

        // Event Listener werden durch Event Delegation in init() gehandhabt (Memory Leak Prevention)

        // Speichere Referenz für Performance
        this.doorElements.set(day, door);

        return door;
    }
}

// ========================================
// App initialisieren, wenn DOM geladen ist
// ========================================

// Globale Referenz für Cleanup und Testing
window.calendarApp = null;

document.addEventListener('DOMContentLoaded', () => {
    window.calendarApp = new CalendarApp();
});

// Cleanup bei Unload (Memory Leak Prevention)
window.addEventListener('beforeunload', () => {
    if (window.calendarApp) {
        window.calendarApp.destroy();
    }
});
