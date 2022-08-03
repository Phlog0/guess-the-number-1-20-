"use strict";

let answer = Math.floor(Math.random() * (20 - 1) + 1);
console.log(answer);
const resetButton = document.querySelector(".restart");

let score = 20;
let highScore = 0;
displayMessage(".score-output", score);
const checkButton = document.querySelector(".check");

checkButton.addEventListener("click", () => {
  let guess = +document.querySelector(".user-input").value;
  console.log(guess);
  if (!guess || isNaN(guess)) {
    displayMessage(".prompt", "🔴 not a number!");
  } else if (guess !== answer) {
    score--;
    displayMessage(".score-output", score);
    guess > answer
      ? displayMessage(".prompt", "Less!")
      : displayMessage(".prompt", "More!");

    score < 1 ? displayMessage(".score-output", "You lose!") : false;
  } else {
    displayMessage(".prompt", "🎇Congratulations! You guessed!");
    displayMessage(".secret", answer);
    document.body.style.backgroundColor = "green";
    if (score > highScore) {
      highScore = score;
      displayMessage(".highScore-output", score);
    }
  }
});

resetButton.addEventListener("click", () => {
  answer = Math.floor(Math.random() * (20 - 1) + 1);
  displayMessage(".prompt", "Guess my number!");
  displayMessage(".secret", "?");
  score = 20;
  displayMessage(".score-output", score);
  document.body.style.backgroundColor = "black";
});

function displayMessage(place, message) {
  document.querySelector(place).textContent = message;
}
