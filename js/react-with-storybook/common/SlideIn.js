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
const SLIDEIN_ZINDEX = 1000

/**
 * 아웃 포지션. 진입 방향에 따라 달라진다.
 */
const exitPosition = {
  [slideInDirections.LEFT]: {
    top: 0,
    bottom: 0,
    left: '-100%',
    right: '100%',
  },
  [slideInDirections.RIGHT]: {
    top: 0,
    bottom: 0,
    left: '100%',
    right: '-100%',
  },
  [slideInDirections.TOP]: {
    top: '-100%',
    bottom: '100%',
    left: 0,
    right: 0,
  },
  [slideInDirections.BOTTOM]: {
    top: '100%',
    bottom: '-100%',
    left: 0,
    right: 0,
  },
}

// 인 포지션. 디바이스 전체를 커버하도록 한다.
const inPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const slideAnimation = {
  // 왼쪽
  [slideInDirections.LEFT]: {
    onEnter: (node) => {
      anime({
        targets: node,
        ...inPosition,
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
        ...exitPosition[slideInDirections.LEFT],
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
        ...inPosition,
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
        ...exitPosition[slideInDirections.RIGHT],
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
        ...inPosition,
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
        ...exitPosition[slideInDirections.TOP],
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
        ...inPosition,
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
        ...exitPosition[slideInDirections.BOTTOM],
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
  wrapperStyle = {}, // css.wrap 클래스의 스타일을 덮어씌움
}) {
  if (isBrowser) {
    const bodyEl = document.documentElement.getElementsByTagName('body')[0]

    const positionStyle = exitPosition[direction]
    const animation = slideAnimation[direction]

    let style = {
      ...positionStyle,
      ...wrapperStyle,
    }

    return ReactDom.createPortal(
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
                zIndex: SLIDEIN_ZINDEX,
                background: 'transparent',
                ...style,
              }}>
              {children}
              {/* <Mask in={in} /> */}
            </div>
          )
        }}
      </Transition>,
      bodyEl
    )
  } else {
    return null
  }
}
