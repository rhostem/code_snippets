import addCommaToNum from './addCommaToNum'

describe('addCommaToNum', () => {
  test('4자리 숫자', () => {
    expect(addCommaToNum(1234)).toBe('1,234')
  })

  test('1 digit number', () => {
    expect(addCommaToNum(0)).toBe('0')
  })

  test('number has decimal points', () => {
    expect(addCommaToNum(1000.1234)).toBe('1,000.1234')
  })
})
