/**
 * 주어진 배열을 일정 길이 단위로 잘라낸 후 그 조각들을 다시 배열로 구성한다.
 * 1차원 배열을 2차원 배열을 만드는 것.
 * @param {*} arr 배열
 * @param {*} chunkLength 잘라낼 길이
 */
export default function splitArrayToChunks(arr = [], chunkLength = 1) {
  const originalArr = arr.slice()
  let chunks = []

  while (originalArr.length >= chunkLength) {
    const chunk = originalArr.splice(0, chunkLength)
    chunks.push(chunk)
  }

  // 남은 조각도 추가한다
  if (originalArr.length > 0) {
    chunks.push(originalArr)
  }

  return chunks
}
