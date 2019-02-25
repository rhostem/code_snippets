import R from 'ramda'

/**
 * 쿼리스트링 파라미터 중에서 null, undefined, 공백 값을 가지는 키는 제거한다.
 * @param queryParams
 */
function trimQueryParams(queryParams) {
  const isNotNil = R.compose(
    R.not,
    R.isNil
  )
  const isNotEmptyStr = R.compose(
    R.not,
    str => str === ''
  )
  return R.filter(R.both(isNotNil, isNotEmptyStr), queryParams)
}
