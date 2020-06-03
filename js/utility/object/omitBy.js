import { curry, converge, compose, filter, omit, keys, identity } from 'ramda'

/**
 * 객체에서 predicate를 만족하는 값을 가진 필드를 제거한다
 */
const omitBy = curry((predicate, obj) =>
  converge(omit, [
    compose(
      filter(key => predicate(obj[key])),
      keys
    ),
    identity,
  ])(obj)
)

export default omitBy
