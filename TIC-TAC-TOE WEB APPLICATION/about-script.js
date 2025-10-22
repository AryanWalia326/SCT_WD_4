// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.about-section').forEach(section => {
    observer.observe(section);
});

// Observe individual cards
document.querySelectorAll('.rule-card, .tip-card, .tech-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Feature items animation
document.querySelectorAll('.feature-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease-out';
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Interactive demo board (mini game)
function createInteractiveDemo() {
    const demoSection = document.createElement('div');
    demoSection.className = 'demo-section';
    demoSection.innerHTML = `
        <div class="demo-board-container">
            <h3>Try It Out!</h3>
            <p>Click on the board to see how it works</p>
            <div class="demo-board">
                <div class="demo-cell" data-index="0"></div>
                <div class="demo-cell" data-index="1"></div>
                <div class="demo-cell" data-index="2"></div>
                <div class="demo-cell" data-index="3"></div>
                <div class="demo-cell" data-index="4"></div>
                <div class="demo-cell" data-index="5"></div>
                <div class="demo-cell" data-index="6"></div>
                <div class="demo-cell" data-index="7"></div>
                <div class="demo-cell" data-index="8"></div>
            </div>
            <button class="demo-reset">Reset</button>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .demo-section {
            margin: 60px 0;
            animation: fadeInUp 0.6s ease-out 0.6s both;
        }

        .demo-board-container {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .demo-board-container h3 {
            font-size: 1.8rem;
            margin-bottom: 10px;
            color: var(--text-light);
        }

        .demo-board-container p {
            color: var(--text-muted);
            margin-bottom: 30px;
        }

        .demo-board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 300px;
            margin: 0 auto 20px;
        }

        .demo-cell {
            aspect-ratio: 1;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .demo-cell:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: scale(1.05);
        }

        .demo-cell.x {
            color: var(--player-x-color);
        }

        .demo-cell.o {
            color: var(--player-o-color);
        }

        .demo-reset {
            padding: 12px 30px;
            background: var(--primary-gradient);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .demo-reset:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
    `;
    document.head.appendChild(style);

    // Insert after rules section
    const rulesSection = document.querySelector('.about-section:nth-child(2)');
    if (rulesSection) {
        rulesSection.after(demoSection);
    }

    // Add interactivity
    let currentPlayer = 'X';
    const demoCells = demoSection.querySelectorAll('.demo-cell');
    const resetBtn = demoSection.querySelector('.demo-reset');

    demoCells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (!this.textContent) {
                this.textContent = currentPlayer;
                this.classList.add(currentPlayer.toLowerCase());
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });
    });

    resetBtn.addEventListener('click', () => {
        demoCells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'demo-cell';
        });
        currentPlayer = 'X';
    });
}

// Create the demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    createInteractiveDemo();
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const icons = document.querySelectorAll('.section-icon');
    
    icons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        icon.style.transform = `translateY(${yPos}px)`;
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate party mode!
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});
