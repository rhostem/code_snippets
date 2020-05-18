/**
 * 객체를 받아 키-키 로 구성된 객체를 만든다.
 * @param obj
 */

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}

export default function keyMap<T>(obj: T): Readonly<T> {
  return Object.keys(obj).reduce((keyMap, key) => {
    return Object.assign(keyMap, { [key]: key })
  }, {})
}
