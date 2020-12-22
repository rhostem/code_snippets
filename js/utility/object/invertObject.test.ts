import invertObject from './invertObject';

describe('invertObject', () => {
  test('test case', () => {
    const original = {
      key1: 'value1',
      key2: 'value2',
    };
    const inverted = invertObject<typeof original>(original);

    expect(inverted).toEqual({
      value1: 'key1',
      value2: 'key2',
    });
  });
});
