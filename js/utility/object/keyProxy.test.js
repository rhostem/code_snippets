import keyProxy from './keyProxy'

describe('keyProxy', () => {
  it('should be return a variable whose value is same as its name', () => {
    const { foo, bar, CONSTANT } = keyProxy
    expect(foo).toBe('foo')
    expect(bar).toBe('bar')
    expect(CONSTANT).toBe('CONSTANT')
  })
})
