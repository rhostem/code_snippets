import { css } from 'styled-components'

// 최대 높이를 지정하고 overflow는 보이지 않게 한다.
export const setHeightLimit = ({
  lineHeight = 1.5,
  line = 1,
  isHeightFixed = false,
}) => {
  return css`
    position: relative;
    line-height: ${lineHeight};
    min-height: ${lineHeight * 1}em;
    ${!isHeightFixed ? 'max-' : ''}height: calc(${lineHeight} * ${line}em);
    overflow: hidden;
  `
}

/**
 * IE11, Firefox에서 지원하지 않는 lineclamp를 사용해서 높이 제한과 ellipsis를 같이 적용
 * @param {} param0
 */
export const setHeightLimitAndEllipsis = ({ line = 1, lineHeight = 1.4 }) => {
  return css`
    @supports not (display: -webkit-box) {
      ${setHeightLimit({ lineHeight, line })};
    }

    /* line-clamp, -webkit-box 를 지원해야 사용 가능 */
    @supports (display: -webkit-box) {
      display: -webkit-box;
      -webkit-line-clamp: ${line};
      -webkit-box-orient: vertical;
      line-height: ${lineHeight};
      max-height: calc(${lineHeight} * ${line}em);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
}
