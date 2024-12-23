const TheTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");
const BTN = document.querySelector("#reset");

var Timer = [0, 0];
var centiseconds = 0;
var TimerRunning = false;
var interval;

// Random Text Generator
const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "The only thing we have to fear is fear itself.",
  "Life is what happens when you're busy making other plans.",
  "In the middle of every difficulty lies opportunity.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Happiness is not something ready-made. It comes from your own actions.",
  "The best way to predict the future is to create it.",
  "You miss 100% of the shots you don't take.",
  "It always seems impossible until it's done.",
  "Dream big and dare to fail.",
  "What we think, we become.",
  "Knowledge is power, but wisdom is understanding how to use it wisely.",
  "Every accomplishment starts with the decision to try.",
  "Time is a created thing; saying 'I don't have time' is like saying 'I don't want to'.",
  "Failure is simply the opportunity to begin again, this time more intelligently",
  "The secret of getting ahead is getting started.",
  "Don’t watch the clock; do what it does, keep going.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Keep your face always toward the sunshine, and shadows will fall behind you.",
];

let originText = "";

function getRandomText() {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

function displayRandomText() {
  const originTextElement = document.querySelector("#origin-text p");
  originText = getRandomText();
  originTextElement.innerHTML = originText;
}

window.onload = displayRandomText;

function runTimer() {
  let currentTime =
    (Timer[0] <= 9 ? "0" : "") +
    Timer[0] +
    ":" +
    (Timer[1] <= 9 ? "0" : "") +
    Timer[1] +
    ":" +
    (centiseconds <= 9 ? "0" : "") +
    centiseconds;
  TheTimer.innerHTML = currentTime;
  centiseconds++;
  if (centiseconds >= 100) {
    centiseconds = 0;
    Timer[1]++;
  }
  if (Timer[1] >= 60) {
    Timer[1] = 0;
    Timer[0]++;
  }
}

function SpellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);
  if (textEntered == originText) {
    testWrapper.style.borderColor = "green";
    clearInterval(interval);
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "yellow";
    } else {
      testWrapper.style.borderColor = "red";
    }
  }
}

function start() {
  if (!TimerRunning) {
    interval = setInterval(runTimer, 10);
    TimerRunning = true;
  }
}

function ResetButton() {
  clearInterval(interval);
  interval = null;
  Timer = [0, 0];
  centiseconds = 0;
  TimerRunning = false;
  testArea.value = "";
  TheTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  displayRandomText(); // Reset the text when the reset button is clicked
}

testArea.addEventListener("input", start);
testArea.addEventListener("keyup", SpellCheck);
BTN.addEventListener("click", ResetButton);

// Prevent copying of the origin text
const originTextElement = document.querySelector("#origin-text p");
originTextElement.addEventListener("copy", function (event) {
  event.preventDefault();
});
