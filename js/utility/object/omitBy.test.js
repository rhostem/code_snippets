import omitBy from './omitBy'
import * as R from 'ramda'

test('omitBy', () => {
  expect(
    omitBy(
      {
        a: 'asd',
        b: 123,
        d: null,
        e: undefined,
      },
      R.isNil
    )
  ).toEqual({
    a: 'asd',
    b: 123,
  })
})
