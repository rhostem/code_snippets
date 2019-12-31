/**
 * Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.
 * @param {*} str
 */
export const btoa = str => Buffer.from(str, 'binary').toString('base64')
btoa('foobar') // 'Zm9vYmFy'

/**
 * Decodes a string of data which has been encoded using base-64 encoding.
 * @param {*} str
 */
export const atob = str => Buffer.from(str, 'base64').toString('binary')
atob('Zm9vYmFy') // 'foobar'
