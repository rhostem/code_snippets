export default function isKeyMatches(
  objA: Record<string, any>,
  objB: Record<string, any>,
) {
  try {
    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);

    if (aKeys.length !== bKeys.length) {
      throw new Error();
    }

    aKeys.forEach((key) => {
      if (!bKeys.includes(key)) {
        throw new Error();
      }
    });
    return true;
  } catch (e) {
    return false;
  }
}
