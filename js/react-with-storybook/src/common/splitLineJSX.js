import React from 'react'

/**
 * 개행문자가 있는 문자열에 JSX br 태그를 추가해서 리턴한다
 * @param {String} str 개행문자 포함된 문자열
 */
export default function splitLineJSX(str) {
  const isLastIndex = (arr, i) => arr.length - 1 === i

  return typeof str === 'string'
    ? str.split(/\r?\n/).map((partial, i, partialArr) => (
        <>
          {partial}
          {!isLastIndex(partialArr, i) && <br />}
        </>
      ))
    : str
}
