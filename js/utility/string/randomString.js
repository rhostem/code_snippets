export default function randomString(length = 12) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const makeId = (prefix = '_') => `${prefix}${makeRandomString()}`

export const isUniqueId = (idMap = {}, newId = '') => !idMap[newId]

export const getUniqueId = (idMap = {}, prefix = '_') => {
  let newId = makeId(prefix)

  while (true) {
    if (isUniqueId(idMap, newId)) {
      idMap[newId] = newId
      break
    } else {
      newId = makeId(prefix)
    }
  }

  return newId
}
