# Configuration d'EmailJS pour notifications automatiques

## 📧 Étapes de configuration

### 1. Créer un compte EmailJS
1. Allez sur [EmailJS.com](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Confirmez votre email

### 2. Configurer un service email
1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Ajoutez un nouveau service (Gmail, Outlook, etc.)
3. Suivez les instructions pour connecter votre compte email
4. Notez le **Service ID** généré

### 3. Créer un template d'email
1. Allez dans "Email Templates"
2. Créez un nouveau template
3. Utilisez ce contenu :

```
Subject: 🏖️ Nouvelle visite sur votre page de vacances

Bonjour,

Une nouvelle visite a été enregistrée sur votre page de vacances !

📅 Heure de visite : {{visit_time}}
🌐 URL de la page : {{page_url}}
🔗 Référent : {{referrer}}
💻 Navigateur : {{user_agent}}

Message : {{message}}

Bon repos ! 🌴
```

4. Notez le **Template ID** généré

### 4. Obtenir votre clé publique
1. Allez dans "Account" > "General"
2. Trouvez votre **Public Key**

### 5. Mettre à jour le code
Dans le fichier `script.js`, remplacez :
```javascript
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Remplacez par votre clé publique
const SERVICE_ID = 'YOUR_SERVICE_ID'; // Remplacez par votre Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Remplacez par votre Template ID
```

## 🔧 Alternatives sans EmailJS

### Option 1: Webhook simple
```javascript
// Envoyer une notification via webhook
fetch('https://your-webhook-url.com/notify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'dvdgsn@gmail.com',
        message: 'Nouvelle visite sur la page de vacances',
        timestamp: new Date().toISOString()
    })
});
```

### Option 2: Service tiers comme Netlify Forms
Si vous hébergez sur Netlify, vous pouvez utiliser leurs formulaires avec notifications.

### Option 3: Google Apps Script
Créer un script Google Apps Script qui reçoit les données et envoie l'email.

## 🚨 Important - Sécurité

- ⚠️ N'exposez jamais vos clés privées dans le code frontend
- ✅ EmailJS utilise des clés publiques sécurisées
- ✅ Configurez des restrictions de domaine dans EmailJS
- ✅ Limitez le nombre d'emails par jour/heure

## 🧪 Test

Pour tester l'envoi d'email :
1. Ouvrez la console de votre navigateur (F12)
2. Rechargez la page
3. Vérifiez les messages dans la console
4. Vérifiez votre boîte email

## 💡 Conseils

- Utilisez un email dédié pour les notifications
- Configurez des filtres dans votre boîte email
- Pensez à vérifier les spams
- Testez d'abord avec un template simple
