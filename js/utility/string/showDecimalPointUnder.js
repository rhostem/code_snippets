/**
 * 실수의 소수점 n번째자리까지 표시
 * @param {*} value 숫자. 실수
 * @param {*} point 표시할 소수점 자리
 */
export default function showDecimalPointUnder(value, point = 0) {
  if (value && value !== 0 && typeof value === 'number') {
    if (point === 0) {
      return parseInt(value)
    } else {
      return parseInt(value * Math.pow(10, point)) / Math.pow(10, point)
    }
  } else {
    return value
  }
}
