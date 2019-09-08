/**
 * 원하는 값으로 채워진 배열을 만든다.
 *
 * @param {*} param.value 배열에 채워넣을 값, 함수 가능
 * @param {*} param.length 배열의 길이
 */
const fillArrayWithValue = ({ mapper, length }) => {
  return Array.from({ length }, (_, index) =>
    typeof mapper === 'function' ? mapper(index) : mapper
  )
}

export default fillArrayWithValue
