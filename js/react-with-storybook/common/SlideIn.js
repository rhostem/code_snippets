import React from 'react'
import ReactDom from 'react-dom'
// import css from './SlideIn.css'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
// import Mask from '../modal/Mask';

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

/**
 * 진입 방향
 */
export const slideInDirections = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
}

const DURATION = 400 // 애니메이션 시간

/**
 * 기본 포지션. 진입 방향에 따라 달라진다.
 */
const defaultPosition = {
  [slideInDirections.LEFT]: {
    top: 0,
    bottom: 0,
    left: '-100vw',
  },
  [slideInDirections.RIGHT]: {
    top: 0,
    bottom: 0,
    left: '100vw',
  },
  [slideInDirections.TOP]: {
    top: '-100vh',
    bottom: '100vh',
    left: 0,
  },
  [slideInDirections.BOTTOM]: {
    top: '100vh',
    bottom: '-100vh',
    left: 0,
  },
}

const slideAnimation = {
  // 왼쪽
  [slideInDirections.LEFT]: {
    onEnter: (node) => {
      anime({
        targets: node,
        left: 0,
        duration: DURATION,
        easing: 'easeInOutQuad',
        begin: function (anim) {
          node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
        },
      })
    },
    onExit: (node) => {
      anime({
        targets: node,
        left: '-100vw',
        duration: DURATION,
        easing: 'easeInOutQuad',
        complete: function (anim) {
          node.style.display = 'none'
        },
      })
    },
  },
  // 오른쪽
  [slideInDirections.RIGHT]: {
    onEnter: (node) => {
      anime({
        targets: node,
        left: 0,
        duration: DURATION,
        easing: 'easeInOutQuad',
        begin: function (anim) {
          node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
        },
      })
    },
    onExit: (node) => {
      anime({
        targets: node,
        left: '100vw',
        duration: DURATION,
        easing: 'easeInOutQuad',
        complete: function (anim) {
          node.style.display = 'none'
        },
      })
    },
  },
  [slideInDirections.TOP]: {
    onEnter: (node) => {
      anime({
        targets: node,
        top: 0,
        bottom: 0,
        duration: DURATION,
        easing: 'easeInOutQuad',
        begin: function (anim) {
          node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
        },
      })
    },
    onExit: (node) => {
      anime({
        targets: node,
        top: '-100vh',
        bottom: '100vh',
        duration: DURATION,
        easing: 'easeInOutQuad',
        complete: function (anim) {
          node.style.display = 'none'
        },
      })
    },
  },
  [slideInDirections.BOTTOM]: {
    onEnter: (node) => {
      anime({
        targets: node,
        top: '0',
        duration: DURATION,
        easing: 'easeInOutQuad',
        begin: function (anim) {
          node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
        },
      })
    },
    onExit: (node) => {
      anime({
        targets: node,
        top: '100vh',
        bottom: '-100vh',
        duration: DURATION,
        easing: 'easeInOutQuad',
        complete: function (anim) {
          node.style.display = 'none'
        },
      })
    },
  },
}

export default function SlideIn({
  isIn = false,
  direction,
  children,
  zIndex, // css.wrap 클래스에 선언된 SlideIn의 기본 z-index는 1000.
  wrapperStyle = {}, // css.wrap 클래스의 스타일을 덮어씌움
}) {
  if (isBrowser) {
    const bodyEl = document.documentElement.getElementsByTagName('body')[0]

    const positionStyle = defaultPosition[direction]
    const animation = slideAnimation[direction]

    let style = Object.assign({}, positionStyle, wrapperStyle)
    if (zIndex) {
      Object.assign(style, { zIndex })
    }

    return ReactDom.createPortal(
      <>
        <Transition
          in={isIn}
          onEnter={animation.onEnter}
          onExit={animation.onExit}
          timeout={DURATION}>
          {(state) => {
            return (
              <div
                style={{
                  position: 'fixed',
                  display: 'none',
                  zIndex: '1000',
                  width: '100vw',
                  background: 'transparent',
                  ...style,
                }}>
                {children}
              </div>
            )
          }}
        </Transition>
        {/* <Mask in={in} /> */}
      </>,
      bodyEl
    )
  } else {
    return null
  }
}
