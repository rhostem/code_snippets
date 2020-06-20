/**
 * https://stackoverflow.com/questions/9960908/permutations-in-javascript?page=1&tab=votes#tab-top
 *
 * @param {number[]} inputArr
 */
const permutator = inputArr => {
  let result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}
q
