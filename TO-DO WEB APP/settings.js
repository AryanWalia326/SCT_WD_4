// Load settings from localStorage
function loadSettings() {
    const defaultSettings = {
        theme: 'purple',
        reminders: false,
        sounds: true,
        autoSort: false,
        showStats: true
    };
    
    const stored = localStorage.getItem('settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
}

// Save settings to localStorage
function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

// Theme configuration
const themes = {
    purple: { primary: '#667eea', secondary: '#764ba2' },
    ocean: { primary: '#4facfe', secondary: '#00f2fe' },
    sunset: { primary: '#f093fb', secondary: '#f5576c' },
    forest: { primary: '#43e97b', secondary: '#38f9d7' },
    dark: { primary: '#2c3e50', secondary: '#34495e' },
    fire: { primary: '#ff9a56', secondary: '#ff6a88' }
};

// Apply theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (theme) {
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.body.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`;
        
        // Update active theme card
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.theme === themeName) {
                card.classList.add('active');
            }
        });
    }
}

// Initialize settings
function initSettings() {
    const settings = loadSettings();
    
    // Apply theme
    applyTheme(settings.theme);
    
    // Set toggle states
    document.getElementById('reminderToggle').checked = settings.reminders;
    document.getElementById('soundToggle').checked = settings.sounds;
    document.getElementById('sortToggle').checked = settings.autoSort;
    document.getElementById('statsToggle').checked = settings.showStats;
    
    // Update storage info
    updateStorageInfo();
}

// Update storage information
function updateStorageInfo() {
    const tasks = localStorage.getItem('tasks') || '[]';
    const settings = localStorage.getItem('settings') || '{}';
    const totalSize = new Blob([tasks + settings]).size;
    const sizeInKB = (totalSize / 1024).toFixed(2);
    
    document.getElementById('storageInfo').textContent = `${sizeInKB} KB`;
    
    const taskCount = JSON.parse(tasks).length;
    document.getElementById('taskCount').textContent = taskCount;
}

// Theme selection
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
        const themeName = card.dataset.theme;
        const settings = loadSettings();
        settings.theme = themeName;
        saveSettings(settings);
        applyTheme(themeName);
    });
});

// Toggle switches
document.getElementById('reminderToggle').addEventListener('change', (e) => {
    const settings = loadSettings();
    settings.reminders = e.target.checked;
    saveSettings(settings);
});

document.getElementById('soundToggle').addEventListener('change', (e) => {
    const settings = loadSettings();
    settings.sounds = e.target.checked;
    saveSettings(settings);
});

document.getElementById('sortToggle').addEventListener('change', (e) => {
    const settings = loadSettings();
    settings.autoSort = e.target.checked;
    saveSettings(settings);
});

document.getElementById('statsToggle').addEventListener('change', (e) => {
    const settings = loadSettings();
    settings.showStats = e.target.checked;
    saveSettings(settings);
});

// Export tasks
document.getElementById('exportBtn').addEventListener('click', () => {
    const tasks = localStorage.getItem('tasks') || '[]';
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(tasks);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tasks_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    alert('Tasks exported successfully!');
});

// Import tasks
document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const tasks = JSON.parse(event.target.result);
                if (Array.isArray(tasks)) {
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    alert('Tasks imported successfully!');
                    updateStorageInfo();
                } else {
                    alert('Invalid file format!');
                }
            } catch (error) {
                alert('Error reading file!');
            }
        };
        reader.readAsText(file);
    }
});

// Clear all data
document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all tasks? This action cannot be undone!')) {
        if (confirm('Last warning! This will permanently delete all your tasks!')) {
            localStorage.removeItem('tasks');
            alert('All tasks deleted!');
            updateStorageInfo();
        }
    }
});

// Initialize
initSettings();
