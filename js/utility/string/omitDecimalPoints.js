const isInt = (num) => num === parseInt(num)

/**
 * 소수점 n번째 자리까지 표시
 * @param {*} place 표시할 소수점 자리수
 */
export default function omitDecimalPoints(num, place = 1) {
  return !isNaN(num) && isInt(place) && place >= 1
    ? Math.round(num * Math.pow(10, place)) / Math.pow(10, place)
    : num
}
