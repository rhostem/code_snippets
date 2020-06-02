/**
 * 4자리 이상 숫자에는 천 단위에 콤마룰 추가한다
 * @param {*} value
 */
export default function addCommaToNum(value) {
  /**
   * (/\B(?=(\d{3})+(?!\d))/
   *
   * 캡쳐링 그룹이 중첩되어 있다. 숫자 3개가 반복되는 패턴의 시작점을 찾아서 그 위치를 콤마로 바꾼다. \
   * B는 단어의 경계가 아닌 곳에 일치하므로
   * 숫자1~2개 + \B + 숫자 3개 반복 + 숫자가 아닌 문자 패턴이 된다
   * 경계 \B를 콤마로 변경한다
   * ex) 1 + \B + 000 + ,000
   *     1,000,000
   */
  const addComma = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const isNumHasDecimalPoint = num => num.toString().indexOf('.') > -1

  if (value === undefined || value === null) {
    return ''
  } else {
    if (isNumHasDecimalPoint(value)) {
      const [int, real] = value.toString().split('.')
      return addComma(int) + '.' + real
    } else {
      return addComma(value)
    }
  }
}
