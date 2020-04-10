import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'

const Wrap = styled.div``
const TRANSIION_DELAY = 400

const CollapsibleArea = styled.div`
  max-height: 0;
  transition: max-height ${TRANSIION_DELAY}ms ease-in-out;
  overflow: hidden;
`

export default function Collapsible({
  isOpen = false,
  renderHead = () => {},
  children,
}) {
  const childrenRef = useRef(null)
  const [childrenHeight, setChildrenHeight] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setChildrenHeight(childrenRef.current?.getBoundingClientRect().height)

      setTimeout(() => {
        // NOTE: 전환 효과가 끝났으면 충분한 높이를 줘서 중첩된 Collapsible에 문제가 없게 한다.
        setChildrenHeight('200vh')
      }, TRANSIION_DELAY)
    } else {
      setChildrenHeight(0)
    }
  }, [isOpen])

  return (
    <Wrap>
      <div>{renderHead()}</div>
      <CollapsibleArea
        style={{
          maxHeight: childrenHeight,
        }}>
        <div ref={childrenRef}>{children}</div>
      </CollapsibleArea>
    </Wrap>
  )
}

export const useToggleOpen = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const toggleOpen = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [isOpen])

  return {
    isOpen,
    toggleOpen,
  }
}
