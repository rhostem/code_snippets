/**
 * 원하는 값으로 채워진 배열을 만든다.
 *
 * @param {*} param.value 배열에 채워넣을 값
 * @param {*} param.length 배열의 길이
 */
const fillArrayWithValue = ({ value, length }) => {
  return Array.from({ length }, () => value)
}

export default fillArrayWithValue
