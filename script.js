// Modern vacation page functionality
document.addEventListener('DOMContentLoaded', () => {
    updateVacationProgress();
    updateDaysCount();
    
    // Update progress every hour
    setInterval(updateVacationProgress, 3600000);
    setInterval(updateDaysCount, 86400000); // Update daily
});

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
