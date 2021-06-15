import isKeyMatches from './isKeyMatches';

describe('isKeyMatches', () => {
  test('isKeyMatches 함수는 두 객체의 키가 일치하면 true를 리턴한다', () => {
    const a = {
      one: 1,
      two: 2,
      three: 3,
    };

    const b = {
      one: null,
      two: null,
      three: null,
    };

    expect(isKeyMatches(a, b)).toEqual(true);
  });

  test('isKeyMatches 함수는 두 객체의 키가 일치하지 않으면 false를 리턴한다', () => {
    const a = {
      one: 1,
      two: 2,
    };

    const b = {
      two: null,
    };

    expect(isKeyMatches(a, b)).toEqual(false);
  });
});
