/**
 * 디바이스의 촤대 크기
 */
export const deviceMaxWidth = {
  mobile: '480px',
  tablet: '1024px',
  desktop: '1920px',
}

const media = {
  // media querys for mobile first
  largerThanMobile: `(min-width: ${deviceMaxWidth.mobile})`,
  largerThanTablet: `(min-width: ${deviceMaxWidth.tablet})`,
  largerThanDesktop: `(min-width: ${deviceMaxWidth.desktop})`,

  // media querys for desktop first.
  smallerThanLargeDesktop: `(max-width: ${deviceMaxWidth.desktop})`,
  smallerThanDesktop: `(max-width: ${deviceMaxWidth.tablet})`,
  smallerThanTablet: `(max-width: ${deviceMaxWidth.mobile})`,
}

export default media
