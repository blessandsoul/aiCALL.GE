export async function attemptAudioPlayback({ audio, onPlaying, onFallback }) {
  if (!audio) {
    onFallback();
    return false;
  }

  try {
    await audio.play();
    onPlaying();
    return true;
  } catch {
    onFallback();
    return false;
  }
}
