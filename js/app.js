// ========================================
// Monatskalender mit Türchen - Haupt-App
// ========================================

class CalendarApp {
    constructor() {
        this.selectedMonth = new Date().getMonth();
        this.selectedYear = new Date().getFullYear();

        // Debug-Modus (setze auf true für detaillierte Logs)
        this.DEBUG = false;

        // Render-Retry-Counter (für rAF-Endlosloop-Prevention)
        this.renderRetryCount = 0;
        this.MAX_RENDER_RETRIES = 10;

        // Letzte Bannernachricht speichern (um Duplikate zu vermeiden)
        this.lastBannerMessage = null;

        // Smart Shuffle für Banner-Rotation
        this.messageQueue = [];
        this.currentMessageSeason = null;

        // Konfigurationskonstanten
        this.CONFIG = {
            DATE_CHECK_INTERVAL: 60000,        // 1 Minute in ms
            DOOR_SIZE_PERCENT: 7,              // Türchengröße in % (wird über updateDoorConfig angepasst)
            MIN_SPACING_PERCENT: 4,            // Mindestabstand in % (wird über updateDoorConfig angepasst)
            PADDING_PERCENT: 6,                // Rand-Padding in % (wird über updateDoorConfig angepasst)
            MAX_POSITION_ATTEMPTS: 500,        // Maximale Positionierungsversuche (erhöht wegen größeren Türchen)
            ANIMATION_DURATION: 150,           // Fade-Animation in ms
            SHUFFLE_ANIMATION_DURATION: 300,   // Shuffle-Animation in ms
            TOAST_DURATION: 3000,              // Toast-Anzeigedauer in ms
            SHAKE_DURATION: 300,               // Shake-Animation in ms
            LOCALE: I18N.getLocale(),              // Sprach-Locale für Datumsformatierung
            RESIZE_DEBOUNCE_DELAY: 250,        // Debounce-Verzögerung für Resize-Events in ms
            ORIENTATION_DEBOUNCE_DELAY: 100    // Debounce-Verzögerung für Orientierungswechsel in ms
        };

        // Monatsnamen (sprachabhängig)
        this.monthNames = I18N.t('monthNames');

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
        this.forcePositionRegeneration = false;

        // Event Listener Referenzen für Cleanup
        this.seasonalBannerClickHandler = null;

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
    // Debug-Logging
    // ========================================

    log(...args) {
        if (this.DEBUG) {
            console.log('[CalendarApp]', ...args);
        }
    }

    warn(...args) {
        if (this.DEBUG) {
            console.warn('[CalendarApp]', ...args);
        }
    }

    // ========================================
    // Utility: Debounce (Performance-Optimierung)
    // ========================================

    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
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

        // LocalStorage verfügbar? (Prüfe NACH Toast-Initialisierung)
        this.storageAvailable = this.checkStorageAvailability();

        // Intervall-IDs für Cleanup speichern
        this.dateCheckInterval = null;
        this.bannerRotationInterval = null;

        // Immer mit dem aktuellen Monat und Jahr starten (basierend auf dem heutigen Datum)
        this.selectedMonth = new Date().getMonth();
        this.selectedYear = new Date().getFullYear();

        // Lade gespeichertes Theme
        this.initTheme();

        // Responsive Door-Konfiguration setzen
        this.updateDoorConfig();

        // Dynamische Höhenberechnung für Portrait-Modus
        this.updateCalendarHeight();

        // Fülle Monat-Dropdown mit Monaten aus zwei Jahren
        this.populateMonthDropdown();
        this.selectMonthInDropdown(this.selectedMonth, this.selectedYear);

        // Initiales Rendering
        this.scheduleRenderCalendar();

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

        // Starte Banner-Rotation (alle 10 Sekunden)
        this.startBannerRotation();

        // Auto-Scroll zum Ausblenden der mobilen Browser-Adressleiste
        this.hideMobileAddressBar();

        // Event Listener für Fenstergrößenänderungen und Orientierungswechsel
        // Debounced für bessere Performance
        this.resizeHandler = this.debounce(() => {
            this.updateCalendarHeight();
            const forceRegenerate = this.updateDoorConfig();
            this.clearPositionCache();
            this.scheduleRenderCalendar({ forceRegenerate });
        }, this.CONFIG.RESIZE_DEBOUNCE_DELAY);

        this.orientationHandler = this.debounce(() => {
            this.updateCalendarHeight();
            const forceRegenerate = this.updateDoorConfig();
            this.clearPositionCache();
            this.scheduleRenderCalendar({ forceRegenerate });
        }, this.CONFIG.ORIENTATION_DEBOUNCE_DELAY);

        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener('orientationchange', this.orientationHandler);
    }

    // ========================================
    // Mobile Address Bar ausblenden
    // ========================================

