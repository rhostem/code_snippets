import React, { useState, useEffect } from 'react'
import { prependZero } from 'lib/string/prependZero'

const defaultTimeFormatter = time => {
  if (!!time) {
    const minutes = parseInt(time / 60)
    const seconds = time % 60

    return `${prependZero(minutes)}:${prependZero(seconds)}`
  } else {
    return '00:00'
  }
}

/**
 * 타운트다운 타이머, renderProps 패턴을 사용한다
 */
export default function CountdownTimer({
  render = ({ time }) => {},
  isOn = false,
  initialTimeLeft = 0,
  onTimeOver = () => {}, // 시간 초과했을 때 콜백
  timeFormatter = defaultTimeFormatter,
}) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
  let timerId = null

  /**
   * 타이머 시작
   * @param {number} timeLeft 남은 시간
   */
  const startTimer = timeLeft => {
    clearInterval(timerId)

    if (timeLeft > 0) {
      let nextTimeLeft = timeLeft

      timerId = setInterval(() => {
        nextTimeLeft -= 1
        if (nextTimeLeft >= 0) {
          console.log(`nextTimeLeft`, nextTimeLeft)
          setTimeLeft(nextTimeLeft)
        } else {
          clearInterval(timerId)
          onTimeOver()
        }
      }, 1000)
    }
  }

  // 타이머 온 여부가 변경되면 타이머를 재시작한다
  useEffect(() => {
    clearInterval(timerId)

    if (isOn) {
      startTimer(initialTimeLeft)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [isOn])

  return <render time={timeFormatter(timeLeft)} />
}
