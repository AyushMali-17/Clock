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
    const hour1 = document.getElementById('hour1');
    const minute1 = document.getElementById('minute1');
    const second1 = document.getElementById('second1');

    setInterval(() => {
        updateClock('America/New_York', hour1, minute1, second1);
    }, 1000);
}

startClocks();
