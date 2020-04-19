const canUseLocalStorage = typeof window !== undefined && !!window.localStorage

export default {
  set: (key = '', value, expirationMin = 52560000): any => {
    if (canUseLocalStorage) {
      localStorage.setItem(key, JSON.stringify(value))
      return value
    }
  },
  get: (key = ''): any => {
    if (canUseLocalStorage) {
      return JSON.parse(localStorage.getItem(key))
    }
  },
  remove: (key = '') => {
    if (canUseLocalStorage) {
      window.localStorage.removeItem(key)
    }
  },
}

const withExpiration = {
  set: (key = '', value, expirationMin = 52560000): any => {
    if (canUseLocalStorage) {
      const expirationMS = expirationMin * 60 * 1000
      const record = {
        value: JSON.stringify(value),
        timestamp: new Date().getTime() + expirationMS,
      }

      localStorage.setItem(key, JSON.stringify(record))

      return value
    }
  },
  get: (key = ''): any => {
    if (canUseLocalStorage) {
      const record = JSON.parse(localStorage.getItem(key))

      if (!record) {
        return undefined
      }

      return new Date().getTime() < record.timestamp && JSON.parse(record.value)
    }
  },
  remove: (key = '') => {
    if (canUseLocalStorage) {
      window.localStorage.removeItem(key)
    }
  },
}
