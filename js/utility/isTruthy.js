/**
 * ToBoolean
 * https://tc39.es/ecma262/#sec-toboolean
 * @param {*} v 검사할 값
 */
export default function isTruthy(v) {
  if (v === false) {
    return false
  } else if (v === 0 || v === -0 || v === 0.0 || v === 0x0) {
    return false
  } else if (v === '' || v === '' || v === ``) {
    return false
  } else if (v === null || v === undefined) {
    return false
  } else if (typeof v === 'number' && Number.isNaN(v)) {
    return false
  } else if (typeof window === 'object' && v === document.all) {
    return false
  } else {
    return true
  }
}

export function isFalsey(v) {
  return !isTruthy(v)
}
