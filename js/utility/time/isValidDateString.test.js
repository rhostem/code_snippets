describe('isValidDateString 메소드 테스트', () => {
  it('isValidDateString의 파라메터는 적절한 데이트스트링 형식이어야 한다.', () => {
    expect(isValidDateString('2016-10-19')).to.equal(true);
    expect(isValidDateString('201611')).to.equal(true);
    expect(isValidDateString('20161122')).to.equal(false);
    expect(isValidDateString('2016-aa-bb')).to.equal(false);
  });
});