import * as R from 'ramda'

/**
 * 아이템 조회 결과를 저장할 state.
 * state에 detail이라는 이름의 property에 할당해야 한다.
 */
export const DETAIL_STATE = {
  data: {},
  isLoading: false,
}

type DetailState<Data> = {
  data: Data,
  isLoading: boolean,
}

/**
 * 상세정보 로딩 시작
 * @param {*} state
 */
export const initLoadingDetail = (state: { detail: DetailState }, action) => {
  return R.mergeDeepRight(state, { detail: { data: {}, isLoading: true } })
}

export const updateDetail = (state: { detail: DetailState }, action) => {
  return R.mergeDeepRight(state, {
    detail: { data: action.payload, isLoading: false },
  })
}

// export const loadingDetailFailed = (state: { detail: DetailState }, action) => {
//   return R.mergeDeepRight(state, { detail: { data: {}, isLoading: false } })
// }
