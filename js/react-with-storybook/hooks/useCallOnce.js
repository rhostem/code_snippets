import { useEffect, useRef, useState } from 'react'

export default function useCallOnce(cb = () => {}) {
  const didMountRef = useRef(false)
  const [isCalled, setIsCalled] = useState(false)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      setIsCalled(true)
    }

    if (typeof cb === 'function') {
      cb()
    } else {
      console.error('cb is not a function')
    }

    return () => {
      didMountRef.current = false
      setIsCalled(false)
    }
  }, [cb])

  return [isCalled]
}
