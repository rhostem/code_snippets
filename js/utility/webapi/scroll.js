export const toggleLockBodyScroll = (lock = true) => {
  const body = document.documentElement.getElementsByTagName('body')[0]
  if (lock) {
    body.style.overflow = 'hidden'
  } else {
    body.style.overflow = 'initial'
  }
}

/**
 * 스크롤 방지
 * @param {*} isLocked
 * @param {*} isTouchLocked 터치 이벤트를 막는다. 모달에 스크롤되는 컨텐츠가 있을 경우 스크롤이 불가능해짐.
 */
export const toggleScrollability = (isLocked, isTouchLocked = false) => {
  const bodyElement = canUseDOM()
    ? Array.prototype.slice.call(document.getElementsByTagName('body'))[0]
    : null

  if (canUseDOM() && isLocked) {
    // Disable scrolling.
    if (checkIsMobile() && isTouchLocked) {
      document.ontouchmove = function(e) {
        e.preventDefault()
      }
    } else {
      bodyElement.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    }
  } else if (canUseDOM() && !isLocked) {
    // Enable scrolling.
    if (checkIsMobile() && isTouchLocked) {
      document.ontouchmove = function(e) {
        return true
      }
    } else {
      bodyElement.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
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
