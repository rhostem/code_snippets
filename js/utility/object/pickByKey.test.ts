import pickByKey from './pickByKey';

describe('omitByKey', () => {
  test('키 1개만 선택', () => {
    expect(pickByKey({ a: 1, b: 2 }, 'a')).toEqual({ a: 1 });
  });

  test('복수의 키 선택', () => {
    expect(pickByKey({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({
      a: 1,
      b: 2,
    });
  });
});
