const idMap = {}

const getUniqueId = (prefix = '_') => {
  let newId = null
  let tryCount = 0

  while (tryCount++ < Number.MAX_SAFE_INTEGER) {
    newId = makeId(prefix)

    if (isUniqueId(newId)) {
      idMap[newId] = newId
      return newId
    }
  }

  return newId
}

const makeId = (prefix = '_') => `${prefix}${randomString()}`

function randomString(length = 12) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const isUniqueId = (newId = '') => !idMap[newId]

export default getUniqueId
