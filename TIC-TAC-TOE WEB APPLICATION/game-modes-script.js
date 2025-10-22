// Load and display statistics
function loadStats() {
    const stats = {
        totalGames: 0,
        totalWins: 0,
        totalDraws: 0,
        streak: 0
    };

    // Load from all game modes
    const modes = ['ticTacToeScores'];
    modes.forEach(mode => {
        const saved = localStorage.getItem(mode);
        if (saved) {
            const scores = JSON.parse(saved);
            stats.totalGames += (scores.X || 0) + (scores.O || 0) + (scores.draw || 0);
            stats.totalWins += (scores.X || 0);
            stats.totalDraws += (scores.draw || 0);
        }
    });

    // Load streak
    const savedStreak = localStorage.getItem('winStreak');
    if (savedStreak) {
        stats.streak = parseInt(savedStreak);
    }

    // Calculate win rate
    const winRate = stats.totalGames > 0 
        ? Math.round((stats.totalWins / stats.totalGames) * 100) 
        : 0;

    // Display stats with animation
    animateValue('totalGames', 0, stats.totalGames, 1000);
    animateValue('totalWins', 0, stats.totalWins, 1000);
    animateValue('streak', 0, stats.streak, 1000);
    
    setTimeout(() => {
        document.getElementById('winRate').textContent = winRate + '%';
    }, 500);
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Mode card hover effects
const modeCards = document.querySelectorAll('.mode-card');
modeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add particle effect on button click
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .mode-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Load statistics on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
});

// Refresh stats every 5 seconds
setInterval(loadStats, 5000);
