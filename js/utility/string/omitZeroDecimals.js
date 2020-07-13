/**
 * 소수점 이하 자리가 모두 0이면 정수로 변환한다.
 */
export default function omitZeroDecimals(num) {
  if (!isNaN(parseFloat(num))) {
    const floatNum = parseFloat(num)
    const sign = floatNum > 0 ? 1 : -1
    const isZero = floatNum === 0
    const isAllZeroUnderDecimal =
      Math.abs(floatNum) - parseInt(floatNum, 10) === 0

    return isZero
      ? 0
      : isAllZeroUnderDecimal
      ? parseInt(floatNum) * sign
      : floatNum
  } else {
    console.warn(
      `[omitZeroDecimals] parameter should be a number or number string`
    )
    return num
  }
}
