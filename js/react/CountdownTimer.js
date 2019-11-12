import React, {
  useCallback,
  useReducer,
  useState,
  useEffect,
  useRef,
} from 'react'
import padZeroToSingleDigit from 'childs/lib/string/padZeroToSingleDigit'

const hourInSec = 60 * 60
const minuteInSec = 60

/**
 * 카운트다운 타이머, renderProps 패턴을 사용한다
 */
export default function CountdownTimer({
  render = ({ time }) => {},
  initialTimeLeft = 0,
  onTimeOver = () => {}, // 시간 초과했을 때 콜백
  hhmmss = false,
  isVisible = true,
}) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
  const timerId = useRef(null)

  // 초기값 설정
  useEffect(() => {
    setTimeLeft(initialTimeLeft)

    timerId.current = setInterval(() => {
      setTimeLeft(current => {
        return --current
      })
    }, 1000)

    return () => {
      clearInterval(timerId.current)
      setTimeLeft(0)
    }
  }, [initialTimeLeft])

  useEffect(() => {
    const hour = Math.floor(timeLeft / hourInSec)
    const minute = Math.floor((timeLeft % hourInSec) / minuteInSec)
    const second = timeLeft % minuteInSec

    dispatch({
      payload: {
        hour: padZeroToSingleDigit(hour),
        minute: padZeroToSingleDigit(minute),
        second: padZeroToSingleDigit(second),
      },
    })

    return () => {}
  }, [initialTimeLeft, timeLeft])

  const [currentTimer, dispatch] = useReducer(
    (state, action = {}) => {
      const { payload } = action
      if (!!payload) {
        return payload
      } else {
        return state
      }
    },
    {
      hour: '00',
      minute: '00',
      second: '00',
    }
  )

  const { hour, minute, second } = currentTimer

  return <div>{render({ hour, minute, second })}</div>
}
