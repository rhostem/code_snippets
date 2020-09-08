import React, { useMemo } from 'react'
import styled from 'styled-components'

const Sticky = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;

  /* 조건 쿼리. 구형 브라우저는 지원하지 않는다. */
  @supports (position: sticky) or (position: -webkit-sticky) {
    position: sticky;
    top: 0;
    left: 0;
  }
`

/**
 * display: sticky 활용한 영역 고정
 * https://developer.mozilla.org/en-US/docs/Web/CSS/position
 */
export default function StickyArea({ isFixed }) {
  /**
   * 고정 스타일. sticky 속성을 지원하지 않는 브라우저에서 적용된다.
   */
  const stickyStyle = useMemo(() => {
    if (isFixed) {
      if (
        typeof CSS.supports !== 'function' ||
        !CSS.supports('position: sticky')
      ) {
        return {
          position: 'fixed',
          top: 0,
          left: 0,
        }
      }
    }
  }, [isFixed])

  return <Sticky style={stickyStyle}>sticky area</Sticky>
}
