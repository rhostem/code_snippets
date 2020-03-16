import * as R from 'ramda'

const omitBy = (predicate, obj) =>
  R.converge(R.omit, [
    R.compose(
      R.filter(key => predicate(obj[key])),
      R.keys
    ),
    R.identity,
  ])(obj)

export default omitBy
