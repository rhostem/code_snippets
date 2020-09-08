import { useEffect, useCallback, useState, useRef } from 'react'
import { throttle } from 'throttle-debounce'

function useToggleFixed() {
  const targetRef = useRef(null)
  const [isFixed, setIsFixed] = useState(false)
  const [targetElRect, setTargetElRect] = useState({})

  // 탭 고정 로직
  const handleScroll = useCallback(
    throttle(100, () => {
      const rect = targetRef.current?.getBoundingClientRect()

      if (rect) {
        setTargetElRect(rect)

        console.log(`rect`, rect)

        // 엘레멘트의 사이즈가 0 이상이어야 한다.
        if (rect.width !== 0 && rect.height !== 0) {
          if (typeof rect.top === 'number' && rect.top < 0) {
            setIsFixed(true)
          } else if (typeof rect.top === 'number' && rect.top >= 0) {
            setIsFixed(false)
          }
        }
      }
    }),
    [targetRef.current]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  return [isFixed, targetRef, targetElRect, handleScroll]
}

export default useToggleFixed
