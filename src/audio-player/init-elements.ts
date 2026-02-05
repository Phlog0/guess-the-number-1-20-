export function initElements() {
  const resetButton = document.querySelector(".restart");
  if (!resetButton || !(resetButton instanceof HTMLButtonElement)) {
    throw new Error("ошибка");
  }
  const changeThemeButton = document.querySelector(".changeTheme");
  if (!changeThemeButton || !(changeThemeButton instanceof HTMLButtonElement)) {
    throw new Error("Не найдена кнопка смены темы");
  }
  const sunIcon = document.querySelector(".sun-icon");
  if (!sunIcon) {
    throw new Error("Не найдена иконка солнца");
  }
  const moonIcon = document.querySelector(".moon-icon");
  if (!moonIcon) {
    throw new Error("Не найдена иконка луны");
  }
  const userInput = document.querySelector(".user-input");
  if (!userInput || !(userInput instanceof HTMLInputElement)) {
    throw new Error("Ошибка с полем ввода");
  }

  const audioPlayer = document.getElementById("audioPlayer");
  if (!(audioPlayer instanceof HTMLAudioElement)) {
    throw new Error("Не найден audioPlayer");
  }
  const playlistMenuBtn = document.getElementById("playlistMenuBtn");
  if (!(playlistMenuBtn instanceof HTMLButtonElement)) {
    throw new Error("Не найден playlistMenuBtn");
  }
  const playBtn = document.getElementById("playBtn");
  if (!(playBtn instanceof HTMLButtonElement)) {
    throw new Error("Не найден playBtn");
  }

  const prevBtn = document.getElementById("prevBtn");
  if (!(prevBtn instanceof HTMLButtonElement)) {
    throw new Error("Не найден prevBtn");
  }
  const nextBtn = document.getElementById("nextBtn");
  if (!(nextBtn instanceof HTMLButtonElement)) {
    throw new Error("Не найден nextBtn");
  }
  const muteBtn = document.getElementById("muteBtn");
  if (muteBtn === null) {
    throw new Error("Не найден muteBtn");
  }
  const loopBtn = document.getElementById("loopBtn");
  if (!(loopBtn instanceof HTMLButtonElement)) {
    throw new Error("Не найден loopBtn");
  }
  const volumeSlider = document.getElementById("volumeSlider");
  if (!(volumeSlider instanceof HTMLInputElement)) {
    throw new Error("Не найден volumeSlider");
  }
  const progressBar = document.getElementById("progressBar");
  if (!(progressBar instanceof HTMLInputElement)) {
    throw new Error("Не найден progressBar");
  }
  const currentTrackEl = document.getElementById("currentTrack");
  if (currentTrackEl === null) {
    throw new Error("Не найден currentTrackEl");
  }
  const progressEl = document.getElementById("progress");
  if (progressEl === null) {
    throw new Error("Не найден progressEl");
  }
  const playlistEl = document.querySelector(".playlist");
  if (playlistEl === null) {
    throw new Error("Не найден playlist");
  }
  const tracks = document.querySelectorAll(".track");
  if (tracks === null) {
    throw new Error("Не найден tracks");
  }

  const copyMailBtn = document.getElementById("copyMailBtn");
  if (!(copyMailBtn instanceof HTMLButtonElement)) {
    throw Error("Не найден copyMailBtn");
  }
  const toast = document.getElementById("toast");
  if (!(toast instanceof HTMLDivElement)) {
    throw Error("Не найден toast");
  }
  return {
    resetButton,
    changeThemeButton,
    sunIcon,
    moonIcon,
    userInput,
    audioPlayer,
    playBtn,
    prevBtn,
    nextBtn,
    muteBtn,
    volumeSlider,
    progressBar,
    currentTrackEl,
    progressEl,
    playlistEl,
    tracks,
    loopBtn,
    playlistMenuBtn,
    copyMailBtn,
    toast,
  };
}
