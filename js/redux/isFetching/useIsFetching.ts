import { useState, useEffect } from 'react'
import { asyncTypeRegex } from './isFetchingMiddleware'
import useTypedSelector from './useTypedSelector'

/**
 *  비동기 액션 생성자로 현재 로딩 중인지 확인하는 훅
 * @param actionCreator
 */
export default function useIsFetching(actionCreator: Function) {
  const [asyncTypeName, setAsyncTypeName] = useState('')

  useEffect(() => {
    const parsed = asyncTypeRegex.exec(actionCreator().type)

    if (parsed) {
      setAsyncTypeName(parsed[1])
    }
  }, [actionCreator])

  const isFetching = useTypedSelector(state => state.isFetching[asyncTypeName])

  return isFetching
}
