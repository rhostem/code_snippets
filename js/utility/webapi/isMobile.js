import { canUseDOM } from 'utils/dom'

/**
 * next.js의 getInitialProps 메소드 내부에서 유저 에이전트 문바열로 모바일 여부 확인
 * @param req
 */
export async function getIsMobileOnInit(req) {
  const userAgent = (await req) ? req.headers['user-agent'] : navigator.userAgent
  return /mobile/i.test(userAgent)
}

export const getIsMobile = () => {
  return canUseDOM() && /mobile/i.test(window.navigator.userAgent)
}

/**
 * 카카오 인앱 브라우저인지 확인
 */
export const getIsKakaoInappBrowser = () => {
  let isKakaoInApp = false

  if (canUseDOM()) {
    isKakaoInApp = /kakaotalk/i.test(window.navigator.userAgent)
  }

  return isKakaoInApp
}
