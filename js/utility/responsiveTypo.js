import { parseDeci } from 'utils/ramda'

export const size = {
  appMaxWidth: '1024px',
  appSizeOnDesktop: '414px',
}

export const baseFontSize = '14' // pt, pixel

/**
 * 모바일에서는 뷰포트 넓이에 대응해서 폰트 사이즈가 커지도록 한다.
 * html 폰트 사이즈를 vw 단위로 설정한 후, 모든 요소의 사이즈를 rem 단위로 설정하면 크기가 디바이스 크기에
 * 반응해서 커지게 된다.
 * vw 값은 임의로 지정한 가상 베이스 폰트 사이즈와 디자인에서 사용한 앱의 넓이를 사용해서 계산한다.
 * 디자이너가 지정한 앱의 넓이가 414px, 가상 베이스 폰트사이즈가 25px이라면 실제 베이스 폰트사이즈는
 * 100 / 414 * 25 vw 가 된다.
 *
 * 데스크탑 뷰에서는 vw 단위로 베이스 폰트사이즈를 지정하면 앱 요소의 사이즈가 너무 커지기 때문에 vw 대신
 * 가상 베이스폰트 사이즈를 사용하고 앱의 넓이도 디자인의 넓이를 그대로 사용한다.
 */
export const viewportResponsiveFontSize = `${(parseDeci(baseFontSize) /
  parseDeci(size.appSizeOnDesktop)) *
  100}vw`

export const baseLineHeight = 1.4

/**
 * point(pixel) to rem
 * 가상 베이스 폰트 사이즈를 기준으로 rem 값을 계산한다.
 */
export const pTr = (pt = baseFontSize) => {
  return `${parseInt(pt, 10) / parseInt(baseFontSize, 10)}rem`
}

export default {
  viewportResponsiveFontSize,
  baseFontSize,
  baseLineHeight,
  pTr,
}
