// ========================================
// i18n DOM-Übersetzung
// Wird nach i18n.js geladen, vor app.js
// ========================================

// Setze HTML-Sprache dynamisch basierend auf Browser-Sprache
document.documentElement.lang = I18N.getLang() === 'de' ? 'de' : 'en';

// Übersetze statische HTML-Elemente sobald DOM bereit ist
document.addEventListener('DOMContentLoaded', () => {
    // Titel
    document.title = I18N.t('appTitle');
    document.querySelector('.app-header h1').textContent = I18N.t('appTitle');
    document.querySelector('.subtitle').textContent = I18N.t('appSubtitle');

    // Loading-Spinner (möglicherweise schon weg, aber sicherheitshalber)
    const spinnerText = document.querySelector('#loading-spinner p');
    if (spinnerText) spinnerText.textContent = I18N.t('loading');

    // Theme Toggle
    document.querySelector('#theme-toggle').setAttribute('aria-label', I18N.t('themeToggle'));

    // Calendar Grid
    document.querySelector('#calendar-grid').setAttribute('aria-label', I18N.t('calendarGrid'));
    document.querySelector('label[for="month-select"]').textContent = I18N.t('selectMonth');
    document.querySelector('#month-select').setAttribute('aria-label', I18N.t('selectMonth'));

    // Modal
    document.querySelector('#modal-title').textContent = I18N.t('modalTitle');
    document.querySelector('#quote-link-title').textContent = I18N.t('learnMore');
    document.querySelector('#modal-close').setAttribute('aria-label', I18N.t('close'));

    // PWA Install Prompt
    document.querySelector('.install-prompt-text h3').textContent = I18N.t('installTitle');
    document.querySelector('.install-prompt-text p').textContent = I18N.t('installMessage');
    document.querySelector('#install-button').textContent = I18N.t('installButton');
    document.querySelector('#install-dismiss').setAttribute('aria-label', I18N.t('close'));

    // Footer-Links
    const footerLinks = document.querySelectorAll('.app-footer nav a');
    if (footerLinks.length >= 2) {
        footerLinks[0].textContent = I18N.t('imprint');
        footerLinks[1].textContent = I18N.t('privacy');
    }

    // Meta description
    if (I18N.getLang() === 'en') {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Discover a new historical piece of wisdom every day with the Monthly Door Calendar. This Progressive Web App offers monthly doors in advent calendar style with inspiring quotes from famous personalities.');
        }

        // Apple/PWA App-Name
        const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
        if (appleMeta) appleMeta.setAttribute('content', 'Door Calendar');

        const appNameMeta = document.querySelector('meta[name="application-name"]');
        if (appNameMeta) appNameMeta.setAttribute('content', 'Door Calendar');
    }
});
