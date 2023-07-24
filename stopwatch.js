let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isPaused = false;
let lastSplitTime = null;


const hoursContainer = document.getElementById("hours");
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");
const millisecondsContainer = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const splitButton = document.getElementById("split");
const resetButton = document.getElementById("reset");


splitButton.disabled = true;
resetButton.disabled = true;


const togglePause = () => {
if (!isPaused) {
// Start the timer
startButton.classList.add("paused");
startButton.innerHTML = "Pause";
splitButton.classList.add("active");
resetButton.classList.remove("blue");
splitButton.disabled = false; // Enable the split button
resetButton.disabled = true; // Disable the reset button
isPaused = true;
interval = setInterval(startWatch, 10);
} else {
// Pause the timer
startButton.classList.remove("paused");
startButton.innerHTML = "Start";
splitButton.classList.remove("active");
resetButton.classList.add("blue");
splitButton.disabled = true; // Enable the split button
resetButton.disabled = false; // Enable the reset button
isPaused = false;
clearInterval(interval);
lastSplitTime = getFormattedTime();
addSplitTimeToTable("Pause", lastSplitTime);
}
};


const splitTimer = () => {
if (!isPaused) {
// Split the time
const splitTime = getFormattedTime();
addSplitTimeToTable("Split", splitTime);
} else {
// Log pause entry
lastSplitTime = getFormattedTime();
addSplitTimeToTable("Split", lastSplitTime);
}
};


const resetTimer = () => {
milliseconds = 0;
seconds = 0;
minutes = 0;
hours = 0;


millisecondsContainer.innerHTML = "00";
secondsContainer.innerHTML = "00";
minutesContainer.innerHTML = "00";
hoursContainer.innerHTML = "00";
clearInterval(interval);
clearSplitTimesTable();
splitButton.disabled = false; // Enable the split button
resetButton.disabled = false; // Enable the reset button
isPaused = false;
lastSplitTime = null;
};


function startWatch() {
milliseconds++;
if (milliseconds < 10) {
millisecondsContainer.innerHTML = `00${milliseconds}`;
} else if (milliseconds < 100) {
millisecondsContainer.innerHTML = `0${milliseconds}`;
} else if (milliseconds >= 1000) {
milliseconds = 0;
millisecondsContainer.innerHTML = "000";
seconds++;
} else {
millisecondsContainer.innerHTML = milliseconds.toString().padStart(3, "0");
}


if (seconds < 10) {
secondsContainer.innerHTML = `0${seconds}`;
} else if (seconds > 59) {
minutes++;
seconds = 0;
secondsContainer.innerHTML = "00";
} else {
secondsContainer.innerHTML = seconds;
}


if (minutes < 10) {
minutesContainer.innerHTML = `0${minutes}`;
} else if (minutes > 59) {
hours++;
minutes = 0;
minutesContainer.innerHTML = minutes;
} else {
minutesContainer.innerHTML = minutes;
}


if (hours < 10) {
hoursContainer.innerHTML = `0${hours}`;
} else {
hoursContainer.innerHTML = hours;
}
}


function getFormattedTime() {
const formattedMilliseconds =
milliseconds < 10
? `00${milliseconds}`
: milliseconds < 100
? `0${milliseconds}`
: milliseconds.toString().padStart(3, "0");


const formattedSeconds = seconds.toString().padStart(2, "0");
const formattedMinutes = minutes.toString().padStart(2, "0");
const formattedHours = hours.toString().padStart(2, "0");


return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}


function addSplitTimeToTable(entryType, entryTime) {
const table = document.getElementById("splitTimesTable");
const newRow = table.insertRow();
const typeCell = newRow.insertCell();
const timeCell = newRow.insertCell();


typeCell.innerHTML = entryType;
timeCell.innerHTML = entryTime;
}


function clearSplitTimesTable() {
const table = document.getElementById("splitTimesTable");
table.innerHTML = "";
}


startButton.addEventListener("click", togglePause);
splitButton.addEventListener("click", splitTimer);
resetButton.addEventListener("click", resetTimer);