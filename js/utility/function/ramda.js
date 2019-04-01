import * as R from 'ramda'

export const dotPath = R.useWith(R.path, [R.split('.')])
export const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of])

// undefined, null, 빈 객체, 빈 배열, 빈 문자
export const isFalsey = v => R.or(R.isNil(v), R.isEmpty(v))
// isFalsey가 아닌 값
export const isTruthy = v => R.not(isFalsey(v))

export const isFalsey2 = R.anyPass([
  // 빈 값(공백 문자, 빈 배열, 빈 객체)
  R.isEmpty,
  // null, undefined
  R.isNil,
])
export const isTruthy2 = R.compose(
  isFalsey2
  R.not,
)

export const parseDeci = R.partialRight(parseInt, [10])
