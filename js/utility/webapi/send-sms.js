const ua = window.navigator.userAgent
const isMobile = /mobile/gi.test(ua)

if (!isMobile) {
  alert('모바일에서만 보낼 수 있습니다.')
} else {
  let smsLink = 'sms://'
  const { title, title_sub, code, owner_name } = this.state.eventData
  const bodyText = `${title}\n${title_sub}\n${owner_name}\n\n${
    process.env.PUBLIC_URL
  }/event/${code}`
  const phone = window.prompt('메시지를 받을 휴대폰 번호를 입력하세요')

  if (isMobileNum(phone)) {
    const isAndroid = /android/gi.test(ua)
    if (isAndroid) {
      smsLink = `sms://${phone}?body=${bodyText}`
      window.open(encodeURI(smsLink))
    } else {
      const iosMatch = /iPhone OS (\d{1,2})/g.exec(ua)
      const isIOS = iosMatch !== null
      const iosVersion = isIOS ? parseInt(iosMatch[1], 10) : null

      if (iosVersion < 9) {
        smsLink = `sms://${phone};body=${bodyText}`
      } else {
        smsLink = `sms://${phone}&body=${bodyText}`
      }
      window.open(encodeURI(smsLink))
    }
  } else {
    alert('유효한 휴대전화 번호가 아닙니다.')
  }
}
