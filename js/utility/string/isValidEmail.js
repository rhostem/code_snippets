/**
 * 유효한 이메일 주소인지 검사
 * @param {string} email
 */
const isValidEmail = (email = '') => {
  const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
  const isEmptyAfterAtSign = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@$/.test(email)
  const isNoAtSign = email.search('@') < 0

  return isValid && !isEmptyAfterAtSign && !isNoAtSign
}

export default isValidEmail
