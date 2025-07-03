// Modern vacation page functionality
document.addEventListener('DOMContentLoaded', () => {
    updateVacationProgress();
    updateDaysCount();
    setupContactButton();
    
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

// Setup contact button functionality
function setupContactButton() {
    const contactBtn = document.getElementById('contact-btn');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            // Create a simple modal or alert for contact
            const modal = createContactModal();
            document.body.appendChild(modal);
            
            // Animate modal appearance
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.querySelector('.contact-modal').style.transform = 'scale(1)';
            }, 10);
        });
    }
}

// Create contact modal
function createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'contact-modal';
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #1a1a1a; font-weight: 600;">Laisser un message</h3>
        <p style="margin-bottom: 1.5rem; color: #64748b; line-height: 1.5;">
            Je suis actuellement en vacances du 4 juillet au 4 août 2025. 
            Vos messages seront traités à mon retour.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button id="close-modal" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 50px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            ">Compris</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    
    // Close modal functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'close-modal') {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
    
    return modal;
}

// Add some smooth scrolling effects
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simple scroll to sections (if they exist)
        const text = item.textContent.toLowerCase();
        let targetSection;
        
        if (text === 'status') {
            targetSection = document.querySelector('.cards-section');
        } else if (text === 'contact') {
            targetSection = document.querySelector('.info-section');
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
