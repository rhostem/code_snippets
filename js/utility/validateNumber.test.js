import isValidNumber from './isValidNumber'

it('isValidNumber', () => {
  expect(isValidNumber(0)).toBe(true)
  expect(isValidNumber(123)).toBe(true)
  expect(isValidNumber('123')).toBe(true)
  expect(isValidNumber('0123')).toBe(true) // '0123' == 123
  expect(isValidNumber(Infinity)).toBe(false)
  expect(isValidNumber(NaN)).toBe(false)
  expect(isValidNumber('num')).toBe(false)
})
