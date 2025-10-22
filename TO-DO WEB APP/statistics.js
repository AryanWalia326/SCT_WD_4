// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

// Calculate statistics
function calculateStats() {
    const tasks = loadTasks();
    const total = tasks.length;
    const active = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, active, completed, completionRate };
}

// Update statistics display
function updateStatistics() {
    const stats = calculateStats();
    
    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statActive').textContent = stats.active;
    document.getElementById('statCompleted').textContent = stats.completed;
    document.getElementById('statCompletion').textContent = stats.completionRate + '%';

    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = stats.completionRate + '%';
    
    const progressText = document.getElementById('progressText');
    if (stats.completionRate === 100 && stats.total > 0) {
        progressText.textContent = '🎉 Amazing! All tasks completed!';
    } else if (stats.completionRate >= 75) {
        progressText.textContent = '🔥 Great progress! Keep it up!';
    } else if (stats.completionRate >= 50) {
        progressText.textContent = '💪 Halfway there! You can do it!';
    } else if (stats.completionRate > 0) {
        progressText.textContent = '🚀 Good start! Keep going!';
    } else {
        progressText.textContent = 'Complete more tasks to increase your progress!';
    }

    // Update achievements
    checkAchievements(stats);
}

// Check and unlock achievements
function checkAchievements(stats) {
    const achievements = {
        achievement1: stats.total >= 1,
        achievement2: stats.completed >= 5,
        achievement3: stats.completed >= 20,
        achievement4: stats.completionRate >= 80 && stats.total >= 5
    };

    Object.keys(achievements).forEach(id => {
        const element = document.getElementById(id);
        if (achievements[id]) {
            element.classList.add('unlocked');
        } else {
            element.classList.remove('unlocked');
        }
    });
}

// Display recent activity
function displayRecentActivity() {
    const tasks = loadTasks();
    const activityList = document.getElementById('activityList');
    
    if (tasks.length === 0) {
        activityList.innerHTML = `
            <li class="activity-item">
                <i class="fas fa-info-circle"></i>
                <span>No recent activity yet. Start creating tasks!</span>
            </li>
        `;
        return;
    }

    // Sort tasks by creation date (most recent first)
    const sortedTasks = [...tasks].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 10);

    activityList.innerHTML = sortedTasks.map(task => {
        const date = new Date(task.createdAt);
        const timeAgo = getTimeAgo(date);
        const icon = task.completed ? 
            '<i class="fas fa-check-circle" style="color: #43e97b;"></i>' : 
            '<i class="fas fa-circle" style="color: #667eea;"></i>';
        
        return `
            <li class="activity-item">
                ${icon}
                <div class="activity-content">
                    <span class="activity-text">${escapeHtml(task.text)}</span>
                    <span class="activity-time">${timeAgo}</span>
                </div>
            </li>
        `;
    }).join('');
}

// Get time ago string
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    
    return 'just now';
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
updateStatistics();
displayRecentActivity();
