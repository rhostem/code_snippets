describe('getByteSize 메소드 테스트', () => {
  it('입력한 문자열의 바이트 사이즈를 계산할 수 있어야 한다.', () => {
    expect(StringHelper.getByteSize('A')).to.equal(1);
    expect(StringHelper.getByteSize('I am')).to.equal(4);
    expect(StringHelper.getByteSize('한글')).to.equal(6);
    expect(StringHelper.getByteSize('한글\n입니다')).to.equal(16);
    expect(StringHelper.getByteSize('大韓民國')).to.equal(12);
  });
});
