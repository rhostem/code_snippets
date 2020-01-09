import runPromisesInSeries from './runPromisesInSeries'

describe('runPromisesInSeries', () => {
  const delay = d =>
    new Promise(r => {
      return setTimeout(() => {
        r(d) // resolve delay
      }, d)
    })

  const prs = [() => delay(200), () => delay(500)]

  it('마지막 resolve 값이 결과에 나와야 한다', async () => {
    const result = await runPromisesInSeries(prs)
    expect(result).toBe(500)
  })
})
