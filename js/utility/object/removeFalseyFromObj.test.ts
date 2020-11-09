import removeFalseyFromObj from './removeFalseyFromObj';

describe('removeFalseyFromObj', () => {
  const keyLen = (obj: Object) => Object.keys(obj).length;

  test.each([
    ['undefined', { prop: undefined }],
    ['null', { prop: null }],
    ['empty string which has no length', { prop: '' }],
  ])('%s should be removed from object', (...args) => {
    const [, original] = args;

    const trimmed = removeFalseyFromObj(original);
    const expected = {};

    expect(trimmed).toEqual(expected);
    expect(keyLen(trimmed)).toEqual(keyLen(expected));
  });
});
