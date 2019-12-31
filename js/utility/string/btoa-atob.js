/**
 * 문자열에서 base64로 인코딩된 ASCII 문자열 생성. node.js Buffer를 사용한다.
 * @param {*} str
 */
export const btoa = str => Buffer.from(str, 'binary').toString('base64')
btoa('foobar') // 'Zm9vYmFy'

/**
 * base64로 인코딩된 ASCII 문자열을 디코딩한다.
 * @param {*} str
 */
export const atob = str => Buffer.from(str, 'base64').toString('binary')
atob('Zm9vYmFy') // 'foobar'
