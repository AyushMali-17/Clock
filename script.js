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
    const clocks = [
        { timezone: 'America/New_York', hour: 'hour1', minute: 'minute1', second: 'second1' },
        { timezone: 'Europe/London', hour: 'hour2', minute: 'minute2', second: 'second2' },
        { timezone: 'Asia/Tokyo', hour: 'hour3', minute: 'minute3', second: 'second3' },
        { timezone: 'Australia/Sydney', hour: 'hour4', minute: 'minute4', second: 'second4' },
        { timezone: 'Europe/Moscow', hour: 'hour5', minute: 'minute5', second: 'second5' }
    ];

    setInterval(() => {
        clocks.forEach(clock => {
            const hourHand = document.getElementById(clock.hour);
            const minuteHand = document.getElementById(clock.minute);
            const secondHand = document.getElementById(clock.second);
            updateClock(clock.timezone, hourHand, minuteHand, secondHand);
        });
    }, 1000);
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

startClocks();
