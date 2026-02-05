"use strict";
import { audioPlayer } from "./audio-player/audio-player";
import { initElements } from "./audio-player/init-elements";
import { initTheme } from "./theme/init-theme";
import { toggleTheme } from "./toggle-theme";

document.addEventListener("DOMContentLoaded", function () {
  const { copyMailBtn, toast, changeThemeButton, userInput, resetButton } =
    initElements();
  let answer = Math.floor(Math.random() * (20 - 1) + 1);
  console.log({ answer });
  // let theme: ProjectTheme = "dark";

  let score = 20;
  let highScore = 0;

  initTheme();
  changeThemeButton.addEventListener("click", toggleTheme);

  displayMessage(".score-output", score);
  const checkButton = document.querySelector(".check");

  if (!(checkButton instanceof HTMLButtonElement)) {
    throw new Error("ошибка");
  }
  checkButton.addEventListener("click", () => {
    let guess = userInput.valueAsNumber;

    if (!guess || isNaN(guess)) {
      displayMessage(".prompt", "🔴 not a number!");
    } else if (guess !== answer) {
      score = score - 1;
      displayMessage(".score-output", score);
      if (guess > answer) {
        displayMessage(".prompt", "Less!");
      } else {
        displayMessage(".prompt", "More!");
      }
      // guess > answer
      //   ?
      //   :
      if (score < 1) {
        displayMessage(".score-output", `You lose! It was ${answer}`);
        document.body.style.backgroundColor = "red";
      }

      // score < 1 ? displayMessage(".score-output", "You lose!") : false;
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
    document.body.style.backgroundColor = "var(--background-color)";
    userInput.value = "";
  });

  function displayMessage(place: string, message: string | number) {
    const el = document.querySelector(place);
    if (!el) {
      throw new Error("Не найден элемент");
    }
    el.textContent = String(message);
  }

  copyMailBtn.addEventListener("click", async () => {
    try {
      // Attempt to write the text to the clipboard
      await navigator.clipboard.writeText("sergeyzadorkin.w@gmail.com");
      toast.classList.add("toast-visible");
      setTimeout(() => {
        toast.classList.remove("toast-visible");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  });
});
audioPlayer();
