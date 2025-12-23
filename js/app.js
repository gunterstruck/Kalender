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
            SHAKE_DURATION: 300                // Shake-Animation in ms
        };

        // Monatsnamen
        this.monthNames = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];

        // Monats-Illustrationen
        this.monthIllustrations = [
            'january.svg', 'february.svg', 'march.svg', 'april.svg',
            'may.svg', 'june.svg', 'july.svg', 'august.svg',
            'september.svg', 'october.svg', 'november.svg', 'december.svg'
        ];

        // DOM-Elemente Cache für Performance
        this.doorElements = new Map();

        // DOM-Elemente
        this.monthSelect = document.getElementById('month-select');
        this.currentMonthYear = document.getElementById('current-month-year');
        this.calendarGrid = document.getElementById('calendar-grid');
        this.monthIllustration = document.getElementById('month-illustration');
        this.shuffleBtn = document.getElementById('shuffle-btn');
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
        this.shuffleBtn.addEventListener('click', () => this.handleShuffle());
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalBackdrop.addEventListener('click', () => this.closeModal());

        // Event Delegation für Türchen-Klicks (verhindert Memory Leaks)
        this.calendarGrid.addEventListener('click', (e) => {
            const door = e.target.closest('.door');
            if (door) {
                const day = parseInt(door.getAttribute('data-day'), 10);
                if (!isNaN(day)) {
                    this.handleDoorClick(day);
                }
            }
        });

        // Event Delegation für Keyboard Navigation
        this.calendarGrid.addEventListener('keydown', (e) => {
            const door = e.target.closest('.door');
            if (door && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const day = parseInt(door.getAttribute('data-day'), 10);
                if (!isNaN(day)) {
                    this.handleDoorClick(day);
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

        // Initiales Rendering
        this.renderCalendar();

        // Prüfe täglich um Mitternacht, ob ein neuer Tag/Jahr begonnen hat
        this.startDateChangeDetection();
    }

    // ========================================
    // Datumswechsel-Erkennung
    // ========================================

    startDateChangeDetection() {
        // Speichere das aktuelle Jahr beim Start
        this.lastKnownYear = this.currentYear;
        this.lastKnownDay = this.currentDay;

        // Prüfe jede Minute, ob sich das Datum geändert hat
        this.dateCheckInterval = setInterval(() => {
            const newYear = this.currentYear;
            const newDay = this.currentDay;

            // Wenn sich das Jahr geändert hat
            if (newYear !== this.lastKnownYear) {
                console.log(`Jahr gewechselt von ${this.lastKnownYear} zu ${newYear}`);
                this.lastKnownYear = newYear;

                // Aktualisiere auf den aktuellen Monat und das neue Jahr
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
    // Tage im Monat berechnen
    // Native Date-Methode nutzt automatisch Schaltjahr-Logik
    // ========================================

    getDaysInMonth(month = this.selectedMonth, year = this.selectedYear) {
        // Tag 0 des nächsten Monats = letzter Tag des aktuellen Monats
        return new Date(year, month + 1, 0).getDate();
    }

    // ========================================
    // Türchen-Status prüfen
    // ========================================

    isDoorUnlocked(day) {
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
    // Spruch-Zuordnung laden/speichern
    // ========================================

    loadQuoteMapping() {
        if (!this.storageAvailable) {
            // Fallback: Generiere temporäres Mapping
            const daysInMonth = this.getDaysInMonth();
            return generateQuoteMapping(daysInMonth);
        }

        try {
            const key = this.getStorageKey('quotes');
            const data = localStorage.getItem(key);

            if (data) {
                return JSON.parse(data);
            }

            // Erstelle neue Zuordnung, falls keine existiert
            const daysInMonth = this.getDaysInMonth();
            const mapping = generateQuoteMapping(daysInMonth);
            this.saveQuoteMapping(mapping);
            return mapping;
        } catch (error) {
            console.error('Fehler beim Laden der Zitate:', error);
            const daysInMonth = this.getDaysInMonth();
            return generateQuoteMapping(daysInMonth);
        }
    }

    saveQuoteMapping(mapping) {
        if (!this.storageAvailable) return;

        try {
            const key = this.getStorageKey('quotes');
            localStorage.setItem(key, JSON.stringify(mapping));
        } catch (error) {
            console.error('Fehler beim Speichern der Zitate:', error);
        }
    }

    getQuoteForDay(day) {
        const mapping = this.loadQuoteMapping();
        const quote = mapping[day - 1];

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
            const daysInMonth = this.getDaysInMonth();
            return this.generateDoorPositions(daysInMonth);
        }

        try {
            const key = this.getStorageKey('positions');
            const data = localStorage.getItem(key);

            if (data) {
                return JSON.parse(data);
            }

            // Erstelle neue Positionen, falls keine existieren
            const daysInMonth = this.getDaysInMonth();
            const positions = this.generateDoorPositions(daysInMonth);
            this.saveDoorPositions(positions);
            return positions;
        } catch (error) {
            console.error('Fehler beim Laden der Positionen:', error);
            const daysInMonth = this.getDaysInMonth();
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

            // Speichere Position (auch wenn nicht perfekt, nach max. Versuchen)
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
            return data ? parseInt(data, 10) : null;
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
    // Shuffle-Handler
    // ========================================

    handleShuffle() {
        const daysInMonth = this.getDaysInMonth();
        const newMapping = generateQuoteMapping(daysInMonth);
        this.saveQuoteMapping(newMapping);

        // Neue Positionen generieren
        const newPositions = this.generateDoorPositions(daysInMonth);
        this.saveDoorPositions(newPositions);

        // Animation für Button
        this.shuffleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.shuffleBtn.style.transform = 'rotate(0deg)';
        }, this.CONFIG.SHUFFLE_ANIMATION_DURATION);

        // Toast-Nachricht
        this.showToast('Sprüche und Positionen wurden neu gemischt!');

        // Kalender neu rendern
        this.renderCalendar();
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
            const formattedDate = unlockDate.toLocaleDateString('de-DE', {
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
        const daysInMonth = this.getDaysInMonth();
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
        // Monatstitel aktualisieren
        const monthName = this.monthNames[this.selectedMonth];
        this.currentMonthYear.textContent = `${monthName} ${this.selectedYear}`;

        // Hintergrund-Illustration aktualisieren
        const illustrationPath = `assets/months/${this.monthIllustrations[this.selectedMonth]}`;
        this.monthIllustration.style.backgroundImage = `url('${illustrationPath}')`;

        // Anzahl Tage im ausgewählten Monat
        const daysInMonth = this.getDaysInMonth();

        // Grid leeren und Cache zurücksetzen
        this.calendarGrid.innerHTML = '';
        this.doorElements.clear();

        // Türchen erstellen
        for (let day = 1; day <= daysInMonth; day++) {
            const door = this.createDoorElement(day);
            this.calendarGrid.appendChild(door);
        }

        // Info-Banner aktualisieren
        this.updateInfoBanner();
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

        // Event Listener werden via Event Delegation im calendarGrid gehandelt (init Methode)
        // Keine direkten Listener mehr nötig → verhindert Memory Leaks

        // Speichere Referenz für Performance
        this.doorElements.set(day, door);

        return door;
    }
}

// ========================================
// App initialisieren, wenn DOM geladen ist
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp();
});
