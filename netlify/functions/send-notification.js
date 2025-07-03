// Fonction Netlify pour envoyer des notifications sécurisées
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Vérifier la méthode HTTP
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Vérifier l'origine de la requête (optionnel)
    const allowedOrigins = ['https://votre-domaine.com', 'https://votre-domaine.netlify.app'];
    const origin = event.headers.origin;
    
    if (!allowedOrigins.includes(origin)) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Origin not allowed' })
        };
    }

    try {
        // Parser les données reçues
        const { visitTime, userAgent, referrer, pageUrl } = JSON.parse(event.body);
        
        // Configuration du transporteur email (variables d'environnement)
        const transporter = nodemailer.createTransporter({
            service: 'gmail', // ou votre service préféré
            auth: {
                user: process.env.EMAIL_USER, // Variable d'environnement
                pass: process.env.EMAIL_PASS  // Variable d'environnement
            }
        });

        // Configuration de l'email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'dvdgsn@gmail.com',
            subject: '🏖️ Nouvelle visite sur votre page de vacances',
            html: `
                <h2>🏖️ Nouvelle visite détectée</h2>
                <p><strong>📅 Heure :</strong> ${visitTime}</p>
                <p><strong>🌐 URL :</strong> ${pageUrl}</p>
                <p><strong>🔗 Référent :</strong> ${referrer || 'Direct'}</p>
                <p><strong>💻 Navigateur :</strong> ${userAgent}</p>
                <br>
                <p>Bon repos ! 🌴</p>
            `
        };

        // Envoyer l'email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Email envoyé avec succès' 
            })
        };

    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Erreur lors de l\'envoi de l\'email' 
            })
        };
    }
};
