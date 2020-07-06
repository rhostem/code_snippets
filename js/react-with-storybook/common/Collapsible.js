import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'

const TRANSIION_DELAY = 400

const Wrap = styled.div`
  .collapsible__head {
  }

  .collapsible__body {
    max-height: 0;
    transition: max-height ${TRANSIION_DELAY}ms ease-in-out;
    overflow: hidden;
  }
`

const getChildrenHeight = el => {
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
    const children = Array.from(rootEl.children)
    cb(rootEl)

    children.forEach(child => {
      traveseChild(child, cb)
    })
  }
}

export default function Collapsible({
  isOpen = false,
  renderHead = () => {},
  children,
}) {
  const [isBodyOpen, setIsBodyOpen] = useState(isOpen)
  const bodyRef = useRef(null)
  const [childrenHeight, setChildrenHeight] = useState(0)

  const toggleOpen = useCallback(() => {
    setIsBodyOpen(!isBodyOpen)
  }, [isBodyOpen])

  useEffect(() => {
    setIsBodyOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (isBodyOpen && bodyRef.current) {
      let totalHeight = 0

      traveseChild(bodyRef.current, el => {
        const isHeadOrBody =
          el.className.includes('collapsible__head') ||
          el.className.includes('collapsible__body')

        if (isHeadOrBody && el.childElementCount > 0) {
          totalHeight += getChildrenHeight(el)
        }
      })

      setChildrenHeight(totalHeight)
    } else {
      setChildrenHeight(0)
    }
  }, [isBodyOpen])

  return (
    <Wrap>
      <div className={'collapsible__head'}>
        {renderHead({ isOpen: isBodyOpen, toggleOpen })}
      </div>
      <div
        className={'collapsible__body'}
        ref={bodyRef}
        style={{
          maxHeight: childrenHeight,
        }}
      >
        {children}
      </div>
    </Wrap>
  )
}
