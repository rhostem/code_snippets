export default function invertObject<T = Object>(obj: T) {
  return Object.entries(obj).reduce((result, [name, code]) => {
    return {
      ...result,
      [code]: name,
    };
  }, {} as Record<string, keyof T>);
}
