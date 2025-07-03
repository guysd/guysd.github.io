// Modern vacation page functionality
console.log('🚀 Script chargé');

// Fonction principale pour mettre à jour le statut
function updateStatusIndicator() {
    console.log('🔄 updateStatusIndicator appelée');
    
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    
    if (!statusText || !statusDot) {
        console.error('❌ Éléments de statut non trouvés!');
        // Réessayer dans 500ms si les éléments ne sont pas encore dans le DOM
        setTimeout(updateStatusIndicator, 500);
        return;
    }
    
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const now = new Date();
    
    console.log('📅 Dates debug:', {
        now: now.toLocaleDateString('fr-FR'),
        vacationStart: vacationStart.toLocaleDateString('fr-FR'),
        vacationEnd: vacationEnd.toLocaleDateString('fr-FR')
    });
    
    if (now < vacationStart) {
        // Avant les vacances
        const daysUntil = Math.ceil((vacationStart - now) / (1000 * 60 * 60 * 24));
        statusText.textContent = `Départ dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
        statusDot.style.background = '#ffd93d';
        statusDot.style.boxShadow = '0 0 15px rgba(255, 217, 61, 0.5)';
        console.log(`🟡 Status: Avant vacances - ${daysUntil} jours restants`);
        
    } else if (now >= vacationStart && now <= vacationEnd) {
        // Pendant les vacances
        const daysElapsed = Math.floor((now - vacationStart) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
        const daysRemaining = totalDays - daysElapsed;
        
        if (daysRemaining > 0) {
            statusText.textContent = `En vacances (${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''})`;
        } else {
            statusText.textContent = 'En vacances (dernier jour)';
        }
        statusDot.style.background = '#ff6b6b';
        statusDot.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.5)';
        console.log(`🔴 Status: En vacances - ${daysRemaining} jours restants`);
        
    } else {
        // Après les vacances
        const daysAfter = Math.floor((now - vacationEnd) / (1000 * 60 * 60 * 24));
        if (daysAfter === 0) {
            statusText.textContent = 'De retour aujourd\'hui !';
        } else if (daysAfter === 1) {
            statusText.textContent = 'De retour depuis hier';
        } else {
            statusText.textContent = `De retour depuis ${daysAfter} jours`;
        }
        statusDot.style.background = '#4ecdc4';
        statusDot.style.boxShadow = '0 0 15px rgba(78, 205, 196, 0.5)';
        console.log(`🟢 Status: De retour depuis ${daysAfter} jours`);
    }
    
    console.log('✅ Statut mis à jour:', statusText.textContent);
}

// Fonction pour forcer la mise à jour (bouton debug)
function forceUpdateStatus() {
    console.log('🔄 Mise à jour forcée via bouton debug');
    updateStatusIndicator();
}

// Chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Content Loaded');
    
    // Mise à jour immédiate du statut
    updateStatusIndicator();
    
    // Fonctions principales
    updateVacationProgress();
    updateDaysCount();
    
    // Envoyer la notification de visite de manière sécurisée
    sendSecureNotification();
    
    // Mise à jour périodique (toutes les heures)
    setInterval(() => {
        updateVacationProgress();
        updateStatusIndicator();
    }, 3600000);
    setInterval(updateDaysCount, 86400000);
});

// Si le DOM est déjà chargé au moment où le script s'exécute
if (document.readyState !== 'loading') {
    console.log('✅ DOM déjà prêt, mise à jour immédiate');
    updateStatusIndicator();
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
