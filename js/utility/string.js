import React from 'react'
import sanitizeHtml from 'sanitize-html'
import * as R from 'ramda'

export function addCommaToNum(x = '') {
  // 캡쳐링 그룹이 중첩되어 있다. 숫자 3개가 반복되는 패턴의 시작점을 찾아서 그 위치를 콤마로 바꾼다. \B는 단어의 경계가 아닌 곳에 일치하므로
  // 숫자1~2개 + \B + 숫자 3개 반복 + 숫자가 아닌 문자 패턴이 된다
  // 경계 \B를 콤마로 변경한다
  // ex) 1 + \B + 000 + ,000
  //     1,000,000
  return x === null ? '' : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const removeDash = (str = '') => str.replace(/-/g, '')

export const isMobileNum = (num = '') => {
  const trimmed = removeDash(num)
  return /^01[0,1,6,7,8,9]\d{3,4}\d{4}$/.test(trimmed)
}

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

export const is10DigitNum = (str = '') => str.length === 10
export const digit10Parser = /(\d{3})(\d{1,3})(\d+)/
export const digit11Parser = /(\d{3})(\d{1,4})(\d+)/

/**
 * input onBlur에서 사용한다.
 * 10자리의 전화번호는 가운데 자리를 3개로 해서 변환한다.
 */
export const confirmPhoneFormat = str => {
  const phone = removeDash(str)

  if (is10DigitNum(phone)) {
    return phone.replace(digit10Parser, '$1-$2-$3')
  } else {
    return phone.replace(digit11Parser, '$1-$2-$3')
  }
}

/**
 * 공백 문자인지 확인한다. 길이가 0이거나 모두 공백 문자이거나
 * @param {} str
 */
export const isEmptyString = str => {
  if (typeof str !== 'string') {
    return false
  } else {
    return str.replace(/\s/g, '') === ''
  }
}

/**
 * 문자열에 개행 문자가 있으면 JSX에서 줄바꿈이 되도록 처리한다.
 * https://codesandbox.io/s/w6jv6yjnv5
 * @param {sstring } text
 */
export const addNewLine = (text = '') => {
  if (typeof text === 'string') {
    const lines = text.toString().split(/\\r\\n|\r\n|\r|\\r|\n|\\n/g) || []

    return lines.map((partial, i) => (
      <span key={i}>
        {partial}
        {i !== lines.length - 1 ? <br /> : null}
      </span>
    ))
  } else {
    return text
  }
}

// 개행문자, 공백문자 제거
export const removeNewlineChar = (str = '') => {
  if (typeof str !== 'string') {
    return str
  } else {
    return str.replace(/\\n|\n|\\r|\r/g, '')
  }
}

/**
 * 기본적으로 h1, h2 태그를 허용하지 않는다. 옵션으로 추가해준다.
 * https://www.npmjs.com/package/sanitize-html
 * @export
 * @param {string} [str='']
 * @returns
 */
export function sanitizeMarkup(str = '') {
  return sanitizeHtml(str, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2']),
  })
}

// 조건부 클래스명
export const condClass = (predicate, className) => {
  if (typeof predicate === 'function') {
    return R.ifElse(predicate, R.always(className), R.always(''))
  } else {
    return R.ifElse(R.identical(true), R.always(className), R.always(''))(predicate)
  }
}
