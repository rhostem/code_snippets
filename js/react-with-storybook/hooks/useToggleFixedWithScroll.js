import { useEffect, useCallback, useMemo, useState, useRef } from 'react'
import { throttle } from 'throttle-debounce'

/**
 * 스크롤 다운시 화면에 표시되지 않으면 고정시킬 것인지 결정
 */
function useToggleFixedWithScroll() {
  const targetRef = useRef(null)
  const [isFixed, setIsFixed] = useState(false)
  const [targetElRect, setTargetElRect] = useState({})

  // 탭 고정 로직
  const handleScroll = useCallback(
    throttle(100, () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()

        if (rect.top < 0) {
          setIsFixed(true)
          setTargetElRect(rect)
        } else {
          setIsFixed(false)
        }
      }
    }),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.addEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return {
    isFixed,
    targetRef,
    targetElRect,
    handleScroll,
  }
}

export default useToggleFixed
