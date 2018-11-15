/**
 * web to app with depplink
 *
 * @param option.iTunesLink ios 앱다운로드 링크
 * @param option.playStoreLink  android 앱다운로드 링크
 * @param option.androidPackage 안드로이드 앱이 있다면 필수
 * @param option.useFallback 딥링크 이동 실패했을 때 앱스토어로 이동 여부
 * @param option.fallbackUrl 앱 실행, 다운로드가 불가능할 때 사용, android intent에 사용함
 */
export default function Deeplink({
  iTunesLink = 'https://itunes.apple.com',
  playStoreLink = 'https://play.google.com/store/apps',
  androidPackage = 'com.myapp',
  useFallback = true,
  fallbackUrl = 'about:blank',
}) {
  const ua = window.navigator.userAgent // 브라우저 user agent string
  const isAndroid = /android/gi.test(ua)
  const isIOS = /iphone|ipad|ipod/gi.test(ua)
  const isMobile = isAndroid || isIOS
  // const isSafariBrowser = isIOS && /version/gi.test(ua)

  const settings = {
    appDownLink: isIOS ? iTunesLink : playStoreLink,
    androidPackage,
    useFallback, // 딥링크가 유효하지 않아 이동에 실패했을때, 앱스토어로 이동할지
    delay: 2000,
    delta: 500,
  }

  let iframeEl
  let fallbackTimer

  /**
   * iOS라면 전달받은 URI 그대로 사용,
   * 안드로이드라면 intent 딥링크를 설정한다.
   */
  const makeURI = uri => {
    if (isAndroid && !navigator.userAgent.match(/Firefox/)) {
      // ex) myapp://test/id
      // matchs[1] === myapp
      // matchs[2] === test/id
      const matches = uri.match(/([^:]+):\/\/(.+)$/i)

      uri = [
        `intent://${matches[2]}#Intent`,
        `scheme=${matches[1]}`,
        `package=${settings.androidPackage}`,
        `S.browser_fallback_url=${encodeURIComponent(settings.fallbackUrl)}`,
        'end',
      ].join(';')
    }

    return uri
  }

  const openApp = uri => {
    if (isIOS || (isAndroid && uri.indexOf('intent') > -1)) {
      document.location.href = uri
    } else {
      openAppWithIframe(uri)
    }
  }

  const openAppStore = () => {
    document.location.href = settings.appDownLink
  }

  const setFallback = now => {
    // 화면이 표시되지 않음 => 딥링크 이동에 성공 => fallback 링크 이동 타이머를 제거한다
    const waitForHidden = setInterval(() => {
      if (document.hidden || document.webkitHidden) {
        clearTimeout(fallbackTimer)
        clearInterval(waitForHidden)
      }
    }, 200)

    return () => {
      clearInterval(waitForHidden)
      const wait = settings.delay + settings.delta

      // setTimeout에 설정한 시간은 settings.delay,
      // 거기에 delta로 스크립트를 실행하는 시간을 충분히 더해준다.
      if (Date.now() - now < wait) {
        document.location.href = settings.appDownLink
      }
    }
  }

  /**
   * 숨겨진 iframe을 만들고 src 속성에 uri를 할당하는 방식을 사용한다.
   * @param {*} uri
   */
  const openAppWithIframe = uri => {
    iframeEl = document.createElement('iframe')
    iframeEl.id = 'test'
    iframeEl.style.width = 0
    iframeEl.style.height = 0
    iframeEl.style.visibility = 'hidden'
    document.body.appendChild(iframeEl)

    iframeEl.onload = function() {
      iframeEl.src = uri
      if (iframeEl.parentNode) {
        iframeEl.parentNode.removeChild(iframeEl)
      }
    }
  }

  return {
    redirectToApp: (target = '') => {
      if (isMobile) {
        openApp(makeURI(target))
      } else {
        openAppStore()
      }

      // 딥링크를 사용할 수 없을 때를 대비해서 앱 다운로드 페이지로 이동하기 위한 타임아웃을 설정한다.
      if (settings.useFallback) {
        fallbackTimer = setTimeout(setFallback(Date.now()), settings.delay)
      }
    },
  }
}
