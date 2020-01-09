import { getByteSize, getByteSizeWithBlob } from './getByteSize'
describe('입력한 문자열의 바이트 사이즈를 계산할 수 있어야 한다.', () => {
  const testcase = fn => {
    expect(fn('A')).toBe(1)
    expect(fn('I am')).toBe(4)
    expect(fn('한글')).toBe(6)
    expect(fn('한글\n입니다')).toBe(16)
    expect(fn('大韓民國')).toBe(12)
  }

  it('getByteSize', () => {
    testcase(getByteSize)
  })

  it('getByteSizeWithBlob', () => {
    testcase(getByteSizeWithBlob)
  })
})
