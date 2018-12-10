/**
 * 인풋 커서를 맨 뒤로 보낸다.
 */
export const moveCursorToEndOfInput = el => {
  setTimeout(() => {
    if (el) {
      el.selectionStart = el.selectionEnd = 10000
    }
  }, 1)
}
