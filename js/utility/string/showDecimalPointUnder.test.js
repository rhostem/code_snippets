import showDecimalPointUnder from './showDecimalPointUnder'

describe('showDecimalPointUnder', () => {
  test('소수점 찻째자리', () => {
    expect(showDecimalPointUnder(10.1234, 1)).toBe(10.1)
  })

  test('소수점 셋째자리', () => {
    expect(showDecimalPointUnder(10.1234, 3)).toBe(10.123)
  })

  test('소수점 0자리. 즉 정수', () => {
    expect(showDecimalPointUnder(10.1234, 0)).toBe(10)
  })

  test('숫자 데이터만 처리됨', () => {
    expect(showDecimalPointUnder('10.1234', 2)).toBe('10.1234')
    expect(showDecimalPointUnder({}, 2)).toEqual({})
    expect(showDecimalPointUnder(null, 2)).toEqual(null)
    expect(showDecimalPointUnder(undefined, 2)).toEqual(undefined)
  })

  test('정수에는 영향 없음', () => {
    expect(showDecimalPointUnder(100, 2)).toBe(100)
  })
})
