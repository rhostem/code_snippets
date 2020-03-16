import { parseDeci } from 'utils/ramda'

export const size = {
  appMaxWidth: '1024px',
  appSizeOnDesktop: '414px',
}

export const baseFontSize = '14px' // px, pt
export const baseLineHeight = 1.4

/**
 * point(pixel) to rem
 * 가상 베이스 폰트 사이즈를 기준으로 rem 값을 계산한다.
 */
export const pTr = (pt = baseFontSize) => {
  return `${parseInt(pt, 10) / parseDeci(baseFontSize)}rem`
}

/**
 * 모바일에서는 뷰포트 넓이에 대응해서 폰트 사이즈가 커지도록 한다.
 * 전역 폰트 사이즈(html 태그에 할당한 폰트 사이즈)를 vw 단위로 설정한 후, 모든 요소의 사이즈를 rem 단위로 설정하면
 * 뷰포트 사이즈에 따라 같은 비율로 커지고 줄어들게 된다.
 *
 * 전역 폰트 사이즈 값은 임의로 지정한 베이스 폰트 사이즈와 디자인에서 사용한 앱의 넓이를 사용해서 계산한다.
 * 앱의 넓이가 100vw일 때 베이스 폰트 사이즈 값을 vw로 변환하기 위한 공식은 아래와 같다.
 *
 * 14px : (x)vw = 414px : 100vw
 * (x)vw = 14 * 100 / 414
 *
 * 이 방법을 사용하면 데스크탑 뷰에서는 앱의 크기가 너무 커지기 때문에 전역 폰트사이즈를 vw단위가 아닌
 * px 단위의 베이스폰트 사이즈를 사용한다.
 *
 * html {
 *   font-size: ${viewportResponsiveFontSize};
 * }
 */
export const viewportResponsiveFontSize = `${(parseDeci(baseFontSize) * 100) /
  parseDeci(size.appSizeOnDesktop)}vw`

export default {
  viewportResponsiveFontSize,
  baseFontSize,
  baseLineHeight,
  pTr,
}
