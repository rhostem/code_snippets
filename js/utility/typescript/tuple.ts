function tuple<T extends unknown[]>(...rest: T): T {
  return rest
}

const sample = tuple(123, 'string', [1, 2, 3])
