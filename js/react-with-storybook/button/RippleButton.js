import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const Button = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  padding: 2em;
  font-size: 2em;
  text-align: center;
  background: #2d2a2e;
  color: #fff;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const rippleEffect = keyframes`
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(2);
  }
`

const RIPPLE_DURATION = 500

const Ripple = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  animation: ${RIPPLE_DURATION / 1000}s ${rippleEffect} linear;
  transform: scale(0);
`

export default function RippleButton({ children, style, onClick = () => {} }) {
  const buttonRef = useRef(null)
  let cancel = useRef(null)
  let mousePos = useRef({})

  const [timerId, setTimerId] = useState(null)
  const [isRippleVisible, setIsRippleVisible] = useState(false)
  const [rippleStyle, setRippleStyle] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  })

  const showRipple = useCallback(() => {
    const buttonEl = buttonRef.current
    const { width, top, left } = buttonEl.getBoundingClientRect()

    setRippleStyle({
      width: width,
      height: width,
      top: mousePos.current.y - top - width / 2,
      left: mousePos.current.x - left - width / 2,
    })

    setIsRippleVisible(true)

    let wait = setTimeout(() => {
      setIsRippleVisible(false)
    }, RIPPLE_DURATION)

    setTimerId(wait)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePos.current, buttonRef, setRippleStyle])

  useEffect(() => {
    // ripple 이펙트가 취소되었으면 다시 표시한다
    if (cancel.current) {
      cancel.current = false
      clearTimeout(timerId)
      showRipple()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancel.current, showRipple, timerId])

  const handleClick = useCallback(
    e => {
      onClick(e)

      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      }

      if (!isRippleVisible) {
        setIsRippleVisible(true)
        showRipple()
      } else {
        setIsRippleVisible(false)
        cancel.current = true
      }
    },
    [onClick, isRippleVisible, showRipple]
  )

  return (
    <Button ref={buttonRef} style={style} onClick={handleClick}>
      {isRippleVisible && <Ripple style={rippleStyle}></Ripple>}
      {children || 'Button'}
    </Button>
  )
}
