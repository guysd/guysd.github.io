// Modern vacation page functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page chargée, initialisation...');
    
    // Attendre que tous les éléments soient prêts
    setTimeout(() => {
        console.log('⏰ Mise à jour du statut...');
        updateStatusIndicator(); // PRIORITÉ : mettre à jour le statut en premier
        updateVacationProgress();
        updateDaysCount();
    }, 100); // Petit délai pour s'assurer que le DOM est prêt
    
    // Envoyer la notification de visite de manière sécurisée
    sendSecureNotification();
    
    // Update progress every hour
    setInterval(() => {
        updateVacationProgress();
        updateStatusIndicator();
    }, 3600000);
    setInterval(updateDaysCount, 86400000); // Update daily
});

// Fonction d'initialisation immédiate (si DOMContentLoaded a déjà eu lieu)
if (document.readyState === 'loading') {
    // Le DOM n'est pas encore chargé
    console.log('⏳ En attente du chargement du DOM...');
} else {
    // Le DOM est déjà chargé
    console.log('✅ DOM déjà chargé, initialisation immédiate...');
    setTimeout(() => {
        updateStatusIndicator();
        updateVacationProgress();
        updateDaysCount();
    }, 50);
}

// Envoyer notification via Formspree (compatible GitHub Pages)
async function sendSecureNotification() {
    try {
        const now = new Date();
        const visitData = {
            email: 'dvdgsn@gmail.com',
            subject: '🏖️ Nouvelle visite sur votre page de vacances',
            message: `Nouvelle visite détectée le ${now.toLocaleString('fr-FR')}`,
            visitTime: now.toLocaleString('fr-FR'),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
            pageUrl: window.location.href
        };

        // Formspree endpoint - Remplacez YOUR_FORM_ID par votre vrai ID
        const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';

        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitData)
        });

        if (response.ok) {
            console.log('✅ Notification envoyée avec succès');
        } else {
            console.log('⚠️ Erreur lors de l\'envoi de la notification');
        }
    } catch (error) {
        console.log('🔇 Notification désactivée ou erreur réseau');
        // Échec silencieux pour ne pas affecter l'expérience utilisateur
    }
}

