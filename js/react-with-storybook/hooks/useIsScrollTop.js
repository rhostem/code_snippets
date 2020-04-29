import { useState, useEffect, useCallback, useMemo } from 'react'
import { throttle } from 'throttle-debounce'

export default function useIsScrollTop() {
  const [isScrollTop, setIsScrollTop] = useState(true)

  const handleCheckIsScrollTop = useCallback(
    throttle(100, () => {
      if (window.scrollY > 0) {
        setIsScrollTop(false)
      } else {
        setIsScrollTop(true)
      }
    }),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleCheckIsScrollTop)
    return () => {
      window.removeEventListener('scroll', handleCheckIsScrollTop)
    }
  }, [handleCheckIsScrollTop])

  return [isScrollTop]
}
