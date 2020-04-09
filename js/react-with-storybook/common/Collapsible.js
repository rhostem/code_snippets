import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'

const Wrap = styled.div``

const CollapsibleArea = styled.div`
  max-height: 0;
  transition: max-height 0.2s linear;
  overflow: hidden;
`

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

export default function Collapsible({
  isOpen = true,
  renderHead = () => {},
  children,
}) {
  const childrenRef = useRef(null)
  const childrenHeight = useMemo(() => {
    const { height } = childrenRef.current?.getBoundingClientRect() || {}

    return height
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenRef.current])

  return (
    <>
      <div>{renderHead()}</div>
      <CollapsibleArea style={{ maxHeight: isOpen ? childrenHeight : 0 }}>
        <div ref={childrenRef}>{children}</div>
      </CollapsibleArea>
    </>
  )
}
