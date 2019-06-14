import axios from 'axios'
import Cookies from 'js-cookie'
import omit from 'lodash/omit'
import get from 'lodash/get'
import moment from 'moment'
import qs from 'qs'
import key from 'constant/key'
import Axios from 'axios'

/**
 * 마이크로 서비스에 사용할 수 있는 커스텀 인스턴스.
 *
 * ex) 유저 API 호출
 * API.user.get('/users/1234')
 *
 * error interceptor를 사용해서 인증에 오류가 발생하면 refreshToken으로 accessToken을 재발급
 */
class ApiFactory {
  constructor() {
    this.DEFAULT_HEADERS = {}
    this.axios = null
    this.headers = {}
    this.baseURL = process.env.API_PRODUCT_URL // 기본 baseURL은 상품 API

    this.initInstance()
  }

  /**
   * axios config
   */
  get config() {
    return {
      baseURL: this.baseURL,
      headers: this.headers,
    }
  }

  /**
   * 헤더를 완전히 대체
   * @param {*} header
   */
  setHeaders(header = {}) {
    this.headers = Object.assign({}, this.DEFAULT_HEADERS, header)
  }

  // 헤더 객체 덮어씌움
  addHeaders(header = {}) {
    this.headers = Object.assign(this.headers, header)
  }

  // 헤더에서 특정 키 제거
  omitHeaders(keys = []) {
    for (const key of keys) {
      this.headers = omit(this.headers, key)
    }
  }

  /**
   * axios instance 최초 생성
   */
  initInstance = () => {
    this.setHeaders(this.DEFAULT_HEADERS)

    const accessToken = Cookies.get(key.ACCESS_TOKEN)
    if (!!accessToken) {
      this.addAuthHeader(accessToken)
    }

    // 인증 헤더 붙여서 인스턴스 생성
    this.createInstance()
  }

  /**
   * 새로운 axios 인스턴스 생성
   */
  createInstance() {
    this.axios = axios.create(this.config)

    // request interceptor
    this.axios.interceptors.request.use(
      async config => {
        return merge(config, {
          headers: merge(config.header, await getGuhadaCustomHeaders()),
        })
      },
      error => {
        return Promise.reject(error)
      }
    )

    // response interceptor
    this.axios.interceptors.response.use(
      response => {
        return response
      },
      err => {
        console.group(`[axios error interceptors]`)
        console.dir(err)

        // TODO: accessToken 인증 오류 status 코드 확인
        if (
          get(err, 'response.status') === 401 &&
          Cookies.get(key.REFRESH_TOKEN)
        ) {
          console.log('access token expired. refresh starts.')

          this.refreshAccessToken().then(res => {
            // 토큰 재발급에 성공하면 실패한 요청을 다시 호출한다
            console.groupEnd(`axios error interceptors`)
            return axios.request(err.config)
          })
        } else {
          console.groupEnd(`axios error interceptors`)
          return Promise.reject(err)
        }
      }
    )
  }

  /**
   * 인증 토큰을 헤더에 추가
   * 쿠키에 저장
   * 인스턴스 재생성
   *
   * @param {} accessToken
   * @param {} refreshToken
   * @param {} expiresIn 유효기간
   */
  updateAccessToken({ accessToken, expiresIn, refreshToken }) {
    this.saveAuthTokens({ accessToken, expiresIn, refreshToken })
    this.addAuthHeader(accessToken)
    // 인증 헤더 붙여서 인스턴스 생성
    this.createInstance()
  }

  addAuthHeader = accessToken => {
    this.addHeaders({
      Authorization: `Bearer ${accessToken}`,
    })
  }

  /**
   * TODO: refreshToken으로 accessToken 재발급
   */
  refreshAccessToken() {
    return new Promise((resolve, reject) => {
      const refreshToken = Cookies.get(key.REFRESH_TOKEN)

      this.user
        .post(
          `/oauth/token`,
          qs.stringify({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            scope: 'read',
          }),
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then(res => {
          const { data } = res
          const { accessToken, expiresIn, refreshToken } = data.data

          this.updateAccessToken({
            accessToken,
            expiresIn,
            refreshToken,
          })

          resolve({ accessToken, refreshToken, expiresIn })
        })
        .catch(err => {
          // 토큰 갱신에 실패했으므로 로그인으로 보낸다.
          // refreshToken도 만료되었다면, 로그인을 다시 해야 한다.
          console.log('refresh token expired. redirect to login')
          this.removeAccessToken()
          window.location.href = '/login'
          reject()
        })
    })
  }

  saveAuthTokens({ accessToken, expiresIn, refreshToken }) {
    Cookies.set(key.ACCESS_TOKEN, accessToken, {
      expires: moment()
        .add(expiresIn, 'seconds')
        .toDate(),
    })

    Cookies.set(key.REFRESH_TOKEN, refreshToken, {
      expires: moment()
        .add(1, 'day')
        .toDate(),
    })
  }

  /**
   * access token 제거.
   */
  removeAccessToken() {
    Cookies.remove(key.ACCESS_TOKEN)
    Cookies.remove(key.REFRESH_TOKEN)
    this.omitHeaders(['Authorization'])
    this.createInstance()
  }

  get user() {
    return this.getApiInstance(process.env.API_USER)
  }
  get search() {
    return this.getApiInstance(process.env.API_SEARCH)
  }
  get order() {
    return this.getApiInstance(process.env.API_ORDER)
  }

  getApiInstance(baseURL) {
    if (this.baseURL !== baseURL) {
      // baseURL이 다르면 인스턴스를 새로 만든다.
      this.baseURL = baseURL
      this.createInstance()
    }

    return this.axios
  }
}

// 앱 전역에서 싱글 인스턴스만 사용하기 위함.
const API = new ApiFactory()

export default API
