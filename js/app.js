// ========================================
// Monatskalender mit Türchen - Haupt-App
// ========================================

class CalendarApp {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.currentDay = new Date().getDate();
        this.selectedMonth = this.currentMonth;

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
        this.modalDay = document.getElementById('modal-day');
        this.toast = document.getElementById('toast');

        this.init();
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

        // ESC-Taste zum Schließen des Modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Lade gespeicherten Monat oder setze auf aktuellen Monat
        const savedMonth = this.loadSelectedMonth();
        if (savedMonth !== null) {
            this.selectedMonth = savedMonth;
            this.monthSelect.value = savedMonth;
        } else {
            this.monthSelect.value = this.currentMonth;
        }

        // Initiales Rendering
        this.renderCalendar();
    }

    // ========================================
    // Schaltjahr-Berechnung
    // ========================================

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // ========================================
    // Tage im Monat berechnen
    // ========================================

    getDaysInMonth(month, year) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (month === 1 && this.isLeapYear(year)) {
            return 29; // Februar in Schaltjahr
        }

        return daysInMonth[month];
    }

    // ========================================
    // Türchen-Status prüfen
    // ========================================

    isDoorUnlocked(day) {
        const selectedMonthDate = new Date(this.currentYear, this.selectedMonth, day);
        const today = new Date(this.currentYear, this.currentMonth, this.currentDay);

        // Setze Zeit auf Mitternacht für korrekten Vergleich
        selectedMonthDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        // Türchen ist freigeschaltet, wenn das Datum <= heute ist
        return selectedMonthDate <= today;
    }

    // ========================================
    // LocalStorage - Schlüssel generieren
    // ========================================

    getStorageKey(prefix) {
        return `calendar_${prefix}_${this.currentYear}_${this.selectedMonth}`;
    }

    // ========================================
    // Geöffnete Türchen laden/speichern
    // ========================================

    loadOpenedDoors() {
        const key = this.getStorageKey('opened');
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    saveOpenedDoor(day) {
        const opened = this.loadOpenedDoors();
        if (!opened.includes(day)) {
            opened.push(day);
            const key = this.getStorageKey('opened');
            localStorage.setItem(key, JSON.stringify(opened));
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
        const key = this.getStorageKey('quotes');
        const data = localStorage.getItem(key);

        if (data) {
            return JSON.parse(data);
        }

        // Erstelle neue Zuordnung, falls keine existiert
        const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.currentYear);
        const mapping = generateQuoteMapping(daysInMonth);
        this.saveQuoteMapping(mapping);
        return mapping;
    }

    saveQuoteMapping(mapping) {
        const key = this.getStorageKey('quotes');
        localStorage.setItem(key, JSON.stringify(mapping));
    }

    getQuoteForDay(day) {
        const mapping = this.loadQuoteMapping();
        return mapping[day - 1] || "Heute ist dein Tag!";
    }

    // ========================================
    // Ausgewählten Monat laden/speichern
    // ========================================

    loadSelectedMonth() {
        const data = localStorage.getItem('calendar_selected_month');
        return data ? parseInt(data, 10) : null;
    }

    saveSelectedMonth(month) {
        localStorage.setItem('calendar_selected_month', month.toString());
    }

    // ========================================
    // Monatswechsel-Handler
    // ========================================

    handleMonthChange(e) {
        this.selectedMonth = parseInt(e.target.value, 10);
        this.saveSelectedMonth(this.selectedMonth);
        this.renderCalendar();

        // Sanfte Animation
        this.calendarGrid.style.opacity = '0';
        setTimeout(() => {
            this.calendarGrid.style.opacity = '1';
        }, 150);
    }

    // ========================================
    // Shuffle-Handler
    // ========================================

    handleShuffle() {
        const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.currentYear);
        const newMapping = generateQuoteMapping(daysInMonth);
        this.saveQuoteMapping(newMapping);

        // Animation für Button
        this.shuffleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.shuffleBtn.style.transform = 'rotate(0deg)';
        }, 300);

        // Toast-Nachricht
        this.showToast('Sprüche wurden neu gemischt!');

        // Kalender neu rendern (nur für bereits geöffnete Türchen relevant)
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
        }, 3000);
    }

    // ========================================
    // Türchen-Click-Handler
    // ========================================

    handleDoorClick(day) {
        if (!this.isDoorUnlocked(day)) {
            // Gesperrtes Türchen
            const unlockDate = new Date(this.currentYear, this.selectedMonth, day);
            const formattedDate = unlockDate.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            this.showToast(`Dieses Türchen öffnet sich am ${formattedDate}`);

            // Shake-Animation
            const doorElement = document.querySelector(`[data-day="${day}"]`);
            if (doorElement) {
                doorElement.classList.add('shake');
                setTimeout(() => {
                    doorElement.classList.remove('shake');
                }, 300);
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
    // Modal mit Spruch anzeigen
    // ========================================

    showQuoteModal(day) {
        const quote = this.getQuoteForDay(day);
        const monthName = this.monthNames[this.selectedMonth];

        this.quoteText.textContent = quote;
        this.modalDay.textContent = `${day}. ${monthName} ${this.currentYear}`;

        this.modal.classList.add('active');

        // Accessibility: Focus auf Modal setzen
        this.modalClose.focus();
    }

    // ========================================
    // Modal schließen
    // ========================================

    closeModal() {
        this.modal.classList.remove('active');
    }

    // ========================================
    // Kalender rendern
    // ========================================

    renderCalendar() {
        // Monatstitel aktualisieren
        const monthName = this.monthNames[this.selectedMonth];
        this.currentMonthYear.textContent = `${monthName} ${this.currentYear}`;

        // Hintergrund-Illustration aktualisieren
        const illustrationPath = `assets/months/${this.monthIllustrations[this.selectedMonth]}`;
        this.monthIllustration.style.backgroundImage = `url('${illustrationPath}')`;

        // Anzahl Tage im ausgewählten Monat
        const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.currentYear);

        // Grid leeren
        this.calendarGrid.innerHTML = '';

        // Türchen erstellen
        for (let day = 1; day <= daysInMonth; day++) {
            const door = this.createDoorElement(day);
            this.calendarGrid.appendChild(door);
        }
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

        // Event Listener
        door.addEventListener('click', () => this.handleDoorClick(day));

        // Tastatur-Unterstützung
        door.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleDoorClick(day);
            }
        });

        return door;
    }
}

// ========================================
// App initialisieren, wenn DOM geladen ist
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp();
});
