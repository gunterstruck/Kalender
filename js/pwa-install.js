// ========================================
// PWA Installation & Error Handling
// ========================================

// Global Error Handler
window.addEventListener('error', (event) => {
    console.error('Unerwarteter Fehler:', event.error);
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = '⚠️ Ein Fehler ist aufgetreten. Bitte lade die Seite neu.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unbehandeltes Promise:', event.reason);
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js', { scope: './' })
            .then(registration => {
                console.log('Service Worker registriert:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker Registrierung fehlgeschlagen:', error);
            });
    });
}

// ========================================
// PWA Install Prompt Logic
// ========================================

let deferredPrompt = null;
let installPrompt = null;
let installButton = null;
let installDismiss = null;

// Initialisierung nach DOM-Load
document.addEventListener('DOMContentLoaded', () => {
    installPrompt = document.getElementById('install-prompt');
    installButton = document.getElementById('install-button');
    installDismiss = document.getElementById('install-dismiss');

    setupInstallPrompt();
});

function setupInstallPrompt() {
    // Erfasse beforeinstallprompt Event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('[PWA] beforeinstallprompt Event erfasst');
        // Verhindere automatisches Anzeigen des Browser-Prompts
        e.preventDefault();
        // Speichere Event für späteren Aufruf
        deferredPrompt = e;
        // Zeige eigenen Install Prompt
        showInstallPrompt();
    });

    // Install Button Click Handler
    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) {
                console.log('[PWA] Kein deferred prompt verfügbar');
                return;
            }

            // Zeige Browser Install Prompt
            deferredPrompt.prompt();

            // Warte auf User-Entscheidung
            const { outcome } = await deferredPrompt.userChoice;
            console.log('[PWA] User choice:', outcome);

            if (outcome === 'accepted') {
                console.log('[PWA] Installation akzeptiert');
            }

            // Deferred Prompt kann nur einmal verwendet werden
            deferredPrompt = null;
            hideInstallPrompt();
        });
    }

    // Dismiss Button Click Handler
    if (installDismiss) {
        installDismiss.addEventListener('click', () => {
            hideInstallPrompt();
        });
    }

    // Wenn App installiert wird
    window.addEventListener('appinstalled', () => {
        console.log('[PWA] App wurde installiert');
        try {
            if (canUseStorage()) {
                localStorage.setItem('pwa_installed', 'true');
            }
        } catch (error) {
            console.warn('[PWA] localStorage nicht verfügbar:', error);
        }
        hideInstallPrompt();
    });

    // Zeige Install Prompt bei jedem Laden (wenn nicht installiert)
    window.addEventListener('load', () => {
        // Kurze Verzögerung damit der User die Seite erst sieht
        setTimeout(() => {
            if (deferredPrompt && !isAppInstalled()) {
                showInstallPrompt();
            }
        }, 2000);
    });
}

function canUseStorage() {
    try {
        const storageTestKey = '__pwa_storage_test__';
        localStorage.setItem(storageTestKey, '1');
        localStorage.removeItem(storageTestKey);
        return true;
    } catch (error) {
        console.warn('[PWA] localStorage nicht verfügbar:', error);
        return false;
    }
}

// Prüfe ob die App bereits installiert ist
function isAppInstalled() {
    // Prüfe ob die App im standalone mode läuft
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
    }
    // Prüfe localStorage Flag
    if (!canUseStorage()) {
        return false;
    }
    return localStorage.getItem('pwa_installed') === 'true';
}

// Zeige Install Prompt
function showInstallPrompt() {
    if (installPrompt && !isAppInstalled()) {
        installPrompt.classList.remove('is-hidden');
        // Sanfte Einblendung
        setTimeout(() => {
            installPrompt.classList.add('show');
        }, 100);
    }
}

// Verstecke Install Prompt
function hideInstallPrompt() {
    if (installPrompt) {
        installPrompt.classList.remove('show');
        setTimeout(() => {
            installPrompt.classList.add('is-hidden');
        }, 300);
    }
}
