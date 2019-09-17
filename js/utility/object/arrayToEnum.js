export default function arrayToEnum(array) {
  return Array.isArray(array)
    ? array.reduce((result, v) => {
        return Object.assign(result, { [v]: v })
      }, {})
    : {}
}
