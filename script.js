// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.getElementById('matrix-rain');
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        for (let i = 0; i < 20; i++) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.top = (i * 20) + 'px';
            char.style.animationDelay = (Math.random() * 2) + 's';
            column.appendChild(char);
        }
        
        matrixContainer.appendChild(column);
        
        // Remove column after animation completes
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 8000);
    }
    
    // Create initial columns
    for (let i = 0; i < 20; i++) {
        setTimeout(createMatrixColumn, i * 200);
    }
    
    // Continuously create new columns
    setInterval(createMatrixColumn, 300);
}

// Update uptime counter
function updateUptime() {
    const uptimeElement = document.getElementById('uptime');
    const startDate = new Date('2024-01-01'); // Vous pouvez changer cette date
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    uptimeElement.textContent = `${diffDays} jours`;
}

// Animate vacation progress based on real dates
function animateVacationProgress() {
    const progressFill = document.getElementById('vacation-progress');
    const progressText = document.querySelector('.progress-text');
    
    // Dates de vacances réelles
    const vacationStart = new Date('2025-07-04'); // 4 juillet 2025
    const vacationEnd = new Date('2025-08-04');   // 4 août 2025
    const now = new Date();
    
    // Calculer la progression réelle
    const totalDuration = vacationEnd - vacationStart;
    const elapsed = now - vacationStart;
    let realProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    
    // Déterminer le statut et la classe CSS
    let statusText = '';
    let progressClass = '';
    
    if (now < vacationStart) {
        // Avant les vacances
        const daysUntilVacation = Math.ceil((vacationStart - now) / (1000 * 60 * 60 * 24));
        statusText = `Départ dans ${daysUntilVacation} jour${daysUntilVacation > 1 ? 's' : ''}...`;
        realProgress = 0;
        progressClass = 'pre-vacation';
    } else if (now >= vacationStart && now <= vacationEnd) {
        // Pendant les vacances
        const daysElapsed = Math.floor((now - vacationStart) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((vacationEnd - vacationStart) / (1000 * 60 * 60 * 24));
        const daysRemaining = totalDays - daysElapsed;
        statusText = `Jour ${daysElapsed + 1}/${totalDays} - ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`;
        progressClass = 'in-vacation';
    } else {
        // Après les vacances
        const daysAfter = Math.floor((now - vacationEnd) / (1000 * 60 * 60 * 24));
        statusText = `Vacances terminées depuis ${daysAfter} jour${daysAfter > 1 ? 's' : ''}`;
        realProgress = 100;
        progressClass = 'post-vacation';
    }
    
    // Appliquer la classe CSS
    progressFill.className = `progress-fill ${progressClass}`;
    
    // Animation progressive vers la valeur réelle
    let currentProgress = 0;
    const interval = setInterval(() => {
        if (currentProgress < realProgress) {
            currentProgress += 1;
            progressFill.style.width = currentProgress + '%';
        } else {
            clearInterval(interval);
        }
    }, 50);
    
    // Mettre à jour le texte
    progressText.textContent = statusText;
}

// Glitch effect for random elements
function addGlitchEffect() {
    const elements = document.querySelectorAll('.neon-text, .error-code, .terminal-title');
    
    elements.forEach(element => {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                element.classList.add('glitch');
                setTimeout(() => {
                    element.classList.remove('glitch');
                }, 500);
            }
        }, 2000);
    });
}

// Random terminal commands
function showRandomCommands() {
    const commands = [
        'ping vacation.exe',
        'sudo apt-get install relaxation',
        'chmod +x fun_mode.sh',
        'git checkout holiday-branch',
        'docker run --rm -it vacation:latest',
        'npm install @vacation/chill',
        'python -m vacation --infinite',
        'curl -X GET https://api.rest.com/v1/recharge',
        'systemctl start vacation.service',
        'journalctl -u vacation.service --follow'
    ];
    
    const commandElement = document.querySelector('.command-text');
    
    setInterval(() => {
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        commandElement.textContent = randomCommand;
    }, 5000);
}

