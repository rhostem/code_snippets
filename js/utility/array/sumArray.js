function sumArray(arr = []) {
  return Array.isArray(arr)
    ? arr.reduce((sum, num) => {
        return sum + num
      }, 0)
    : NaN
}

export default sumArray
