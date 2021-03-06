import createAndFillArray from './createAndFillArray'

describe('test name', () => {
  it('객체로 채워진 배열을 만든다.', () => {
    const result = createAndFillArray({ mapper: {}, length: 3 })
    expect(result).toEqual([{}, {}, {}])
  })

  it('mapper에 함수를 사용해서 값을 만든다', () => {
    const result = createAndFillArray({ mapper: i => i, length: 3 })
    expect(result).toEqual([0, 1, 2])
  })
})
