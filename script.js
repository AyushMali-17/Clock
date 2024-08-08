let clockCount = 1;

document.addEventListener("DOMContentLoaded", () => {
    loadClocks();
    startClocks();
});

function updateClock(timezone, hourHand, minuteHand, secondHand) {
    const now = new Date().toLocaleString("en-US", { timeZone: timezone });
    const time = new Date(now);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = ((seconds / 60) * 360) + 90;
    const minuteDeg = ((minutes / 60) * 360) + 90;
    const hourDeg = ((hours / 12) * 360) + 90;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

function startClocks() {
    for (let i = 1; i <= clockCount; i++) {
        const hour = document.getElementById(`hour${i}`);
        const minute = document.getElementById(`minute${i}`);
        const second = document.getElementById(`second${i}`);
        const timezone = document.getElementById(`clock${i}`).querySelector('.timezone').textContent;

        setInterval(() => {
            updateClock(timezone, hour, minute, second);
        }, 1000);
    }
}

function changeColors() {
    const faces = document.querySelectorAll('.face');
    faces.forEach(face => {
        face.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    });
}

function toggleRotation() {
    const clocks = document.querySelectorAll('.clock');
    clocks.forEach(clock => {
        if (clock.style.animationPlayState === 'paused') {
            clock.style.animationPlayState = 'running';
        } else {
            clock.style.animationPlayState = 'paused';
        }
    });
}

function addClock() {
    clockCount++;
    const clockContainer = document.getElementById('clockContainer');
    const newClock = document.createElement('div');
    newClock.classList.add('clock');
    newClock.id = `clock${clockCount}`;
    newClock.innerHTML = `
        <div class="face">
            <div class="hand hour" id="hour${clockCount}"></div>
            <div class="hand minute" id="minute${clockCount}"></div>
            <div class="hand second" id="second${clockCount}"></div>
        </div>
        <div class="timezone">New Clock</div>
    `;
    clockContainer.appendChild(newClock);
    saveClocks();
    startClocks();
}

function removeClock() {
    if (clockCount > 1) {
        const clockContainer = document.getElementById('clockContainer');
        const clockToRemove = document.getElementById(`clock${clockCount}`);
        clockContainer.removeChild(clockToRemove);
        clockCount--;
        saveClocks();
    } else {
        alert("At least one clock must remain.");
    }
}

function addCustomClock() {
    const timezoneInput = document.getElementById('timezoneInput');
    const timezone = timezoneInput.value.trim();
    if (timezone) {
        clockCount++;
        const clockContainer = document.getElementById('clockContainer');
        const newClock = document.createElement('div');
        newClock.classList.add('clock');
        newClock.id = `clock${clockCount}`;
        newClock.innerHTML = `
            <div class="face">
                <div class="hand hour" id="hour${clockCount}"></div>
                <div class="hand minute" id="minute${clockCount}"></div>
                <div class="hand second" id="second${clockCount}"></div>
            </div>
            <div class="timezone">${timezone}</div>
        `;
        clockContainer.appendChild(newClock);
        timezoneInput.value = '';
        saveClocks();
        startClocks();
    } else {
        alert("Please enter a valid timezone.");
    }
}

function saveClocks() {
    const clockData = [];
    for (let i = 1; i <= clockCount; i++) {
        const timezone = document.getElementById(`clock${i}`).querySelector('.timezone').textContent;
        clockData.push(timezone);
    }
    localStorage.setItem('clockData', JSON.stringify(clockData));
}

function loadClocks() {
    const clockData = JSON.parse(localStorage.getItem('clockData'));
    if (clockData && clockData.length > 0) {
        clockCount = clockData.length;
        const clockContainer = document.getElementById('clockContainer');
        clockContainer.innerHTML = '';
        clockData.forEach((timezone, index) => {
            const newClock = document.createElement('div');
            newClock.classList.add('clock');
            newClock.id = `clock${index + 1}`;
            newClock.innerHTML = `
                <div class="face">
                    <div class="hand hour" id="hour${index + 1}"></div>
                    <div class="hand minute" id="minute${index + 1}"></div>
                    <div class="hand second" id="second${index + 1}"></div>
                </div>
                <div class="timezone">${timezone}</div>
            `;
            clockContainer.appendChild(newClock);
        });
    }
}

function resetClocks() {
    localStorage.removeItem('clockData');
    location.reload();
}
