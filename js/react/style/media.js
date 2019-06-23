/**
 * 디바이스의 촤대 크기
 */
export const breakPoint = {
  IPHONE5: '320px',
  MOBILE: '480px',
  TABLET: '1024px',
  DESKTOP: '1600px',
  LARGEDESKTOP: '1920px',
}

export const media = {
  // media querys for mobile first
  OVER_IPHONE5: `@media (min-width: ${breakPoint.IPHONE5})`,
  OVER_MOBILE: `@media (min-width: ${breakPoint.MOBILE})`,
  OVER_TABLET: `@media (min-width: ${breakPoint.TABLET})`,
  OVER_DESKTOP: `@media (min-width: ${breakPoint.DESKTOP})`,

  // media querys for desktop first.
  UNDER_LARGE_DESKTOP: `@media (max-width: ${breakPoint.LARGEDESKTOP})`,
  UNDER_DESKTOP: `@media (max-width: ${breakPoint.DESKTOP})`,
  UNDER_TABLET: `@media (max-width: ${breakPoint.TABLET})`,
  UNDER_IPHONE5: `@media (max-width: ${breakPoint.IPHONE5})`,
}

export default media
