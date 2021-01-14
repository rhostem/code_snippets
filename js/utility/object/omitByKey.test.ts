import omitByKey from './omitByKey';

describe('omitByKey', () => {
  test('키 1개만 제거', () => {
    expect(omitByKey({ a: 1, b: 2 }, 'a')).toEqual({ b: 2 });
  });

  test('복수의 키 제거', () => {
    expect(omitByKey({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toEqual({});
  });
});
