import * as React from 'react'
import * as R from 'ramda'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { isSuperUserSelector } from 'store/auth/authSelector'
import CubeSpinner from 'components/common/CubeSpinner'

const locationHelper = locationHelperBuilder({})

// 기본 설정
const userIsAuthedDefault = {
  redirectPath: '/login', // authenticatedSelector를 더 이상 만족하지 않을 때 이동할 경로
  authenticatingSelector: state => R.path(['auth', 'isLoading'])(state),
  AuthenticatingComponent: () => <CubeSpinner isVisible />,
}

/**
 * 로그인 되었을 때만 사용할 수 있도록
 */
export const userIsAuthed = connectedRouterRedirect({
  ...userIsAuthedDefault,
  authenticatedSelector: state =>
    R.compose(
      R.not,
      R.isNil,
      R.path(['auth', 'user', 'token'])
    )(state),
  wrapperDisplayName: 'UserIsAuthed',
})

/**
 * 권한이 SU (super user)일때만 사용할 수 있도록.
 */
export const userIsSuperUser = connectedRouterRedirect({
  ...userIsAuthedDefault,
  authenticatedSelector: state => {
    const isSuperUser = isSuperUserSelector(R.path(['auth', 'user'], state))
    const isTokenExists = R.compose(
      R.not,
      R.isNil,
      R.path(['auth', 'user', 'token'])
    )(state)

    return R.and(isSuperUser, isTokenExists)
  },
  wrapperDisplayName: 'UserIsSuperUser',
})

/**
 * 로그인되지 않은 상태에서만 접근 가능한 컴포넌트에 사용
 */
export const userIsNotAuthed = connectedRouterRedirect({
  authenticatedSelector: state =>
    R.compose(
      R.isNil,
      R.path(['auth', 'user', 'token'])
    )(state),

  redirectPath: (state, ownProps) =>
    // selector를 더 이상 만족하지 않을 때 이동할 페이지. 로그인 후에 이동할 페이지에 해당한다.
    locationHelper.getRedirectQueryParam(ownProps) || '/contents',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthed',
})
