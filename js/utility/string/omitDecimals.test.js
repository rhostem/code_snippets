import omitZeroDecimals from './omitZeroDecimals'

describe('omitZeroDecimals는', () => {
  it('소수점 이하 자리가 모두 0이면 정수로 변환한다. ', () => {
    expect(omitZeroDecimals(12.0)).toEqual(12)
    expect(omitZeroDecimals(-12.0)).toEqual(-12)
  })

  it('소수점 이하가 모두 0이 아니면 아니면 그대로 반환한다', () => {
    expect(omitZeroDecimals(12.5)).toEqual(12.5)
    expect(omitZeroDecimals(-12.5)).toEqual(-12.5)
  })

  it('0은 그대로', () => {
    expect(omitZeroDecimals(0.0)).toEqual(0)
  })
})
