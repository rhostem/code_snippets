import { useStaticRendering } from 'mobx-react'
import Root from './stores/Root'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export let root = null

/**
 * mobx store 생성
 * @param {*} initialState
 */
export function initializeStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Root(isServer, initialState)
  }
  if (root === null) {
    root = new Root(isServer, initialState)
  }
  return root
}

/**
 * store 외부에서 타겟 스토어에 데이터 직접 설정
 */
export const applyInitialData = ({
  initialData = {},
  storeName = '',
  store = {},
} = {}) => {
  const storeInitialData = initialData[storeName]

  if (!!storeInitialData) {
    Object.keys(storeInitialData).forEach(key => {
      store[key] = storeInitialData[key]
    })
  }
}
