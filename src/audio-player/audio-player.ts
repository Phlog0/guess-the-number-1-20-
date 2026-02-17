import { formatTime } from "./format-time";
import { initElements } from "./init-elements";
import { play } from "./play";
import { renderPlaylist } from "./render-playlist";

export type Playlist = {
  title: string;
  src: string;
}[];
export function audioPlayer() {
  const musicFolder = "/audio";
  const {
    audioPlayer,
    volumeSlider,
    loopBtn,
    muteBtn,
    nextBtn,
    playBtn,
    playlistEl,
    prevBtn,
    progressBar,
    progressEl,
    playlistMenuBtn,
  } = initElements();
  let currentTrackIndex = 0;

  let isPaused = true;
  let isMuted = false;
  let isLooped = true;
  let audioVolume = 0.9;
  let isPlaylistMenuClosed = true;

  const playlist: Playlist = [
    {
      title: "Yume 2kki - Blinking Docks",
      src: `${musicFolder}/Yume 2kki - Blinking Docks.mp3`,
    },
    {
      title: "Yume 2kki - Underwater Forest",
      src: `${musicFolder}/Yume 2kki - Underwater Forest.mp3`,
    },
    {
      title: "Yume Nikki - Dark world",
      src: `${musicFolder}/Yume Nikki - Dark world.mp3`,
    },
    {
      title: "Yume Nikki - Hell _ Graffiti world",
      src: `${musicFolder}/Yume Nikki - Hell _ Graffiti world.mp3`,
    },
  ];

  audioPlayer.volume = audioVolume;
  volumeSlider.value = String(audioVolume);
  playlistEl.addEventListener("click", (e) => {
    if (!e.target || !(e.target instanceof HTMLDivElement)) {
      return;
    }
    const track = e.target.closest(".track");
    if (track) {
      const index = Number(track.getAttribute("data-index"));

      playBtn.textContent = "⏸️";
      currentTrackIndex = index;
      // resetProgressUI();

      progressEl.textContent = "Загрузка...";
      progressBar.classList.add("loading");
      console.log({ currentTrackIndex });
      audioPlayer.src = playlist[currentTrackIndex].src;
      play(currentTrackIndex, playlist);
      isPaused = false;
    }
  });
  nextBtn.addEventListener("click", () => {
    playBtn.textContent = "⏸️";
    progressBar.value = "0";
    audioPlayer.currentTime = 0;
    if (currentTrackIndex >= playlist.length - 1) {
      currentTrackIndex = 0;
      play(currentTrackIndex, playlist);
      return;
    }
    currentTrackIndex += 1;
    isPaused = false;
    play(currentTrackIndex, playlist);
  });
  prevBtn.addEventListener("click", () => {
    playBtn.textContent = "⏸️";
    progressBar.value = "0";
    audioPlayer.currentTime = 0;
    if (currentTrackIndex <= 0) {
      currentTrackIndex = playlist.length - 1;
      play(currentTrackIndex, playlist);

      return;
    }
    currentTrackIndex -= 1;
    isPaused = false;

    play(currentTrackIndex, playlist);
  });
  playBtn.addEventListener("click", () => {
    if (isPaused) {
      play(currentTrackIndex, playlist);
      audioPlayer.play();
      isPaused = false;
      playBtn.textContent = "⏸️";
    } else {
      isPaused = true;

      audioPlayer.pause();
      playBtn.textContent = "▶️";
    }
  });
  muteBtn.addEventListener("click", () => {
    if (isMuted) {
      isMuted = false;
      muteBtn.textContent = "🔊";
      audioVolume = 1;
      audioPlayer.volume = audioVolume;
      volumeSlider.value = String(audioVolume);
    } else {
      isMuted = true;
      muteBtn.textContent = "🔇";
      audioVolume = 0;
      audioPlayer.volume = audioVolume;
      volumeSlider.value = String(audioVolume);
    }
  });

  volumeSlider.addEventListener("input", () => {
    audioVolume = volumeSlider.valueAsNumber;
    if (audioVolume === 1) {
      muteBtn.textContent = "🔊";
    }
    if (audioVolume === 0) {
      muteBtn.textContent = "🔇";
    }

    audioPlayer.volume = audioVolume;
  });
  audioPlayer.addEventListener("timeupdate", () => {
    if (!isNaN(audioPlayer.duration)) {
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.value = String(progressPercent);
      progressEl.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
  });
  progressBar.addEventListener("input", () => {
    const currentStamp =
      (progressBar.valueAsNumber / 100) * audioPlayer.duration;
    audioPlayer.currentTime = currentStamp;
  });
  audioPlayer.addEventListener("ended", () => {
    nextBtn.click();
  });
  loopBtn.addEventListener("click", () => {
    if (isLooped) {
      loopBtn.textContent = "📛";

      audioPlayer.removeAttribute("loop");
    } else {
      loopBtn.textContent = "🔁";
      audioPlayer.setAttribute("loop", "loop");
    }
    isLooped = !isLooped;
  });
  playlistMenuBtn.addEventListener("click", () => {
    if (isPlaylistMenuClosed) {
      playlistMenuBtn.textContent = "🔼";
      playlistEl.classList.remove("hidden");
    } else {
      playlistMenuBtn.textContent = "🔽";
      playlistEl.classList.add("hidden");
    }
    isPlaylistMenuClosed = !isPlaylistMenuClosed;
  });
  renderPlaylist(playlist, currentTrackIndex);
}
