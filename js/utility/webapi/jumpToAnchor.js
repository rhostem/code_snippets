export const jumpToAnchor = (name = '') => {
  window.location.href = `#${name}`
}

/**
 * smooth scrolling. polyfill 추가가 필요하다.
 * @param {*} name
 */
export const scrollToAnchor = ({
  name,
  behavior = 'smooth',
  onScrollEnd = () => {},
}) => {
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
