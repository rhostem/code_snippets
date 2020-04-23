const isMobileNum = (num) => /^\d{3}-?\d{3,4}-?\d{4}$/.test(num)

/**
 * 문자 메시지 보내기
 */
export default function sendSMS({ contents }) {
  let smsLink = 'sms://'
  const phone = window.prompt('메시지를 받을 휴대폰 번호를 입력하세요')

  if (!!phone) {
    if (isMobileNum(phone)) {
      const ua = window.navigator.userAgent
      const iosMatch = /iPhone OS (\d{1,2})/g.exec(ua)
      const isIOS = iosMatch !== null
      const phoneTrimmed = phone.replace(/-/g, '')

      if (isIOS) {
        const iosVersion = isIOS ? parseInt(iosMatch[1], 10) : null

        if (iosVersion < 9) {
          smsLink = `sms://${phoneTrimmed};body=${contents}`
        } else {
          smsLink = `sms://${phoneTrimmed}&body=${contents}`
        }
      } else {
        smsLink = `sms://${phoneTrimmed}?body=${contents}`
      }

      window.location.href = encodeURI(smsLink)
      return true
    } else {
      alert('유효한 휴대전화 번호가 아닙니다.')
      return false
    }
  } else {
    return false
  }
}
