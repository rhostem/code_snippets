import * as R from 'ramda'

export const dotPath = R.useWith(R.path, [R.split('.')])
export const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of])

// undefined, null, 빈 객체, 빈 배열, 빈 문자
export const isFalsey = v => R.or(R.isNil(v), R.isEmpty(v))
// isFalsey가 아닌 값
export const isTruthy = v => R.not(isFalsey(v))

export const isTruthy2 = R.allPass([
  // 빈 값이 아니어야 한다
  R.compose(
    R.not,
    R.isEmpty
  ),
  // null, undefined가 아니어야 한다
  R.compose(
    R.not,
    R.isNil
  ),
])

export const isFalsey2 = R.compose(
  R.not,
  isTruthy2
)

export const parseDeci = R.partialRight(parseInt, [10])
