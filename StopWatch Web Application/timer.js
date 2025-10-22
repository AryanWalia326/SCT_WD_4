// Timer variables
let timerInterval = null;
let totalSeconds = 0;
let remainingSeconds = 0;
let isRunning = false;
let isPaused = false;

// DOM elements
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const timerHours = document.getElementById('timerHours');
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const startTimerBtn = document.getElementById('startTimerBtn');
const pauseTimerBtn = document.getElementById('pauseTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');
const addTimeBtn = document.getElementById('addTimeBtn');
const inputSection = document.getElementById('inputSection');
const timerDisplay = document.getElementById('timerDisplay');
const notification = document.getElementById('notification');
const progressCircle = document.getElementById('progressCircle');

// Quick timer buttons
const quickButtons = document.querySelectorAll('.quick-btn');
quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const seconds = parseInt(btn.dataset.time);
        setQuickTimer(seconds);
    });
});

// Event listeners
startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);
addTimeBtn.addEventListener('click', addTime);

// Set quick timer
function setQuickTimer(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = secs;
}

// Start timer
function startTimer() {
    if (!isRunning) {
        if (!isPaused) {
            // Calculate total seconds from inputs
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            
            totalSeconds = hours * 3600 + minutes * 60 + seconds;
            remainingSeconds = totalSeconds;
            
            if (totalSeconds === 0) {
                alert('Please set a time greater than 0!');
                return;
            }
        }
        
        inputSection.style.display = 'none';
        timerDisplay.style.display = 'block';
        
        isRunning = true;
        isPaused = false;
        
        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
        addTimeBtn.disabled = false;
        
        updateTimerDisplay();
        timerInterval = setInterval(countdown, 1000);
    }
}

// Pause timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        isPaused = true;
        
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
    }
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    remainingSeconds = 0;
    
    inputSection.style.display = 'block';
    timerDisplay.style.display = 'none';
    
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    addTimeBtn.disabled = true;
    
    notification.classList.remove('show');
}

// Add time
function addTime() {
    remainingSeconds += 60;
    totalSeconds += 60;
    updateTimerDisplay();
    updateProgressRing();
}

// Countdown function
function countdown() {
    remainingSeconds--;
    
    if (remainingSeconds < 0) {
        clearInterval(timerInterval);
        isRunning = false;
        showNotification();
        playSound();
        return;
    }
    
    updateTimerDisplay();
    updateProgressRing();
}

// Update timer display
function updateTimerDisplay() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    timerHours.textContent = pad(hours);
    timerMinutes.textContent = pad(minutes);
    timerSeconds.textContent = pad(seconds);
}

// Update progress ring
function updateProgressRing() {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const progress = (remainingSeconds / totalSeconds) * circumference;
    
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference - progress;
}

// Pad numbers
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Play sound (using Web Audio API)
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
}

// Initialize progress ring
const radius = 90;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;
