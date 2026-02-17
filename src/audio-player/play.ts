import type { Playlist } from "./audio-player";
import { initElements } from "./init-elements";

export async function play(index: number, playlist: Playlist) {
  const { progressEl, progressBar, audioPlayer, tracks, currentTrackEl } =
    initElements();

  progressEl.textContent = "00:00 / --:--";
  progressBar.value = "0";
  audioPlayer.pause();
  tracks.forEach((track) => track.classList.remove("active"));
  audioPlayer.src = playlist[index].src;
  currentTrackEl.textContent = playlist[index].title;

  try {
    await new Promise<void>((resolve, reject) => {
      const onLoaded = () => {
        audioPlayer.removeEventListener("loadeddata", onLoaded);
        audioPlayer.removeEventListener("error", onError);
        resolve();
      };

      const onError = (e: ErrorEvent) => {
        audioPlayer.removeEventListener("loadeddata", onLoaded);
        audioPlayer.removeEventListener("error", onError);
        reject(new Error(`Failed to load audio: ${e.message}`));
      };

      audioPlayer.addEventListener("loadeddata", onLoaded, { once: true });
      audioPlayer.addEventListener("error", onError, { once: true });

      // Если аудио уже загружено (кешировано), событие может не произойти
      if (audioPlayer.readyState >= 2) {
        resolve();
      }
    });

    // Сбрасываем время и начинаем воспроизведение
    // audioPlayer.currentTime = 0;

    // Обновляем UI после загрузки
    tracks[index].classList.add("active");

    // Запускаем воспроизведение
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      await playPromise;
    }
  } catch (error) {
    console.error("Error playing track:", error);
    // Здесь можно добавить обработку ошибок (например, показать сообщение пользователю)
  }
}
