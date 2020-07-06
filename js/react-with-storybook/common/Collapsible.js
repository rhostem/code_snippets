import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'

const Wrap = styled.div``
const TRANSIION_DELAY = 200

const CollapsibleArea = styled.div`
  max-height: 0;
  transition: max-height ${TRANSIION_DELAY}ms ease-in-out;
  overflow: hidden;
`

const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue)
  const toggleOpen = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [isOpen])

  return [isOpen, toggleOpen]
}

const getChildrenHeight = (el, depth) => {
  if (el) {
    return Array.from(el.children).reduce((sum, childEl) => {
      return sum + childEl.offsetHeight
    }, 0)
  } else {
    return 0
  }
}

const traveseChild = (rootEl, cb = () => {}) => {
  if (rootEl) {
    cb(rootEl)
    const children = Array.from(rootEl.children)
    children.forEach(child => {
      traveseChild(child, cb)
    })
  }
}

export default function Collapsible({
  initialOpen = false,
  renderHead = () => {},
  children,
}) {
  const [isOpen, toggleOpen] = useToggle(false)

  const childrenRef = useRef(null)
  const [childrenHeight, setChildrenHeight] = useState(0)

  useEffect(() => {
    if (isOpen && childrenRef.current) {
      let totalHeight = 0

      traveseChild(childrenRef.current, el => {
        totalHeight += getChildrenHeight(el)
      })

      setTimeout(() => {
        setChildrenHeight(totalHeight)
      }, TRANSIION_DELAY)
    } else {
      setChildrenHeight(0)
    }
  }, [isOpen])

  return (
    <Wrap>
      <div>{renderHead({ isOpen, toggleOpen })}</div>
      <CollapsibleArea
        style={{
          maxHeight: childrenHeight,
        }}
      >
        <div ref={childrenRef}>{children}</div>
      </CollapsibleArea>
    </Wrap>
  )
}
