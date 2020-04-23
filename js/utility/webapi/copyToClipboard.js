import copyTextWithPrompt from 'copy-to-clipboard'

const copyText = () => {
  const isMobile = /mobile/gi.test(navigator.userAgent)

  copyTextWithPrompt('text to copy', {
    debug: process.env.NODE_ENV === 'development',
    message: `${!isMobile ? '#{key}를 눌러서 ' : ''}선택된 영역을 복사하세요.`,
    onCopy: () => {
      alert('공유 링크가 복사되었습니다.')
    },
  })
}

/**
 * 클립보드에 텍스트 복사
 *
 * ! safari 브라우저에서 작동하지 않음. 아래의 모듈을 사용하는 것 추천.
 * copy-to-clipboard(https://www.npmjs.com/package/copy-to-clipboard)
 *
 * @param {string} textToCopy
 */
export function copyToClipboard(textToCopy = '') {
  const hiddenInputId = 'hidden-input-for-copy'

  const attachHiddenInput = () => {
    const hiddenInputEl = document.createElement('input')

    hiddenInputEl.style.position = 'fixed'
    hiddenInputEl.style.bottom = '-100vh'
    hiddenInputEl.type = 'text'
    hiddenInputEl.id = hiddenInputId
    document.getElementsByTagName('body')[0].appendChild(hiddenInputEl)

    return hiddenInputEl
  }

  const getHiddenInputEl = () => {
    const inputEl = document.getElementById(hiddenInputId)

    if (!inputEl) {
      return attachHiddenInput()
    } else {
      return inputEl
    }
  }

  const copy = (el, str) => {
    el.value = str
    el.select()
    document.execCommand('Copy')
  }

  copy(getHiddenInputEl(), textToCopy)
}
