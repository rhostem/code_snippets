import isTruthy, { isFalsey } from './isTruthy'

describe('isTruthy', () => {
  it('false', () => {
    expect(isTruthy(false)).toBe(false)
  })
  it('zero', () => {
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy(-0)).toBe(false)
    expect(isTruthy(0.0)).toBe(false)
    expect(isTruthy(0x0)).toBe(false)
  })
  it('empty string', () => {
    expect(isTruthy('')).toBe(false)
    expect(isTruthy('')).toBe(false)
    expect(isTruthy(``)).toBe(false)
  })
  it('nil', () => {
    expect(isTruthy(null)).toBe(false)
    expect(isTruthy(undefined)).toBe(false)
  })
  it('NaN', () => {
    expect(isTruthy(NaN)).toBe(false)
  })
  it('object', () => {
    expect(isTruthy({})).toBe(true)
  })
  it('Symbol', () => {
    expect(isTruthy(Symbol('unique'))).toBe(true)
  })
})

describe('falsey', () => {
  it('false', () => {
    expect(isFalsey(false)).toBe(true)
  })
  it('zero', () => {
    expect(isFalsey(0)).toBe(true)
    expect(isFalsey(-0)).toBe(true)
    expect(isFalsey(0.0)).toBe(true)
    expect(isFalsey(0x0)).toBe(true)
  })
  it('empty string', () => {
    expect(isFalsey('')).toBe(true)
    expect(isFalsey('')).toBe(true)
    expect(isFalsey(``)).toBe(true)
  })
  it('nil', () => {
    expect(isFalsey(null)).toBe(true)
    expect(isFalsey(undefined)).toBe(true)
  })
  it('NaN', () => {
    expect(isFalsey(NaN)).toBe(true)
  })
  it('object', () => {
    expect(isFalsey({})).toBe(false)
  })
  it('Symbol', () => {
    expect(isFalsey(Symbol('unique'))).toBe(false)
  })
})
