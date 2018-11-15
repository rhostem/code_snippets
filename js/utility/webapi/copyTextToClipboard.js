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
