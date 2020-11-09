import objHasValue from './objHasValue';

describe('objHasValue', () => {
  enum SampleEnum {
    CONST_A,
    CONST_B,
  }

  test.each([
    ['object', { prop: 100 }, 100],
    ['Enum', SampleEnum, 0],
  ])('%s %s should has value %s', (...args) => {
    const [, obj, target] = args;
    expect(objHasValue(obj, target)).toBe(true);
    expect(objHasValue(obj, `${target}wrongValue`)).toBe(false);
  });
});
