/**
 * 소수점 이하 자리가 모두 0이면 정수로 변환한다.
 */
export default function omitZeroDecimals(num) {
  if (typeof num === 'number') {
    const sign = num > 0 ? 1 : -1
    const isZero = num === 0
    const isAllZeroUnderDecimal = Math.abs(num) - parseInt(num, 10) === 0
    return isZero ? 0 : isAllZeroUnderDecimal ? parseInt(num) * sign : num
  } else {
    console.error(`[omitZeroDecimals] parameter should be a number`)
  }
}
