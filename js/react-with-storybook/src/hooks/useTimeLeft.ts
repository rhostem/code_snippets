import { useState, useEffect, useRef } from 'react'

type Callback = () => void

const useTimeLeft = (
  callback: Callback
): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [left, setLeft] = useState<number>(-1)
  const savedCallback = useRef<Callback>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (left > 0) {
      timer = setTimeout(() => {
        if (left === 1 && savedCallback?.current) {
          savedCallback.current()
        }
        setLeft((curr: number) => curr - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [left])

  return [left, setLeft]
}

export default useTimeLeft
