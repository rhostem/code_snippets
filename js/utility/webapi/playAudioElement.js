/**
 * 오디오 요소 재생.
 * 재생 중이라면 멈추고 처음부터 재생한다.
 * @param {*} audioEl
 */
export default function playAudioElement(audioEl: HTMLAudioElement) {
  if (audioEl) {
    audioEl.muted = false
    audioEl.volume = 1
    audioEl.pause()
    audioEl.currentTime = 0
    audioEl.play()
  }
}
