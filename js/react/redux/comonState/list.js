import * as R from 'ramda'
import qs from 'query-string'
import { RouterHistory, Location } from 'react-router'
import { maintainKeysWith } from 'utils/object'
import { isTruthy } from 'utils/ramda'

type ListOrder = 'DESC' | 'ASC'

const DEFAULT_LIST_OPTION = {
  page: 0,
  size: 10,
  order: 'DESC', // 'ASC',
}

export const LIST_STATE = {
  data: [],
  option: R.clone(DEFAULT_LIST_OPTION),
  total: 0, // 전체 아이템 수
  totalPage: 1, // 전체 페이지 수
  isLoading: true,
}

export type ListState<Data> = {
  data: Data,
  option: ReadListActionOption,
  total: number,
  totalPage: number,
}

// 리스트 액션에서 사용하는 옵션
export type ReadListActionOption = {
  page: number, // 현재 페이지. 0부터 시작한다.
  size: number,
  order?: ListOrder, // 순서
  sort?: string, // 정렬
  [string]: any,
}

export const READ_LIST_ACTION_OPTION = {
  page: 0,
  size: 10,
  order: 'DESC',
  sort: 'id', // eid === id, qid === id, ...
}

// 실제 list API 호출에서 사용하는 옵션
export type ReadListCallOption = {
  _start: number,
  _end: number,
  _order: string,
  _sort: string,
}

/**
 * ReadListActionOption -> ReadListCallOption 변환
 * page 넘버는 0부터 시작.
 */
export function convertListOptionToCall({
  page = 0,
  size = 10,
  order = 'DESC',
  ...rest
}: ReadListActionOption): ReadListCallOption {
  const startIndex = R.max(0, page * size)
  const endIndex = startIndex + size

  return maintainKeysWith(
    {
      start: startIndex,
      end: endIndex,
      order: order,
      ...rest,
    },
    isTruthy
  )
}

// 목록 API 호출 결과
export type ListCallData = {
  data: any[],
  total: number,
  totalPage: number,
}

/**
 * react-router의 location 객체에서 페이지네이션 옵션을 추출한다.
 * @param {*} location
 * @param {*} match
 */
export const getOptionFromRouter = (
  location: Location
): ReadListActionOption => {
  const retrievedOption = R.clone(READ_LIST_ACTION_OPTION)
  const { search } = location
  const query = qs.parse(search)
  const queryKeys = Object.keys(query)
  const optionKeys = Object.keys(READ_LIST_ACTION_OPTION)

  // 정렬 옵션
  for (const queryKey of queryKeys) {
    if (R.contains(queryKey, optionKeys)) {
      retrievedOption[queryKey] = query[queryKey]
    }
  }

  return retrievedOption
}

/**
 * 라우트 변경을 통해 리스트를 새로 불러온다.
 * 페이지 번호는 pathname
 */
export const reqListWithNavigation = (
  option: ReadListActionOption,
  history: RouterHistory
): null => {
  const { location } = history
  const oldQuery = qs.parse(location.search)
  const query = R.merge(oldQuery, option)

  history.push(`${location.pathname}?${qs.stringify(query)}`)
}

/**
 * Admin API에서는 전체 아이템 수가 response header를 통해 전달된다.
 */
export const getListTotal = (res = {}) =>
  R.pipe(
    R.path(['headers', 'x-total-count']),
    R.partialRight(parseInt, [10])
  )(res)

export const getCurrentPage = (start = 0, size = 10) =>
  parseInt((start + size) / size, 10)

export const getTotalPage = (total = 0, size = 10) => {
  if (total < 1) {
    return 1
  } else {
    return Math.ceil(total / size)
  }
}

/**
 * 목록을 비우고 request 옵션을 업데이트한다
 * @param {*} state
 * @param {*} param1
 */
export const startLoadingList = (
  state: { list: ListState<T> },
  { payload = DEFAULT_LIST_OPTION }: { payload: ReadListActionOption }
): ListState<T> => {
  return R.mergeDeepRight(state, {
    list: {
      option: payload,
      isLoading: true,
    },
  })
}

export const updateList = (
  state: { list: ListState<T> },
  {
    payload,
  }: { payload: { data: Array<T>, total: number, totalCount: number } }
) => {
  return R.mergeDeepRight(state, {
    list: {
      ...payload,
      isLoading: false,
    },
  })
}

/**
 * 목록을 비운다. 다른 상태는 그대로 둔다.
 * @param {*} state
 */
export const emptyListWithError = (state: { list: ListState<T> }) => {
  return R.mergeDeepRight(state, {
    list: {
      data: [],
      isLoading: false,
    },
  })
}

/**
 * 현재 state 객체에 할당된 리스트 호출 옵션 가져오기
 * @param {ListState} list
 */
export const getCurrentListOption = (
  option: ReadListActionOption
): ReadListActionOption => {
  const { page, size, order, ...rest } = option

  return maintainKeysWith(
    {
      page: page || 0,
      size: size || 10,
      order: order || 'DESC',
      ...rest,
    },
    isTruthy
  )
}
