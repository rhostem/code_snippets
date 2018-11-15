// https://github.com/hampusohlsson/browser-deeplink 기반으로 수정
var $ = require('jquery')

/**
 * ios와 안드로이드의 앱 다운로드 링크
 */
const appDownLink = {
  ios: `https://www.appstore.com/`,
  android: `https://play.google.com/store`,
}

const isAndroid = () => {
  return window.navigator.userAgent.match('Android')
}

const isIOS = () => {
  return (
    window.navigator.userAgent.match('iPad') ||
    window.navigator.userAgent.match('iPhone') ||
    window.navigator.userAgent.match('iPod')
  )
}

const isMobile = () => {
  return isAndroid() || isIOS()
}

/**
 * 앱으로 연결
 * @param  {[String]} deeplink
 */
export const redirectToApp = deeplink => {
  let uri = deeplink

  if (typeof window !== 'undefined') {
    let timeout
    const userAgent = window.navigator.userAgent

    const settings = {
      platform: isIOS() ? 'ios' : 'android',
      appDownLink: isIOS() ? appDownLink['ios'] : appDownLink['android'],
      appStoreId: '',
      androidPackage: '',
      fallback: true,
      delay: 1000,
      delta: 500,
    }

    /**
     * Timeout function that tries to open the app store link.
     * The time delta comparision is to prevent the app store
     * link from opening at a later point in time. E.g. if the
     * user has your app installed, opens it, and then returns
     * to their browser later on.
     *
     * @private
     * @param {Integer} Timestamp when trying to open deeplink
     * @returns {Function} Function to be executed by setTimeout
     */
    const openAppStore = ts => {
      return () => {
        const link = settings.appDownLink
        const wait = settings.delay + settings.delta

        if (typeof link === 'string' && Date.now() - ts < wait) {
          window.location.href = link
        }
      }
    }

    // 모바일이 아닌 경우 앱스토어로 이동
    if (!isMobile()) {
      window.open(settings.appDownLink) // 플레이스토어 연결
      return
    }

    // 안드로이드용 딥링크를 설정한다.
    if (isAndroid() && !navigator.userAgent.match(/Firefox/)) {
      const matches = uri.match(/([^:]+):\/\/(.+)$/i)
      uri = `intent://${matches[2]}#Intent;scheme=${matches[1]}`
      uri += `;package=${settings.androidPackage};end`
    }

    // 앱다운로드로 이동하기 위한 타임아웃을 설정한다.
    if (settings.fallback) {
      timeout = setTimeout(openAppStore(Date.now()), settings.delay)
    }

    // iOS 사파리 브라우저의 경우 iframe을 다른 방식으로 추가해야 한다.
    // iOS는 모든 브라우저가 AppleWebkit을 렌더링 엔진으로 사용한다.
    // 다른 점은 사파리의 경우 유저 에이전트 문자열에 version/{버전넘버} 가 들어가고
    // 크롬은 crios/{버전넘버} 가 들어간다.

    const isSafariBrowser = isIOS() && userAgent.indexOf('Version') > -1

    if (isSafariBrowser) {
      //
      $('<iframe id="deeplink-iframe"/>')
        .ready(() => {
          clearTimeout(timeout)

          window.location.href = uri

          $('iframe').remove()

          // 다른 브라우저에서는 유효하지 않으면 아이프레임의 주소를 변경하지 않는 것과는 달리
          // 아이폰 사파리에서는 앱이 설치되어있지 않을 경우 아이프레임의 주소를 일단 변경한 후
          // '유효하지 않은 주소입니다' 라는 메시지를 출력한다.
          // 그리고 앱스토어 이동을 위한 setTimeout이 이미지 clearTimeout이 된 상태기 때문에
          // 다시 앱스토어 링크로 이동한다.
          // 다만 visibility API를 이용해서 브라우저가 계속 표시되고 있는 경우에만 이동한다.
          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = settings.appDownLink
            }
          }, 500)
        })
        .css('display', 'none')
        .appendTo('body')

      // iOS 사파리가 아닌 경우 (안드로이드 웹브라우저, iOS 크롬 등)
    } else {
      const iframe = document.createElement('iframe')
      iframe.onload = () => {
        clearTimeout(timeout)

        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe)
        }

        window.location.href = uri
      }

      iframe.src = uri
      iframe.setAttribute('style', 'display:none;')
      document.body.appendChild(iframe)
    }
  }
}
