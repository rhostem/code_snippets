import R from 'ramda'

/**
 * ramda 메소드를 이용해 객체를 쿼리스트링으로 변환.
 */
function convertObectToQuerystring(params: Object) {
  const keys = R.keys(params)
  const values = R.values(params)
  const makeQuery = (key, val) =>
    `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
  const querys = R.zipWith(makeQuery, keys, values)
  const joinQuery = R.pipe(
    R.join('&'),
    str => `&${str}`
  )

  return joinQuery(querys)
}

convertObectToQuerystring({
  title: 'TITLE',
  name: 'NAME',
}) // "&title=TITLE&name=NAME"
