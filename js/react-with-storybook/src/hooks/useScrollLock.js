import { useEffect, useMemo } from 'react'

/**
 * 조건을 만족하면 도큐먼트 스크롤 이벤트를 막는다.
 */
export default function useScrollLock(predicate) {
  const isScrollLocked = useMemo(
    () => (typeof predicate === 'function' ? predicate() : predicate),
    [predicate]
  )

  useEffect(() => {
    if (isScrollLocked) {
      lockDocumentScroll(true)
    }

    return () => {
      if (isScrollLocked) {
        lockDocumentScroll(false)
      }
    }
  }, [isScrollLocked])

  return [isScrollLocked]
}

/**
 * 컴포넌트가 마운트되었을 때 도큐먼트 스크롤 이벤트를 막는다.
 */
export function useScrollLockOnMount() {
  useEffect(() => {
    lockDocumentScroll(true)
    return () => {
      lockDocumentScroll(false)
    }
  }, [])
}

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
        document.ontouchmove = (e) => {
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
