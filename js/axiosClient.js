import axios from 'axios'
import * as R from 'ramda'
import { isTruthy } from './ramda'

let axiosInstance = null
let axiosConfig = {
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

export const initAxiosClient = authToken => {
  updateAuthHeader(authToken)
}

/**
 * 인증 토큰이 전달되면 AdminAuthorization 헤더 값을 넣어서 axios 인스턴스를 새로 생성 (로그인)
 * 토큰이 null이면 AdminAuthorization 없이 인스턴스를 새로 만든다. (로그아웃)
 *
 * @param {String} authToken
 */
export function updateAuthHeader(authToken) {
  if (isTruthy(authToken)) {
    // set authtoken in headers
    axiosConfig = R.assocPath(
      ['headers', 'AdminAuthorization'],
      authToken,
      axiosConfig
    )
  } else {
    // remove AdminAuthorization property from headers
    axiosConfig = R.dissocPath(['headers', 'AdminAuthorization'], axiosConfig)
  }

  axiosInstance = axios.create(axiosConfig)
}

/**
 * 실제 호출에 사용한다. 인스턴스가 새로 생성될 수 있으므로 axiosInstance 대신 default export
 */
const axiosClient = () => {
  return axiosInstance
}

export default axiosClient
