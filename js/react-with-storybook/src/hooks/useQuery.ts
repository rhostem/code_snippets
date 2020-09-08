import { useMemo } from 'react'
import queryString, { ParsedQuery, ParseOptions } from 'query-string'

const useQuery = (
  options?: ParseOptions
): ParsedQuery<string | number | boolean> => {
  const { search } = window.location // window.location 사용. react-router의 history.location.search는 앱 시작 시점에만 가져옴.
  const parsedQuery = useMemo(() => queryString.parse(search, options), [
    options,
    search,
  ])

  return parsedQuery
}

export default useQuery
