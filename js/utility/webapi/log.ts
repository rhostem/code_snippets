/**
 * console document
 * https://developer.mozilla.org/ko/docs/Web/API/Console
 */

const isNotProdEnv = process.env.NODE_ENV !== 'production'

/**
 * 환경변수 확인해서 개발 환경에서만 콘솔 로그를 출력한다
 */
export function devLog(...args: any[]) {
  if (isNotProdEnv) {
    console.log(`[App] `, ...args)
  }
}

export function devAlert(...args: any[]) {
  if (isNotProdEnv) {
    alert(...args)
  }
}

export function devDir(obj: Object) {
  if (isNotProdEnv) {
    console.dir(obj)
  }
}

export function devGroup(group = '') {
  if (isNotProdEnv) {
    console.group(group)
  }
}

export function devGroupEnd() {
  if (isNotProdEnv) {
    console.groupEnd()
  }
}

export function devTable(arr: any[]) {
  if (isNotProdEnv) {
    console.table(arr)
  }
}
