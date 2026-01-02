# Android Asset Links Configuration

## Wichtig: Google Play Store Integration

Die Datei `assetlinks.json` in diesem Ordner ist für die Verifizierung der App-Identität im Google Play Store erforderlich.

### ⚠️ KRITISCHER SCHRITT nach dem ersten PWABuilder-Build:

**Der `sha256_cert_fingerprints` in der `assetlinks.json` muss nach dem ersten Build im PWABuilder durch den echten Google Play Signing Key ersetzt werden!**

### Anleitung:

1. **Erster Build in PWABuilder:**
   - Exportieren Sie die Android-App über PWABuilder
   - PWABuilder generiert ein signiertes APK/AAB-Paket

2. **Fingerprint aus Google Play Console abrufen:**
   - Melden Sie sich in der [Google Play Console](https://play.google.com/console) an
   - Navigieren Sie zu: **App-Integrität → App-Signierung**
   - Kopieren Sie den **SHA-256 Zertifikats-Fingerprint**
   - Format: `XX:XX:XX:XX:...` (mit Doppelpunkten)

3. **assetlinks.json aktualisieren:**
   - Ersetzen Sie `"REPLACE_WITH_YOUR_SHA256_FINGERPRINT"` in der `assetlinks.json`
   - Mit dem kopierten SHA-256 Fingerprint (ohne Doppelpunkte!)
   - Beispiel: `"14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"`
   - Wird zu: `"146DE983C5730650D8EEB9952F34FC6416A08342E61DBEA88A0496B23FCF44E5"`

4. **Deployment:**
   - Committen und pushen Sie die aktualisierte `assetlinks.json`
   - Stellen Sie sicher, dass die Datei unter `https://ihr-domain.com/.well-known/assetlinks.json` erreichbar ist

### Verifikation:

Sie können die korrekte Konfiguration mit dem [Statement List Generator and Tester](https://developers.google.com/digital-asset-links/tools/generator) von Google überprüfen.

### Wichtige Hinweise:

- Die Domain in der `assetlinks.json` muss mit der `start_url` im `manifest.json` übereinstimmen
- Der `package_name` muss mit dem in der Google Play Console registrierten Package-Namen übereinstimmen
- Ohne korrekten Fingerprint werden Android App Links nicht funktionieren

## Weitere Informationen:

- [Android App Links Documentation](https://developer.android.com/training/app-links)
- [PWABuilder Documentation](https://docs.pwabuilder.com/)
