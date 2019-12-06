const axios = require('axios')
const Cookies = require('js-cookie')
const moment = require('moment')
const omit = require('lodash/omit')
const merge = require('lodash/merge')
const get = require('lodash/get')
const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

const key = {
  ACCESS_TOKEN: `access_token`,
  REFRESH_TOKEN: `refresh_token`,
}

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
    this.this.axios = null
    this.headers = {}
    this.baseURL = process.env.API_PRODUCT_URL // 기본 baseURL

    this.initInstance()
  }

  /**
   * axios config
   */
  get config() {
    return {
      baseURL: this.baseURL,
      headers: this.headers,
      timeout: 10000,
    }
  }

  DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
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
  initInstance() {
    this.setHeaders(this.DEFAULT_HEADERS)

    const accessToken = Cookies.get(key.ACCESS_TOKEN)
    if (!!accessToken) {
      this.addAuthHeader(accessToken)
    }

    // 인증 헤더 붙여서 인스턴스 생성
    this.createInstance()
  }

  get requestInterceptor() {
    return {
      beforeSent: async config => {
        // NOTE: 필요한 설정 추가
        return merge(config, {
          headers: merge(config.headers, {}),
        })
      },
      onError: async config => {
        return merge(config, {
          headers: merge(config.headers, {}),
        })
      },
    }
  }

  get responseInterceptor() {
    return {
      onResponse: response => {
        // TODO: 서버 응답에 맞게 수정
        const resultCode = get(response, 'data.resultCode')

        // resultCode가 있다면 확인한다
        if (!!resultCode) {
          // resultCode가 200이면 성공, 아니라면 catch 블럭에서 잡을 수 있도록 Promise.reject
          if (resultCode === 200) {
            return response
          } else {
            this.createServerError(response)

            return Promise.reject(response)
          }
        } else {
          // resultCode가 없다면 결과를 그대로 넘긴다
          return response
        }
      },
      onError: error => {
        // TODO: 서버 응답에 맞게 수정
        const resultCode = get(error, 'response.data.resultCode')
        const errorStatus = get(error, 'response.status')

        this.createServerError(error.response)

        if (resultCode === 401 || errorStatus === 401) {
          if (!!Cookies.get(key.REFRESH_TOKEN)) {
            console.error('access token expired. refresh starts.')

            this.refreshAccessToken().then(res => {
              // 토큰 재발급에 성공하면 실패한 요청을 다시 호출한다
              return axios.request(error.config)
            })
          } else {
            // 리프레시 토큰이 없으면 로그인으로
            if (isBrowser) {
              console.error('401. redirect to login')
              window.location.href = '/login'
            }
          }
        } else {
          return Promise.reject(error)
        }
      },
    }
  }

  /**
   * 새로운 axios 인스턴스 생성
   */
  createInstance() {
    this.axios = axios.create(this.config)

    // request interceptor
    this.axios.interceptors.request.use(
      this.requestInterceptor.beforeSent,
      this.requestInterceptor.onError
    )

    // response interceptor
    this.axios.interceptors.response.use(
      this.responseInterceptor.onResponse,
      this.responseInterceptor.onError
    )
  }

  /**
   * 구하다 API 서버 response에 기반한 에러 메시지를 생성한다.
   *
   * response: {
   *    data: {
   *        data	{...}
   *        message	string
   *        result	string
   *        resultCode	integer($int32)
   *    }
   * }
   */
  createServerError(response) {
    const resultCode =
      get(response, 'data.resultCode') || get(response, 'data.status')
    const message = get(response, 'data.message')
    const responseURL = get(response, 'request.responseURL')

    console.error(
      `[GUHADA API] ${!!resultCode ? `${resultCode} ` : ''}${
        !!message ? `"${message}"` : ''
      } at ${get(response, 'config.method') || ''} ${responseURL}`
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

  addAuthHeader(accessToken) {
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

      const formData = new FormData()
      formData.append('refresh_token', refreshToken)
      formData.append('grant_type', 'refresh_token')
      formData.append('scope', 'read')

      // TODO: 토큰 재발급 서버에 맞게 수정
      this.user
        .post(`/oauth/token`, formData, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic Z3VoYWRhOmd1aGFkYWNsaWVudHNlY3JldA==',
          },
        })
        .then(res => {
          const { data } = res
          const { access_token, expires_in, refresh_token } = data

          this.updateAccessToken({
            accessToken: access_token,
            expiresIn: expires_in,
            refreshToken: refresh_token,
          })

          resolve({
            access_token,
            refresh_token,
            expires_in,
          })
        })
        .catch(err => {
          console.error('err', err)
          // 토큰 갱신에 실패했으므로 로그인으로 보낸다.
          // refreshToken도 만료되었다면, 로그인을 다시 해야 한다.
          console.error('refresh token expired. redirect to login')
          this.removeAccessToken()

          if (isBrowser) {
            console.error('401. redirect to login')
            window.locaion.href = '/login'
          }

          reject()
        })
    })
  }

  saveAuthTokens({ accessToken, expiresIn, refreshToken }) {
    if (window.location.hostname === 'localhost') {
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
    } else {
      // subdomain 간의 쿠키 공유를 위한 코드
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
  }

  /**
   * access token 제거.
   */
  removeAccessToken() {
    Cookies.remove(key.ACCESS_TOKEN)
    Cookies.remove(key.REFRESH_TOKEN)
    Cookies.remove(key.ACCESS_TOKEN)
    Cookies.remove(key.REFRESH_TOKEN)
    this.omitHeaders(['Authorization'])
    this.createInstance()
  }

  get user() {
    return this.getApiInstance(process.env.API_USER)
  }

  get product() {
    return this.getApiInstance(process.env.API_PRODUCT_URL)
  }

  get search() {
    return this.getApiInstance(process.env.API_SEARCH)
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

module.exports = API
