import * as R from 'ramda'
import axios from 'axios'
import { devLog } from 'utils/log'
import makeFormUrlEncoded from 'utils/makeFormUrlEncoded'

export const DEFAULT_CONFIG = {
  baseURL: process.env.API_URL, // TODO: API 서버 도메인은 환경 변수에 저장
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
}

// 기본 인스턴스
const instance = axios.create(DEFAULT_CONFIG)

/**
 * 앱에서 하나의 인스턴스만 사용하도록 클래스가 아닌 객체 형태로 선언함.
 */
export const API = {
  instance,

  get(url, config) {
    return this.instance.get(url, config)
  },

  post(url, data, config) {
    return this.instance.post(
      url,
      makeFormUrlEncoded(data),
      R.merge(config, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
    )
  },

  put(url, data, config) {
    return this.instance.put(
      url,
      makeFormUrlEncoded(data),
      R.merge(config, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
    )
  },

  delete(url, config) {
    return this.instance.delete(url, config)
  },

  /**
   * 로그아웃 시점에 인증 헤더 제거하고 인스턴스 재생성
   */
  createInstance(config = DEFAULT_CONFIG) {
    this.instance = axios.create(config)
    devLog(`axios instance created:`, process.env.MEDICO_API)
  },

  /**
   * 인증 헤더 추가해서 인스턴스 생성
   */
  createInstanceWithAuth({ config = DEFAULT_CONFIG, key } = {}) {
    const configWithAuth = R.merge(config, {
      headers: {
        'X-API-KEY': key, // TODO: 인증 헤더 확인
      },
    })
    this.instance = axios.create(configWithAuth)
    devLog(`axios instance created with Key`, key)
  },
}

export default API
