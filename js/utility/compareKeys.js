/**
 * 객체가 동일한 키를 가지고 있는지 확인한다.
 * 중첩된 객체도 확인한다.
 *
 * @returns boolean
 */
export function compareKeys(...objects) {
  if (objects.length < 2) {
    throw new Error(`at least 2 objects are required`)
  }

  for (const obj of objects) {
    if (typeof obj !== 'object') {
      throw new Error(`parameter should be an object: ${obj}`)
    }
  }

  const keys = objects.map(obj => getAllNestedKeys(obj))
  const criteria = keys[0]

  return keys.every(key => key === criteria)
}

const getAllNestedKeys = (obj = {}) => {
  if (typeof obj !== 'object') {
    throw new Error('parameter should be an object')
  }

  let keysConcat = ''
  const keys = Object.keys(obj).sort()

  keysConcat += keys.join('') // add parent object keys

  for (const key of keys) {
    if (typeof obj[key] === 'object') {
      keysConcat += getAllNestedKeys(obj[key]) // add child object keys
    }
  }

  return keysConcat
}
