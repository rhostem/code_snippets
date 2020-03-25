/**
 * 타겟 엘레멘트 위치로 스크롤 이동
 * @param {*} selector 엘레멘트 셀렉터. ex) #elementId
 * @param {['auto', 'smooth']} behavior 화면 전환 애니메이션.
 */
export const scrollTo = (selector, behavior = 'smooth') => {
  const targetEl = document.querySelector(selector)
  targetEl.scrollIntoView({
    behavior: behavior,
  })
}

export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
})

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

/**
 * 페이지 맨 밑이 보이고 있는지 확인
 */
export const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight)

/**
 * 스크롤 방지
 * @param {*} isLock
 * @param {*} isLockTouchmove 터치 이벤트를 막는다. 모달에 스크롤되는 컨텐츠가 있을 경우 스크롤이 불가능해짐.
 */
export const lockDocumentScroll = (
  isLockScroll = true,
  { isLockTouchmove = false } = {}
) => {
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
export const canUseDOM = () => typeof window !== 'undefined'

export const checkIsMobile = () =>
  canUseDOM() && /mobile/i.test(window.navigator.userAgent)
