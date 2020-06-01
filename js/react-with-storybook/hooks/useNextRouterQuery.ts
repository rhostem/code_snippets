import { useMemo } from 'react'
import qs from 'qs'
import { useRouter } from 'next/router'

/**
 * next router의 asPath에서 쿼리스트링을 파싱한다.
 */
export default function useRouterQuery(): any[] {
  const router = useRouter()
  const nextRouterQuery = useMemo(() => {
    const query = qs.parse(router.asPath.split('?')[1])
    return query
  }, [router.asPath])

  return [nextRouterQuery]
}