// Dynamic status updates
function updateStatus() {
    const statusValues = ['VACATION_MODE', 'CHILL_MODE', 'RELAX_MODE', 'BEACH_MODE', 'SLEEP_MODE'];
    const statusElement = document.querySelector('.neon-green');
    
    setInterval(() => {
        const randomStatus = statusValues[Math.floor(Math.random() * statusValues.length)];
        statusElement.textContent = randomStatus;
    }, 8000);
}

// Floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-elements > div');
    
    floatingElements.forEach(element => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000);
    });
}

// Terminal typing effect
function createTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.textContent = '';
                    i = 0;
                    setTimeout(() => {
                        const newTypeInterval = setInterval(() => {
                            if (i < text.length) {
                                element.textContent += text.charAt(i);
                                i++;
                            } else {
                                clearInterval(newTypeInterval);
                            }
                        }, 100);
                    }, 1000);
                }, 2000);
            }
        }, 100);
    });
}

// Add hover effects to terminal window
function addHoverEffects() {
    const terminalWindow = document.querySelector('.terminal-window');
    
    terminalWindow.addEventListener('mouseenter', () => {
        terminalWindow.style.transform = 'scale(1.02)';
        terminalWindow.style.transition = 'transform 0.3s ease';
    });
    
    terminalWindow.addEventListener('mouseleave', () => {
        terminalWindow.style.transform = 'scale(1)';
    });
}

// Add click effects to buttons
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(1.2)';
            button.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            // Add some fun effects
            if (button.classList.contains('red')) {
                document.body.style.filter = 'hue-rotate(45deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 1000);
            } else if (button.classList.contains('yellow')) {
                document.body.style.filter = 'brightness(1.5)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 1000);
            } else if (button.classList.contains('green')) {
                document.body.style.filter = 'saturate(2)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 1000);
            }
        });
    });
}

// Generate random vacation quotes
function showVacationQuotes() {
    const quotes = [
        "Rechargement des batteries en cours... 🔋",
        "Mode plage activé 🏖️",
        "Détection de soleil et de détente... ☀️",
        "Système de stress: DÉSACTIVÉ ✅",
        "Niveau de relaxation: MAXIMUM 📈",
        "Statut: Bronzage en cours... 🌞",
        "Connexion WiFi: Optionnelle 📶",
        "Mode avion: ACTIVÉ ✈️",
        "Réveils: SUSPENDUS ⏰",
        "Emails: EN QUARANTAINE 📧"
    ];
    
    const subMessageElement = document.querySelector('.sub-message');
    
    setInterval(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        subMessageElement.innerHTML = randomQuote + '<br>Profitez de cette pause bien méritée!';
    }, 10000);
}

// Add konami code easter egg
function addKonamiCode() {
    let konamiCode = '';
    const targetCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    
    document.addEventListener('keydown', (e) => {
        konamiCode += e.code;
        
        if (konamiCode.length > targetCode.length) {
            konamiCode = konamiCode.slice(-targetCode.length);
        }
        
        if (konamiCode === targetCode) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = 'none';
                document.head.removeChild(style);
            }, 10000);
            
            konamiCode = '';
        }
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for CSS to load
    setTimeout(() => {
        createMatrixRain();
        updateUptime();
        animateVacationProgress();
        addGlitchEffect();
        showRandomCommands();
        updateStatus();
        animateFloatingElements();
        createTypingEffect();
        addHoverEffects();
        addButtonEffects();
        showVacationQuotes();
        addKonamiCode();
    }, 1000);
    
    // Update uptime every minute
    setInterval(updateUptime, 60000);
    
    // Update vacation progress every hour
    setInterval(animateVacationProgress, 3600000);
});

// Add performance monitoring
(function() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            console.log(`FPS: ${fps}`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    requestAnimationFrame(monitorPerformance);
})();
