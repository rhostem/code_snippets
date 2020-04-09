import splitArrayToChunks from './splitArrayToChunks'

describe('splitArrayToChunks', () => {
  test('전체 길이가 chunkLength의 배수인 경우', () => {
    expect(splitArrayToChunks([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
  })
  test('전체 길이가 chunkLength의 배수가 아닌 경우', () => {
    expect(splitArrayToChunks([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7],
    ])
  })
})
