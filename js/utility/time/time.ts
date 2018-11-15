import * as moment from 'moment'

/**
 * 시간을 10분 단위로 조정한다.
 * 타임스탬프 값을 리턴한다.
 */
export const adjustTimeByTenMinute = (timestamp: number): number => {
  if (isAdjustedByTenMinute(timestamp)) {
    return timestamp
  }

  const targetMinute = parseInt(moment(timestamp).format('mm'), 10)

  const remainder = targetMinute % 10
  const minuteInMS = 1000 * 60
  let result

  if (remainder !== 0) {
    const minuteToAdjust = -1 * remainder
    result = timestamp + minuteToAdjust * minuteInMS
  } else {
    result = timestamp
  }

  return result
}

export const isAdjustedByTenMinute = (timestamp: number) => {
  const minute = parseInt(moment(timestamp).format('mm'), 10)
  return minute % 10 === 0
}

/**
 * input type이 datetime-local인 값을 변경했을 때 10분 단위로 조정한다.
 * format을 지정하지 않으면 Unix timestamp 값을 리턴한다.
 */
export const adjustDatetimeInputByTenMin = (options: {
  originalTime: string
  changedTime?: string
  resultFormat?: string // moment format
}) => {
  const { originalTime, changedTime, resultFormat } = options
  const original = moment(originalTime)
  let changed = moment(changedTime || originalTime)

  const originalMinute = parseInt(original.format('mm'), 10)
  let changedMinute = parseInt(changed.format('mm'), 10)

  const isMinuteChanged = originalMinute !== changedMinute
  const isJustOclock = originalMinute === 0 // 정각

  if (isMinuteChanged) {
    const isIncreased = changedMinute > originalMinute

    if (isJustOclock && changedMinute === 59) {
      changedMinute = 50
    } else if (isJustOclock && changedMinute === 1) {
      changedMinute = 10
    } else {
      changedMinute = originalMinute + (isIncreased ? 1 : -1) * 10
    }

    if (changedMinute >= 60) {
      changedMinute = 0
    } else if (changedMinute < 0) {
      changedMinute = 50
    }

    changed.minute(changedMinute)
  }

  const adjusted = adjustTimeByTenMinute(parseInt(changed.format('x'), 10))

  return moment(adjusted).format(resultFormat || 'x')
}

/**
 * 시작시간이 종료시간보다 뒤에 있는지 확인
 */
export const isStartTimeLater = (startTime: Date | string, endTime: Date | string) => {
  return moment(startTime).format('x') > moment(endTime).format('x')
}

/**
 *
 * @param targetTime 비교 대상 시간보다 느리거나 같은지 확인할 시간
 * @param standardTime 바교 대상
 */
export const isTimeLaterOrSame = (
  targetTime: Date | string,
  standardTime: Date | string
) => {
  return moment(targetTime).format('x') >= moment(standardTime).format('x')
}
