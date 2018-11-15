import { adjustTimeByTenMinute, isAdjustedByTenMinute } from './time'
import { expect } from 'chai'

describe('adjustTimeByTenMinute 함수 테스트', () => {
  it('10시 11분은 10시 10분이 되어야 한다.', () => {
    const target = +new Date('2017-12-01T10:11')
    const result = +new Date('2017-12-01T10:10')
    expect(adjustTimeByTenMinute(target)).to.equal(result)
  })

  it('10시 16분은 10시 10분이 되어야 한다.', () => {
    const target = +new Date('2017-12-01T10:16')
    const result = +new Date('2017-12-01T10:10')
    expect(adjustTimeByTenMinute(target)).to.equal(result)
  })

  it('10시 59분은 10시 50분이 되어야 한다.', () => {
    const target = +new Date('2017-12-01T10:59')
    const result = +new Date('2017-12-01T10:50')
    expect(adjustTimeByTenMinute(target)).to.equal(result)
  })

  it('10분 단위로 조정된 시간은 변경이 없다.', () => {
    const target = +new Date('2017-12-01T10:50')
    const result = +new Date('2017-12-01T10:50')
    expect(adjustTimeByTenMinute(target)).to.equal(result)
  })
})

describe('isAdjustedByTenMinute 함수', () => {
  it('10분 단위인 시간은 true를 리턴한다.', () => {
    const target = +new Date('2017-12-01T10:10')
    expect(isAdjustedByTenMinute(target)).to.equal(true)
  })
  it('10분 단위가 아니면 false를 리턴한다.', () => {
    const target = +new Date('2017-12-01T10:16')
    expect(isAdjustedByTenMinute(target)).to.equal(false)
  })
})
