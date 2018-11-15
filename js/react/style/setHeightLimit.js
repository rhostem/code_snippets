import { css } from 'styled-components'

// 최대 높이를 지정하고 overflow는 보이지 않게 한다.
export const setHeightLimit = ({
  lineHeight = baseLineHeight,
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