// Page de vacances - Script optimisé pour GitHub Pages
console.log('🚀 Script chargé');

// Fonction principale de mise à jour du statut
function updateStatus() {
    console.log('🔄 Mise à jour du statut...');
    
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    
    if (!statusText || !statusDot) {
        console.error('❌ Éléments de statut non trouvés');
        return;
    }
    
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const now = new Date();
    
    console.log('📅 Dates:', {
        maintenant: now.toLocaleDateString('fr-FR'),
        debutVacances: vacationStart.toLocaleDateString('fr-FR'),
        finVacances: vacationEnd.toLocaleDateString('fr-FR')
    });
    
    if (now < vacationStart) {
        // Avant les vacances - JAUNE
        const daysUntil = Math.ceil((vacationStart - now) / (1000 * 60 * 60 * 24));
        statusText.textContent = `Départ dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
        statusDot.style.background = '#ffd93d';
        statusDot.style.boxShadow = '0 0 15px rgba(255, 217, 61, 0.5)';
        console.log(`🟡 Avant vacances: ${daysUntil} jour(s)`);
        
    } else if (now >= vacationStart && now <= vacationEnd) {
        // Pendant les vacances - ROUGE
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
        console.log(`🔴 En vacances: ${daysRemaining} jour(s) restant(s)`);
        
    } else {
        // Après les vacances - VERT
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
        console.log(`🟢 Après vacances: ${daysAfter} jour(s)`);
    }
    
    console.log('✅ Statut mis à jour:', statusText.textContent);
}

// Fonction de mise à jour de la progression des vacances
function updateVacationProgress() {
    const progressFill = document.getElementById('vacation-progress');
    const progressText = document.getElementById('progress-text');
    const progressPercentage = document.getElementById('progress-percentage');
    
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const now = new Date();
    
    const totalDuration = vacationEnd - vacationStart;
    const elapsed = now - vacationStart;
    let realProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    
    let statusText = '';
    
    if (now < vacationStart) {
        const daysUntil = Math.ceil((vacationStart - now) / (1000 * 60 * 60 * 24));
        statusText = `Départ dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
        realProgress = 0;
    } else if (now >= vacationStart && now <= vacationEnd) {
        const daysElapsed = Math.floor((now - vacationStart) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
        const daysRemaining = totalDays - daysElapsed;
        statusText = `Jour ${daysElapsed + 1}/${totalDays} - ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`;
    } else {
        const daysAfter = Math.floor((now - vacationEnd) / (1000 * 60 * 60 * 24));
        statusText = `De retour depuis ${daysAfter} jour${daysAfter > 1 ? 's' : ''}`;
        realProgress = 100;
    }
    
    // Animation de la barre de progression
    if (progressFill) {
        progressFill.style.width = realProgress + '%';
    }
    
    if (progressText) progressText.textContent = statusText;
    if (progressPercentage) progressPercentage.textContent = Math.round(realProgress) + '%';
}

// Fonction de mise à jour du nombre de jours
function updateDaysCount() {
    const daysElement = document.getElementById('days-count');
    const vacationStart = new Date('2025-07-04');
    const vacationEnd = new Date('2025-08-04');
    const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
    
    if (daysElement) {
        daysElement.textContent = totalDays;
    }
}

// Notification simple (optionnelle)
function sendNotification() {
    // Fonction simplifiée - peut être activée plus tard avec Formspree
    console.log('📧 Notification désactivée (configurer Formspree si nécessaire)');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM chargé, initialisation...');
    
    // Mettre à jour immédiatement
    updateStatus();
    updateVacationProgress();
    updateDaysCount();
    
    // Notification (optionnelle)
    sendNotification();
    
    // Mise à jour automatique toutes les heures
    setInterval(function() {
        updateStatus();
        updateVacationProgress();
    }, 3600000); // 1 heure
    
    // Mise à jour quotidienne du nombre de jours
    setInterval(updateDaysCount, 86400000); // 24 heures
});

// Fonction de débogage (optionnelle)
function testStatus() {
    console.log('🧪 Test manuel du statut');
    updateStatus();
}

console.log('🎯 Script initialisé - En attente du DOM');
