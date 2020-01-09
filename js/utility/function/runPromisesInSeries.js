const runPromisesInSeries = promises => {
  return promises.reduce(
    (currentPromise, nextPromise) => currentPromise.then(nextPromise),
    Promise.resolve()
  )
}

export default runPromisesInSeries
