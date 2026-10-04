/**
 * Anonyme Nutzungszählung – zeigt nur, OB der Kalender genutzt wird.
 *
 * Gezählt werden ausschließlich Seitenaufrufe über Vercel Web Analytics:
 * ohne Cookies, ohne Kennung auf dem Gerät, ohne Konto. Der Kalender schickt
 * keine eigenen Ereignisse (kein „Türchen geöffnet", kein „Zitat geteilt").
 *
 * Bewusst eng:
 *  - nur auf der Produktionsadresse (keine Vorschauen, keine lokale Entwicklung),
 *  - nicht bei „Do Not Track" oder Global Privacy Control,
 *  - nicht eingebettet (iframe),
 *  - gemeldet wird nur Ursprung + Pfad, ohne Suchteil und Fragment.
 */
(function () {
    'use strict';

    var HOSTS = ['kalender356.vercel.app'];
    var SCRIPT_SRC = '/_vercel/insights/script.js';

    function shouldCount(opts) {
        if (!opts.hostname || HOSTS.indexOf(opts.hostname) === -1) return false;
        if (opts.embedded) return false;
        if (opts.globalPrivacyControl === true) return false;
        if (opts.doNotTrack === '1' || opts.doNotTrack === 'yes') return false;
        return true;
    }

    function trimEvent(event) {
        if (!event || event.type !== 'pageview') return null;
        try {
            var url = new URL(event.url);
            return Object.assign({}, event, { url: url.origin + url.pathname });
        } catch (e) {
            return null;
        }
    }

    // Für Tests und zur Nachvollziehbarkeit erreichbar, ohne etwas auszulösen.
    window.kalenderUsageCount = { shouldCount: shouldCount, trimEvent: trimEvent, hosts: HOSTS };

    var nav = window.navigator || {};
    var embedded = false;
    try { embedded = window.self !== window.top; } catch (e) { embedded = true; }
    var ok = shouldCount({
        hostname: window.location && window.location.hostname,
        doNotTrack: nav.doNotTrack != null ? nav.doNotTrack : window.doNotTrack,
        globalPrivacyControl: nav.globalPrivacyControl,
        embedded: embedded
    });
    if (!ok) return;

    // Warteschlange nach Vercel-Vorgabe: Aufrufe vor dem Laden des Skripts
    // werden gesammelt und danach abgearbeitet.
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    window.va('beforeSend', trimEvent);
    var script = document.createElement('script');
    script.defer = true;
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
})();
