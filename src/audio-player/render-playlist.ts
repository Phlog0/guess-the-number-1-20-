import type { Playlist } from "./audio-player";
import { initElements } from "./init-elements";

export function renderPlaylist(playlist: Playlist, currentIndex?: number) {
  const { playlistEl } = initElements();

  let result = "";
  for (let i = 0; i < playlist.length; i++) {
    result += `<div class="track ${currentIndex === i ? "active" : ""}" data-index="${i}">${playlist[i].title}</div>`;
  }
  playlistEl.insertAdjacentHTML("beforeend", result);
}
