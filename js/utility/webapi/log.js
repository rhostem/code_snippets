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

export function devAlert() {
  if (isNotProdEnv) {
    alert(...arguments)
  }
}

export function devDir(obj) {
  if (isNotProdEnv) {
    console.dir(obj)
  }
}

export function devGroup(group) {
  if (isNotProdEnv) {
    console.group(group)
  }
}

export function devGroupEnd(group) {
  if (isNotProdEnv) {
    console.groupEnd(group)
  }
}

export function devTable(arr) {
  if (isNotProdEnv) {
    console.table(arr)
  }
}
