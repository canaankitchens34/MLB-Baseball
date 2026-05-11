// script.js
let coins = parseInt(localStorage.getItem("coins")) || 0;
let power = parseInt(localStorage.getItem("power")) || 1;
let contact = parseInt(localStorage.getItem("contact")) || 1;
let speed = parseInt(localStorage.getItem("speed")) || 1;

const coinsDisplay = document.getElementById("coins");
const powerDisplay = document.getElementById("powerLevel");
const contactDisplay = document.getElementById("contactLevel");
const speedDisplay = document.getElementById("speedLevel");
const resultDisplay = document.getElementById("result");
const swingBtn = document.getElementById("swingBtn");
const ball = document.getElementById("ball");
const marker = document.getElementById("timingMarker");

let markerPosition = 0;
let direction = 1;
let meterInterval;

function updateUI() {
  coinsDisplay.textContent = coins;
  powerDisplay.textContent = power;
  contactDisplay.textContent = contact;
  speedDisplay.textContent = speed;

  localStorage.setItem("coins", coins);
  localStorage.setItem("power", power);
  localStorage.setItem("contact", contact);
  localStorage.setItem("speed", speed);
}

function startPitch() {
  ball.style.animationPlayState = "running";

  markerPosition = 0;
  direction = 1;

  clearInterval(meterInterval);

  meterInterval = setInterval(() => {
    markerPosition += direction * (4 + speed);

    if (markerPosition >= 100) direction = -1;
    if (markerPosition <= 0) direction = 1;

    marker.style.left = `${markerPosition}%`;
  }, 20);
}

function swing() {
  clearInterval(meterInterval);
  ball.style.animationPlayState = "paused";

  const perfectMin = 40 - contact * 2;
  const perfectMax = 60 + contact * 2;

  if (markerPosition >= perfectMin && markerPosition <= perfectMax) {
    const distance = Math.floor(350 + Math.random() * 100 + power * 15);
    coins += 5 + power;
    resultDisplay.textContent = `💣 HOME RUN! ${distance} ft!`;
  } else if (Math.abs(markerPosition - 50) < 25) {
    coins += 2;
    resultDisplay.textContent = "⚾ Solid hit! Double!";
  } else {
    resultDisplay.textContent = "❌ Weak contact. Out.";
  }

  updateUI();

  setTimeout(startPitch, 1500);
}

function buyUpgrade(type) {
  if (coins < 10) {
    resultDisplay.textContent = "Not enough coins!";
    return;
  }

  coins -= 10;

  if (type === "power") power++;
  if (type === "contact") contact++;
  if (type === "speed") speed++;

  resultDisplay.textContent = `⬆️ Upgraded ${type}!`;

  updateUI();
}

swingBtn.addEventListener("click", swing);

updateUI();
startPitch();
