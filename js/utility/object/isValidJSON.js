/**
 * stringified 된 JSON이 유효한지 확인
 * @param {*} str
 */
export default function isValidJSON(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
