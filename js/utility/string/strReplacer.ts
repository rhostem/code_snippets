export default function strReplacer(
  str: string,
  ...replaces: Array<string | number>
) {
  const partials = str.split('%s');

  if (partials.length - 1 === replaces.length) {
    return partials.reduce((combined, partial, index) => {
      return combined + (index !== 0 ? replaces[index - 1] : '') + partial;
    }, '');
  }

  throw new Error(
    `Number of replace target is ${partials.length - 1}. But got ${
      replaces.length
    }`
  );
}
