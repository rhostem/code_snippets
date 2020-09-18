import useImageLoader from 'hooks/useImageLoader'
import { useEffect, useRef } from 'react'

export default function useCallOnce(cb = () => {}) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
    }

    if (typeof cb === 'function') {
      cb()
    } else {
      console.error('cb is not a function')
    }

    return () => {
      didMountRef.current = false
    }
  }, [cb])

  return [didMountRef.current] // isCalled
}
