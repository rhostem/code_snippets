var timeLeft = 100000
var timerId = null
var interval = 10
var displayInterval = 1000

onmessage = function(e) {
  const { data } = e
  const eventType = data[0]

  switch (eventType) {
    case 'START_TIMER':
      startTimer(data[1], data[2], data[3])
      break

    case 'STOP_TIMER':
      stopTimer()
      break

    default:
      break
  }
}

const startTimer = (
  timeLeftOpt = 100000,
  intervalOpt = 10,
  displayIntervalOpt = 1000
) => {
  postMessage(['START_TIMER', timeLeftOpt])

  timeLeft = timeLeftOpt <= 0 ? 0 : timeLeftOpt

  if (interval) {
    interval = intervalOpt
  }

  if (displayInterval) {
    displayInterval = displayIntervalOpt
  }

  let ellapsedForDisplay = timeLeftOpt % displayInterval

  clearInterval(timerId)
  timerId = setInterval(() => {
    timeLeft -= interval
    ellapsedForDisplay += interval

    if (timeLeft <= 0) {
      timeLeft = 0
      // stopTimer()
      clearInterval(timerId)
      postMessage(['TIME_OVER'])
    } else {
      if (ellapsedForDisplay >= displayInterval) {
        ellapsedForDisplay = 0
        postMessage(['UPDATE_TIMER', timeLeft])
      }
    }
  }, interval)
}

const stopTimer = () => {
  clearInterval(timerId)
  postMessage(['STOP_TIMER', timeLeft])
}
