import strReplacer from './strReplacer';

describe('strReplacer', () => {
  test('일반 텍스트 테스트 ', () => {
    expect(
      strReplacer('your name is %s, and your age is %s', 'Henry', 22)
    ).toBe('your name is Henry, and your age is 22');
  });

  test('API endpoint 테스트', () => {
    expect(strReplacer('profile_reviews/%s/assign', 'image')).toBe(
      'profile_reviews/image/assign'
    );
  });
});
