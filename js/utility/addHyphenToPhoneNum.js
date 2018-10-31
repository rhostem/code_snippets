/**
 * 휴대폰 번호에 하이픈을 자동으로 추가한다.
 * 01012345678 -> 010-1234-5678
 *
 * @param  {String} phoneNum
 * @return {[String]}
 */
export const addHyphenToPhoneNum = (phoneNum = '') => {
  // 숫자도 문자열로 변환.
  phoneNum = phoneNum.toString();

  const phoneNumTrimmed = removeDashFromStr(phoneNum);

  // 숫자가 아니면 입력값 그대로 리턴
  if (isNaN(Number(phoneNumTrimmed))) {
    return phoneNum;
  }

  let result = '';
  let threePartNum = /(\d{3})(\d{4})(\d+)/; // 하이픈 2개
  let towPartNum = /(\d{3})(\d+)/; // 하이픈 1개

  // 서울 지역번호일 경우에만 하이픈으로 구분할 앞자리는 2개
  if (phoneNumTrimmed.indexOf('02') === 0) {
    threePartNum = /(\d{2})(\d{4})(\d+)/;
    towPartNum = /(\d{2})(\d+)/;
  }

  if (threePartNum.test(phoneNumTrimmed)) {
    result = phoneNumTrimmed.replace(threePartNum, '$1-$2-$3');
  } else if (towPartNum.test(phoneNumTrimmed)) {
    result = phoneNumTrimmed.replace(towPartNum, '$1-$2');
  } else {
    result = phoneNumTrimmed;
  }

  return result;
};