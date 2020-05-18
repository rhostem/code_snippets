import { devWarn } from './log'

/**
 * 적절한 데이트스트링인지 검사한다.
 * @param  {[String]} dateString [ex. 2015-01-01]
 */
const isValidDateString = (dateString: string) => {
  if (!dateString) {
    return false
  } else {
    const isValid = !isNaN(Date.parse(dateString))
    if (!isValid) {
      devWarn('유효한 날짜 형식이 아닙니다:', dateString)
    }
    return isValid
  }
}

export default isValidDateString
