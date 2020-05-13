const canUseLocalStorage = typeof window === 'object' && !!window.localStorage

export default {
  set: (key = '', value): any => {
    if (canUseLocalStorage) {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        console.error('[localStorage] value is undefined')
      }
    }
  },
  get: (key = ''): any => {
    if (canUseLocalStorage) {
      try {
        const item = localStorage.getItem(key)
        return item && item !== 'undefined' ? JSON.parse(item) : null
      } catch (e) {
        console.error(e)
        return null
      }
    }
  },
  remove: (key = '') => {
    if (canUseLocalStorage) {
      window.localStorage.removeItem(key)
    }
  },
}
