import * as R from 'ramda'

export const canUseDOM = () => typeof window !== 'undefined'

export const checkIsMobile = () => {
  return canUseDOM() && /mobile/i.test(window.navigator.userAgent)
}

/**
 * document 전체적인 상대 위치
 * @param {*} el
 */
export function offsetToDocument(el) {
  if (el) {
    const rect = el.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  } else {
    console.error('offsetToDocument: no element')
    return {}
  }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keyMakeScroll = { 37: 1, 38: 1, 39: 1, 40: 1 }

function preventDefault(e) {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

function preventDefaultForScrollKeys(e) {
  if (keyMakeScroll[e.keyCode]) {
    preventDefault(e)
    return false
  }
}
