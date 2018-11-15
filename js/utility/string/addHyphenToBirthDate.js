/**
 * yyyyMMdd 형식의 생일 입력값에 하이픈을 자동으로 추가한다.
 * @param {[type]} birthDate [yyyyMMdd]
 */
export const addHyphenToBirthDate = (birthDate = '') => {
  // 숫자도 문자열로 변환.
  birthDate = birthDate.toString();

  const removeDashFromStr = str => str.replace(/\-/g, '')
  let birthDateTrimmd = removeDashFromStr(birthDate);

  // 숫자가 아니면 입력값 그대로 리턴
  if (isNaN(Number(birthDateTrimmd))) {
    return birthDate;
  }

  if (birthDateTrimmd.length > 8) {
    birthDateTrimmd = birthDateTrimmd.slice(0, 8);
  }

  let result = '';
  const yyyyMMdd = /(\d{4})(\d{2})(\d{2})/;
  const yyyyMM = /(\d{4})(\d{2})(\d+)/;
  const yyyy = /(\d{4})(\d+)/;

  if (yyyyMMdd.test(birthDateTrimmd)) {
    result = birthDateTrimmd.replace(yyyyMMdd, '$1-$2-$3');
  } else if (yyyyMM.test(birthDateTrimmd)) {
    result = birthDateTrimmd.replace(yyyyMM, '$1-$2-$3');
  } else if (yyyy.test(birthDateTrimmd)) {
    result = birthDateTrimmd.replace(yyyy, '$1-$2');
  } else {
    result = birthDateTrimmd;
  }

  return result;
};