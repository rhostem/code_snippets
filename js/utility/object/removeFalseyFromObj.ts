export default function removeFalseyFromObj(obj: Object) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const isFalsey =
      value === undefined || value === null || value === '' || value === NaN;

    return isFalsey
      ? result
      : {
          ...result,
          [key]: value,
        };
  }, {});
}
