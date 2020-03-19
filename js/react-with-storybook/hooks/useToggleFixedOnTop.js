import React, { useCallback, useState, useEffect } from 'react'
import { throttle } from 'throttle-debounce'

/**
 * 스크롤 다운해서 엘레멘트가 보이지 않게 되면 상단에 고정시킨다.
 * @param {*} WrappedComponent
 */
const useToggleFixedOnTop = ({
  wrapperRef,
  interval = 100,
}: {
  wrapperRef: React.Ref<HTMLElement>,
  interval: number, // throttle 딜레이
}) => {
  const [isTabFixed, setIsTabFixed] = useState(false)
  const [mainTabTop, setMainTabTop] = useState(0)
  const [wrapperWith, setWrapperWidth] = useState(null)

  // 스크롤 이벤트. 탭 고정 여부 결정
  const toggleTabFixed = useCallback(
    throttle(interval, () => {
      if (wrapperRef.current) {
        const { top } = wrapperRef.current.getBoundingClientRect()
        setMainTabTop(top)

        const isTopEdgeOutofScreen = top < 0 //  목록 최상단이 화면 바깥으로 나갔는지
        setIsTabFixed(isTopEdgeOutofScreen) // 상단부가 화면 바깥으로 나갔다면, 탭은 고정되어야 한다.
      }
    }),
    []
  )

  // 페이지 넓이 업데이트. fixed된 탭의 넓이로 사용한다.
  const updateWrapperWidth = useCallback(
    throttle(interval, () => {
      if (wrapperRef.current) {
        const { width } = wrapperRef.current.getBoundingClientRect()
        setWrapperWidth(width)
      }
    }),
    []
  )

  /**
   * 콜백 실행시 조건에 따라 스크롤 상단으로 이동시킨다
   */
  const withScrollToTop = useCallback(
    cb => () => {
      // 탭의 실제 위치(목록 최상단)가 화면에 보이지 않는다면, 그 간격만큼 이동시킨다.
      if (mainTabTop < 0) {
        // fixed 상태를 변경시키지 않기 위해서 1px 덜 올라가게 만든다.
        window.scrollBy(0, mainTabTop + 1)
      }

      // 콜백 실행
      if (typeof cb === 'function') {
        cb()
      }
    },
    [mainTabTop]
  )

  // 윈도우 스크롤 이벤트 연결 및 해제
  useEffect(() => {
    window.addEventListener('scroll', toggleTabFixed)
    window.addEventListener('scroll', updateWrapperWidth)
    return () => {
      window.removeEventListener('scroll', toggleTabFixed)
      window.removeEventListener('scroll', updateWrapperWidth)
    }
  }, [toggleTabFixed, updateWrapperWidth])

  // 윈도우 리사이즈 이벤트 연결 및 해제
  useEffect(() => {
    window.addEventListener('resize', updateWrapperWidth)
    return () => {
      window.removeEventListener('resize', updateWrapperWidth)
    }
  }, [updateWrapperWidth])

  return {
    isTabFixed,
    mainTabTop,
    pageWidth: wrapperWith,
    withScrollToTop,
  }
}

export default useToggleFixedOnTop
