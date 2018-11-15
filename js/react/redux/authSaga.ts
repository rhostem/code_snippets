import {
  take,
  takeLatest,
  all,
  put,
  fork,
  call,
  cancel,
  cancelled,
} from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as AuthActions from './authActions'
import * as AuthAPI from './authAPI'
import localStorage from '../../utils/localStorage'
import { LocalStorage } from '../../constants/localStorage'
import * as DialogActions from '../dialog/dialogActions'

/**
 * 로그인 프로세스
 */
export function* loginProcess() {
  while (true) {
    // try login
    const action = yield take(AuthActions.LOGIN)

    const authProcess = yield fork(authorize, action)

    // logout & remove token
    const logoutAction = yield take([AuthActions.LOGOUT, AuthActions.LOGIN_FAILURE])

    // 로그인 도중에 로그아웃이 시도되면 진행중인 로그인 태스크를 취소한다(fork는 취소 가능)
    if (logoutAction.type === AuthActions.LOGOUT) {
      yield cancel(authProcess)
    }

    localStorage.remove(LocalStorage.AUTH_TOKEN)

    yield put(push('/login'))
  }
}

/**
 * 로그인 API 호출 및 토큰 저장
 */
function* authorize(action: AuthActions.Actions['LOGIN']) {
  try {
    const { userid, userpassword, isAutoLogin } = action

    // 로그인 시도
    const { token } = yield call(AuthAPI.getLoginToken, { userid, userpassword })
    yield put(AuthActions.loginSuccess(token))
    yield put(push('/dashboard'))

    localStorage.set(LocalStorage.AUTO_LOGIN, isAutoLogin || false)
    localStorage.set(LocalStorage.AUTH_TOKEN, token)
  } catch (e) {
    console.error(e)
    yield put(AuthActions.loginFailure())
    yield put(DialogActions.showSnackbar(`로그인에 실패했습니다: ${e}`))
  } finally {
    if (yield cancelled()) {
      console.warn('authorize task cancelled')
    }
  }
}

/**
 * 앱 구동시 로컬스토리지 토큰으로 로그인을 시도한다.
 */
function* loginByLocalToken() {
  const token = localStorage.get(LocalStorage.AUTH_TOKEN)
  const isAutoLogin = localStorage.get(LocalStorage.AUTO_LOGIN)

  if (isAutoLogin && token) {
    try {
      yield AuthAPI.verifyToken(token)
      yield put(AuthActions.loginSuccess(token))

      // 로그아웃 액션
      yield take(AuthActions.LOGOUT)
      localStorage.remove(LocalStorage.AUTH_TOKEN)
      yield put(push('/login'))
    } catch (error) {
      yield put(DialogActions.showSnackbar('토큰이 만료되었습니다. 다시 로그인해주세요.'))
      localStorage.remove(LocalStorage.AUTH_TOKEN)
      yield put(push('/login'))
    }
  } else {
    yield put(push('/login'))
  }
}

export default function* auth() {
  yield all([loginProcess(), loginByLocalToken()])
}
