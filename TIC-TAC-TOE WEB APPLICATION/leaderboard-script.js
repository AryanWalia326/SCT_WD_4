// Sample leaderboard data
const leaderboardData = [
    { rank: 4, name: "Emma Wilson", score: 1876, wins: 128, games: 210 },
    { rank: 5, name: "David Kim", score: 1654, wins: 115, games: 195 },
    { rank: 6, name: "Lisa Anderson", score: 1523, wins: 98, games: 175 },
    { rank: 7, name: "James Brown", score: 1401, wins: 89, games: 165 },
    { rank: 8, name: "Maria Garcia", score: 1298, wins: 82, games: 158 },
    { rank: 9, name: "Chris Taylor", score: 1187, wins: 76, games: 148 },
    { rank: 10, name: "Anna Lee", score: 1095, wins: 71, games: 142 },
    { rank: 11, name: "Tom Martinez", score: 1002, wins: 65, games: 135 },
    { rank: 12, name: "Sophie Davis", score: 945, wins: 61, games: 128 },
    { rank: 13, name: "Ryan Clark", score: 876, wins: 55, games: 120 },
    { rank: 14, name: "Rachel White", score: 823, wins: 52, games: 115 },
    { rank: 15, name: "Kevin Moore", score: 765, wins: 48, games: 108 }
];

// Generate player avatars
function getPlayerInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function getAvatarColor(index) {
    const colors = [
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #30cfd0, #330867)'
    ];
    return colors[index % colors.length];
}

function calculateWinRate(wins, games) {
    return games > 0 ? Math.round((wins / games) * 100) : 0;
}

function getWinRateClass(winRate) {
    if (winRate >= 60) return 'winrate-high';
    if (winRate >= 40) return 'winrate-medium';
    return 'winrate-low';
}

// Populate leaderboard
function populateLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';

    leaderboardData.forEach((player, index) => {
        const winRate = calculateWinRate(player.wins, player.games);
        const row = document.createElement('div');
        row.className = 'table-row';
        row.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s both`;
        
        row.innerHTML = `
            <div class="rank-col">#${player.rank}</div>
            <div class="player-col">
                <div class="player-mini-avatar" style="background: ${getAvatarColor(index)}">
                    ${getPlayerInitials(player.name)}
                </div>
                <div class="player-info">
                    <div class="player-username">${player.name}</div>
                    <div class="player-level">Level ${Math.floor(player.score / 100) + 1}</div>
                </div>
            </div>
            <div class="score-col">${player.score.toLocaleString()} pts</div>
            <div class="wins-col">${player.wins} wins</div>
            <div class="winrate-col ${getWinRateClass(winRate)}">${winRate}%</div>
        `;
        
        tbody.appendChild(row);
    });
}

// Load user statistics
function loadUserStats() {
    const saved = localStorage.getItem('ticTacToeScores');
    let totalWins = 0;
    let totalGames = 0;
    
    if (saved) {
        const scores = JSON.parse(saved);
        totalWins = scores.X || 0;
        totalGames = (scores.X || 0) + (scores.O || 0) + (scores.draw || 0);
    }
    
    const userScore = totalWins * 15 + totalGames * 5;
    const winRate = calculateWinRate(totalWins, totalGames);
    
    // Calculate rank based on score
    let userRank = 1;
    for (let i = 0; i < leaderboardData.length; i++) {
        if (userScore < leaderboardData[i].score) {
            userRank = leaderboardData[i].rank + 1;
        }
    }
    if (userScore === 0) userRank = '-';
    
    // Update user rank display
    document.getElementById('yourRank').textContent = userRank;
    document.getElementById('yourScore').textContent = userScore.toLocaleString();
    document.getElementById('yourWins').textContent = totalWins;
    document.getElementById('yourWinRate').textContent = winRate;
    
    // Animate values
    animateValue('yourScore', 0, userScore, 1000);
    animateValue('yourWins', 0, totalWins, 800);
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end === 0 ? '0' : end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // In a real app, this would filter data by time period
        // For now, just re-animate the table
        const rows = document.querySelectorAll('.table-row');
        rows.forEach((row, index) => {
            row.style.animation = 'none';
            setTimeout(() => {
                row.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s both`;
            }, 10);
        });
    });
});

// Scroll animations for achievements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Check and unlock achievements
function checkAchievements() {
    const saved = localStorage.getItem('ticTacToeScores');
    if (!saved) return;
    
    const scores = JSON.parse(saved);
    const totalWins = scores.X || 0;
    const streak = parseInt(localStorage.getItem('winStreak') || '0');
    
    const achievements = document.querySelectorAll('.achievement-card');
    
    // First Victory
    if (totalWins >= 1) {
        achievements[0].classList.add('unlocked');
    }
    
    // Hot Streak
    if (streak >= 5) {
        achievements[1].classList.add('unlocked');
    }
    
    // Century Club
    if (totalWins >= 100) {
        achievements[2].classList.add('unlocked');
    }
}

// Add custom scrollbar styles
const style = document.createElement('style');
style.textContent = `
    .table-body::-webkit-scrollbar {
        width: 8px;
    }
    
    .table-body::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
    
    .table-body::-webkit-scrollbar-thumb {
        background: rgba(102, 126, 234, 0.5);
        border-radius: 10px;
    }
    
    .table-body::-webkit-scrollbar-thumb:hover {
        background: rgba(102, 126, 234, 0.7);
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateLeaderboard();
    loadUserStats();
    checkAchievements();
});

// Refresh stats periodically
setInterval(() => {
    loadUserStats();
    checkAchievements();
}, 5000);
