export default function throttle<T extends (...args: any[]) => any>(
  delay: number,
  callback: T
) {
  let previousCall = new Date().getTime()
  return function throttled(...args: Parameters<T>) {
    const time = new Date().getTime()

    if (time - previousCall >= delay) {
      // 마지막 호출로부터 delay 이상이 지나야 호출한다.
      previousCall = time
      callback(...args)
    }
  }
}
