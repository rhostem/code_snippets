//- safari에서 하단 네비게이션 바를 항상 표시하게 만드는 스크립트
// https://www.eventbrite.com/engineering/mobile-safari-why/
function showSafariNavbarAlways(isEnabled = true) {
  var ua = window.navigator.userAgent
  var isSafari = /safari/gi.test(ua)
  var isMobile = /mobile/gi.test(ua)

  if (isSafari && isMobile) {
    var htmlEl = $('html')
    var bodyEl = $('body')

    if (isEnabled) {
      htmlEl.addClass('lock-bottomBar-on-safari')
      bodyEl.addClass('lock-bottomBar-on-safari')
    } else {
      htmlEl.removeClass('lock-bottomBar-on-safari')
      bodyEl.removeClass('lock-bottomBar-on-safari')
    }
  }
}

// /* Allows content to fill the viewport and go beyond the bottom */
// height: 100%;
// /* Allows you to scroll below the viewport; default value is visible */
// overflow-y: scroll;
// /* To smooth any scrolling behavior */
// -webkit-overflow-scrolling: touch;
