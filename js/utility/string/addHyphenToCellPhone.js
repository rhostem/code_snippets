const removeDash = str => str.replace(/-/g, '')
const is10DigitPhoneNum = str => str.length === 10
const digit10Parser = /(\d{3})(\d{1,3})(\d+)/
const digit11Parser = /(\d{3})(\d{1,4})(\d+)/

/**
 * input onChange에서 사용한다
 */
export function addHyphenToCellPhone(str = '') {
  if (typeof str !== 'string') {
    return str
  }

  // 전화번호 입력을 위해 대쉬를 입력한 것이라면 처리하지 않는다.
  // 대쉬를 모두 제거하는 과정이 있기 때문
  if (str[str.length - 1] === '-') {
    return str
  }

  const phone = removeDash(str)
  const len = phone.length

  if (len <= 3) {
    return phone
  } else if (len <= 7) {
    return phone.replace(/(\d{3})(\d{1,4})/, '$1-$2')
  } else {
    return phone.replace(digit11Parser, '$1-$2-$3')
  }
}

/**
 * input onBlur에서 사용한다.
 * 10자리의 전화번호는 가운데 자리를 3개로 해서 변환한다.
 */
export const confirmPhoneFormat = str => {
  const phone = removeDash(str)

  if (phone.length === 10) {
    return phone.replace(digit10Parser, '$1-$2-$3')
  } else {
    return phone.replace(digit11Parser, '$1-$2-$3')
  }
}
