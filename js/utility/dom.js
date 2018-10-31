import * as R from 'ramda'

export const canUseDOM = () => typeof window === 'object'

export const insertScriptTag = ({ document, id = '', source = '', onload = () => {} }) => {
  if (!canUseDOM()) {
    return
  }

  var js,
    fjs = document.getElementsByTagName('script')[0]

  if (document.getElementById(id)) {
    return
  }
  js = document.createElement('script')
  js.id = id
  js.src = source
  js.onload = onload
  fjs.parentNode.insertBefore(js, fjs)
}

export function copyTextToClipboard(textToCopy = '') {
  if (!canUseDOM()) {
    console.error('window is undefined')
  }

  const id = 'hiddenInput'
  let inputEl = document.getElementById(id)

  if (!inputEl) {
    inputEl = window.document.createElement('input')
    inputEl.id = id
    inputEl.type = 'text'
    inputEl.style.position = 'fixed'
    inputEl.style.top = '-200vh'

    const body = document.getElementsByTagName('body')[0]
    body.appendChild(inputEl)

    inputEl.value = textToCopy
    inputEl.select()
    document.execCommand('copy')
    alert(inputEl.value)
  }

  inputEl.value = textToCopy
  inputEl.select()
  document.execCommand('copy')
  alert(inputEl.value)
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

/**
 * 스크롤 방지
 *
 * @export
 */
export function disableScroll() {
  if (window.addEventListener)
    // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys
}

/**
 * 스크롤 가능
 *
 * @export
 */
export function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}

export const jumpToAnchor = (name = '') => {
  window.location.href = `#${name}`
}

/**
 * smooth scrolling. polyfill 추가가 필요하다.
 * @param {*} name
 */
export const scrollToAnchor = ({ name, behavior = 'smooth', onScrollEnd = () => {} }) => {
  const target = document.getElementById(name)

  if (!R.isNil(target)) {
    const scrollTo = offsetToDocument(target).top

    disableScroll()

    window.scroll({
      top: scrollTo,
      left: 0,
      behavior,
    })

    var disposer = setInterval(() => {
      if (target.getBoundingClientRect().y < window.innerHeight / 2) {
        console.log('is visible now')
        clearInterval(disposer)
        enableScroll()``

        if (typeof onScrollEnd === 'function') {
          onScrollEnd()
        }
      }
    }, 200)
  } else {
    console.error('scrollToAnchor: target element is null.')
  }
}

export const isScrollable = () => {
  if (canUseDOM()) {
    const browserHeight = window.innerHeight // 뷰포트 높이
    const documentHeight = document.documentElement.offsetHeight
    const isScrollable = documentHeight > browserHeight

    return isScrollable
  } else {
    return false
  }
}

function lockBodyScroll(isEnabled = true) {
  var bodyEl = $('body')

  if (isEnabled) {
    bodyEl.addClass('lock-bodyScroll')
  } else {
    bodyEl.removeClass('lock-bodyScroll')
  }
}
