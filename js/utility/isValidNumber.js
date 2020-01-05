/**
 * 파리미터가 유효한 숫자인지 확인. 문자열도 가능하다.
 *
 * * Number(n) 과 n의 동등성(equality) 비교를 할때 등호 2개로 loose equality 체크를 한다.
 * * 그래야 문자열로 전달된 숫자로 확인 가능하다.
 */
const validateNumber = n =>
  !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n // eslint-disable-line

export default validateNumber
