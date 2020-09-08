import React, { useState, useEffect, useCallback } from 'react'

/**
 * IntersectionObserver는 IE에서 지원하지 않음.
 * 사용하려면 polyfill 추가 필요함.
 *
 * https://github.com/w3c/IntersectionObserver/tree/master/polyfill
 *
 * @param {*} param0
 */
export default function useIntersectionObserver({
  targetRef, // 타겟 요소. useRef 사용.
  onVisible = () => {}, // 화면에 표시되었을 때 실행할 콜백
  onUnvisible,
  isTriggerOnlyOnce = true, // 한번만 실행 하고 옵저버 제거
}: {
  targetRef: React.RefObject<HTMLElement>
  onVisible: Function
  onUnvisible: Function
  isTriggerOnlyOnce: boolean
}) {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)

  // 옵저버 등록 및 톨백 실행 로직
  const handleObserve = useCallback(
    node => {
      const obsInstance = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            onVisible(entry)

            if (isTriggerOnlyOnce) {
              obsInstance.unobserve(node)
            }
          } else if (typeof onUnvisible === 'function') {
            onUnvisible()
          }
        })
      })

      obsInstance.observe(node)

      setObserver(obsInstance)
    },
    [isTriggerOnlyOnce, onUnvisible, onVisible]
  )

  // 타겟 엘레멘트가 마운팅되면 옵저버를 실행한다.
  useEffect(() => {
    if (targetRef.current) {
      handleObserve(targetRef.current)
    }
  }, [handleObserve, targetRef])

  return [observer]
}
