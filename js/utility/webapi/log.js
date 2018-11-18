/**
 * console document
 * https://developer.mozilla.org/ko/docs/Web/API/Console
 */

const isNotProdEnv = process.env.NODE_ENV !== 'production'

/**
 * 환경변수 확인해서 개발 환경에서만 콘솔 로그를 출력한다
 */
export function devLog() {
  if (isNotProdEnv) {
    console.log(`[App] `, ...arguments)
  }
}

/**
 * console 객체에서 사용할 기능을 직접 지정함.
 */
export function devLogCount(label) {
  if (isNotProdEnv) {
    console.count(`[App] ${label}`)
  }
}

export function devAlert() {
  if (isNotProdEnv) {
    alert(...arguments)
  }
}
