/**
 * 생년월일을 기반으로 현재 시점의 만 나이를 계산한다.
 * @param  {[string]} birthDate [YYYY-MM-DD 형식]
 * @param  {[type]} calcPointDate [날짜 계산 기준일]
 * @return {[number]}           [만 나이]
 */
export const calcAge = (birthDate, calcPointDate) => {
  if (!isValidDateString(birthDate)) {
    return 0
  }

  // 입력한 생일이 현재보다 미래일 경우
  if (new Date() < new Date(birthDate)) {
    return 0
  }

  if (calcPointDate && !isValidDateString(calcPointDate)) {
    return 0
  }

  // 나이 계산 시점. 기본으로 현재
  const calcPointTime = calcPointDate ? new Date(calcPointDate) : new Date()
  const birthDateTime = new Date(birthDate)

  // 태어난 날짜의 년월일
  const birth = {
    year: birthDateTime.getFullYear(),
    month: birthDateTime.getMonth() + 1,
    day: birthDateTime.getDate(),
  }

  // 현재 날짜의 년월일
  const current = {
    year: calcPointTime.getFullYear(),
    month: calcPointTime.getMonth() + 1,
    day: calcPointTime.getDate(),
  }

  const timeOfBirthDay = new Date(`${birth.month}-${birth.day}`)
  const timeOfCurrent = new Date(`${current.month}-${current.day}`)

  // 생일 이전인지
  const isBeforeBirthDay = timeOfCurrent < timeOfBirthDay
  // 만 나이 계산
  const age = isBeforeBirthDay
    ? current.year - birth.year - 1
    : current.year - birth.year

  return age
}
