import omitDecimalPoints from './omitDecimalPoints'

describe('omitDecimalPoints', () => {
  test('소수점 찻째자리', () => {
    expect(omitDecimalPoints(10.1234, 1)).toBe(10.1)
  })

  test('소수점 셋째자리', () => {
    expect(omitDecimalPoints(10.1234, 3)).toBe(10.123)
  })

  test('소수점 0자리. 즉 정수', () => {
    expect(omitDecimalPoints(10.1234, 0)).toBe(10)
  })

  test('숫자 데이터만 처리됨', () => {
    expect(omitDecimalPoints({}, 2)).toEqual({})
    expect(omitDecimalPoints(undefined, 2)).toEqual(undefined)
    expect(omitDecimalPoints(null, 3)).toEqual(null)
  })

  test('정수에는 영향 없음', () => {
    expect(omitDecimalPoints(100, 2)).toBe(100)
  })
})
