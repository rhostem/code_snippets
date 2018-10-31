const canUseDOM = () => typeof window !== 'undefined'

const checkIsMobile = () => {
  return canUseDOM() && /mobile/i.test(window.navigator.userAgent)
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
      document.ontouchmove = function (e) {
        e.preventDefault()
      }
    } else {
      bodyElement.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    }
  } else if (canUseDOM() && !isLocked) {
    // Enable scrolling.
    if (checkIsMobile() && isTouchLocked) {
      document.ontouchmove = function (e) {
        return true
      }
    } else {
      bodyElement.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
  }
}

// body.modal-open {
//   overflow: hidden;
// }