    hideMobileAddressBar() {
        // Nur auf mobilen Geräten ausführen
        if (window.innerWidth <= 768) {
            // Kleine Verzögerung, damit die Seite vollständig geladen ist
            setTimeout(() => {
                // Minimal nach unten scrollen, um Browser-UI auszublenden
                window.scrollTo(0, 1);
                // Nach kurzer Zeit zurück nach oben scrollen
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 50);
            }, 100);
        }
    }

    // ========================================
    // Dynamische Höhenberechnung für Calendar Wrapper
    // ========================================

    updateCalendarHeight() {
        // Nur im Portrait-Modus auf mobilen Geräten
        const isPortrait = window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches;

        if (!isPortrait) {
            // Im Landscape-Modus oder Desktop: Entferne custom property
            document.documentElement.style.removeProperty('--available-offset');
            return;
        }

        // Berechne die Höhe der UI-Elemente
        let totalOffset = 0;

        // Höhe des Headers (falls sichtbar)
        if (this.appHeader && !this.appHeader.classList.contains('hidden')) {
            totalOffset += this.appHeader.offsetHeight;
        }

        // Höhe des Seasonal Banners (falls sichtbar)
        if (this.seasonalBanner && this.seasonalBanner.classList.contains('visible')) {
            totalOffset += this.seasonalBanner.offsetHeight;
        }

        // Höhe der Monatsauswahl
        const monthSelector = document.querySelector('.month-selector');
        if (monthSelector) {
            totalOffset += monthSelector.offsetHeight;
        }

        // Container Padding
        const container = document.querySelector('.container');
        if (container) {
            const containerStyles = window.getComputedStyle(container);
            totalOffset += parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom);
        }

        // Zusätzlicher Puffer für Spacing und Ränder (ca. 40-60px)
        const buffer = 50;
        totalOffset += buffer;

        // Setze CSS Custom Property
        document.documentElement.style.setProperty('--available-offset', `${totalOffset}px`);

        this.log(`Dynamische Höhe berechnet - Offset: ${totalOffset}px`);
    }

    // ========================================
    // Responsive Door-Konfiguration
    // ========================================

    updateDoorConfig() {
        const isSmallScreen = window.matchMedia('(max-width: 480px)').matches;
        const nextConfig = isSmallScreen
            ? { DOOR_SIZE_PERCENT: 10, MIN_SPACING_PERCENT: 4, PADDING_PERCENT: 6 }
            : { DOOR_SIZE_PERCENT: 7, MIN_SPACING_PERCENT: 4, PADDING_PERCENT: 6 };

        const hasChanged = Object.entries(nextConfig).some(([key, value]) => this.CONFIG[key] !== value);
        if (hasChanged) {
            this.CONFIG = { ...this.CONFIG, ...nextConfig };
        }

        return hasChanged;
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
                    this.log('Ladeanimation entfernt - App bereit');
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
                this.log('Header ausgeblendet');
            }
            // Zeige Saisonbanner nach Header-Ausblendung
            if (this.seasonalBanner) {
                this.seasonalBanner.classList.add('visible');
                this.log('Saisonbanner angezeigt');
            }
            // Aktualisiere Höhenberechnung nach UI-Änderungen
            setTimeout(() => {
                this.updateCalendarHeight();
            }, 100);
        }, 5000);
    }

    // ========================================
    // Saisonbanner initialisieren
    // ========================================

    initSeasonalBanner() {
        this.updateSeasonalBanner();

        // Easter Egg: Click-Event für alle Jahreszeiten
        // Speichere Handler-Referenz für Cleanup
        this.seasonalBannerClickHandler = () => {
            const month = this.selectedMonth;

            // Winter: Dezember, Januar, Februar
            if (month === 11 || month === 0 || month === 1) {
                this.triggerSnowBurst();
            }
            // Frühling: März, April, Mai
            else if (month >= 2 && month <= 4) {
                this.triggerFlowerMeadow();
            }
            // Sommer: Juni, Juli, August
            else if (month >= 5 && month <= 7) {
                this.triggerBalloonRise();
            }
            // Herbst: September, Oktober, November
            else if (month >= 8 && month <= 10) {
                this.triggerLeafStorm();
            }
        };

        this.seasonalBanner.addEventListener('click', this.seasonalBannerClickHandler);
    }

    // ========================================
    // Banner-Rotation starten (alle 10 Sekunden)
    // ========================================

    startBannerRotation() {
        // Verhindere mehrfache Intervals
        if (this.bannerRotationInterval) {
            return;
        }

        // Rotiere Banner alle 10 Sekunden
        this.bannerRotationInterval = setInterval(() => {
            this.updateSeasonalBanner();
        }, 10000); // 10 Sekunden in ms

        this.log('Banner-Rotation gestartet (alle 10 Sekunden)');
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

        // Prüfe ob sich die Saison geändert hat (für vollständige Animation)
        const seasonChanged = !this.seasonalBanner.classList.contains(season);

        // Sanfte Crossfade-Animation
        this.seasonalBanner.classList.add('transitioning');

        // Warte die volle Transition-Dauer (600ms) bevor Text geändert wird
        setTimeout(() => {
            // Nur bei Saisonwechsel: Entferne alte Saison-Klassen und füge neue hinzu
            if (seasonChanged) {
                this.seasonalBanner.classList.remove('winter', 'spring', 'summer', 'autumn');
                this.seasonalBanner.classList.add(season);

                // Erstelle neue animierte Elemente (nur bei Saisonwechsel)
                if (month === 11 || month === 0 || month === 1) {
                    this.createSnowflakes();
                } else if (month >= 2 && month <= 4) {
                    this.createFlowers();
                } else if (month >= 5 && month <= 7) {
                    this.createSunshine();
                } else {
                    this.createLeaves();
                }
            }

            // Aktualisiere IMMER die Nachricht (auch innerhalb derselben Saison)
            this.seasonMessage.textContent = seasonText;

            // Entferne transitioning-Klasse sofort nach Text-Update für Fade-in
            this.seasonalBanner.classList.remove('transitioning');
        }, 600); // Erhöht von 300ms auf 600ms (volle CSS-Transition-Dauer)
    }

    // ========================================
    // Saisonale Nachrichten
    // ========================================

    getRandomMessage(messages) {
        // Verhindere, dass dieselbe Nachricht zweimal hintereinander angezeigt wird
        if (messages.length === 1) {
            return messages[0];
        }

        let newMessage;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            newMessage = messages[Math.floor(Math.random() * messages.length)];
            attempts++;
        } while (newMessage === this.lastBannerMessage && attempts < maxAttempts);

        this.lastBannerMessage = newMessage;
        return newMessage;
    }

    // ========================================
    // Smart Shuffle für faire Rotation
    // ========================================

    getNextMessage(seasonMessages) {
        const currentSeason = this.selectedMonth; // Verwende Monat als Saison-Identifikator

        // Prüfe ob die Saison gewechselt hat oder die Queue leer ist
        if (this.currentMessageSeason !== currentSeason || this.messageQueue.length === 0) {
            // Neue Saison oder leere Queue: Erstelle neues Shuffle
            this.currentMessageSeason = currentSeason;

            // Shuffe die Nachrichten (Fisher-Yates Algorithmus)
            const shuffled = [...seasonMessages];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            // Fülle die Queue mit den gemischten Nachrichten
            this.messageQueue = shuffled;
            this.log(`Banner-Queue neu gemischt für Saison ${currentSeason}: ${this.messageQueue.length} Nachrichten`);
        }

        // Gib die erste Nachricht aus der Queue zurück (und entferne sie)
        return this.messageQueue.shift();
    }

    getWinterMessage() {
        return this.getNextMessage(I18N.t('winterMessages'));
    }

    getSpringMessage() {
        return this.getNextMessage(I18N.t('springMessages'));
    }

    getSummerMessage() {
        return this.getNextMessage(I18N.t('summerMessages'));
    }

    getAutumnMessage() {
        return this.getNextMessage(I18N.t('autumnMessages'));
    }

    // ========================================
    // Animierte Elemente erstellen
    // ========================================

    createSnowflakes() {
        const snowflakes = ['❄', '❅', '❆'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 15; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.top = `${Math.random() * 100}%`;
            flake.style.setProperty('--fall-duration', `${16 + Math.random() * 10}s`);
            flake.style.setProperty('--fall-delay', `${-Math.random() * 10}s`);
            fragment.appendChild(flake);
        }

        this.seasonAnimation.replaceChildren(fragment);
    }

    createFlowers() {
        const flowers = ['🌸', '🌷', '🌺', '🌼', '🌻'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 8; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = `${10 + (i * 12)}%`;
            // Blumen starten oben und segeln durch das Bild
            flower.style.top = `${-10 + Math.random() * 30}%`;
            flower.style.setProperty('--fall-duration', `${6 + Math.random() * 4}s`);
            flower.style.setProperty('--fall-delay', `${-Math.random() * 8}s`);
            fragment.appendChild(flower);
        }

        this.seasonAnimation.replaceChildren(fragment);
    }

    createSunshine() {
        const sun = document.createElement('div');
        sun.className = 'sun';
        sun.textContent = '☀️';
        sun.style.right = '5%';
        sun.style.top = '10%';
        this.seasonAnimation.replaceChildren(sun);
    }

    createLeaves() {
        const leaves = ['🍂', '🍁'];
        const fragment = document.createDocumentFragment();

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
            fragment.appendChild(leaf);
        }

        this.seasonAnimation.replaceChildren(fragment);
    }

    // ========================================
    // Winter Easter Egg: Schneeflocken-Burst
    // ========================================

    triggerSnowBurst() {
        const calendarWrapper = document.querySelector('.calendar-wrapper');
        if (!calendarWrapper) return;

        const snowflakes = ['❄', '❅', '❆'];
        const burstCount = 30 + Math.floor(Math.random() * 21); // 30-50 Flocken

        for (let i = 0; i < burstCount; i++) {
            const flake = document.createElement('div');
            flake.className = 'burst-snowflake';
            flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

            // Zufällige horizontale Startposition
            flake.style.left = `${Math.random() * 100}%`;

            // Startposition knapp oberhalb des sichtbaren Bereichs
            flake.style.top = '-20px';

            // Variiere die Animationsdauer (3s bis 6s)
            const duration = 3 + Math.random() * 3;
            flake.style.animationDuration = `${duration}s`;

            // Variiere die Größe
            const fontSize = 1.5 + Math.random() * 1.5; // 1.5rem bis 3rem
            flake.style.fontSize = `${fontSize}rem`;

            // Füge zum Container hinzu
            calendarWrapper.appendChild(flake);

            // Entferne Flocke nach Animation (mit etwas Puffer)
            setTimeout(() => {
                if (flake.parentNode) {
                    flake.remove();
                }
            }, (duration + 0.5) * 1000);
        }

        this.log(`Snow Burst ausgelöst: ${burstCount} Schneeflocken`);
    }

    // ========================================
    // Herbst Easter Egg: Blätter-Sturm
    // ========================================

    triggerLeafStorm() {
        const calendarWrapper = document.querySelector('.calendar-wrapper');
        if (!calendarWrapper) return;

        const leaves = ['🍂', '🍁'];
        const burstCount = 25;

        for (let i = 0; i < burstCount; i++) {
            const container = document.createElement('div');
            container.className = 'burst-leaf-container';

            const leaf = document.createElement('div');
            leaf.className = 'burst-leaf';
            leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];

            // Startposition: links außen
            container.style.left = '-50px';

            // Startposition zwischen 40% und 80% (bodennah, oberer Himmel bleibt frei)
            const startTop = 40 + Math.random() * 40;
            container.style.top = `${startTop}%`;

            // Endhöhe für leichte Höhenänderung während der Reise
            const targetY = -20 + Math.random() * 40; // -20vh bis 20vh
            container.style.setProperty('--target-y', `${targetY}vh`);

            // Animationsdauer für den Wind-Container
            const travelDuration = 6 + Math.random() * 8;
            container.style.animationDuration = `${travelDuration}s`;

            // Animationsdauer für den Wirbel
            const swirlDuration = 1 + Math.random() * 2;
            leaf.style.animationDuration = `${swirlDuration}s`;

            // Füge zum Container hinzu
            container.appendChild(leaf);
            calendarWrapper.appendChild(container);

            // Cleanup
            setTimeout(() => {
                if (container.parentNode) {
                    container.remove();
                }
            }, (travelDuration + 0.5) * 1000);
        }

        this.log(`Leaf Storm ausgelöst: ${burstCount} Herbstblätter`);
    }

    // ========================================
    // Frühling Easter Egg: Aufblühende Wiese
    // ========================================

    triggerFlowerMeadow() {
        const calendarWrapper = document.querySelector('.calendar-wrapper');
        if (!calendarWrapper) return;

        const flowers = ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🪷', '🏵️', '💐'];
        const burstCount = 40; // 40 Blumen für eine volle Wiese

        for (let i = 0; i < burstCount; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower-pop';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

            // Position im unteren Bereich (Wiese) - 75% bis 95%
            const left = 5 + Math.random() * 90; // 5% bis 95%
            const top = 75 + Math.random() * 20; // 75% bis 95%
            flower.style.left = `${left}%`;
            flower.style.top = `${top}%`;

            // Variiere die Animationsdauer (2s bis 4s - kurzes Aufploppen)
            const duration = 2 + Math.random() * 2;
            flower.style.animationDuration = `${duration}s`;

            // Variiere die Größe
            const fontSize = 1.5 + Math.random() * 1.5; // 1.5rem bis 3rem
            flower.style.fontSize = `${fontSize}rem`;

            // Füge zum Container hinzu
            calendarWrapper.appendChild(flower);

            // Entferne Blume nach Animation (mit etwas Puffer)
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.remove();
                }
            }, (duration + 0.5) * 1000);
        }

        this.log(`Flower Meadow ausgelöst: ${burstCount} Blumen auf der Wiese`);
    }

    // ========================================
    // Sommer Easter Egg: Bunte Luftballons steigen auf
    // ========================================

    triggerBalloonRise() {
        const calendarWrapper = document.querySelector('.calendar-wrapper');
        if (!calendarWrapper) return;

        const burstCount = 20 + Math.floor(Math.random() * 11); // 20-30 Elemente

        for (let i = 0; i < burstCount; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'burst-balloon';
            balloon.textContent = '🎈';

            // Zufällige horizontale Startposition
            balloon.style.left = `${Math.random() * 100}%`;

            // Startposition: Unten am Bildschirmrand
            balloon.style.top = '100%';

            // Farbe: Zufällige Hue-Rotation für bunte Ballons
            const hue = Math.random() * 360;
            balloon.style.setProperty('--hue', `${hue}deg`);

            // Variiere die Animationsdauer (6s bis 10s)
            const duration = 6 + Math.random() * 4;
            balloon.style.animationDuration = `${duration}s`;

            // Variiere die Größe
            const fontSize = 2 + Math.random() * 1.5; // 2rem bis 3.5rem
            balloon.style.fontSize = `${fontSize}rem`;

            // Füge zum Container hinzu
            calendarWrapper.appendChild(balloon);

            // Entferne Ballon nach Animation (mit etwas Puffer)
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                }
            }, (duration + 0.5) * 1000);
        }

        this.log(`Balloon Rise ausgelöst: ${burstCount} Luftballons`);
    }

    // ========================================
    // Mobile Monat-Dekoration (für Hochformat)
    // ========================================

    updateMobileMonthDecoration() {
        if (!this.mobileMonthDecoration) return;

        const month = this.selectedMonth;
        this.mobileMonthDecoration.innerHTML = '';

        // Monatsspezifische Animationskonfiguration
        // position: 'top' (0-30%), 'very-top' (0-15%), 'center' (35-65%), 'bottom' (60-90%), 'sky' (0-50%)
        // opacity: 1 = voll sichtbar, 0.3-0.6 = transparent
        const monthConfig = {
            0: { // Januar - Sterne und Schneeflocken blinken
                animatedIcons: [
                    { emoji: '⭐', class: 'january-star', count: 12, duration: [2, 4], delay: [0, 3], position: 'sky' },
                    { emoji: '🌙', class: 'january-star', count: 3, duration: [3, 5], delay: [0, 2], position: 'sky' },
                    { emoji: '❄️', class: 'january-star', count: 8, duration: [2.5, 4.5], delay: [0, 3], position: 'sky' }
                ],
                staticIcons: ['⛄', '🌨️']
            },
            1: { // Februar - Herzen schweben in der Mitte (etwas transparent)
                animatedIcons: [
                    { emoji: '❤️', class: 'february-heart', count: 5, duration: [3, 5], delay: [0, 4], opacity: 0.6, position: 'center' },
                    { emoji: '💝', class: 'february-heart', count: 4, duration: [3.5, 5.5], delay: [0, 4], opacity: 0.6, position: 'center' },
                    { emoji: '💕', class: 'february-heart', count: 3, duration: [4, 6], delay: [0, 4], opacity: 0.6, position: 'center' }
                ],
                staticIcons: ['🌹', '🎈']
            },
            2: { // März - Schmetterlinge und Bienen schweben (Mitte unten)
                animatedIcons: [
                    { emoji: '🦋', class: 'flying-insect', count: 10, duration: [4, 7], delay: [0, 6], position: 'bottom' },
                    { emoji: '🐝', class: 'flying-insect', count: 8, duration: [4, 7], delay: [0, 6], position: 'bottom' }
                ],
                staticIcons: ['🌸', '🌷', '🌼', '🌺']
            },
            3: { // April - Regentropfen fallen leicht seitlich, Regenbogen ganz oben
                animatedIcons: [
                    { emoji: '💧', class: 'april-raindrop-diagonal', count: 9, duration: [3.5, 5.5], delay: [0, 3], position: 'top' }
                ],
                staticIcons: [
                    { emoji: '🌈', position: 'very-top' },
                    { emoji: '☂️', position: 'bottom' },
                    { emoji: '🌸', position: 'bottom' },
                    { emoji: '🌷', position: 'bottom' }
                ]
            },
            4: { // Mai - Schmetterlinge und Bienen fliegen (voll sichtbar, Mitte unten)
                animatedIcons: [
                    { emoji: '🦋', class: 'flying-insect', count: 6, duration: [4, 6], delay: [0, 5], opacity: 1, position: 'bottom' },
                    { emoji: '🐝', class: 'flying-insect', count: 5, duration: [3.5, 5.5], delay: [0, 5], opacity: 1, position: 'bottom' }
                ],
                staticIcons: ['🌺', '🌻', '🌼', '🌷']
            },
            5: { // Juni - Vögel und Schmetterlinge fliegen (voll sichtbar, Mitte unten)
                animatedIcons: [
                    { emoji: '🐦', class: 'flying-bird', count: 5, duration: [4, 6], delay: [0, 5], opacity: 1, position: 'bottom' },
                    { emoji: '🦋', class: 'flying-insect', count: 5, duration: [4.5, 6.5], delay: [0, 5], opacity: 1, position: 'bottom' }
                ],
                staticIcons: ['☀️', '🌻', '🍓', '🏖️']
            },
            6: { // Juli - Schmetterlinge und Bienen fliegen (voll sichtbar, Mitte unten)
                animatedIcons: [
                    { emoji: '🦋', class: 'flying-insect', count: 5, duration: [4, 6], delay: [0, 5], opacity: 1, position: 'bottom' },
                    { emoji: '🐝', class: 'flying-insect', count: 4, duration: [3.5, 5.5], delay: [0, 5], opacity: 1, position: 'bottom' }
                ],
                staticIcons: ['☀️', '🌊', '🏖️', '🍉', '🌻']
            },
            7: { // August - Schmetterlinge und Vögel fliegen (voll sichtbar, Mitte unten)
                animatedIcons: [
                    { emoji: '🦋', class: 'flying-insect', count: 6, duration: [4, 6], delay: [0, 5], opacity: 1, position: 'bottom' },
                    { emoji: '🐦', class: 'flying-bird', count: 4, duration: [4.5, 6.5], delay: [0, 5], opacity: 1, position: 'bottom' }
                ],
                staticIcons: ['☀️', '🌻', '🌾', '🍇']
            },
            8: { // September - Blätter fliegen seitlich weg (mittig)
                animatedIcons: [
                    { emoji: '🍂', class: 'september-leaf', count: 12, duration: [7, 11], delay: [0, 8], position: 'center' },
                    { emoji: '🍁', class: 'september-leaf', count: 10, duration: [7, 11], delay: [0, 8], position: 'center' }
                ],
                staticIcons: ['🍄', '🌾', '🦊', '🎒']
            },
            9: { // Oktober - Blätter fliegen seitlich weg, Vögel fliegen am Himmel weg
                animatedIcons: [
                    { emoji: '🍂', class: 'september-leaf', count: 10, duration: [7, 11], delay: [0, 8], position: 'center' },
                    { emoji: '🍁', class: 'september-leaf', count: 8, duration: [7, 11], delay: [0, 8], position: 'center' },
                    { emoji: '🐦', class: 'october-bird', count: 6, duration: [6, 10], delay: [0, 6], position: 'sky' }
                ],
                staticIcons: ['🎃', '🦇', '👻', '🌙']
            },
            10: { // November - Windiges, stürmisches Wetter mit Wolken und Wind im oberen Drittel
                animatedIcons: [
                    // Wind- und Wolken-Icons im oberen Drittel (windiges, stürmisches Wetter)
                    { emoji: '☁️', class: 'drifting-cloud', count: 5, duration: [15, 20], delay: [0, 10], position: 'top', opacity: 0.5 },
                    { emoji: '💨', class: 'drifting-cloud', count: 3, duration: [10, 15], delay: [0, 7], position: 'top', opacity: 0.5 },
                    // Blätter fliegen seitlich weg (mittig) - reduzierte Anzahl
                    { emoji: '🍂', class: 'november-leaf', count: 4, duration: [8, 12], delay: [0, 8], position: 'center' },
                    { emoji: '🍁', class: 'november-leaf', count: 3, duration: [8, 12], delay: [0, 8], position: 'center' }
                ],
                staticIcons: ['🦃', '🌰', '☕', '🕯️']
            },
            11: { // Dezember - Schneeflocken fallen diagonal (oben im Himmel)
                animatedIcons: [
                    { emoji: '❄️', class: 'december-snow', count: 15, duration: [10, 15], delay: [0, 10], position: 'top' },
                    { emoji: '⭐', class: 'january-star', count: 8, duration: [2, 4], delay: [0, 3], position: 'sky' }
                ],
                staticIcons: ['🎄', '🎅', '🎁', '⛄', '🔔']
            }
        };

        const config = monthConfig[month];
        if (!config) return;

        const sizes = ['2rem', '2.5rem', '3rem', '1.8rem'];

        // Erstelle animierte Icons
        config.animatedIcons.forEach(iconConfig => {
            for (let i = 0; i < iconConfig.count; i++) {
                const icon = document.createElement('div');
                icon.className = `mobile-month-icon ${iconConfig.class}`;
                icon.textContent = iconConfig.emoji;

                // Zufällige horizontale Position
                icon.style.left = `${Math.random() * 95}%`;

                // Positionierung basierend auf Konfiguration
                const position = iconConfig.position || 'sky';
                switch (position) {
                    case 'very-top':
                        icon.style.top = `${Math.random() * 15}%`;
                        break;
                    case 'top':
                        icon.style.top = `${Math.random() * 30}%`;
                        break;
                    case 'center':
                        icon.style.top = `${35 + Math.random() * 30}%`;
                        break;
                    case 'bottom':
                        icon.style.top = `${60 + Math.random() * 30}%`;
                        break;
                    case 'sky':
                    default:
                        icon.style.top = `${Math.random() * 50}%`;
                        break;
                }

                // Zufällige Größe (größer für Vögel, damit sie auf iOS besser sichtbar sind)
                if (iconConfig.emoji === '🐦') {
                    // Vögel: 2.5rem bis 3.5rem für bessere Sichtbarkeit auf hochauflösenden Displays
                    const birdSizes = ['2.5rem', '2.8rem', '3rem', '3.2rem', '3.5rem'];
                    icon.style.fontSize = birdSizes[Math.floor(Math.random() * birdSizes.length)];
                } else {
                    // Andere Icons: Standard-Größen
                    icon.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
                }

                // Zufällige Animation-Dauer und Verzögerung
                const duration = iconConfig.duration[0] + Math.random() * (iconConfig.duration[1] - iconConfig.duration[0]);
                const delay = Math.random() * iconConfig.delay[1];

                icon.style.setProperty('--duration', `${duration}s`);
                icon.style.setProperty('--delay', `${delay}s`);

                // Spezielle Properties für seitlich wegfliegende Elemente (zufällige Richtung)
                if (iconConfig.class === 'november-leaf' || iconConfig.class === 'september-leaf' || iconConfig.class === 'october-bird') {
                    const direction = Math.random() > 0.5 ? '100vw' : '-100vw';
                    icon.style.setProperty('--direction', direction);
                }

                // Opazität: entweder aus Konfiguration oder Standard für animierte Icons
                if (iconConfig.opacity !== undefined) {
                    icon.style.opacity = iconConfig.opacity.toString();
                } else if (!iconConfig.class.includes('fog') && !iconConfig.class.includes('cloud')) {
                    icon.style.opacity = (0.3 + Math.random() * 0.3).toString();
                }

                this.mobileMonthDecoration.appendChild(icon);
            }
        });

        // Erstelle statische dekorative Icons
        const staticCount = 5 + Math.floor(Math.random() * 5);
        for (let i = 0; i < staticCount && config.staticIcons.length > 0; i++) {
            const icon = document.createElement('div');
            icon.className = 'mobile-month-icon';

            // Statische Icons können jetzt Objekte mit Position sein
            let selectedIcon;
            let iconPosition = 'bottom';
            const randomIcon = config.staticIcons[Math.floor(Math.random() * config.staticIcons.length)];

            if (typeof randomIcon === 'object') {
                selectedIcon = randomIcon.emoji;
                iconPosition = randomIcon.position || 'bottom';
            } else {
                selectedIcon = randomIcon;
            }

            icon.textContent = selectedIcon;

            icon.style.left = `${Math.random() * 95}%`;

            // Positionierung basierend auf Konfiguration
            switch (iconPosition) {
                case 'very-top':
                    icon.style.top = `${Math.random() * 15}%`;
                    break;
                case 'top':
                    icon.style.top = `${Math.random() * 30}%`;
                    break;
                case 'center':
                    icon.style.top = `${35 + Math.random() * 30}%`;
                    break;
                case 'bottom':
                default:
                    icon.style.top = `${60 + Math.random() * 30}%`;
                    break;
            }

            icon.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
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
                // Tab ist inaktiv - stoppe Intervals
                if (this.dateCheckInterval) {
                    clearInterval(this.dateCheckInterval);
                    this.dateCheckInterval = null;
                }
                if (this.bannerRotationInterval) {
                    clearInterval(this.bannerRotationInterval);
                    this.bannerRotationInterval = null;
                }
            } else {
                // Tab ist wieder aktiv - starte Intervals neu
                this.startDateChangeDetection();
                this.startBannerRotation();
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
            this.log(`Jahr gewechselt von ${this.lastKnownYear} zu ${newYear}`);
            this.lastKnownYear = newYear;

            // Aktualisiere auf den aktuellen Monat und Jahr
            this.selectedMonth = this.currentMonth;
            this.selectedYear = newYear;
            this.saveSelectedMonthAndYear(this.selectedMonth, this.selectedYear);

            // Aktualisiere Dropdown mit neuen Monaten (neues Jahr + letztes Jahr)
            this.populateMonthDropdown();
            this.selectMonthInDropdown(this.selectedMonth, this.selectedYear);

            // Rendere Kalender neu
            this.renderCalendar();

            // Zeige Benachrichtigung
            this.showToast(I18N.t('happyNewYear', newYear));
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

        // Stoppe Banner-Rotation Interval
        if (this.bannerRotationInterval) {
            clearInterval(this.bannerRotationInterval);
            this.bannerRotationInterval = null;
        }

        // Stoppe laufende requestAnimationFrame
        if (this.renderCalendarFrame) {
            cancelAnimationFrame(this.renderCalendarFrame);
            this.renderCalendarFrame = null;
        }

        // Entferne Event Listeners
        document.removeEventListener('keydown', this.modalFocusTrap);
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }
        if (this.orientationHandler) {
            window.removeEventListener('orientationchange', this.orientationHandler);
        }
        if (this.seasonalBannerClickHandler && this.seasonalBanner) {
            this.seasonalBanner.removeEventListener('click', this.seasonalBannerClickHandler);
            this.seasonalBannerClickHandler = null;
        }

        // Leere Door Elements Cache
        this.doorElements.clear();

        this.log('Cleanup abgeschlossen');
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
            this.warn('LocalStorage nicht verfügbar:', error);
            // Toast nur zeigen wenn Element existiert
            if (this.toast) {
                this.showToast(I18N.t('storageUnavailable'));
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
            if (error.name === 'QuotaExceededError') {
                console.error('localStorage voll beim Speichern des Themes:', error);
                // Theme ist nicht kritisch, kein Toast
            } else {
                console.error('Fehler beim Speichern des Themes:', error);
            }
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
        // Berechne vollständig in UTC, um Sommerzeitfehler zu vermeiden
        const dateUtc = Date.UTC(year, month, day);
        const startOfYearUtc = Date.UTC(year, 0, 1);
        const diff = dateUtc - startOfYearUtc;
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

        // Datum liegt in der Zukunft → gesperrt
        if (selectedMonthDate > today) {
            return false;
        }

        // Datum ist heute → freigeschaltet
        if (selectedMonthDate.getTime() === today.getTime()) {
            return true;
        }

        // Datum liegt in der Vergangenheit
        // Prüfe ob wir im aktuellen Monat und Jahr sind
        const isCurrentMonth = this.selectedMonth === this.currentMonth && this.selectedYear === this.currentYear;

        if (isCurrentMonth) {
            // Im aktuellen Monat: Alle vergangenen Türchen sind freigeschaltet
            return true;
        } else {
            // In alten Monaten: Nur freigeschaltet wenn bereits geöffnet wurde
            return this.isDoorOpened(day);
        }
    }

    // Prüfe ob Türchen verpasst wurde (vergangenes Datum, aber nie geöffnet)
    isDoorMissed(day) {
        const selectedMonthDate = new Date(this.selectedYear, this.selectedMonth, day);
        selectedMonthDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Prüfe ob wir im aktuellen Monat und Jahr sind
        const isCurrentMonth = this.selectedMonth === this.currentMonth && this.selectedYear === this.currentYear;

        // Im aktuellen Monat können Türchen nicht verpasst werden
        if (isCurrentMonth) {
            return false;
        }

        // Türchen wurde in alten Monaten verpasst wenn:
        // 1. Datum liegt in der Vergangenheit (nicht heute)
        // 2. Wurde nie geöffnet
        return selectedMonthDate < today && !this.isDoorOpened(day);
    }

    // ========================================
    // LocalStorage - Schlüssel generieren
    // ========================================

    getStorageKey(prefix) {
        // Verwende selectedYear statt currentYear für korrekten Storage-Zugriff
        return `calendar_${prefix}_v2_${this.selectedYear}_${this.selectedMonth}`;
    }

    getPositionsStorageKey() {
        return `calendar_positions_v4_${this.selectedYear}_${this.selectedMonth}`;
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
            if (error.name === 'QuotaExceededError') {
                console.error('localStorage voll:', error);
                this.showToast(I18N.t('storageFull'));
            } else {
                console.error('Fehler beim Speichern des Türchens:', error);
                this.showToast(I18N.t('saveFailed'));
            }
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

    generateQuoteMappingForLang(year) {
        const quotes = I18N.getQuotes();
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const daysInYear = isLeapYear ? 366 : 365;
        const availableQuotes = [...quotes];
        const mapping = [];
        for (let i = 0; i < daysInYear; i++) {
            if (availableQuotes.length === 0) {
                availableQuotes.push(...quotes);
            }
            const randomIndex = Math.floor(Math.random() * availableQuotes.length);
            mapping.push(availableQuotes[randomIndex]);
            availableQuotes.splice(randomIndex, 1);
        }
        return mapping;
    }

    loadYearlyQuoteMapping() {
        if (!this.storageAvailable) {
            // Fallback: Generiere temporäres Jahres-Mapping
            return this.generateQuoteMappingForLang(this.selectedYear);
        }

        try {
            // Verwende Jahr + Sprache für sprachspezifische Zuordnung
            const lang = I18N.getLang();
            const key = `calendar_quotes_${this.selectedYear}_${lang}`;
            const data = localStorage.getItem(key);

            if (data) {
                const parsed = JSON.parse(data);

                // Validierung: Prüfe ob das Mapping ein Array ist und die richtige Größe hat
                const expectedSize = this.isLeapYear(this.selectedYear) ? 366 : 365;
                if (!Array.isArray(parsed)) {
                    this.warn('Quote mapping ist kein Array, regeneriere...', parsed);
                    const mapping = this.generateQuoteMappingForLang(this.selectedYear);
                    this.saveYearlyQuoteMapping(mapping);
                    return mapping;
                }

                if (parsed.length !== expectedSize) {
                    this.warn(`Quote mapping hat falsche Größe (${parsed.length} statt ${expectedSize}), regeneriere...`);
                    const mapping = this.generateQuoteMappingForLang(this.selectedYear);
                    this.saveYearlyQuoteMapping(mapping);
                    return mapping;
                }

                // Validierung: Prüfe ob alle Elemente valide Quote-Objekte sind
                const isValid = parsed.every(quote => {
                    return quote && typeof quote === 'object' &&
                           typeof quote.text === 'string' &&
                           typeof quote.author === 'string';
                });

                if (!isValid) {
                    this.warn('Quote mapping enthält ungültige Einträge, regeneriere...');
                    const mapping = this.generateQuoteMappingForLang(this.selectedYear);
                    this.saveYearlyQuoteMapping(mapping);
                    return mapping;
                }

                return parsed;
            }

            // Erstelle neue jahresweite Zuordnung, falls keine existiert
            const mapping = this.generateQuoteMappingForLang(this.selectedYear);
            this.saveYearlyQuoteMapping(mapping);
            return mapping;
        } catch (error) {
            console.error('Fehler beim Laden der Zitate:', error);
            return this.generateQuoteMappingForLang(this.selectedYear);
        }
    }

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    saveYearlyQuoteMapping(mapping) {
        if (!this.storageAvailable) return;

        try {
            // Verwende Jahr + Sprache
            const lang = I18N.getLang();
            const key = `calendar_quotes_${this.selectedYear}_${lang}`;
            localStorage.setItem(key, JSON.stringify(mapping));
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error('localStorage voll beim Speichern der Zitate:', error);
                this.showToast(I18N.t('storageFullQuotes'));
            } else {
                console.error('Fehler beim Speichern der Zitate:', error);
            }
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
                text: I18N.t('fallbackQuote'),
                author: I18N.t('unknownAuthor'),
                dates: "",
                link: "",
                linkTitle: ""
            };
        }

        // Falls es ein String ist (alte Daten), konvertiere zu Objekt
        if (typeof quote === 'string') {
            return {
                text: quote,
                author: I18N.t('unknownAuthor'),
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

    loadDoorPositions(forceRegenerate = false) {
        if (forceRegenerate || this.forcePositionRegeneration) {
            const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
            const positions = this.generateDoorPositions(daysInMonth);
            // Nur speichern wenn Positionen gültig sind
            if (positions.length > 0) {
                this.saveDoorPositions(positions);
            }
            this.forcePositionRegeneration = false;
            return positions;
        }

        if (!this.storageAvailable) {
            const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
            return this.generateDoorPositions(daysInMonth);
        }

        try {
            const key = this.getPositionsStorageKey();
            const data = localStorage.getItem(key);

            if (data) {
                const parsed = JSON.parse(data);
                const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);

                // Validierung: Prüfe ob Positionen ein Array ist
                if (!Array.isArray(parsed)) {
                    this.warn('Door positions ist kein Array, regeneriere...', parsed);
                    const positions = this.generateDoorPositions(daysInMonth);
                    if (positions.length > 0) this.saveDoorPositions(positions);
                    return positions;
                }

                // Validierung: Prüfe ob die Anzahl stimmt
                if (parsed.length !== daysInMonth) {
                    this.warn(`Door positions hat falsche Größe (${parsed.length} statt ${daysInMonth}), regeneriere...`);
                    const positions = this.generateDoorPositions(daysInMonth);
                    if (positions.length > 0) this.saveDoorPositions(positions);
                    return positions;
                }

                // Validierung: Prüfe ob alle Positionen gültig sind
                const isValid = parsed.every(pos => {
                    return pos && typeof pos === 'object' &&
                           typeof pos.day === 'number' &&
                           typeof pos.x === 'number' &&
                           typeof pos.y === 'number' &&
                           pos.day >= 1 && pos.day <= daysInMonth;
                });

                if (!isValid) {
                    this.warn('Door positions enthält ungültige Einträge, regeneriere...');
                    const positions = this.generateDoorPositions(daysInMonth);
                    if (positions.length > 0) this.saveDoorPositions(positions);
                    return positions;
                }

                return parsed;
            }

            // Erstelle neue Positionen, falls keine existieren
            const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
            const positions = this.generateDoorPositions(daysInMonth);
            if (positions.length > 0) this.saveDoorPositions(positions);
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
            const key = this.getPositionsStorageKey();
            localStorage.setItem(key, JSON.stringify(positions));
            // Clear cache when saving new positions
            this.clearPositionCache();
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error('localStorage voll beim Speichern der Positionen:', error);
                this.showToast(I18N.t('storageFullPositions'));
            } else {
                console.error('Fehler beim Speichern der Positionen:', error);
            }
        }
    }

    // ========================================
    // Grid-basierte Fallback-Positionen (wenn DOM nicht bereit)
    // ========================================

    generateGridFallbackPositions(daysInMonth) {
        const positions = [];
        const gridSize = Math.ceil(Math.sqrt(daysInMonth)); // z.B. 6x6 für 31 Tage

        for (let day = 1; day <= daysInMonth; day++) {
            const row = Math.floor((day - 1) / gridSize);
            const col = (day - 1) % gridSize;
            positions.push({
                day,
                x: 10 + (col * (80 / gridSize)),
                y: 10 + (row * (80 / gridSize))
            });
        }

        this.log(`Grid-Fallback generiert: ${positions.length} Positionen`);
        return positions;
    }

    // ========================================
    // Zufällige Türchen-Positionen generieren
    // ========================================

    generateDoorPositions(daysInMonth) {
        const positions = [];
        const gridRect = this.calendarGrid.getBoundingClientRect();
        const gridWidth = gridRect.width;
        const gridHeight = gridRect.height;

        if (!gridWidth || !gridHeight) {
            this.warn('Kalender-Grid hat keine gültigen Abmessungen. Verwende Grid-basierte Fallback-Positionen.');
            // CRITICAL FIX: Statt leeres Array, generiere Grid-basierte Fallback-Positionen
            return this.generateGridFallbackPositions(daysInMonth);
        }

        const isSmallScreen = window.matchMedia('(max-width: 480px)').matches;
        const minDoorSizePx = isSmallScreen ? 40 : 60;
        const doorSizePx = Math.max((this.CONFIG.DOOR_SIZE_PERCENT / 100) * gridWidth, minDoorSizePx);
        const baseSpacingPx = (this.CONFIG.MIN_SPACING_PERCENT / 100) * gridWidth;
        const paddingPx = (this.CONFIG.PADDING_PERCENT / 100) * gridWidth;
        const maxAttempts = this.CONFIG.MAX_POSITION_ATTEMPTS;

        for (let day = 1; day <= daysInMonth; day++) {
            let validPosition = false;
            let xPx = paddingPx;
            let yPx = paddingPx;
            let spacingPx = baseSpacingPx;

            const maxX = Math.max(paddingPx, gridWidth - doorSizePx - paddingPx);
            const maxY = Math.max(paddingPx, gridHeight - doorSizePx - paddingPx);

            while (!validPosition && spacingPx >= 0) {
                let attempts = 0;

                while (!validPosition && attempts < maxAttempts) {
                    xPx = paddingPx + Math.random() * (maxX - paddingPx);
                    yPx = paddingPx + Math.random() * (maxY - paddingPx);

                    validPosition = positions.every((pos) => {
                        const otherX = pos.xPx;
                        const otherY = pos.yPx;
                        const overlapX = xPx < otherX + doorSizePx + spacingPx &&
                            xPx + doorSizePx + spacingPx > otherX;
                        const overlapY = yPx < otherY + doorSizePx + spacingPx &&
                            yPx + doorSizePx + spacingPx > otherY;
                        return !(overlapX && overlapY);
                    });

                    attempts++;
                }

                if (!validPosition) {
                    spacingPx = Math.max(0, spacingPx - baseSpacingPx * 0.2);
                }
            }

            if (!validPosition) {
                this.warn(`Keine valide Position für Tag ${day} nach ${maxAttempts} Versuchen. Verwende minimalen Abstand.`);
            }

            positions.push({
                day,
                x: (xPx / gridWidth) * 100,
                y: (yPx / gridHeight) * 100,
                xPx,
                yPx
            });
        }

        const normalizedPositions = positions.map(({ day, x, y }) => ({ day, x, y }));

        return normalizedPositions;
    }

    getDoorPosition(day) {
        // Cache positions to avoid loading from localStorage 31 times
        // Clear cache if regeneration is forced
        if (this.forcePositionRegeneration && this._cachedPositions) {
            this._cachedPositions = null;
        }

        if (!this._cachedPositions) {
            this._cachedPositions = this.loadDoorPositions(this.forcePositionRegeneration);
        }
        const position = this._cachedPositions.find(pos => pos.day === day);

        // Fallback with collision avoidance: if no position found, use grid-based fallback
        if (!position) {
            this.warn(`Position für Tag ${day} fehlt, verwende Grid-Fallback`);
            const gridSize = Math.ceil(Math.sqrt(31)); // 6x6 grid for up to 31 days
            const row = Math.floor((day - 1) / gridSize);
            const col = (day - 1) % gridSize;
            return {
                day,
                x: 10 + (col * (80 / gridSize)),
                y: 10 + (row * (80 / gridSize))
            };
        }

        return position;
    }

    clearPositionCache() {
        this._cachedPositions = null;
        this.forcePositionRegeneration = false;
    }

    // ========================================
    // Ausgewählten Monat und Jahr laden/speichern
    // ========================================

    loadSelectedMonthAndYear() {
        if (!this.storageAvailable) return null;

        try {
            const data = localStorage.getItem('calendar_selected_month_year_v2');
            if (!data) {
                // Fallback: Versuche altes Format zu laden
                const oldMonth = localStorage.getItem('calendar_selected_month');
                if (oldMonth) {
                    const month = parseInt(oldMonth, 10);
                    if (!isNaN(month) && month >= 0 && month <= 11) {
                        // Migriere zu neuem Format
                        const currentYear = this.currentYear;
                        this.saveSelectedMonthAndYear(month, currentYear);
                        return { month, year: currentYear };
                    }
                }
                return null;
            }

            const parsed = JSON.parse(data);

            // Validiere das Ergebnis
            if (!parsed || typeof parsed !== 'object' ||
                typeof parsed.month !== 'number' || typeof parsed.year !== 'number') {
                this.warn('Ungültige gespeicherte Monat/Jahr-Daten:', data);
                localStorage.removeItem('calendar_selected_month_year_v2');
                return null;
            }

            const { month, year } = parsed;

            if (isNaN(month) || month < 0 || month > 11) {
                this.warn('Ungültiger gespeicherter Monat:', month);
                localStorage.removeItem('calendar_selected_month_year_v2');
                return null;
            }

            if (isNaN(year) || year < 2000 || year > 2100) {
                this.warn('Ungültiges gespeichertes Jahr:', year);
                localStorage.removeItem('calendar_selected_month_year_v2');
                return null;
            }

            return { month, year };
        } catch (error) {
            console.error('Fehler beim Laden von Monat/Jahr:', error);
            return null;
        }
    }

    saveSelectedMonthAndYear(month, year) {
        if (!this.storageAvailable) return;

        try {
            const data = JSON.stringify({ month, year });
            localStorage.setItem('calendar_selected_month_year_v2', data);
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error('localStorage voll beim Speichern von Monat/Jahr:', error);
                // Monat/Jahr ist nicht kritisch, kein Toast
            } else {
                console.error('Fehler beim Speichern von Monat/Jahr:', error);
            }
        }
    }

    // ========================================
    // Monat-Dropdown mit Monaten aus zwei Jahren füllen
    // ========================================

    populateMonthDropdown() {
        const currentYear = this.currentYear;
        const lastYear = currentYear - 1;

        // Leere das Dropdown
        this.monthSelect.innerHTML = '';

        // Füge Monate für beide Jahre hinzu (letztes Jahr zuerst, dann aktuelles Jahr)
        for (const year of [lastYear, currentYear]) {
            for (let month = 0; month < 12; month++) {
                const option = document.createElement('option');
                const monthName = this.monthNames[month];

                // Value-Format: "YYYY-MM"
                option.value = `${year}-${month}`;
                option.textContent = `${monthName} ${year}`;

                this.monthSelect.appendChild(option);
            }
        }
    }

    // Setze den ausgewählten Monat im Dropdown
    selectMonthInDropdown(month, year) {
        const value = `${year}-${month}`;
        this.monthSelect.value = value;

        // Falls der Wert nicht gefunden wurde, aktualisiere das Dropdown
        if (this.monthSelect.value !== value) {
            this.log(`Monat ${month}/${year} nicht im Dropdown gefunden, aktualisiere...`);
            this.populateMonthDropdown();
            this.monthSelect.value = value;
        }
    }

    // ========================================
    // Monatswechsel-Handler
    // ========================================

    handleMonthChange(e) {
        const value = e.target.value;

        // Parse das Value-Format "YYYY-MM"
        const parts = value.split('-');
        if (parts.length !== 2) {
            console.error('Ungültiges Dropdown-Value-Format:', value);
            this.showToast(I18N.t('invalidMonth'));
            return;
        }

        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);

        // Input-Validierung
        if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
            console.error('Ungültiger Monat oder Jahr:', value);
            this.showToast(I18N.t('invalidMonth'));
            return;
        }

        this.selectedMonth = month;
        this.selectedYear = year;

        this.saveSelectedMonthAndYear(this.selectedMonth, this.selectedYear);
        this.clearPositionCache(); // Clear cache when month changes
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
            // Prüfe ob Türchen verpasst wurde oder noch in der Zukunft liegt
            if (this.isDoorMissed(day)) {
                // Verpasstes Türchen → zeige "Nächstes Jahr" Nachricht
                const nextYear = this.selectedYear + 1;
                const nextYearDate = new Date(nextYear, this.selectedMonth, day);
                const formattedDate = nextYearDate.toLocaleDateString(this.CONFIG.LOCALE, {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });

                this.showToast(I18N.t('doorMissedToast', formattedDate));
            } else {
                // Zukünftiges Türchen → zeige normales "Öffnet sich am" Nachricht
                const unlockDate = new Date(this.selectedYear, this.selectedMonth, day);
                const formattedDate = unlockDate.toLocaleDateString(this.CONFIG.LOCALE, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                this.showToast(I18N.t('doorLockedToast', formattedDate));
            }

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
        this.quoteAuthor.textContent = quote.author || I18N.t('unknownAuthor');
        this.quoteDates.textContent = quote.dates || "";

        // Setze Datum
        this.modalDay.textContent = I18N.t('formatModalDate', day, monthName, this.selectedYear);

        // Zeige/Verstecke Link-Button
        if (quote.link) {
            this.quoteLink.href = quote.link;
            this.quoteLinkTitle.textContent = quote.linkTitle || I18N.t('learnMore');
            this.quoteLink.classList.remove('is-hidden');
        } else {
            this.quoteLink.classList.add('is-hidden');
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
        // Info-Banner komplett ausblenden
        this.infoBanner.classList.add('is-hidden');
    }

    // ========================================
    // Kalender rendern
    // ========================================

    scheduleRenderCalendar({ forceRegenerate = false, delayMs = 0 } = {}) {
        if (forceRegenerate) {
            this.forcePositionRegeneration = true;
        }

        if (this.renderCalendarFrame) {
            cancelAnimationFrame(this.renderCalendarFrame);
        }

        // Wenn eine Verzögerung angegeben ist, verwende setTimeout
        if (delayMs > 0) {
            setTimeout(() => {
                this.renderCalendarFrame = requestAnimationFrame(() => {
                    this.renderCalendarFrame = null;
                    this.renderCalendar();
                });
            }, delayMs);
        } else {
            // Single rAF is sufficient - double rAF was causing unnecessary 16ms delay
            this.renderCalendarFrame = requestAnimationFrame(() => {
                this.renderCalendarFrame = null;
                this.renderCalendar();
            });
        }
    }

    renderCalendar() {
        const gridRect = this.calendarGrid.getBoundingClientRect();
        if (gridRect.width === 0 || gridRect.height === 0) {
            // Verhindere Endlosloop bei dauerhaft unsichtbarem Grid
            if (this.renderRetryCount >= this.MAX_RENDER_RETRIES) {
                console.error(`Kalender-Rendering fehlgeschlagen nach ${this.MAX_RENDER_RETRIES} Versuchen. Grid hat keine Größe.`);
                this.showToast(I18N.t('calendarLoadFailed'));
                this.renderRetryCount = 0; // Reset für zukünftige Versuche
                return;
            }

            this.renderRetryCount++;
            this.warn(`Kalender-Layout noch nicht bereit (Versuch ${this.renderRetryCount}/${this.MAX_RENDER_RETRIES}), Rendering verschoben.`);

            // Exponentieller Backoff: 0ms, 100ms, 200ms, 400ms, 800ms, ...
            const delayMs = this.renderRetryCount <= 2 ? 0 : 100 * Math.pow(2, this.renderRetryCount - 3);
            this.scheduleRenderCalendar({ delayMs });
            return;
        }

        // Erfolgreiches Rendering - Reset Retry Counter
        this.renderRetryCount = 0;

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
        const isMissed = this.isDoorMissed(day);

        // Status-Klassen
        if (!isUnlocked) {
            door.classList.add('locked');

            if (isMissed) {
                // Verpasstes Türchen → spezielle Klasse und Label
                door.classList.add('missed');
                const nextYear = this.selectedYear + 1;
                door.setAttribute('aria-label', I18N.t('doorMissed', day, nextYear));
                door.setAttribute('aria-disabled', 'true');

                // Verpasst-Icon
                const missedIcon = document.createElement('div');
                missedIcon.className = 'missed-icon';
                missedIcon.setAttribute('aria-label', I18N.t('missedLabel'));
                missedIcon.setAttribute('role', 'img');
                missedIcon.innerHTML = '⏰';
                door.appendChild(missedIcon);
            } else {
                // Zukünftiges Türchen
                door.setAttribute('aria-label', I18N.t('doorLocked', day));
                door.setAttribute('aria-disabled', 'true');
            }
        } else if (isOpened) {
            door.classList.add('opened');
            door.setAttribute('aria-label', I18N.t('doorOpened', day));

            // Info-Icon für geöffnete Türchen
            const infoIcon = document.createElement('div');
            infoIcon.className = 'info-icon';
            infoIcon.setAttribute('aria-label', I18N.t('alreadyOpened'));
            infoIcon.setAttribute('role', 'img');
            infoIcon.innerHTML = 'ℹ️';
            door.appendChild(infoIcon);
        } else {
            door.setAttribute('aria-label', I18N.t('doorClickToOpen', day));
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
