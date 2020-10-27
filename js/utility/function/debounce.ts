export default function debounce(
  wait: number,
  cb: Function,
  immediate?: boolean
) {
  let timeout: any
  return function debounced(...args: any[]) {
    const later = () => {
      timeout = null
      if (!immediate) cb(...args)
    }
    // immediate가 true일 경우 최초 호출시 즉시 실행됨. 그 다음 호출부터는 debounce 적용.
    const callNow = immediate && !timeout
    // wait만큼의 시간이 지나지 않으면 clearTimeout 때문에 later가 실행되지 않음.
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) cb(...args)
  }
}
