document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('timer-display');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    const resetButton = document.getElementById('reset-btn');

    let intervalId;
    let remainingTime = 0; // in seconds

    function updateDisplay() {
        const mins = Math.floor(remainingTime / 60);
        const secs = remainingTime % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startTimer() {
        if (intervalId) return; // Do nothing if already running
        intervalId = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                updateDisplay();
                return;
            }
            remainingTime--;
            updateDisplay();
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function resetTimer() {
        clearInterval(intervalId);
        intervalId = null;
        remainingTime = 0;
        updateDisplay();
    }

    startButton.addEventListener('click', () => {
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;
        remainingTime = minutes * 60 + seconds;
        updateDisplay();
        startTimer();
    });

    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
});
