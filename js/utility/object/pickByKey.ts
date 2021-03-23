export default function pickByKey<T, K extends keyof T>(
  obj: T,
  ...rest: K[]
): Pick<T, K> {
  const isKeyMatches = (target: K) => rest.includes(target);

  return Object.entries(obj).reduce((result, [name, value]) => {
    return isKeyMatches(name as K) ? { ...result, [name]: value } : result;
  }, {} as Pick<T, K>);
}
