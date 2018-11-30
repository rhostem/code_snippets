/**
 * dateString을 이용해서 지역 시간대와 형식에 맞는 문자열을 반환
 * ex) "2016년 5월 12일 오후 7:50:01"
 *
 * @param  {[String]} dateString
 * @param  {[Number]} timezoneOffset [ -12 ~ 12]
 */
export const getLocaleTimeString = (dateString, timezoneOffset) => {
  if (!dateString) {
    return ''
  }

  let time = null

  // 타임존을 적용할 필요가 있을 때 사용
  if (timezoneOffset) {
    const defaultTime = new Date(dateString).getTime()
    time = new Date(defaultTime + timezoneOffset * 60 * 60 * 1000)
  } else {
    time = new Date(dateString)
  }

  return time.toLocaleTimeString('ko-KR', {
    year: 'numeric',
    month: 'narrow',
    day: 'numeric',
  })
}
