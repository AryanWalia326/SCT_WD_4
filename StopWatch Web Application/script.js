// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapTimes = [];

// DOM elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const clearLapsBtn = document.getElementById('clearLapsBtn');

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
clearLapsBtn.addEventListener('click', clearLaps);

// Start the stopwatch
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        
        // Add visual feedback
        startBtn.style.opacity = '0.5';
        pauseBtn.style.opacity = '1';
        lapBtn.style.opacity = '1';
    }
}

// Pause the stopwatch
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // Add visual feedback
        startBtn.style.opacity = '1';
        pauseBtn.style.opacity = '0.5';
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    
    updateDisplay(0, 0, 0, 0);
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    
    // Add visual feedback
    startBtn.style.opacity = '1';
    pauseBtn.style.opacity = '0.5';
    lapBtn.style.opacity = '0.5';
}

// Update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    
    updateDisplay(hours, minutes, seconds, milliseconds);
}

// Update the display
function updateDisplay(hours, minutes, seconds, milliseconds) {
    hoursDisplay.textContent = pad(hours);
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds);
}

// Pad numbers with leading zeros
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = {
            time: elapsedTime,
            formattedTime: formatTime(elapsedTime)
        };
        
        lapTimes.unshift(lapTime);
        displayLaps();
    }
}

// Format time for display
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));
    
    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    } else {
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    }
}

// Display lap times
function displayLaps() {
    if (lapTimes.length === 0) {
        lapsList.innerHTML = '<p class="no-laps">No laps recorded yet</p>';
        clearLapsBtn.style.display = 'none';
        return;
    }
    
    clearLapsBtn.style.display = 'block';
    lapsList.innerHTML = '';
    
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        
        const lapNumber = document.createElement('span');
        lapNumber.className = 'lap-number';
        lapNumber.textContent = `Lap ${lapTimes.length - index}`;
        
        const lapTime = document.createElement('span');
        lapTime.className = 'lap-time';
        lapTime.textContent = lap.formattedTime;
        
        lapItem.appendChild(lapNumber);
        
        // Calculate and display lap difference if not the first lap
        if (index < lapTimes.length - 1) {
            const diff = lap.time - lapTimes[index + 1].time;
            const diffSpan = document.createElement('span');
            diffSpan.className = 'lap-diff';
            
            if (diff > 0) {
                diffSpan.textContent = `+${formatTime(diff)}`;
                diffSpan.classList.add('slower');
            } else {
                diffSpan.textContent = formatTime(Math.abs(diff));
                diffSpan.classList.add('faster');
            }
            
            lapItem.appendChild(diffSpan);
        }
        
        lapItem.appendChild(lapTime);
        lapsList.appendChild(lapItem);
    });
}

// Clear all laps
function clearLaps() {
    lapTimes = [];
    displayLaps();
}

// Initialize display
updateDisplay(0, 0, 0, 0);
clearLapsBtn.style.display = 'none';