// Calculate and update vacation progress
function updateVacationProgress() {
    const progressFill = document.getElementById('vacation-progress');
    const progressText = document.getElementById('progress-text');
    const progressPercentage = document.getElementById('progress-percentage');
    
    // Vacation dates
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const now = new Date();
    
    // Calculate progress
    const totalDuration = vacationEnd - vacationStart;
    const elapsed = now - vacationStart;
    let realProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    
    let statusText = '';
    let progressClass = '';
    
    if (now < vacationStart) {
        // Before vacation
        const daysUntil = Math.ceil((vacationStart - now) / (1000 * 60 * 60 * 24));
        statusText = `Départ dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
        realProgress = 0;
    } else if (now >= vacationStart && now <= vacationEnd) {
        // During vacation
        const daysElapsed = Math.floor((now - vacationStart) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
        const daysRemaining = totalDays - daysElapsed;
        statusText = `Jour ${daysElapsed + 1}/${totalDays} - ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`;
    } else {
        // After vacation
        const daysAfter = Math.floor((now - vacationEnd) / (1000 * 60 * 60 * 24));
        statusText = `De retour depuis ${daysAfter} jour${daysAfter > 1 ? 's' : ''}`;
        realProgress = 100;
    }
    
    // Animate progress bar
    let currentProgress = 0;
    const animateProgress = () => {
        if (currentProgress < realProgress) {
            currentProgress += 1;
            progressFill.style.width = currentProgress + '%';
            requestAnimationFrame(animateProgress);
        }
    };
    animateProgress();
    
    // Update text elements
    if (progressText) progressText.textContent = statusText;
    if (progressPercentage) progressPercentage.textContent = Math.round(realProgress) + '%';
}

// Update days count
function updateDaysCount() {
    const daysElement = document.getElementById('days-count');
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
    
    if (daysElement) {
        daysElement.textContent = totalDays;
    }
}

// Nouveau : Mettre à jour l'indicateur de statut dynamiquement
function updateStatusIndicator() {
    console.log('🔄 updateStatusIndicator appelée');
    
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    
    console.log('Éléments trouvés:', {
        statusText: !!statusText,
        statusDot: !!statusDot,
        statusTextContent: statusText ? statusText.textContent : 'null'
    });
    
    if (!statusText || !statusDot) {
        console.error('❌ Éléments de statut non trouvés!');
        // Réessayer dans 500ms
        setTimeout(updateStatusIndicator, 500);
        return;
    }
    
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const now = new Date();
    
    // Debug : afficher les dates dans la console
    console.log('📅 Dates debug:', {
        now: now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR'),
        vacationStart: vacationStart.toLocaleDateString('fr-FR'),
        vacationEnd: vacationEnd.toLocaleDateString('fr-FR'),
        beforeVacation: now < vacationStart,
        duringVacation: now >= vacationStart && now <= vacationEnd,
        afterVacation: now > vacationEnd
    });
    
    if (now < vacationStart) {
        // Avant les vacances
        const daysUntil = Math.ceil((vacationStart - now) / (1000 * 60 * 60 * 24));
        const newText = `Départ dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
        
        statusText.textContent = newText;
        statusDot.style.background = '#ffd93d'; // Jaune pour "bientôt absent"
        statusDot.style.boxShadow = '0 0 15px rgba(255, 217, 61, 0.5)';
        
        console.log(`🟡 Status: Avant vacances - ${daysUntil} jours restants`);
        console.log('Texte mis à jour:', newText);
        
    } else if (now >= vacationStart && now <= vacationEnd) {
        // Pendant les vacances
        const daysElapsed = Math.floor((now - vacationStart) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
        const daysRemaining = totalDays - daysElapsed;
        
        let newText;
        if (daysRemaining > 0) {
            newText = `En vacances (${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''})`;
        } else {
            newText = 'En vacances (dernier jour)';
        }
        
        statusText.textContent = newText;
        statusDot.style.background = '#ff6b6b'; // Rouge pour "absent"
        statusDot.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.5)';
        
        console.log(`🔴 Status: Pendant vacances - ${daysRemaining} jours restants`);
        console.log('Texte mis à jour:', newText);
        
    } else {
        // Après les vacances
        const daysAfter = Math.floor((now - vacationEnd) / (1000 * 60 * 60 * 24));
        let newText;
        
        if (daysAfter === 0) {
            newText = 'De retour aujourd\'hui !';
        } else if (daysAfter === 1) {
            newText = 'De retour depuis hier';
        } else {
            newText = `De retour depuis ${daysAfter} jours`;
        }
        
        statusText.textContent = newText;
        statusDot.style.background = '#4ecdc4'; // Vert pour "disponible"
        statusDot.style.boxShadow = '0 0 15px rgba(78, 205, 196, 0.5)';
        
        console.log(`🟢 Status: Après vacances - retour depuis ${daysAfter} jours`);
        console.log('Texte mis à jour:', newText);
    }
    
    console.log('✅ updateStatusIndicator terminée');
}

// Add some smooth scrolling effects
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simple scroll to sections (if they exist)
        const text = item.textContent.toLowerCase();
        let targetSection;
        
        if (text === 'statut') {
            targetSection = document.querySelector('.cards-section');
        } else if (text === 'retour') {
            targetSection = document.querySelector('.progress-section');
        }
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add some nice hover effects to cards
document.querySelectorAll('.card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Performance monitoring (simplified)
let lastTime = performance.now();
function monitorPerformance() {
    const currentTime = performance.now();
    const delta = currentTime - lastTime;
    lastTime = currentTime;
    
    // Only log if performance issues detected
    if (delta > 50) {
        console.log('Performance note: Frame took', Math.round(delta), 'ms');
    }
    
    requestAnimationFrame(monitorPerformance);
}

requestAnimationFrame(monitorPerformance);
