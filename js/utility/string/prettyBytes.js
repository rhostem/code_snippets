/**
 * 바이트를 읽기 쉽도록 단위를 붙인 값으로 변환한다.
 *
 * @param {*} num byte 단위 숫자
 * @param {*} precision 정확도 => 표시할 자릿수
 * @param {*} addSpace 숫자와 바이트단위 사이에 공백을 넣을 것인지
 */
export default function prettyBytes(num, precision = 3, addSpace = true) {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (Math.abs(num) < 1) {
    return num + (addSpace ? ' ' : '') + UNITS[0]
  }

  const exponent = Math.min(
    // 밑이 10인 로그값 (10의 n승)을 구한 후 3으로 나눈다. 바이트 단위는 10의 3승 단위로 구분되므로.
    // n이 1000(KB) 이상, 1000000(MD) 미만 1이 되므로 UNITS 배열에서 'KB'에 매칭된다
    Math.floor(Math.log10(num < 0 ? -num : num) / 3),
    UNITS.length - 1 // 최대 단위가 YB (yottabyte) 가 되도록 함
  )

  const n = Number(
    // exponent을 3(=10^3)으로 나눴으므로 지수 계산을 할때도 10^3을 나눈 값으로 계산한다.
    ((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision)
  )

  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent]
}
