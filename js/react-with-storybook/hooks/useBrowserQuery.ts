import { useState, useCallback } from 'react'
import canUseDOM from 'utils/canUseDOM'
import qs from 'qs'
import useCallOnce from 'components/hooks/useCallOnce'

export default function useBrowserQuery(): any[] {
  const [query, setQuery] = useState({})

  const getQuery = useCallback(() => {
    if (canUseDOM()) {
      const { search } = window.location
      const query = qs.parse(search.split('?')[1])
      if (query) {
        setQuery(query)
      }
    }
  }, [])

  useCallOnce(getQuery)

  return [query]
}
