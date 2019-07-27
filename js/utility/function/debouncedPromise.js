export default function debouncePromise(inner, ms = 0) {
  let timer = null
  let resolves = []

  return function(...args) {
    // Run the function after a certain amount of time
    clearTimeout(timer)
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      let result = inner(...args)
      resolves.forEach(resolve => resolve(result))
      resolves = []
    }, ms)

    return new Promise(resolve => resolves.push(resolve))
  }
}
