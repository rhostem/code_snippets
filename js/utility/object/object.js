/**
 * 객체에서 keys 배열에 있는 키만 남겨두고 제거한다.
 *
 * @param {*} obj 수정할 객체
 * @param {*} keys 남겨둘 키 배열
 */
export const maintainKeys = (obj, keys = []) => {
  return Object.keys(obj)
    .filter(k => keys.includes(k))
    .reduce((resultObj, key) => {
      resultObj[key] = obj[key]
      return resultObj
    }, {})
}

export const maintainKeysWith = (obj, predicate = () => true) => {
  return Object.keys(obj)
    .filter(k => predicate(obj[k]))
    .reduce((resultObj, key) => {
      resultObj[key] = obj[key]
      return resultObj
    }, {})
}

/**
 * maintainKeys와 정반대 기능
 * @param {*} obj
 * @param {*} keys
 */
export const omitKeys = (obj, keys = []) => {
  return Object.keys(obj)
    .filter(k => !keys.includes(k))
    .reduce((resultObj, key) => {
      resultObj[key] = obj[key]
      return resultObj
    }, {})
}
