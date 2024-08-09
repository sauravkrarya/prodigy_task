let timer;
let isRunning = false;
let elapsedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const themeSwitch = document.getElementById('theme-switch');

function updateDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime++;
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function recordLap() {
    const lapTime = display.textContent;
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap-item');
    lapElement.innerHTML = `<span>Lap: ${lapTime}</span>`;
    lapsContainer.appendChild(lapElement);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeSwitch.checked);
});