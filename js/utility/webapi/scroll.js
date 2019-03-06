export const canUseDOM = () => typeof window !== 'undefined'

export const checkIsMobile = () =>
  canUseDOM() && /mobile/i.test(window.navigator.userAgent)

/**
 * 스크롤 방지
 * @param {*} isLock
 * @param {*} isLockTouchmove 터치 이벤트를 막는다. 모달에 스크롤되는 컨텐츠가 있을 경우 스크롤이 불가능해짐.
 */
const setScrollability = ({
  isLockScroll = false,
  isLockTouchmove = false,
}) => {
  const isMobile = checkIsMobile()

  if (canUseDOM()) {
    if (isLockScroll) {
      // Disable scrolling.
      if (isMobile && isLockTouchmove) {
        document.ontouchmove = e => {
          e.preventDefault()
        }
      } else {
        document.documentElement.style.overflow = 'hidden'
      }
    } else if (!isLockScroll) {
      // Enable scrolling.
      if (isMobile && isLockTouchmove) {
        document.ontouchmove = () => true
      } else {
        document.documentElement.style.overflow = 'initial'
      }
    }
  }
}

/**
 * 스크롤 방지
 *
 * @export
 */
export function disableScroll() {
  if (window.addEventListener)
    // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys
}

/**
 * 스크롤 가능
 *
 * @export
 */
export function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}

export const isScrollable = () => {
  if (canUseDOM()) {
    const browserHeight = window.innerHeight // 뷰포트 높이
    const documentHeight = document.documentElement.offsetHeight
    const isScrollable = documentHeight > browserHeight

    return isScrollable
  } else {
    return false
  }
}
