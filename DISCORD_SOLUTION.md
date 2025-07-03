# Alternative Discord pour GitHub Pages

## 🤖 Solution Discord Webhook (Gratuite et Illimitée)

Si vous préférez recevoir les notifications sur Discord plutôt que par email :

### 1. Créer un webhook Discord :
1. Ouvrez votre serveur Discord
2. Paramètres du salon → Intégrations → Webhooks
3. Créer un webhook
4. Copier l'URL du webhook

### 2. Remplacer dans script.js :
```javascript
// Notification Discord au lieu d'email
async function sendDiscordNotification() {
    try {
        const now = new Date();
        const webhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL';
        
        const embed = {
            title: "🏖️ Nouvelle visite sur votre page de vacances",
            color: 0x00ff00,
            fields: [
                { name: "📅 Heure", value: now.toLocaleString('fr-FR'), inline: true },
                { name: "🌐 URL", value: window.location.href, inline: true },
                { name: "🔗 Référent", value: document.referrer || 'Direct', inline: true },
                { name: "💻 Navigateur", value: navigator.userAgent.substring(0, 50) + '...', inline: false }
            ],
            timestamp: now.toISOString(),
            footer: { text: "Page de vacances - Monitoring" }
        };

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: "📊 Nouvelle activité détectée !",
                embeds: [embed]
            })
        });
        
        console.log('✅ Notification Discord envoyée');
    } catch (error) {
        console.log('🔇 Notification Discord désactivée');
    }
}
```

### 3. Mettre à jour l'appel dans script.js :
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Choisir entre email (Formspree) ou Discord
    sendSecureNotification(); // Pour email
    // sendDiscordNotification(); // Pour Discord
    
    updateVacationProgress();
    updateDaysCount();
    
    setInterval(updateVacationProgress, 3600000);
    setInterval(updateDaysCount, 86400000);
});
```

## 💡 Avantages Discord :
- ✅ **Gratuit et illimité**
- ✅ **Notifications instantanées**
- ✅ **Formatage riche** (embeds colorés)
- ✅ **Historique permanent**
- ✅ **Notifications mobiles**

## 🔔 Slack Alternative :
Même principe avec Slack Incoming Webhooks pour les environnements professionnels.

Quelle solution préférez-vous ?
