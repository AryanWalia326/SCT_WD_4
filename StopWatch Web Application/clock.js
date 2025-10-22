// Clock elements
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalTime = document.getElementById('digitalTime');
const digitalDate = document.getElementById('digitalDate');
const timezoneSelect = document.getElementById('timezoneSelect');

// City clocks
const cityClocks = {
    newYork: document.getElementById('newYork'),
    losAngeles: document.getElementById('losAngeles'),
    london: document.getElementById('london'),
    paris: document.getElementById('paris'),
    tokyo: document.getElementById('tokyo'),
    dubai: document.getElementById('dubai')
};

const cityTimezones = {
    newYork: 'America/New_York',
    losAngeles: 'America/Los_Angeles',
    london: 'Europe/London',
    paris: 'Europe/Paris',
    tokyo: 'Asia/Tokyo',
    dubai: 'Asia/Dubai'
};

// Update all clocks
function updateClocks() {
    const selectedTimezone = timezoneSelect.value;
    const now = selectedTimezone === 'local' ? new Date() : getTimeInTimezone(selectedTimezone);
    
    // Update analog clock
    updateAnalogClock(now);
    
    // Update digital clock
    updateDigitalClock(now, selectedTimezone);
    
    // Update city clocks
    updateCityClocks();
}

// Update analog clock
function updateAnalogClock(date) {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

// Update digital clock
function updateDigitalClock(date, timezone) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    digitalTime.textContent = timeString;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);
    digitalDate.textContent = dateString;
}

// Update city clocks
function updateCityClocks() {
    for (const [city, element] of Object.entries(cityClocks)) {
        const timezone = cityTimezones[city];
        const time = getTimeInTimezone(timezone);
        element.textContent = formatTime12Hour(time);
    }
}

// Get time in specific timezone
function getTimeInTimezone(timezone) {
    return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
}

// Format time in 12-hour format
function formatTime12Hour(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${pad(hours)}:${pad(minutes)} ${ampm}`;
}

// Pad numbers
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Event listener for timezone change
timezoneSelect.addEventListener('change', updateClocks);

// Update clocks every second
setInterval(updateClocks, 1000);

// Initial update
updateClocks();
