import { compareKeys } from './object'

describe('compareKeys', () => {
  const normalA = { a: 1, b: 2 }
  const normalB = { b: 1, a: 2 }
  const normalC = { b: 1, a: 2 }

  const nestedA = {
    a: {
      b: 1,
      c: {
        d: 1,
        e: 1,
      },
    },
    d: 1,
  }
  const nestedB = {
    d: 1,
    a: {
      c: {
        e: 1,
        d: 1,
      },
      b: 1,
    },
  }
  const nestedC = {
    d: 1,
    a: {
      c: {
        e: 1,
        d: 1,
      },
      b: 1,
    },
  }

  it('should pass normal nested object', () => {
    expect(compareKeys(normalA, normalB, normalC)).toEqual(true)
  })

  it('should pass nested object', () => {
    expect(compareKeys(nestedA, nestedB, nestedC)).toEqual(true)
  })

  it('should not pass different object', () => {
    const diffA = Object.assign({}, nestedA)
    diffA['prop'] = 1

    expect(compareKeys(diffA, nestedB)).toEqual(false)
  })

  it('should throw error when less then 2 parameters are passed', () => {
    expect(() => {
      compareKeys(normalA)
    }).toThrowError()
  })

  it('should throw error when parameter is not an ob ject', () => {
    expect(() => {
      compareKeys(normalA, 1)
    }).toThrowError()
    expect(() => {
      compareKeys(normalA, '1')
    }).toThrowError()
    expect(() => {
      compareKeys(normalA, null)
    }).toThrowError()
    expect(() => {
      compareKeys(normalA, undefined)
    }).toThrowError()
  })
})
