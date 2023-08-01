let hours = 0;
let minutes = 0;
let seconds = 0;
let millisecondsDigit1 = 0;
let millisecondsDigit2 = 0;
let interval;
let isPaused = false;
let lastSplitTime = null;
let entryCount = 0;
let isTimerStarted = false;




const hoursContainer = document.getElementById("hours");
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");
const millisecondsDigit1Container = document.getElementById("milliseconds-1");
const millisecondsDigit2Container = document.getElementById("milliseconds-2");
const millisecondsDigit3Container = document.getElementById("milliseconds-3");
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
  splitButton.disabled = false;
  resetButton.disabled = true;
  isPaused = true;




  if (!isTimerStarted) {
      isTimerStarted = true;
      millisecondsDigit3Container.style.display = "none";
    }




  interval = setInterval(startWatch, 1);
} else {
  // Pause the timer
  startButton.classList.remove("paused");
  startButton.innerHTML = "Start";
  splitButton.classList.remove("active");
  resetButton.classList.add("blue");
  splitButton.disabled = true;
  resetButton.disabled = false;
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
  millisecondsDigit1 = 0;
  millisecondsDigit2 = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
   millisecondsDigit1Container.innerHTML = "0";
  millisecondsDigit2Container.innerHTML = "00";
  secondsContainer.innerHTML = "00";
  minutesContainer.innerHTML = "00";
  hoursContainer.innerHTML = "00";
  clearInterval(interval);
  clearSplitTimesTable();
  splitButton.disabled = false; // Enable the split button
  resetButton.disabled = false; // Enable the reset button
  isPaused = false;
  isStopwatchStarted = false; // Reset the stopwatch started flag
  lastSplitTime = null;
};




function startWatch() {
const step = 1; // The step value for increasing milliseconds




millisecondsDigit2 += step;
if (millisecondsDigit2 >= 100) {
  millisecondsDigit2 = 0;
  millisecondsDigit1 += step;
  if (millisecondsDigit1 >= 10) {
    millisecondsDigit1 = 0;
    incrementSeconds();
  }
}




millisecondsDigit1Container.innerHTML = millisecondsDigit1;
millisecondsDigit2Container.innerHTML = millisecondsDigit2.toString().padStart(2, "0");
}




function incrementSeconds() {
seconds++;
if (seconds > 59) {
  seconds = 0;
  incrementMinutes();
}
secondsContainer.innerHTML = seconds.toString().padStart(2, "0");
}




function incrementMinutes() {
minutes++;
if (minutes > 59) {
  minutes = 0;
  incrementHours();
}
minutesContainer.innerHTML = minutes.toString().padStart(2, "0");
}




function incrementHours() {
hours++;
hoursContainer.innerHTML = hours.toString().padStart(2, "0");
}




function getFormattedTime() {
const formattedSeconds = seconds.toString().padStart(2, "0");
const formattedMinutes = minutes.toString().padStart(2, "0");
const formattedHours = hours.toString().padStart(2, "0");




return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${millisecondsDigit1}${millisecondsDigit2.toString().padStart(2, "0")}`;
}




function addSplitTimeToTable(entryType, entryTime) {
const table = document.getElementById("splitTimesTable");
const newRow = table.insertRow();
const entryNumberCell = newRow.insertCell(); // New cell for entry number
const typeCell = newRow.insertCell();
const timeCell = newRow.insertCell();




entryCount++; // Increment the entry count for each entry
entryNumberCell.innerHTML = `#${entryCount}`; // Set the content of the entry number cell
timeCell.innerHTML = entryType;
typeCell.innerHTML = entryTime;




if (entryType === "Pause") {
  typeCell.style.color = "#fb657f";
  timeCell.style.color = "#b0b1b1";
} else if (entryType === "Split") {
  typeCell.style.color = "#FFA500";
  timeCell.style.color = "#b0b1b1";
}
}




function clearSplitTimesTable() {
const table = document.getElementById("splitTimesTable");
table.innerHTML = "";
}




startButton.addEventListener("click", togglePause);
splitButton.addEventListener("click", splitTimer);
resetButton.addEventListener("click", resetTimer);
