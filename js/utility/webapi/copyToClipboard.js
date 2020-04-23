/**
 * 클립보드에 텍스트 복사
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

export function copyToClipboard_v1(textToCopy = '') {
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
