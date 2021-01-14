export default function omitByKey<T, K extends keyof T>(
  obj: T,
  ...rest: Array<K>
): Omit<T, K> {
  const isKeyMatches = (target: K) => rest.includes(target);

  return Object.entries(obj).reduce((result, [name, value]) => {
    return isKeyMatches(name as K) ? result : { ...result, [name]: value };
  }, {} as Omit<T, K>);
}
