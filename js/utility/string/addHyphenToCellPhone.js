export const isMobileNum = (num = '') => {
  const trimmed = removeDash(num)
  return /^01[0,1,6,7,8,9]\d{3,4}\d{4}$/.test(trimmed)
}

export const removeDash = (str = '') => str.replace(/-/g, '')

/**
 * input onChange에서 사용한다
 */
export function addHyphenToCellPhone(str = '') {
  const num = removeDash(str.toString())
  return num.length <= 3 || num.length > 11
    ? num
    : num.length <= 7
    ? num.replace(/(\d{3})(\d{1,4})/, '$1-$2')
    : num.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
}

/**
 * input onBlur에서 사용한다.
 * 10자리의 전화번호는 가운데 자리를 3개로 해서 변환한다.
 */
export const confirmPhoneFormat = (str = '') => {
  const num = removeDash(str.toString())
  return num.length === 10
    ? num.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3')
    : num.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
}
