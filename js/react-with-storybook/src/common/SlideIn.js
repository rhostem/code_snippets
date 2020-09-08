import React, { useMemo } from 'react'
import ReactDom from 'react-dom'
import { Transition } from 'react-transition-group'
import anime from 'animejs'

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

export default function SlideIn({
  isIn = false,
  direction,
  children,
  wrapperStyle = {}, // fixed 레이어 스타일
  zIndex = 1000, // fixed 레이어 zindex
  duration = 400, // 애니메이션 시간
  easing = 'easeInSine', // https://animejs.com/documentation/#linearEasing
}) {
  const slideAnimation = useMemo(() => {
    return {
      // 왼쪽
      [slideInDirections.LEFT]: {
        onEnter: (node) => {
          anime({
            targets: node,
            ...inPosition,
            duration,
            easing,
            begin: function(anim) {
              node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
            },
          })
        },
        onExit: (node) => {
          anime({
            targets: node,
            ...exitPosition[slideInDirections.LEFT],
            duration,
            easing,
            complete: function(anim) {
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
            duration,
            easing,
            begin: function(anim) {
              node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
            },
          })
        },
        onExit: (node) => {
          anime({
            targets: node,
            ...exitPosition[slideInDirections.RIGHT],
            duration,
            easing,
            complete: function(anim) {
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
            duration,
            easing,
            begin: function(anim) {
              node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
            },
          })
        },
        onExit: (node) => {
          anime({
            targets: node,
            ...exitPosition[slideInDirections.TOP],
            duration,
            easing,
            complete: function(anim) {
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
            duration,
            easing,
            begin: function(anim) {
              node.style.display = 'block' // 애니메이션 시작할 none에서 block으로
            },
          })
        },
        onExit: (node) => {
          anime({
            targets: node,
            ...exitPosition[slideInDirections.BOTTOM],
            duration,
            easing,
            complete: function(anim) {
              node.style.display = 'none'
            },
          })
        },
      },
    }
  }, [duration, easing])

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
      >
        {(state) => {
          return (
            <div
              style={{
                position: 'fixed',
                display: 'none',
                background: 'transparent',
                zIndex,
                ...style,
              }}
            >
              {children}
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
